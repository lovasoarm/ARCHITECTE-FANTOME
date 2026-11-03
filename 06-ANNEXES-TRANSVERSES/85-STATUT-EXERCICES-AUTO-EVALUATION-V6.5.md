# 85 : Statut et retours des 26 exercices d’autoévaluation (V6.5)

> **Décision pédagogique :** les 26 pages recensées ci-dessous sont des exercices d’entraînement non certifiants. Elles sont réalisables sans enseignant et sans reviewer ; leur autoévaluation ne constitue toutefois ni un corrigé indépendant, ni une preuve de maîtrise, ni la fermeture d’une gate.

## 1. Périmètre exact

Cette annexe couvre les 26 pages qui déclarent explicitement ne pas fournir de corrigé ou de validateur indépendant. Elle ne prétend pas que les autres exercices possèdent tous un corrigé.

| Groupe                 | Nombre | Ce que l’apprenant produit                                                                              | Limite de correction                                                                                                                                                                          |
| ---------------------- | -----: | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Drills de code         |     25 | Un contrat `SPEC-DRILL.md`, une petite implémentation et un `learner-verifier.js` écrit par l’apprenant | Le contrat, le code et le vérificateur ont la même origine. Le vérificateur contrôle l’implémentation selon le contrat de l’apprenant ; il ne prouve pas que ce contrat est complet ou juste. |
| Cadrage de mini-projet |      1 | Un brief, ses hypothèses, ses exclusions, ses checkpoints et son critère d’acceptation                  | La forme est contrôlable ; la pertinence du cadrage et des hypothèses nécessite un jugement qui n’est pas fourni par la page.                                                                 |
| **Total**              | **26** |                                                                                                         | **Aucun corrigé/oracle indépendant livré dans ces 26 pages.**                                                                                                                                 |

## 2. Ce que l’exercice permet de déclarer

- Tu peux réaliser l’exercice, conserver les artefacts et exécuter tes propres contrôles sans attendre un reviewer.
- Tu peux déclarer `PRATIQUE  : AUTOÉVALUÉ` lorsque tu as réellement réalisé la tâche et consigné ce que tu as observé.
- Tu peux consigner un état `TESTED` dans le sens limité du registre 57 : une commande précise a été exécutée et son résultat brut est conservé. Cela ne certifie ni l’exactitude du contrat, ni la qualité générale, ni l’indépendance du test.
- Tu ne peux pas déclarer `REVIEWED` à partir de ta propre relecture, d’une case cochée ou d’une réponse d’IA.
- Aucune de ces 26 pages, prise isolément ou simplement cochée, ne ferme une gate de maîtrise ou de transfert. Son artefact peut alimenter un dossier de pratique ; la gate reste régie par le [registre de preuves](57-REGISTRE-PREUVES-ET-VALIDATION.md) et le [gate de maîtrise](67-GATE-MAITRISE-ET-CAPSTONE.md).

## 3. Limites propres aux deux catégories

### 25 drills de code

Les pages demandent généralement de rédiger le contrat avant l’implémentation, puis de produire un module et un vérificateur utilisant `node:assert/strict`. Les critères locaux peuvent constater la présence des livrables, la forme des cas, l’exécution sans erreur, le code de sortie et le marqueur attendu.

**Ce que cela ne démontre pas :** le vérificateur peut reproduire une hypothèse erronée du contrat ; il peut oublier un cas limite ; il peut passer alors que la compréhension du concept est fausse. Le succès de ce vérificateur est donc un signal d’auto-pratique, pas un oracle indépendant.

### 1 exercice de cadrage de mini-projet

La page `02-CONSTRUCTION/02-MINI-PROJECTS/97A-EXO-VERIFICATION.md` demande un brief limité, un objectif mesurable, des exclusions, des checkpoints, un test d’acceptation en langage naturel, un `HYPOTHESES.md` et un critère binaire préalablement défini.

La présence de ces éléments est vérifiable. Leur pertinence, leur cohérence et leur capacité à guider réellement une réalisation nécessitent une revue du raisonnement.

<a id="procedure-de-retour-fiable"></a>

