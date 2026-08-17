---
stability: intemporel
acte: appliquer
---

# 04 FIRST CLICK REPLAY : le seul test qui prouve que le "nul" n'est pas perdu

Temps de lecture ~4 min. Temps de mise en oeuvre : 30 min chrono + 20 min débrief.

> Toutes les autres vérifications (linters, tables des matières, tests) sont
> internes au projet. Elles peuvent mentir : un curriculum peut être
> parfaitement cohérent pour son auteur et opaque pour un débutant. Le seul
> test qui rend visible ce trou-la, c'est de filmer un vrai nouveau venu qui
> ouvre le repo froid et suit `START_HERE.md`. On mesure ses hésitations, pas
> ses réussites.

## POURQUOI CE PROTOCOLE EXISTE

Le curriculum est écrit par quelqu'un qui connaît déjà la réponse. Le
débutant, non. La question centrale du projet (« un nul sera-t-il perdu au
premier click ? ») ne peut se trancher qu'empiriquement, avec un vrai humain
qui ne triche pas. Sans ce drill, la réponse reste une opinion.

## PROTOCOLE (30 min chrono)

### Casting

- Un **débutant réel** : sait allumer un ordi, sait ce qu'est un terminal en
  théorie, n'a **jamais** installé Node, n'a **jamais** ouvert MyFunnyJS.
- Pas ton pote dev. Pas un ex-étudiant en info. Un vrai nul.
- Consentement écrit pour l'enregistrement (voir modèle plus bas).

### Poste de travail

- Machine fraîche ou VM vierge (pas d'IDE préconfiguré, pas de Node déjà
  installé, pas d'autocompletion sur les fichiers `.md`).
- Écran + audio enregistrés (OBS suffit). Le curseur doit être visible.
- Le sujet parle en continu, même quand il hésite : la voix off est la
  donnée principale.

### Consignes au sujet (exactes)

1. « Tu ouvres le dossier `myFunnyJS`. »
2. « Tu décides toi-même quel fichier lire en premier. »
3. « Tu suis ce fichier a la lettre pendant 30 min. Si tu bloqués plus de
   5 secondes, tu le dis a voix haute, tu essaies pareil, tu continues. »
4. Aucune aide, aucune reformulation, aucun regard complice. Tu observés,
   tu chronomètres, tu te tais.

### Grille de mesure

Chaque **hésitation supérieure a 5 secondes** est un signal a corriger.
Note-la, minutée, dans `first_click_log.md` :

```
mm:ss | localisation (fichier + ligne / paragraphe) | ce que le sujet
       | cherchait sans trouver | hypothese de correction
```

Trois seuils :

- **0 a 2 hésitations** en 30 min : le premier click est propre. Livrable
  atteint.
- **3 a 5** : zones grises identifiées, correction locale suffit.
- **6 et plus** : re-écrire `START_HERE.md` et/ou `README.md` avant de
  refaire un test. On ne rafistole pas, on repense.

### Fin du drill

A 30:00 chrono exact, arrêt. Même si le sujet est en pleine action. Le
protocole ne mesure pas la vitesse d'apprentissage : il mesure ou le
curriculum trahit sa promesse.

## Débrief (20 min)

- Réécoute avec le sujet. Il commente ses hésitations en direct.
- Toi, tu ne te justifiés pas. Tu écris. Un log honnête est un log qui
  contient des phrases genre : « je ne comprends pas pourquoi il me
  demande d'ouvrir ce fichier, je n'ai jamais entendu parler de `.nvmrc` ».
- Chaque hésitation retenue produit une **entrée correctionnelle** :
  fichier, ligne, correction proposée, vérif que la correction n'introduit
  pas un autre trou.

## LIVRABLES

- `first_click_log.md` (horodaté, brut).
- `first_click_diff.md` : la liste des corrections appliquées suite au
  drill, avec commit hash.
- Rappel : le drill se rejoué après chaque refonte majeure du parcours de
  démarrage (`START_HERE.md`, `README.md`, `00-SOCLE/01_getting_started/`).

## Modèle DE CONSENTEMENT (a coller dans le log)

```
Je, {prenom nom}, accepte d'etre enregistre (ecran + audio) pendant
30 minutes pour tester la clarte du parcours de demarrage MyFunnyJS.
L'enregistrement ne sera pas publie sans mon accord ecrit ulterieur.
Signe le {date}.
```

## POURQUOI CE FICHIER EST BLOQUANT

Aucun autre test interne au repo ne peut prouver que le premier click
n'est pas cassant. Ce protocole est la contrepartie de la suppression du
dossier `.internal/` : on troque une vérification automatique et opaque
contre une vérification humaine, chère mais honnête. Si tu ne l'exécutés
jamais, la question « un nul est-il perdu ? » reste sans réponse, et
« 10/10 » reste une opinion, pas une preuve.
