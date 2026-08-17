# Dessiner le parcours avant l'écran

## Le piège

On te demande "un écran de prise de rendez-vous". Tu ouvres Figma ou ton éditeur, tu poses un
formulaire : animal, praticien, créneau, bouton "Réserver". Ça a l'air complet. Trois semaines
plus tard : que se passe-t-il si le créneau vient d'être pris par quelqu'un d'autre pendant que le
client remplissait le formulaire ? Si le praticien choisi est en fait absent ce jour-là (mis à jour
après le chargement de la page) ? Si le client ferme l'onglet entre l'envoi et la confirmation ?
Personne n'a dessiné ces chemins, donc personne n'a codé de réponse : l'écran plante, se fige, ou
pire, ment ("Rendez-vous confirmé" alors qu'il ne l'est pas).

## Ce qui se passe vraiment

Un écran est la représentation visuelle d'un sous-ensemble d'un parcours. Si tu dessines l'écran
avant le parcours, tu dessines une photo d'un instant et tu oublies tout ce qui bouge autour :
le temps qui passe, les autres utilisateurs, le réseau qui peut échouer à n'importe quel moment.

Un parcours, ce n'est pas une liste d'écrans reliés par des flèches "suivant". C'est un graphe
d'états avec, à chaque état, la question : qu'est-ce qui peut mal se passer ici, et qu'est-ce que
l'utilisateur peut faire ensuite ?

### La méthode

1. Écris le chemin heureux en une phrase par étape, sans écran, juste des verbes.
2. Pour chaque étape, liste au moins trois façons dont elle peut échouer ou être interrompue.
3. Pour chaque échec, décide : on retente automatiquement, on prévient l'utilisateur, ou on bloque ?
4. Seulement maintenant, dessine les écrans : ils découlent des états, pas l'inverse.

## Exemple : réserver un créneau au cabinet vétérinaire

Chemin heureux, en verbes :

```text
1. Charger les créneaux disponibles du praticien choisi
2. Sélectionner un créneau
3. Saisir/valider les infos de l'animal et du propriétaire
4. Envoyer la demande de réservation
5. Recevoir la confirmation
6. Afficher le rendez-vous confirmé
```

Maintenant, les embranchements d'erreur : c'est là que se joue la vraie conception :

```text
1. Charger les créneaux
   |- réseau coupé           --> afficher état erreur + bouton "réessayer"
   |- liste vide (tout pris) --> afficher état vide + suggestion (autre praticien / autre jour)
   \- chargement > 3s        --> afficher un squelette, pas un spinner nu

2. Sélectionner un créneau
   \- créneau choisi disparaît entre-temps (quelqu'un d'autre l'a pris)
        --> détecté seulement à l'étape 4, gérer là-bas, pas ici

3. Saisir les infos
   |- champ invalide          --> erreur inline, immédiate, localisée au champ
   \- animal déjà connu       --> proposer l'auto-complétion, ne pas faire ressaisir un dossier

4. Envoyer la demande
   |- créneau déjà pris (409) --> message clair + retour à l'étape 2 avec liste rafraîchie
   |- timeout réseau          --> NE PAS renvoyer automatiquement (risque de doublon) --> voir leçon 4
   |- session expirée (401)   --> sauvegarder le brouillon localement, renvoyer vers connexion
   \- succès mais lent        --> désactiver le bouton, afficher "Envoi en cours..."

5. Recevoir la confirmation
   |- réponse ambiguë (ni erreur ni succès net, ex. 202) --> état "en cours de traitement"
   \- onglet fermé avant la réponse --> au retour, vérifier l'état réel côté serveur, ne pas supposer
```

Ce graphe, pas le formulaire, est le vrai livrable de conception. L'écran vient après.

## Diagramme d'état pour la ressource "réservation"

Un formulaire n'est pas un objet binaire (rempli / envoyé). C'est une machine à états :

```text
        remplir            envoyer            serveur répond OK
IDLE ----------------> DIRTY -----------> ENVOI -----------------------> CONFIRMÉ
                        ^                |
                        |                | serveur répond erreur récupérable (409, validation)
                        +----------------+
                                         |
                                         | erreur réseau / timeout
                                         v
                                    INCERTAIN ----> (voir leçon 4 : vérifier avant de renvoyer)
```

L'état `INCERTAIN` est celui que 90% des équipes oublient. C'est pourtant l'état exact du client
juste après un timeout : on ne sait pas si le serveur a traité la demande ou non. Le traiter comme
une erreur classique ("réessaie") crée les doublons du jeudi 17h50.


## Analogie

