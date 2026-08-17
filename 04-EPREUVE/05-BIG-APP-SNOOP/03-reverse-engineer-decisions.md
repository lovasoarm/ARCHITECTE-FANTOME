# Deviner les contraintes derrière un design

## Le piège

Tu ouvres le code de facturation d'un cabinet vétérinaire multi-sites. Tu trouves une table
`invoice_lines_v2` à côté d'une table `invoice_lines` jamais supprimée, deux systèmes de
calcul de TVA qui coexistent selon la date de création de la facture, et une fonction
`computeTotal()` qui contient un `if (clinicId === 'CLINIQUE_LYON_CENTRE')` en dur. Ton
premier réflexe : "c'est du code sale, il faut tout réécrire". Ce réflexe, non vérifié, va te
faire perdre une semaine à réécrire un système qui gère en réalité une contrainte fiscale
réelle et non négociable que tu n'as pas encore identifiée.

## Ce qui se passe vraiment

Un design de code est une réponse figée à des contraintes qui, elles, ont bougé ou disparu.
Pour comprendre pourquoi un choix a été fait, tu dois répondre à quatre questions dans
l'ordre, parce que chacune élimine des hypothèses pour la suivante.

```text
1. Quand ce code a-t-il été écrit ?          --> contexte technique et produit de l'époque
2. Quel problème résolvait-il alors ?         --> pas le problème d'aujourd'hui, celui d'hier
3. Quelle contrainte externe l'a façonné ?    --> légale, contractuelle, performance, équipe
4. Cette contrainte existe-t-elle encore ?    --> décide si le code est une dette ou un besoin
```

### Question 1 : Quand ce code a-t-il été écrit

