---
stability: perissable_2027
acte: appliquer
---

# Le coût des décisions

## Le piège

Une bibliothèque de club d'escalade doit choisir comment stocker l'historique des emprunts
de matériel (baudriers, cordes, chaussons). L'équipe hésite entre une table SQL normalisée
et un simple champ JSON "historique" par matériel. Le JSON est plus rapide à écrire ce
sprint-ci. Six mois plus tard, on veut savoir "quel matériel a été prêté plus de dix fois
sans révision" : une requête impossible à écrire proprement sur le JSON sans tout migrer. Le
coût n'a pas disparu, il a été déplacé et multiplié.

## Ce qui se passe vraiment

Toute décision technique a un coût de changement : ce qu'il en coûtera de revenir dessus plus
tard. Ce coût n'est jamais nul, mais il varie énormément selon la nature du choix.

```text
   COUT DE CHANGEMENT PAR TYPE DE DECISION

   faible ---------------------------------> élevé

   nom d'une variable    format de réponse API    schéma de base
   locale                consommé par un seul     de données partagé
                          client interne           par 5 services
        |                      |                        |
        v                      v                        v
   changer = minutes    changer = heures,        changer = semaines,
                         coordination un client   migration de données,
                                                   coordination multi-équipes
```

Il y a deux formes de dette technique, et les confondre est une erreur fréquente :