Dessiner le graphe d'états avant l'écran, c'est comme un chef de cuisine qui prépare son plan de
mise en place en listant tout ce qui peut manquer en plein coup de feu (rupture d'un ingrédient,
commande annulée en cours de cuisson), ou une équipe d'urgences hospitalières qui prépare un
protocole pour chaque scénario de dégradation d'un patient plutôt que de n'avoir prévu que le cas
standard.
Où l'analogie casse : en cuisine et aux urgences, l'humain sur place peut improviser une réponse
raisonnable face à un cas non prévu grâce à son expérience générale. Un écran ne sait faire que ce
qui a été codé explicitement : un état non prévu ne déclenche pas une improvisation prudente, il
déclenche un plantage, un blocage silencieux, ou pire, un mensonge affiché à l'écran.

## Chiffrer le coût de l'état oublié

Sur l'exemple du cabinet vétérinaire, l'état `INCERTAIN` après un timeout, s'il n'est pas
modélisé, se traduit typiquement par un bouton "Réserver" qui reste cliquable après un premier
échec réseau. Un client presse une deuxième fois, croyant que rien ne s'est passé. Si la première
requête avait en réalité atteint le serveur avant le timeout côté client, deux réservations sont
créées pour le même animal. Sur un cabinet qui traite 40 réservations en ligne par semaine, un
taux de timeout réseau de 2% (chiffre courant en connexion mobile) génère environ un doublon par
semaine, non pas parce que le code métier de réservation est faux, mais parce que le graphe
d'états côté écran n'a jamais prévu l'état intermédiaire.

## Modéliser l'état plutôt que l'empiler

Le piège classique est d'empiler des booléens indépendants pour représenter un état qui est en
réalité unique et exclusif. Cette approche laisse le compilateur, et le lecteur du code, incapable
de garantir qu'un seul état est actif à la fois :

```typescript
// Fragile : rien n'empêche isLoading et hasError d'être vrais en même temps
type ReservationUiState = {
  isLoading: boolean;
  hasError: boolean;
  isSuccess: boolean;
};

// Robuste : un seul état possible à la fois, le type l'impose
type ReservationState =
  | { status: "idle" }
  | { status: "dirty"; slotId: string }
  | { status: "sending"; slotId: string }
  | { status: "uncertain"; slotId: string } // timeout : ne pas renvoyer sans vérifier
  | { status: "confirmed"; reservationId: string }
  | { status: "error"; reason: "slot_taken" | "validation" | "session_expired" };
```

Avec cette forme, un état "uncertain && confirmed" en même temps devient tout simplement
impossible à représenter : le bug de double confirmation ne peut plus exister au niveau du
typage, il faudrait le réintroduire volontairement.

## Compromis

| Option                                                             | Coût                                   | Bénéfice                                                                  | Quand choisir                                                   |
| ------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Dessiner tous les embranchements avant de coder                    | Temps de conception en amont, réunions | Écran robuste dès la première version, moins de tickets bugs              | Fonctionnalité avec argent, santé, ou concurrence réelle en jeu |
| Coder le happy path, corriger les bugs remontés                    | Rapide au départ                       | Rien en amont                                                             | Prototype jetable, preuve de concept interne                    |
| Machine à états explicite (state machine) en code                  | Un peu de boilerplate                  | Impossible d'atteindre un état incohérent par accident                    | Formulaires critiques, flux multi-étapes, paiement, réservation |
| `useState` booléens empilés (`isLoading`, `hasError`, `isSuccess`) | Rapide à écrire                        | États incohérents possibles (`isLoading && hasError` vrais en même temps) | Composant jetable à très faible enjeu                           |

## Pièges classiques

- Le diagramme d'état existe dans la tête du développeur mais jamais sur un support partagé : la
  personne qui reprend le code six mois plus tard invente ses propres règles, incompatibles.
- On modélise le succès et une seule erreur générique ("une erreur est survenue"), ce qui empêche
  l'utilisateur d'agir : il ne sait pas si retenter va aider ou aggraver.
- On confond "écran suivant" et "état suivant" : un même écran peut représenter plusieurs états
  (ex. le formulaire de réservation est identique visuellement en `IDLE` et en `INCERTAIN`, avec
  un bug de double submit qui en découle).
- On dessine le parcours seulement pour l'utilisateur final et on oublie les parcours internes
  (l'accueil qui annule un rendez-vous pour quelqu'un au téléphone pendant qu'un client le modifie
  en ligne au même moment).

## Ce que tu dois savoir défendre

- Pourquoi dessiner le parcours avant l'écran change concrètement le code que tu écris ensuite ?
- Qu'est-ce qu'un état "incertain" après un timeout, et pourquoi le traiter comme une erreur
  classique est dangereux ?
- Donne un exemple où deux utilisateurs agissant en même temps sur la même ressource doit changer
  le design de l'écran, pas seulement la base de données.
