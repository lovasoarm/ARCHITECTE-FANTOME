---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Plateau playbook

Temps de lecture ~3 min

-> ~5 min pour lire, 1 h à jouer quand tu es coincé

Compétence visée : diagnostiquer un plateau et redémarrer, au lieu d'abandonner. La stagnation est un signal, pas une sentence.

**Seuil unique (identique dans `01-START_HERE.md`)** : 2 jours sans progrès = tu commences à surveiller ; 7 jours = tu déclenches ce playbook. Ne joue pas avec ces deux chiffres, ils sont calibrés.

## LE PROBLÈME QU'ON RÈGLE

Tu es sur ce parcours depuis 3 mois. Depuis 15 jours, tu as l'impression de patauger : les exercices te prennent le double du temps prévu, tu n'as pas fini un module, tu doutes de tout. C'est le plateau. Il est normal. Il est **méthodiquement franchissable**.

## ARBRE DE DÉCISION (à jouer dans l'ordre)

### Question 1 : "As-tu réellement fait le `00-PREREQUIS.md` du module courant ?"

- **Non** : reviens-y. 80% des plateaux viennent d'un prérequis manqué. Fin.
- **Oui, il passe** : question 2.
- **Oui, il coince** : reviens 1-2 modules en arrière. Refais le `00-PREREQUIS.md` de là. Fin.

### Question 2 : "Est-ce un plateau de LECTURE ou de PRATIQUE ?"

- **Lecture** (je ne comprends plus les textes) : fais un `EXO_LECTURE.md` sur un module que tu maîtrisais bien il y a 1 mois. Tu vérifies si le muscle est là. Si oui : c'est le sujet actuel qui coince, pas toi. Si non : recale les 3 modules précédents (2 h chacun, pas plus). Fin.
- **Pratique** (je comprends mais je n'arrive pas à coder) : question 3.

### Question 3 : "Est-ce un plateau de DEBUG ou de CONCEPTION ?"

- **Debug** (mon code plante et je tourne en rond) : ouvre `../../../01-CADRAGE/03-DEBUGGING/16-HYPOTHESES_TEMPLATE.md` et remplis-le au propre. Interdiction absolue de coder tant que le template n'est pas rempli sur 3 hypothèses. Souvent, la 2e hypothèse t'aura débloqué avant même de coder ; traite cela comme une heuristique, pas comme une statistique universelle. Fin.
- **Conception** (je ne sais pas par où commencer) : ouvre `../../../00-SOCLE/05-PROBLEM-SOLVING/05-choose_an_approach.md`, applique Polya, découpe en 5 sous-problèmes. Attaque le plus petit. Fin.

### Question 4 : "As-tu réduit tes sessions à < 30 min sur 3 jours de suite ?"

Si oui : c'est de la fatigue déguisée en plateau. Une semaine off. Vraiment off, pas "je regarde une vidéo React". Fin.

### Question 5 : "As-tu essayé d'expliquer ton blocage à voix haute pendant 3 minutes ?"

- **Non** : fais-le. Enregistre-toi. Réécoute. Le blocage se nomme souvent tout seul. Fin.
- **Oui, ça n'a rien donné** : ouvre un `EXO_VERIFICATION.md` du module courant. Demande à l'IA de te poser 3 questions socratiques sur ton blocage : pas de te donner la réponse. Cf `node learner-verifier.js` (auto-verif ecrite par toi). Fin.

### Question 6 : "Coupe l'IA 48 h"

Tag `[JEUNE IA]` sur ta session : plus de copilote, plus d'auto-complétion agressive, plus de "explique-moi ça". Reforme le raisonnement à la main pendant 48 h. Un plateau vient très souvent d'une IA qui souffle les réponses et émousse le réflexe. Si au bout de 48 h le blocage a bougé (même partiellement), la cause était là. Fin.

## MÉTHODE COMPLÉMENTAIRE : LE JOURNAL PLATEAU

Ouvre un fichier `PLATEAU_JOURNAL.md` à côté de ton `_spaced_repetition.md`. Une ligne par jour de plateau :

```text
2026-08-14 | Module en cours : 02-CONSTRUCTION/10-DESIGN-PATTERNS | Blocage : Strategy vs State | Action : EXO_LECTURE sur 02-CONSTRUCTION/10-DESIGN-PATTERNS/03_behavioral/state_pattern.md
```

Après 5 lignes, tu vois le pattern. Un plateau qui dure > 10 jours sans que la ligne change de rubrique = signal fort qu'il faut reculer de 2 modules.

## CE QUE TU NE FAIS PAS

- Tu ne changes pas de curriculum. Tu ne cherches pas "un meilleur cours". Le suivant aura le même plateau, à la même position.
- Tu ne demandes pas la solution à une IA. Tu demandes des **questions**, pas des **réponses**.
- Tu ne passes pas au module suivant en te disant "je reviendrai". Tu ne reviens jamais.

## QUAND ARRÊTER LE PLAYBOOK

Si après 3 jours de méthode, tu n'as pas progressé d'un cran (un `00-PREREQUIS.md` passé, une hypothèse validée, un EXO_LECTURE bouclé), il y a une raison réelle : soit un module de fond te manque (recule de 2), soit un contexte externe est en cause (sommeil, charge mentale hors curriculum). Adresse le contexte avant de reprendre.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

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

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Plateau playbook** se rattache à ce cas concret : Les tranches Kintana peuvent servir de cas d'étude LAB ; les contributions externes ou travaux en entreprise doivent être séparés et attestés selon les faits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dossier de preuve examinable

> **Arc Arène Staff :** ton portfolio n'est pas une vitrine de captures. C'est un dossier que quelqu'un peut examiner, contredire et reproduire.

**Mission liée à « Plateau playbook » :** Transforme une tranche Kintana en dossier de portfolio. Donne accès au commit, aux commandes reproductibles, aux tests, à l'ADR et aux limites. Fais une revue par un pair si possible ; sinon note `EXTERNAL_REVIEW: NOT RUN`.

**Livrable :** une étude de cas courte, liens d'artefacts, résultat de tests, décisions et registre des limites.

**Critères d’acceptation :** ton rôle est précis ; les faits sont datés ; les résultats LAB/PILOT/PRODUCTION sont séparés ; les chiffres sont reproductibles ; aucune contribution d'équipe n'est revendiquée comme individuelle.

**Transfert obligatoire :** Un reviewer conteste une mesure ou un choix. Ajoute la preuve qui manque ou retire la revendication au lieu de défendre un chiffre fragile.