- **Dette volontaire** : un raccourci pris consciemment, avec un plan de remboursement
  explicite ("on stocke ça en JSON pour livrer avant la saison d'inscriptions, on migrera si
  on dépasse 500 emprunts/mois"). C'est un pari assumé.
- **Dette subie** : un raccourci pris sans le savoir, parce que personne n'a évalué le coût
  de changement au moment de la décision. C'est une facture qui arrive sans qu'on ait signé
  de contrat.

La dette volontaire, correctement documentée (règle 6 du Niveau 00), est un outil de gestion
du risque. La dette subie est un accident qui se répète tant que personne ne fait l'exercice
d'estimer le coût de changement avant de trancher.

### La valeur d'option

Une décision qui préserve plusieurs futurs possibles a une **valeur d'option** : tu payes
peut-être un peu plus cher maintenant pour ne pas te fermer de portes. Choisir un schéma de
base de données normalisé plutôt qu'un JSON, c'est payer un peu de temps de développement en
plus maintenant pour garder la possibilité de faire des requêtes analytiques plus tard sans
tout réécrire. La valeur d'option n'est pas gratuite non plus : sur-préserver des options
qu'on n'utilisera jamais est aussi un gaspillage.

```text
  coût immédiat bas, valeur d'option basse       --> JSON libre, pas de contrainte
  coût immédiat moyen, valeur d'option haute     --> schéma normalisé + index ciblés
  coût immédiat haut, valeur d'option très haute --> architecture event-sourcée
                                                      (rejouable, mais coûteuse à opérer)
```

### Analogie

Analogie : une décision qui ferme des options futures ressemble au choix d'un itinéraire en
course de montagne sans point de rebroussement facile, et au choix d'un plan de coupe en
menuiserie qui détermine déjà toutes les pièces qu'on pourra tirer d'une planche.
Où l'analogie casse : en montagne ou en menuiserie, la matière ou le terrain ne changent pas
pendant que tu avances. Un système logiciel évolue en même temps que tu construis dessus : le
"terrain" (le volume de données, le nombre d'utilisateurs, les règles métier) peut changer
plus vite que ta capacité à migrer, ce qui rend certaines décisions bien plus coûteuses à
retarder qu'en langage naturel ça n'y paraît.

### Estimer le coût de changement avant de trancher : une méthode en trois questions

Avant une décision qui te semble structurante, pose ces trois questions et écris les réponses,
même en une ligne chacune :

```text
   1. Combien de composants/équipes dépendent déjà de ce choix, ou en dépendront
      dans les 6 prochains mois ? (0 = coût faible, 5+ = coût élevé)
   2. Si je change d'avis dans 6 mois, dois-je migrer des données existantes,
      ou juste changer du code ? (code seul = coût faible, données = coût élevé)
   3. Existe-t-il un signal mesurable qui me dirait, à l'avance, que ce choix
      ne tient plus ? (si non, le coût de la découverte tardive s'ajoute au coût
      de changement lui-même)
```

### Un cas chiffré : JSON contre schéma normalisé

Sur le cas du club d'escalade : stocker l'historique en JSON coûte environ 2 heures de moins
à écrire au départ (pas de migration, pas de jointure à concevoir). Six mois plus tard, la
question "quel matériel a été prêté plus de dix fois sans révision" nécessite soit une
extraction manuelle en Python sur l'export JSON (environ 1 journée, à refaire à chaque
demande similaire), soit une migration complète vers un schéma normalisé (2 à 3 jours, plus
le risque de migration sur des données de production déjà incohérentes après six mois d'usage
non contraint). Le gain initial de 2 heures a coûté, au minimum, 1 à 3 jours plus tard, sans
compter le risque de perte de qualité de données pendant la période JSON.

```text
   JSON au départ : -2h (gain immédiat)
   6 mois plus tard, besoin analytique apparaît :
     option A : extraction manuelle répétée   --> +1 jour à chaque nouvelle question
     option B : migration vers schéma normalisé --> +2-3 jours, une seule fois,
                mais avec un risque de données sales à nettoyer en cours de route
```

### Contre-exemple : quand investir tôt était une erreur

L'excès inverse arrive tout aussi souvent. Une autre bibliothèque de club d'escalade, plus
petite (60 adhérents, 15 emprunts par mois), a construit dès le départ une architecture
event-sourcée pour l'historique des emprunts, en anticipant une croissance et des besoins
analytiques qui ne sont jamais arrivés deux ans plus tard. Le coût : environ 3 jours de
développement supplémentaires au départ, et une complexité opérationnelle permanente (il faut
un développeur capable de comprendre le rejeu d'événements pour la moindre correction de
donnée) pour un club qui n'a jamais eu besoin de plus qu'un export CSV mensuel. La valeur
d'option achetée n'a jamais été exercée : c'est un investissement perdu, pas un pari gagnant.

```text
   Club à 60 adhérents, croissance lente prévisible
        --> architecture event-sourcée : coût permanent pour une option jamais utilisée

   Club à 3000 adhérents, multi-sites, croissance rapide
        --> la même architecture aurait probablement été rentabilisée
```

### Comment trancher sans boule de cristal

La question qui aide à trancher n'est pas "et si on grandissait" (toujours vrai en théorie),
mais "quel est le signal concret, déjà visible aujourd'hui, qui indique que la croissance est
en cours ou imminente". Sans signal déjà présent au moment de la décision, investir dans la
valeur d'option relève du pari sur une hypothèse non vérifiée, pas d'une anticipation
raisonnée. Un club à 60 adhérents stable depuis trois ans n'a pas ce signal. Une startup qui
vient de lever des fonds avec un objectif de 10x en un an, si.

## Compromis

| Option                                             | Coût                                            | Bénéfice                                       | Quand choisir                                                       |
| ----------------------------------------------------| -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| Dette volontaire documentée                        | Coût de remboursement futur connu et planifié   | Vitesse de livraison immédiate, pari maîtrisé | Contexte incertain, besoin de valider vite une hypothèse produit        |
| Investir dans une structure durable dès le départ | Coût immédiat plus élevé                        | Coût de changement futur réduit                | Le domaine est stable, les requêtes futures sont déjà prévisibles      |

## Pièges classiques

- Prendre une dette sans la nommer comme telle : symptôme : personne ne sait qu'il faut la
  rembourser, elle devient permanente par défaut.
- Sur-ingénierer pour préserver une option qui ne sera jamais exercée : symptôme : temps de
  développement doublé pour une flexibilité jamais utilisée deux ans après.
- Évaluer le coût de changement uniquement en lignes de code à modifier, en ignorant la
  coordination humaine nécessaire (autres équipes, migrations de données en production).
- Confondre "dette technique" et "code mal écrit" : la dette est un choix économique
  délibéré, le mauvais code est souvent juste une erreur, pas un pari.
- Estimer le coût de changement une seule fois à la conception et ne jamais le réévaluer :
  symptôme : une décision jugée "à faible enjeu" au départ devient centrale après une
  croissance du produit que personne n'a remarquée à temps.

## Ce que tu dois savoir défendre

1. Donne un exemple de dette volontaire bien documentée et explique quel serait le signal de
   remboursement.
2. Pourquoi le coût de changement d'un schéma de base de données partagé par plusieurs
   services est structurellement plus élevé que celui d'une fonction interne.
3. Qu'est-ce que la valeur d'option, et donne un exemple où l'ignorer a coûté cher.

### Ce que tu dois écrire avant de trancher une décision structurante

Une note de deux à cinq lignes suffit, tant qu'elle répond à trois choses : le coût de
changement estimé, la valeur d'option gagnée ou perdue, et le signal qui déclencherait un
réexamen. Ce n'est pas un document lourd, c'est un garde-fou contre l'oubli du raisonnement.

```text
   Decision : historique d'emprunt en JSON plutôt qu'en table normalisée.
   Coût de changement estimé : moyen (migration de quelques jours, pas de coordination
     externe car usage interne uniquement).
   Valeur d'option perdue : requêtes analytiques transverses impossibles sans extraction.
   Signal de réexamen : premiere demande d'analyse recurrente (plus d'une fois par mois)
     sur l'historique, ou volume d'emprunts au dela de 500/mois.
```