## 4. Procédure de retour fiable

La procédure comporte deux voies. La première donne un retour indépendant lorsqu’une personne compétente est disponible. La seconde permet de continuer à apprendre seul, mais son résultat reste explicitement non indépendant.

### Voie A : revue humaine indépendante

**Qui peut reviewer ?** Un enseignant, mentor, développeur expérimenté sur le sujet ou pair réellement compétent. Un titre prestigieux n’est pas requis ; la personne doit pouvoir expliquer le concept sans reprendre simplement la solution de l’apprenant et justifier les comportements attendus. L’auteur de l’exercice ne peut pas se reviewer lui-même. Un modèle d’IA ou un outil automatique n’est jamais le reviewer indépendant.

**Préparer le dossier avant la revue :**

- Pour un drill de code : l’énoncé de l’exercice, la leçon canonique liée, `SPEC-DRILL.md`, le code, `learner-verifier.js`, la commande exacte et les sorties réelles.
- Pour le cadrage : l’énoncé, la leçon de référence, `BRIEF.md`, `HYPOTHESES.md`, les exclusions, les checkpoints et le critère d’acceptation écrit avant le brief.
- Dans les deux cas : la version/commit, la date et les questions précises auxquelles tu souhaites obtenir une réponse.

**Travail demandé au reviewer :**

1. Lire l’énoncé et la leçon de référence avant de conclure ; relever toute ambiguïté plutôt que d’inventer une réponse attendue.
2. Pour un drill de code, dériver ses propres cas à partir du contrat pédagogique et de la leçon, sans recopier le vérificateur de l’apprenant. Couvrir au minimum un cas nominal, un cas limite pertinent et un cas négatif ou d’échec ; si une catégorie ne s’applique pas, expliquer pourquoi et choisir un cas discriminant adapté. Exécuter ces cas avec un contrôle indépendant du `learner-verifier.js`.
3. Pour le brief de cadrage, reformuler indépendamment le besoin, vérifier que l’objectif est mesurable, que les exclusions et hypothèses sont explicites, que les checkpoints sont utiles et que le critère d’acceptation est observable. Construire au moins un scénario contradictoire ou une question de changement de contrainte qui révèle une omission possible.
4. Pour chaque constat, donner l’élément observé, le comportement attendu et la raison liée à l’énoncé ou à la leçon. Si le reviewer ne peut pas établir le comportement attendu, le constat est `NON CONCLUANT`, pas `PASS`.
5. Terminer par des actions concrètes : corriger le contrat, ajouter un cas, modifier l’implémentation, préciser une hypothèse ou refaire une mesure. Ne pas remplacer une explication par une note globale.

**Compte rendu à conserver** : créer `EXERCISE-REVIEW.md` à côté de l’artefact ou dans le dossier de preuves :

```yaml
exercise: "chemin/et-identifiant-de-la-page"
review:
  reviewer_role: "enseignant | mentor | pair compétent"
  competence_basis: "expérience ou réalisation pertinente, expliquée"
  date: "YYYY-MM-DD"
  conflict_of_interest: "aucun | détail"
  artifacts_version: "commit ou version examinée"
independent_checks:
  - criterion: "comportement ou exigence examiné"
    expected: "résultat attendu et justification"
    observed: "résultat réellement observé"
    verdict: "OK | ISSUE | NON_CONCLUANT"
findings:
  - severity: "bloquant | important | mineur"
    evidence: "entrée, sortie, passage ou fait observé"
    correction: "action concrète"
verdict: "ACCEPTABLE_DANS_L_EXERCICE | A_CORRIGER | NON_CONCLUANT"
learner_response:
  changes: []
  retest: "à renseigner après correction, sinon NOT RUN"
```

Un compte rendu rempli par l’apprenant sans revue effective reste une autoévaluation. L’état `REVIEWED` du registre 57 n’est déclaré que lorsqu’une autre personne a réellement examiné les artefacts et challengé le raisonnement ; le reviewer, sa compétence pertinente, la date, les questions, le verdict et les conflits d’intérêts sont consignés. Même une revue réelle ne transforme pas cette seule activité en gate de maîtrise.

