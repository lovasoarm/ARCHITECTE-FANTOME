# Où couper une feature sans la casser

## La scène

Un cabinet de kinésithérapeutes veut un système de gestion de créneaux avec liste d'attente
automatique : si un patient annule, le premier de la liste d'attente reçoit une proposition
automatique par SMS, avec un délai de réponse de dix minutes avant de proposer au suivant.
L'équipe veut livrer vite. Un développeur inexpérimenté coupe la feature en "d'abord le SMS,
la logique de délai viendra après" : et livre un système qui envoie un SMS à tout le monde en
même temps dès qu'un créneau se libère. Résultat : plusieurs patients se présentent pour le
même créneau, le cabinet doit gérer des conflits en direct au téléphone. La coupe a cassé
l'utilité de la fonctionnalité au lieu de la réduire proprement.

## Ce qui se passe vraiment

Couper une feature ne veut pas dire retirer une partie au hasard ni retirer la partie qui
semble techniquement la plus simple à reporter. Couper une feature veut dire trouver la ligne
qui sépare "un scénario complet mais réduit en ampleur" d'"une fonctionnalité qui ne marche
plus du tout dans son intention initiale". La bonne coupe pour la liste d'attente n'est pas de
retirer le délai de réponse : c'est ce délai qui rend le système utilisable sans créer de
conflit. La bonne coupe est plutôt de réduire l'ampleur : liste d'attente activable pour un
seul praticien d'abord, ou liste d'attente limitée à cinq patients maximum au lieu d'illimitée.

```text
Feature complète : liste d'attente automatique avec SMS et délai de réponse

Mauvaise coupe (casse l'intention) :
  Garder le SMS, retirer le délai de séquencement
  --> plusieurs personnes convoquées pour le même créneau, conflit garanti

Bonne coupe (réduit l'ampleur, garde l'intention intacte) :
  Garder SMS + délai de séquencement, limiter à un seul praticien pour la V1
  --> fonctionne correctement pour un périmètre réduit, extensible ensuite
```

Une bonne ligne de coupe préserve l'invariant qui rend la fonctionnalité fiable (ici : jamais
deux personnes convoquées en même temps) et réduit uniquement la portée (nombre de praticiens
concernés, nombre de patients en liste, canal de notification).

## Méthode pour trouver la ligne de coupe

1. Identifie l'invariant de la feature : la règle qui, si elle est violée, rend la
   fonctionnalité dangereuse ou trompeuse plutôt que juste limitée (ici : jamais deux
   convocations simultanées pour le même créneau).
2. Liste les axes de réduction possibles qui ne touchent pas cet invariant : nombre
   d'utilisateurs concernés, volume de données, canal de communication, fréquence d'usage,
   automatisation partielle avec validation manuelle en secours.
3. Choisis l'axe qui réduit le plus le travail restant tout en gardant un scénario complet
   et honnête pour l'utilisateur qui en bénéficie déjà.
4. Vérifie que la version coupée reste vraie pour l'utilisateur : elle ne doit jamais donner
   une impression de fiabilité supérieure à ce qu'elle offre réellement.

## Repérer l'invariant : la question à poser

Un invariant n'est pas toujours évident. Pour le trouver, pose systématiquement la question :
"si cette règle est violée une seule fois, est-ce que la fonctionnalité devient juste limitée,
ou est-ce qu'elle devient dangereuse ou mensongère ?" Sur l'exemple de la liste d'attente :

```text
Règle : "un seul patient convoqué à la fois par créneau libéré"
  violée --> deux patients se déplacent pour rien, l'un des deux perd
             confiance dans le système --> INVARIANT

Règle : "la liste d'attente gère jusqu'à 50 patients"
  violée (limitée à 5) --> certains patients très en bas de liste
             attendent un peu plus --> PAS un invariant, juste une portée

Règle : "notification par SMS"
  violée (remplacée par email) --> canal différent, mais logique de
             séquencement intacte --> PAS un invariant, un axe de réduction
```

Un invariant protège une promesse implicite faite à l'utilisateur (ici : "vous ne serez jamais
doublé par une convocation simultanée"). Une portée est juste une limite quantitative ou de
confort, négociable sans casser cette promesse.

## Feature flags : livrer du code incomplet en sécurité

Un feature flag est un interrupteur, généralement une valeur de configuration, qui permet
d'activer ou de désactiver un comportement sans redéployer le code. Il permet de fusionner du
code en production avant qu'il soit prêt pour tous les utilisateurs, ce qui évite les branches
Git qui vivent des semaines et divergent dangereusement du code principal.