L'historique git donne une date. Croise-la avec ce que tu sais du produit à cette période
(taille de l'équipe, version de la stack, présence ou non de tel client majeur). Un design
"bizarre" écrit trois mois après la signature d'un gros client a de fortes chances de
répondre à une exigence spécifique de ce client.

```bash
git log --diff-filter=A --follow -- server/billing/computeTotal.ts
# date de création --> recoupe avec le changelog produit ou les tickets de la période
```

Va plus loin que la simple date de création : regarde aussi la fréquence des modifications
sur ce fichier précis. Un fichier touché une fois puis jamais revu pendant cinq ans raconte
une histoire différente d'un fichier modifié quinze fois en deux ans par des personnes
différentes, avec des messages de commit du type "fix urgence client" ou "correctif audit".

```bash
git log --follow --oneline -- server/billing/computeTotal.ts | wc -l
# beaucoup de commits, resserres dans le temps --> zone chaude, probablement sous contrainte
# forte (regulatoire ou contractuelle), a traiter avec prudence maximale
```

### Question 2 : Quel problème résolvait-il alors

Le code que tu lis aujourd'hui répond peut-être à un problème qui n'existe plus. La table
`invoice_lines_v2` a peut-être été créée pour supporter un changement de règle de TVA à une
date donnée, sans que l'ancienne table ni les factures historiques ne puissent être migrées
rétroactivement : la loi interdit parfois de recalculer une facture déjà émise. Le doublon
n'est pas de la paresse, c'est une frontière légale figée dans le schéma.

### Question 3 : Quelle contrainte externe l'a façonné

Classe la contrainte probable dans une des familles suivantes, parce que chacune a une
signature différente dans le code :

```text
Contrainte légale/fiscale   --> dates de bascule en dur, versions parallèles qui ne fusionnent
                               jamais, commentaires citant un article de loi ou un audit
Contrainte contractuelle    --> identifiants de client en dur, comportements spéciaux
                               isolés dans des branches conditionnelles nommées par client
Contrainte de performance   --> dénormalisation, tables de cache, champs dupliqués,
                               commentaires mentionnant un incident de charge
Contrainte d'équipe/temps   --> duplication entre deux zones qui font presque la même chose
                               parce que deux équipes ne se sont jamais synchronisées
Contrainte de migration     --> tables ou champs "v2" à côté de l'ancien, jamais nettoyés
                               parce que la bascule complète n'a jamais été priorisée
```

Le cas `if (clinicId === 'CLINIQUE_LYON_CENTRE')` sent la contrainte contractuelle ou
réglementaire locale (peut-être un régime de TVA différent en fonction d'une convention
spécifique à ce site). Avant de le supprimer, tu cherches le ticket ou le commit associé.

### Question 4 : Cette contrainte existe-t-elle encore

C'est la question qui transforme l'enquête en décision. Trois issues possibles :

```text
Contrainte encore active    --> le design "moche" est en fait nécessaire, tu dois le garder
                               et au mieux l'isoler proprement, pas le supprimer
Contrainte disparue         --> c'est de la vraie dette, tu peux proposer une suppression,
                               mais avec une preuve écrite que la contrainte a disparu
Contrainte inconnaissable   --> tu ne peux pas vérifier (personne ne se souvient, aucun
                               document), tu dois traiter le code comme actif par défaut
                               et le protéger avec un test avant d'y toucher
```

### Étude de cas chiffrée : le `if` en dur qui a failli casser un client à 40 000 euros/an

Reprenons le cas `if (clinicId === 'CLINIQUE_LYON_CENTRE')`. Un développeur junior, pressé
de "nettoyer" le code avant un audit de qualité interne, le supprime en pull request avec le
message "suppression de code spécifique, mauvaise pratique". La revue passe, personne ne
pose la question de la contrainte. Deux semaines plus tard, la clinique de Lyon Centre, qui
génère 40 000 euros de facturation annuelle rien qu'en frais de dossier, reçoit des factures
avec une TVA fausse, parce que ce site est le seul à facturer aussi des actes de formation
vétérinaire, soumis à un taux différent depuis une convention signée trois ans plus tôt.
Coût réel de l'incident : trois jours de rattrapage comptable, une facture d'excuse au
client, et une revue de code désormais obligatoire pour tout `if` contenant un identifiant
métier en dur, quel que soit le niveau d'ancienneté de l'auteur. Le coût de la vérification
préalable (chercher le commit d'origine, 15 minutes) était cent fois inférieur au coût de
l'erreur.

Analogie : deviner la contrainte derrière un design ancien ressemble à une enquête
d'archéologie de chantier avant travaux dans une charpente de menuiserie, et à la lecture
d'un journal de bord avant de reprendre la barre d'un navire.
Où l'analogie casse : le charpentier et le navigateur disposent souvent d'un document ou
d'un carnet dédié à cet effet. Sur du code, ce carnet n'existe presque jamais sous forme
lisible : il faut le reconstruire à partir de traces indirectes (commits, tickets, noms de
variables) qui n'ont pas été écrites pour cet usage.

### Ce code étrange a eu une raison : trois contraintes disparues

Un design absurde aujourd'hui a presque toujours été une réponse sensée à une contrainte qui
a depuis disparu. Trois exemples fréquents :

```text
Exemple 1 : une limite de taille en dur ("max 200 lignes par export")
  Contrainte d'origine : le serveur d'export tournait avec 512 Mo de mémoire
  disponible, une limite d'infrastructure réelle il y a quatre ans.
  Contrainte aujourd'hui : le serveur dispose de 8 Go, la limite n'a plus de
  raison technique, mais personne ne l'a jamais retirée du code.

Exemple 2 : une synchronisation nocturne au lieu d'un appel en temps réel
  Contrainte d'origine : le partenaire de facturation externe facturait à
  l'appel, et un appel en temps réel à chaque commande aurait coûté cher.
  Contrainte aujourd'hui : le partenaire propose un forfait illimité depuis
  deux ans, la synchronisation nocturne reste pourtant l'unique mécanisme,
  causant un délai d'un jour sur des données qui pourraient être immédiates.

Exemple 3 : un champ "codePostal" limité à 5 caractères numériques
  Contrainte d'origine : le produit ne servait qu'un seul pays au lancement.
  Contrainte aujourd'hui : l'entreprise opère dans trois pays aux formats de
  code postal différents, le champ casse silencieusement pour deux marchés
  sur trois, alors que rien dans le code ne signale cette limite d'origine.
```

Dans les trois cas, le code n'est pas absurde : il est le fossile exact d'une contrainte
réelle, à une date réelle, pour un contexte qui a changé sans que le code suive.

### Demander de l'aide utile

Face à du code legacy incompréhensible, deux réactions courantes gaspillent du temps sans
faire avancer l'enquête : le mépris ("qui a écrit ça, c'est n'importe quoi") ferme la
discussion avant même de commencer, et la panique ("je ne comprends rien, je ne vais jamais
y arriver") empêche de formuler une question précise. Une demande d'aide utile suit un
gabarit en quatre parties, qui transforme une plainte vague en question exploitable par
quelqu'un d'autre en moins d'une minute de lecture :

```text
Ce que j'ai essayé :
  "J'ai cherché tous les appelants de computeTotal avec rg, j'ai lu l'historique
  git sur les deux dernières années, j'ai relancé le test existant en isolant
  le cas du client CLINIQUE_LYON_CENTRE."

Ce que j'observe :
  "Le if en dur ne correspond à aucun ticket que j'ai trouvé, et le test
  existant ne couvre pas ce cas précis : il passe avec ou sans le if."

Ce que je crois :
  "Je pense que ça vient d'une convention tarifaire spécifique à ce site,
  mais je n'ai aucune preuve écrite, seulement une hypothèse."

Ce que je demande :
  "Est-ce que quelqu'un sait si CLINIQUE_LYON_CENTRE a encore un régime de
  TVA particulier aujourd'hui, ou puis-je considérer que c'est de la dette ?"
```

Ce gabarit fonctionne parce qu'il montre le travail déjà fait (personne n'a besoin de refaire
l'enquête à ta place), isole précisément l'inconnue (la personne sollicitée sait exactement
sur quoi répondre), et évite les deux écueils symétriques : le mépris qui braque un legacy
en "code honteux à jeter" avant d'avoir compris sa raison d'être, et la panique qui fait
percevoir tout code ancien comme une menace impossible à démêler alors qu'une enquête
méthodique de trente minutes suffit souvent à la désamorcer.

### Grille rapide de décision face a un design suspect


```text
As-tu trouve le commit ou ticket d'origine ?
        |
       OUI --------------------------> NON
        |                                |
Contrainte encore active ?        As-tu quelqu'un a qui demander,
        |                          present depuis assez longtemps ?
     OUI -> NON                          |
      |      |                         OUI -> NON
Garder,   Supprimer avec               |      |
isoler    preuve ecrite            Demander,  Traiter comme actif,
proprement dans la PR              documenter proteger avec un test
                                    la reponse avant tout changement
```

## Compromis

| Option                                                                | Coût                                                                           | Bénéfice                                                                      | Quand choisir                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Supposer que tout code "moche" est de la dette à supprimer            | Risque de casser une contrainte encore active, souvent découvert en production | Rapide à décider                                                              | Jamais sans vérification préalable                           |
| Poser la question aux personnes encore présentes                      | Rapide si la mémoire existe                                                    | Fiable si la personne était là et se souvient bien                            | Toujours en première option si disponible                    |
| Reconstruire la contrainte par l'enquête (git, tickets, commentaires) | Plus long, demande de la méthode                                               | Fonctionne même si personne ne se souvient                                    | Cas général, surtout sur du code ancien sans mémoire vivante |
| Écrire un test de caractérisation avant de toucher au code douteux    | Coût d'écriture du test                                                        | Filet de sécurité qui révèle immédiatement si tu casses un comportement caché | Systématique dès que la contrainte reste incertaine          |

## Pièges classiques

- **Tu attribues à de l'incompétence ce qui est en fait une contrainte que tu ignores.**
  Symptôme : tu proposes une "simplification" en réunion et un ancien de l'équipe t'arrête
  en trente secondes avec une phrase que tu ne pouvais pas deviner sans enquêter.
- **Tu supprimes un `if` en dur sans vérifier s'il correspond à un client encore actif.**
  Symptôme : une facturation casse silencieusement pour un seul client, découverte des
  semaines plus tard à la clôture comptable.
- **Tu prends un commentaire ancien pour une vérité actuelle.** Symptôme : le commentaire dit
  "temporaire, à corriger après la migration" mais la migration a eu lieu il y a quatre ans
  et personne ne l'a jamais retiré : le commentaire ment par obsolescence, pas par malice.
- **Tu ne distingues pas contrainte légale et contrainte de confort d'équipe.** Symptôme :
  tu traites une préférence d'ancien développeur avec la même rigidité qu'une obligation
  fiscale, ce qui te fait rater des simplifications sûres.
- **Tu enquêtes seul indéfiniment au lieu de demander.** Symptôme : tu passes deux jours à
  reconstruire une contrainte qu'une question de trente secondes à la bonne personne aurait
  clarifiée immédiatement.

## Ce que tu dois savoir défendre

- Pourquoi un design qui semble mauvais peut être la trace d'une contrainte légitime
  disparue, et comment vérifier laquelle des deux situations tu as devant toi.
- Les quatre familles de contraintes externes et leur signature typique dans le code.
- Pourquoi un test de caractérisation est le bon réflexe quand tu ne peux pas trancher avec
  certitude si une contrainte est encore active.