### Demander, recevoir et exploiter un retour (facultatif)

Tu n’as pas besoin d’un reviewer pour commencer ou terminer la pratique ordinaire. Quand une personne compétente est disponible, demande un retour sur une question précise plutôt qu’un simple « est-ce que c’est bon ? ». Le modèle ci-dessous est facultatif : il aide à préparer l’échange, mais ne crée aucun livrable ou prérequis supplémentaire.

```markdown
## Demande de retour : exercice

- Exercice et leçon de référence :
- Version ou commit examiné :
- Ce que j’ai compris de l’objectif :
- Ce que j’ai réellement réalisé :
- Preuves disponibles (fichiers, commandes, sorties) :
- Question précise sur laquelle je bloque :
- Points que je n’ai pas vérifiés :
```

Pour qu’un retour soit exploitable, demande à la personne de distinguer : **le critère examiné**, **la base de son jugement** (énoncé, leçon ou source), **le fait observé**, **le comportement attendu** et **la prochaine action**. Un « tout est bon » sans critère ni élément examiné peut être encourageant, mais ne suffit pas à documenter une vérification.

Après réception du retour :

1. Reformule le constat avec tes propres mots. Si tu ne peux pas l’expliquer, demande une précision au lieu de modifier le travail à l’aveugle.
2. Sépare les points `À CORRIGER`, les `QUESTIONS` et les constats `NON CONCLUANTS`. Un désaccord doit être examiné à partir de l’énoncé, de la leçon ou d’une source pertinente ; ne tranche pas par vote ou par prestige du titre.
3. Pour chaque correction retenue, conserve une nouvelle version, note ce qui a changé et refais les contrôles concernés. Garde la commande et la sortie réellement obtenues ; indique `NOT RUN` lorsque le contrôle n’a pas été relancé.
4. Si le retour ne couvre qu’un critère, ne l’étends pas aux autres critères. Une appréciation positive limitée ne signifie pas que l’exercice entier, le contrat ou la compétence sont validés.

Un retour de pair, d’enseignant ou de mentor ne devient une revue indépendante que si la personne possède la compétence pertinente, examine les artefacts et réalise les contrôles indépendants décrits dans la voie A. Une réponse d’IA, un outil automatique ou ta propre relecture peut aider à trouver des questions ; cela ne permet jamais de déclarer `REVIEWED`.

### Voie B : auto-retour triangulé quand aucun reviewer n’est disponible

Tu peux utiliser cette voie immédiatement, sans attendre un enseignant ou un mentor. Elle ajoute plusieurs contrôles qui ne dépendent pas tous de ton implémentation initiale, mais **elle ne fabrique pas un oracle humain indépendant** et ne transforme jamais l'autoévaluation en certification.

1. **Reconstitue le contrat depuis la source.** Reprends l'énoncé et la leçon canonique. Pour chaque exigence, consigne : source précise, invariant attendu, entrée ou situation discriminante, résultat attendu et limite connue. Si la leçon ne permet pas de justifier un résultat, écris `INCERTAIN` ; n'invente pas un corrigé.
2. **Écris un cas de contrôle avant de relancer ton code.** Ajoute au moins un cas nouveau absent de `learner-verifier.js` et note son résultat attendu avant exécution. Privilégie un cas limite, négatif ou de changement de contexte.
3. **Construis une seconde représentation.** Pour un drill de code, décris le comportement en table entrée → sortie ou en pseudocode indépendant de ton implémentation, puis compare les deux sur les mêmes cas. Pour le brief de cadrage, formule une variante contradictoire (acteur, contrainte ou panne) et vérifie que le besoin, les exclusions et l'acceptation restent décidables. Cette seconde représentation réduit le risque de copier la même erreur de code ; elle n'est pas une preuve indépendante si tu en es toujours l'auteur.
4. **Teste la sensibilité du contrôle.** Dans une copie de travail, introduis une mutation volontaire qui devrait violer le contrat (condition inversée, limite décalée, fallback supprimé, autorisation omise, selon le sujet). Le contrôle doit échouer sur cette mutation. S'il passe encore, ton contrôle ne détecte pas cette classe de faute. Ne modifie pas l'original.
5. **Triangule avec une référence distincte quand le sujet en possède une.** Pour une règle de plateforme, de protocole ou de standard, consulte une source primaire indépendante de ton code (par exemple une spécification ou la documentation officielle indiquée par la leçon), note l'URL, la date et le point précis comparé. Pour un exercice de raisonnement métier sans référence normative, écris `AUCUNE_SOURCE_EXTERNE_NORMATIVE` ; ne cite pas une source décorative.
6. **Décide honnêtement.** Note `COHÉRENT AVEC LES SOURCES ET CAS TESTÉS`, `À CORRIGER` ou `NON CONCLUANT`, avec les éléments observés. Marque le compte rendu `AUTO_RETOUR_NON_INDEPENDANT` et conserve `PRATIQUE  : AUTOÉVALUÉ`. Le premier verdict décrit seulement les cas et sources réellement examinés : il ne signifie pas « solution certifiée ».
7. **Quand une personne compétente devient accessible**, transmets-lui le même dossier et applique la voie A. La revue humaine n'est pas requise pour poursuivre les exercices ordinaires ; elle reste nécessaire lorsque la gate visée exige explicitement une validation indépendante.