```typescript
// Exemple minimal : activer la liste d'attente uniquement pour un praticien pilote
function shouldOfferWaitlist(therapistId: string): boolean {
  const pilotTherapists = getConfig("WAITLIST_PILOT_THERAPIST_IDS"); // ex: ["th_042"]
  return pilotTherapists.includes(therapistId);
}

// Dans le flux d'annulation :
if (shouldOfferWaitlist(cancelledSlot.therapistId)) {
  notifyNextInWaitlist(cancelledSlot);
} else {
  markSlotAsAvailable(cancelledSlot); // comportement actuel inchangé pour les autres
}
```

Le flag permet de tester la fonctionnalité en conditions réelles avec un seul praticien
volontaire, de mesurer son effet, puis de l'étendre progressivement : sans jamais avoir livré
une version cassée à l'ensemble du cabinet.

## Le coût caché des flags qui restent

Un feature flag n'est pas gratuit à long terme. Chaque flag actif multiplie les combinaisons de
comportements possibles dans le code : avec 3 flags indépendants, ce sont potentiellement 8
combinaisons de comportement à tester, alors que l'équipe n'en teste souvent qu'une ou deux en
pratique. Un flag oublié six mois après son utilité initiale devient une source de bug quand
quelqu'un modifie le code "actif" sans se souvenir que l'ancienne branche existe encore et sera
un jour réactivée par erreur. Règle pratique : chaque flag créé a une date de retrait prévue
dès sa création, écrite dans le ticket, pas "quand on aura le temps".

```text
Cycle de vie sain d'un flag :
  création (ticket avec date de retrait prévue)
       --> déploiement progressif (1 praticien, puis 10%, puis 100%)
       --> flag à 100% depuis 2 semaines sans incident
       --> suppression du flag ET du code de l'ancien chemin
       --> une seule voie de code reste

Cycle de vie malsain :
  création --> déploiement à 100% --> "ça marche, on verra plus tard"
       --> flag oublié --> 8 mois plus tard, quelqu'un modifie le
           chemin "actif" sans savoir que l'autre existe encore
```


## Analogie

Trouver la ligne de coupe d'une feature, c'est comme un chef de cuisine qui retire un
accompagnement du plat plutôt que de servir la viande à moitié cuite, ou un skipper qui réduit
la voilure par gros temps plutôt que de couper les liaisons du gouvernail.
Où l'analogie casse : le chef et le skipper savent instantanément, par expérience physique, ce
qui est vital et ce qui est accessoire. En logiciel, l'invariant n'est pas visible à l'oeil nu :
il faut l'expliciter par écrit, sinon deux personnes de la même équipe couperont la feature à
deux endroits différents, avec des résultats incompatibles.

## Compromis

| Option                                                                 | Coût                                                                            | Bénéfice                                                             | Quand choisir                                                              |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Couper par réduction de portée (moins d'utilisateurs, moins de volume) | Demande d'identifier clairement l'invariant à préserver                         | Livraison rapide d'un scénario honnête et complet                    | Cas général, à privilégier par défaut                                      |
| Couper en retirant une étape du scénario                               | Rapide à décider                                                                | Casse souvent l'intention de la feature, comme dans l'exemple du SMS | Seulement si l'étape retirée est réellement optionnelle pour l'utilisateur |
| Utiliser un feature flag pour livrer en continu                        | Ajoute une petite complexité de configuration et de nettoyage ultérieur du flag | Réduit le risque de merge tardif et permet un test progressif        | Dès que plusieurs personnes travaillent sur le même code en parallèle      |

## Pièges classiques

- Couper en retirant la partie "qui prend le plus de temps à coder" sans vérifier si elle est
  aussi celle qui porte l'invariant de sécurité ou de cohérence de la feature.
- Laisser un feature flag vivre indéfiniment en production sans jamais le retirer, ce qui
  multiplie les chemins de code à maintenir et finit par créer des bugs qui n'apparaissent
  que dans certaines combinaisons de flags.
- Couper une feature sans le dire clairement à l'utilisateur final, qui découvre une version
  dégradée sans comprendre pourquoi elle se comporte différemment de ce qui a été annoncé.
- Croire qu'un feature flag résout automatiquement le risque de casse, alors qu'il ne fait que
  déplacer le risque vers une combinaison de flags non testée.
- Confondre "réduire la portée" et "supprimer l'invariant" : le symptôme est un incident client
  qui aurait été évité si la version complète avait été livrée, même en retard.

## Ce que tu dois savoir défendre

- Comment identifier l'invariant d'une feature avant de décider où la couper.
- Pourquoi retirer "l'étape la plus longue à développer" est souvent une mauvaise heuristique
  de découpage.
- À quoi sert un feature flag concrètement, et quel est son coût caché si on ne le nettoie
  jamais après usage.
