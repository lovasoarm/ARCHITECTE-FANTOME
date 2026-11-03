---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 04 FIRST CLICK REPLAY : le seul test qui prouve que le "nul" n'est pas perdu

Temps de lecture ~4 min. Temps de mise en oeuvre : 30 min chrono + 20 min debrief.

> Toutes les autres verifications (linters, tables des matieres, tests) sont
> internes au projet. Elles peuvent mentir : un curriculum peut etre
> parfaitement coherent pour son auteur et opaque pour un debutant. Le seul
> test qui rend visible ce trou-la, c'est de filmer un vrai nouveau venu qui
> ouvre le repo froid et suit `01-START_HERE.md`. On mesure ses hesitations, pas
> ses reussites.

## POURQUOI CE PROTOCOLE EXISTE

Le curriculum est ecrit par quelqu'un qui connait deja la reponse. Le
debutant, non. La question centrale du projet (« un nul sera-t-il perdu au
premier click ? ») ne peut se trancher qu'empiriquement, avec un vrai humain
qui ne triche pas. Sans ce drill, la reponse reste une opinion.

## PROTOCOLE (30 min chrono)

### Casting

- Un **debutant reel** : sait allumer un ordi, sait ce qu'est un terminal en
  theorie, n'a **jamais** installe Node, n'a **jamais** ouvert ce parcours.
- Pas ton pote dev. Pas un ex-etudiant en info. Un vrai nul.
- Consentement ecrit pour l'enregistrement (voir modele plus bas).

### Poste de travail

- Machine fraiche ou VM vierge (pas d'IDE preconfigure, pas de Node deja
  installe, pas d'autocompletion sur les fichiers `.md`).
- Ecran + audio enregistres (OBS suffit). Le curseur doit etre visible.
- Le sujet parle en continu, meme quand il hesite : la voix off est la
  donnee principale.

### Consignes au sujet (exactes)

1. « Tu ouvres le dossier du parcours. »
2. « Tu decides toi-meme quel fichier lire en premier. »
3. « Tu suis ce fichier a la lettre pendant 30 min. Si tu bloques plus de
   5 secondes, tu le dis a voix haute, tu essaies pareil, tu continues. »
4. Aucune aide, aucune reformulation, aucun regard complice. Tu observes,
   tu chronometres, tu te tais.

### Grille de mesure

Chaque **hesitation superieure a 5 secondes** est un signal a corriger.
Note-la, minutee, dans `first_click_log.md` :

```text
mm:ss | localisation (fichier + ligne / paragraphe) | ce que le sujet
       | cherchait sans trouver | hypothese de correction
```

Trois seuils :

- **0 a 2 hesitations** en 30 min : le premier click est propre. Livrable
  atteint.
- **3 a 5** : zones grises identifiees, correction locale suffit.
- **6 et plus** : re-ecrire `01-START_HERE.md` et/ou `README.md` avant de
  refaire un test. On ne rafistole pas, on repense.

### Fin du drill

A 30:00 chrono exact, arret. Meme si le sujet est en pleine action. Le
protocole ne mesure pas la vitesse d'apprentissage : il mesure ou le
curriculum trahit sa promesse.

## DEBRIEF (20 min)

- Reecoute avec le sujet. Il commente ses hesitations en direct.
- Toi, tu ne te justifies pas. Tu ecris. Un log honnete est un log qui
  contient des phrases genre : « je ne comprends pas pourquoi il me
  demande d'ouvrir ce fichier, je n'ai jamais entendu parler de `.nvmrc` ».
- Chaque hesitation retenue produit une **entree correctionnelle** :
  fichier, ligne, correction proposee, verif que la correction n'introduit
  pas un autre trou.

## LIVRABLES

- `first_click_log.md` (horodate, brut).
- `first_click_diff.md` : la liste des corrections appliquees suite au
  drill, avec commit hash.
- Rappel : le drill se rejoue apres chaque refonte majeure du parcours de
  demarrage (`01-START_HERE.md`, `README.md`, `00-SOCLE/01-GETTING-STARTED/`).

## MODELE DE CONSENTEMENT (a coller dans le log)

```text
Je, {prenom nom}, accepte d'etre enregistre (ecran + audio) pendant
30 minutes pour tester la clarte du parcours de demarrage ce parcours.
L'enregistrement ne sera pas publie sans mon accord ecrit ulterieur.
Signe le {date}.
```

## POURQUOI CE FICHIER EST BLOQUANT

Aucun autre test interne au repo ne peut prouver que le premier click
n'est pas cassant. Ce protocole est volontairement une verification humaine,
chere mais honnete, plutot qu'un script automatique et opaque. Si tu ne l'executes
jamais, la question « un nul est-il perdu ? » reste sans reponse, et
« 10/10 » reste une opinion, pas une preuve.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « 04 FIRST CLICK REPLAY : le seul test qui prouve que le "nul" n'est pas perdu » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:portfolio -->

## Repère visuel utile : Dossier de preuve examinable

```text
problème -> rôle -> artefact
                   |
                   v
             commande reproductible
                   |
                   v
             résultat + limites
                   |
                   v
             revue / objection
                   |
                   v
             preuve renforcée ou claim retiré
```

<!-- AF-LESSON-PROFILE: portfolio -->

## Repères de décision

- **Pourquoi :** Un portfolio crédible relie compétence, artefact, décision et résultat sans transformer une simulation en expérience réelle.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour montrer ton travail à un reviewer, entretien ou équipe. Mets en avant une preuve profonde plutôt qu'une collection de technologies.
- **Limites :** Un portfolio personnel ne démontre pas à lui seul influence organisationnelle ou impact production. Respecte confidentialité, licences et données non publiques.

## Mécanisme : la version sans magie

Présente le problème, ton rôle, les contraintes, les choix, le code/tests, la mesure, les limites et ce qui a changé après feedback.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **04 FIRST CLICK REPLAY : le seul test qui prouve que le "nul" n'est pas perdu** se rattache à ce cas concret : Les tranches Kintana peuvent servir de cas d'étude LAB ; les contributions externes ou travaux en entreprise doivent être séparés et attestés selon les faits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dossier de preuve examinable

> **Arc Arène Staff :** ton portfolio n'est pas une vitrine de captures. C'est un dossier que quelqu'un peut examiner, contredire et reproduire.

**Mission liée à « 04 FIRST CLICK REPLAY : le seul test qui prouve que le "nul" n'est pas perdu » :** Transforme une tranche Kintana en dossier de portfolio. Donne accès au commit, aux commandes reproductibles, aux tests, à l'ADR et aux limites. Fais une revue par un pair si possible ; sinon note `EXTERNAL_REVIEW: NOT RUN`.

**Livrable :** une étude de cas courte, liens d'artefacts, résultat de tests, décisions et registre des limites.

**Critères d’acceptation :** ton rôle est précis ; les faits sont datés ; les résultats LAB/PILOT/PRODUCTION sont séparés ; les chiffres sont reproductibles ; aucune contribution d'équipe n'est revendiquée comme individuelle.

**Transfert obligatoire :** Un reviewer conteste une mesure ou un choix. Ajoute la preuve qui manque ou retire la revendication au lieu de défendre un chiffre fragile.