**Limite qu'il faut accepter :** sans reviewer compétent ni oracle établi indépendamment, tu peux réduire le risque d'erreur partagée, détecter des défauts sur les cas construits et documenter les incertitudes. Tu ne peux pas prouver seul que ton contrat couvre tout le problème. Le statut reste non indépendant et aucune gate de maîtrise ou de transfert ne se ferme sur cette seule base.

Une IA peut proposer des contre-exemples ou aider à préparer des questions. Ses propositions doivent être vérifiées contre l'énoncé et les sources ; cette aide reste assistée, non indépendante, et ne permet jamais de déclarer `REVIEWED`.

## 5. Règles d’utilisation dans les gates

1. Réaliser l’exercice et cocher les critères permet de déclarer `PRATIQUE  : AUTOÉVALUÉ` dans le contexte exact de l’exercice, pas `MAITRISE_DANS_LE_CONTEXTE` ni `TRANSFERT_VERIFIE`.
2. Une commande exécutée peut être consignée `TESTED` avec la commande, l’environnement, le code de sortie et la sortie réels. Cette étiquette décrit l’exécution observée, pas la validité indépendante du contrat ou du vérificateur.
3. Les artefacts de ces pages peuvent enrichir un dossier de pratique ; ils ne constituent jamais, à eux seuls, la preuve suffisante d’une gate de maîtrise ou de transfert.
4. `REVIEWED` exige une autre personne qui a réellement examiné les artefacts et challengé le raisonnement selon la voie A. Une auto-déclaration, une IA qui se note elle-même ou une case cochée ne remplace jamais cette revue.
5. La revue externe n’est pas obligatoire pour faire normalement ces exercices. Elle est nécessaire uniquement lorsqu’une gate choisie exige explicitement une revue ou une validation indépendante.
6. Une correction demandée par le reviewer doit être suivie d’une nouvelle version et d’un nouveau contrôle. Un constat `NON CONCLUANT` reste ouvert ; il ne devient pas positif par absence d’erreur visible.

## 6. Inventaire exhaustif des 26 pages

### 25 drills de code

- [00-SOCLE/05-PROBLEM-SOLVING/98-EXO-VERIFICATION.md](../00-SOCLE/05-PROBLEM-SOLVING/98-EXO-VERIFICATION.md)
- [01-CADRAGE/02-ASYNC/98-EXO-VERIFICATION.md](../01-CADRAGE/02-ASYNC/98-EXO-VERIFICATION.md)
- [01-CADRAGE/03-DEBUGGING/97-EXO-VERIFICATION.md](../01-CADRAGE/03-DEBUGGING/97-EXO-VERIFICATION.md)
- [01-CADRAGE/04-ERROR-HANDLING/98-EXO-VERIFICATION.md](../01-CADRAGE/04-ERROR-HANDLING/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/03-TESTING/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/03-TESTING/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/04-MATH-BASICS/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/04-MATH-BASICS/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/05-MEMORY-PERFORMANCE/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/06-DATA-STRUCTURES/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/06-DATA-STRUCTURES/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/07-ALGORITHMS/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/07-ALGORITHMS/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/09-FUNCTIONAL-JS/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/09-FUNCTIONAL-JS/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/10-DESIGN-PATTERNS/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/10-DESIGN-PATTERNS/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/11-REFACTORING/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/11-REFACTORING/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/12-TYPESCRIPT/98-EXO-VERIFICATION.md](../02-CONSTRUCTION/12-TYPESCRIPT/98-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/13-RUNTIME-ENV/97-EXO-VERIFICATION.md](../02-CONSTRUCTION/13-RUNTIME-ENV/97-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/97-EXO-VERIFICATION.md](../02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/97-EXO-VERIFICATION.md)
- [02-CONSTRUCTION/17-OOP-JS/97-EXO-VERIFICATION.md](../02-CONSTRUCTION/17-OOP-JS/97-EXO-VERIFICATION.md)
- [03-PILOTAGE/02-WEB-INCLUSIVE/97-EXO-VERIFICATION.md](../03-PILOTAGE/02-WEB-INCLUSIVE/97-EXO-VERIFICATION.md)
- [03-PILOTAGE/04-SECURITY/12A-EXO-VERIFICATION.md](../03-PILOTAGE/04-SECURITY/12A-EXO-VERIFICATION.md)
- [03-PILOTAGE/04-SECURITY/97-EXO-VERIFICATION.md](../03-PILOTAGE/04-SECURITY/97-EXO-VERIFICATION.md)
- [03-PILOTAGE/05-OBSERVABILITY/97-EXO-VERIFICATION.md](../03-PILOTAGE/05-OBSERVABILITY/97-EXO-VERIFICATION.md)
- [03-PILOTAGE/10-TEAM-CRAFT/98-EXO-VERIFICATION.md](../03-PILOTAGE/10-TEAM-CRAFT/98-EXO-VERIFICATION.md)
- [04-EPREUVE/03-REALTIME/97-EXO-VERIFICATION.md](../04-EPREUVE/03-REALTIME/97-EXO-VERIFICATION.md)
- [05-MAITRISE/03-EDGE-CASES/97-EXO-VERIFICATION.md](../05-MAITRISE/03-EDGE-CASES/97-EXO-VERIFICATION.md)
- [05-MAITRISE/06-ANNEXES/97-EXO-VERIFICATION.md](../05-MAITRISE/06-ANNEXES/97-EXO-VERIFICATION.md)
- [05-MAITRISE/07-TOOLS/97-EXO-VERIFICATION.md](../05-MAITRISE/07-TOOLS/97-EXO-VERIFICATION.md)

### 1 exercice de cadrage

- [02-CONSTRUCTION/02-MINI-PROJECTS/97A-EXO-VERIFICATION.md](../02-CONSTRUCTION/02-MINI-PROJECTS/97A-EXO-VERIFICATION.md)

## 7. Convention de statut à conserver

- **Autoévaluation** : l’apprenant examine son propre travail selon les critères visibles de la page.
- **Critères objectifs** : éléments observables ou exécutables ; leur présence ne prouve pas que l’oracle est indépendant.
- **Corrigé/oracle indépendant** : solution ou cas de contrôle établi indépendamment de l’implémentation et du vérificateur de l’apprenant ; absent des 26 pages recensées.
- **Auto-retour guidé** : boucle de vérification personnelle décrite dans la voie B ; utile pour progresser, mais non indépendante.
- **Revue indépendante** : examen réel par une personne compétente selon la voie A, documenté dans `EXERCISE-REVIEW.md`.
- **Revue nécessaire** : déclenchée par l’utilisation de la preuve dans une gate qui l’exige, jamais par le simple fait de pratiquer.

**Dénominateur contrôlé : 25 drills de code + 1 exercice de cadrage = 26 pages distinctes.** Toute nouvelle page qui annonce l’absence de correction indépendante doit être ajoutée à cet inventaire et renvoyer vers cette procédure.
