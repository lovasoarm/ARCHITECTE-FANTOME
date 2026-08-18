---
stability: intemporel
acte: appliquer
---
> **Document historique d'avant fusion.** Les chiffres qu'il cite decrivent MyFunnyJS ou ProjectFunny seul. La carte vivante est [00-SOCLE/02-PROLOGUE/03-the-map.md](../../../00-SOCLE/02-PROLOGUE/03-the-map.md).


# START HERE

-> ~5 min de lecture, puis 10 minutes d'actions concrètes.

> **Tu es débutant, tu ne sais pas par ou commencer, tu as peur de te perdre.**
> C'est exactement pour toi que ce fichier existe. Lis les 3 actions dans les
> 10 prochaines minutes, exécute-les, puis reviens lire le reste. Le reste
> est du contexte, pas de l'obstacle.

## TES 3 ACTIONS DANS LES 10 PROCHAINES MINUTES

1. **Vérifie Node** dans un terminal : `node -v`. Règle officielle : **Node >= 22 recommande (voir `.nvmrc` = v22, fichier pédagogique visible), tout code du curriculum doit tourner aussi sur Node 20 LTS**. Detail : [`NODE_VERSION.md`](../../../06-ANNEXES-TRANSVERSES/02-NODE_VERSION.md). Sinon, ouvre `00-SOCLE/01_getting_started/01_install.md` et reviens ici.
2. **Tape tes 3 premières lignes de JS maintenant** (minute 2, pas minute 8) :

   ```bash
   mkdir day_one && cd day_one
   echo 'console.log(1 + 1)' > hello.js
   node hello.js
   ```

   Attendu : `2`. Si tu vois autre chose, tu viens de faire ton premier bug : note-le dans un carnet, pas dans ta tête. Le contexte complet et la suite (`casse volontairement`, `repare`, TDD_JOURNAL) sont dans [`00-SOCLE/01_getting_started/02_day_one.md`](../../../00-SOCLE/01_getting_started/02_day_one.md).

3. **Crée** un fichier vide `PLATEAU_JOURNAL.md` à côté de ce `START_HERE.md`. Tu ne l'ouvriras pas aujourd'hui. Seuil unique : **2 jours sans progrès -> tu commences à surveiller ; 7 jours -> tu déclenches** `05-MAITRISE/06_annexes/16_career/03_plateau_playbook.md`.

> **Rétention** : dès que tu termines un module, ouvre [`00-SOCLE/03_referentiel/07_repetition_espacee.md`](../../../00-SOCLE/03_referentiel/07_repetition_espacee.md) et programme tes 4 rappels (J+1 / J+7 / J+21 / J+60). Sans ça, tu oublies au rythme habituel : 70 % en 24 h.

C'est tout pour les 10 prochaines minutes. Le reste de ce fichier est le contexte.

---

## AUDIT AUTO-REPRODUCTIBLE (visible côté apprenant)

Deux scripts sont dans `.internal/scripts/`, tu peux les lancer depuis la racine du repo toi-même à tout moment :

- `bash .internal/scripts/check_all.sh` : compte les modules, valide les liens internes, vérifie la
  structure des mini-projets, délégué la gate sécurité et rejoué les tests
  des scénarios de debug. Sortie binaire : `OK` ou `N categories en echec`.
- `bash .internal/scripts/check_security_gate.sh` : prouve que la `SECURITY_GATE.md` de chaque
  mini-projet est *remplie* (au moins une case `[x]`, aucun `TODO` restant),
  pas juste présente. Utilise-le comme critère binaire de passage.

Tu dois pouvoir refaire l'audit du repo sans moi. C'est la promesse du curriculum.

---

## SI TU ES SUPER Débutant (jamais installé Node)

Commence par [`00-SOCLE/01_getting_started/01_install.md`](../../../00-SOCLE/01_getting_started/01_install.md) pour installer Node, Git et ton terminal. Reviens ici après.

**Temps total estimé du curriculum** : ~250 h étalées sur 6 à 9 mois. Fractionné : 1 h/jour battra 8 h le samedi.

---

## TON PARCOURS EN UNE IMAGE (l'arrivée des le départ)

Tu dois savoir ou tu vas. Voici le chemin entier, du "je n'ai jamais installé Node"
jusqu'à "je maîtrise tout MyFunnyJS" :

```
[Aujourd'hui : tu es ici]
       |
       v
[00-SOCLE/01_getting_started]  <- installer Node/Git/terminal, ecrire 3 lignes de JS
       |
       v
[00-SOCLE/03_referentiel]      <- comprendre les 6 pierres et t'auto-diagnostiquer
       |
       v
[01 -> 07]  Fundamentals / Problem Solving / Async / Debug / Errors / Testing / Math
       |    (+ mini-projets 01 à 05 dès que tu finis le module 07)
       v
[08 -> 13]  Memory / Data Structures / Algos / Functional / Patterns / Refactoring
       |    (+ mini-projets 06 à 10)
       v
[14 -> 22]  TypeScript / Runtime / Architecture / Web / OOP / a11y / Realtime / API / Security
       |    (+ CHECKPOINT BLOQUANT après 14 : crosslang challenge, voir plus bas)
       |    (+ mini-projets 11 à 14)
       v
[23 -> 29]  AI-Native / Databases / Scale / Observability / Team / Edge Cases / AI Agents
       |    (+ mini-projets 15 à 18 ; drill trimestriel: 05-MAITRISE/06_annexes/16_career/05_ai_famine_drill.md)
       v
[05-MAITRISE/06_annexes] Career / Interview / Portfolio / Ethics
       |
       v
[Diplome MyFunnyJS] <- tu es diplome quand :
                       1. Les 32 modules ont un POSTMORTEM personnel
                       2. Les 18 mini-projets sont livres avec gate OWASP OK
                       3. Le crosslang challenge est passe (Pierre 6 prouvee)
                       4. Un "first click replay" (05-MAITRISE/06_annexes/16_career/04_...)
                          a été filmé avec un vrai débutant : 0 à 2 hésitations
                       5. Ton DEPENDENCY_LEDGER.md tient depuis 3 mois avec
                          un ratio lecture/ecriture >= 2x et dependance IA < 25%
```

Tu ne comprends pas encore chaque étape. Normal. Tu vois la ligne d'arrivée.
Ca suffit pour partir.

---

## QUAND ES-TU "Diplôme" DE MYFUNNYJS ?

Question légitime, réponse binaire (les 5 conditions ci-dessus). Aucune n'est
optionnelle. Tu peux être à 4/5 pendant des mois : ça veut dire que tu progresses,
pas que tu es arrivé. Le diplôme n'est pas remis par le repo. Il se déclaré
soi-même, et se défend à l'oral (voir `05-MAITRISE/06_annexes/19_interview/03_objection_storm.md`).

---

## QUELS FICHIERS FONT QUOI (la carte)

| Fichier / dossier                                        | Ce que ça fait                                                                           | Quand y aller                |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------- |
| `START_HERE.md`                                          | Tu es ici. Point d'entrée unique.                                                        | Maintenant.                  |
| `README.md`                                              | Roadmap condensée des 32 modules.                                                        | Après `02_day_one.md`.       |
| `.nvmrc`                                                 | Version de Node de référence (20 LTS).                                                   | Lu par `nvm`, pas par toi.   |
| `00-SOCLE/01_getting_started/`                                    | Installer, écrire ton premier code.                                                      | Jour 1.                      |
| `00-SOCLE/03_referentiel/`                                        | Les 6 pierres, auto-diagnostic, ledger.                                                  | Jour 2.                      |
| `01_...` à `29_...`                                      | Les 32 modules de fond.                                                                  | Dans l'ordre.                |
| `02-CONSTRUCTION/02_mini_projects/`                                      | 18 projets (drill trimestriel IA en panne : 05-Maîtrise/06_annexes/16_career/05_ai_famine_drill.md). | Au fil du parcours.          |
| `05-MAITRISE/06_annexes/`                                            | Carrière, interview, portfolio, éthique.                                                 | Quand tu es prêt à défendre. |
| `05-MAITRISE/07_tools/`                                              | Outillage complémentaire.                                                                | Au besoin.                   |
| `PLATEAU_JOURNAL.md` (a toi de créer)                    | Ton journal de blocage.                                                                  | Après 2 jours sans progrès.  |
| `DEPENDENCY_LEDGER.md` (a toi de créer dans tes projets) | Mesure ta dépendance IA + ratio lecture/écriture.                                        | Chaque fin de semaine.       |

## SCRIPTS ET FICHIERS Exécutables : CE QU'ILS FONT

- `node solution.js` (auto-vérif écrite par toi) : dans chaque `EXO_JEUNE_IA.md`,
  tu écris toi-même le critère binaire de réussite. Pas de moteur cache.
- `node --test` : lanceur de tests natif Node 22 utilisé partout dans les mini-projets.
- `npm audit --json > /tmp/audit.json` : scan de vulnérabilités, commité dans `SECURITY.md`.
- `crosslang_compare.sh` : compare ta sortie JS et ta sortie dans un autre langage
  (voir `05-MAITRISE/06_annexes/16_career/01_crosslang_challenge.md`).
- `SPEC_DRIFT_MODE=on` : variable d'env qui active les triggers de spec changeante
  dans les mini-projets (voir `SPEC_DRIFT_TRIGGERS.md` de chaque projet).

---

## COMMENT T'EXERCER (le rythme)

- **Chaque jour** : 1 h minimum. 1 h/jour bat 8 h le samedi.
- **Chaque fichier** : lis en entier avant de coder. La leçon est dans le texte.
- **Chaque module** : finis un `EXO_JEUNE_IA.md` avant de passer au suivant.
- **Chaque semaine** : une entrée dans ton `DEPENDENCY_LEDGER.md` personnel.
- **Chaque mini-projet** : POSTMORTEM signe + gate OWASP validée + un OBJECTION_STORM
  par ADR.
- **Chaque trimestre** : un drill `05-MAITRISE/06_annexes/16_career/05_ai_famine_drill.md` (reconstruire un module sans IA).

---

## COMMENT NAVIGUER (conventions de noms)

- `00_*` : leçon d'entrée d'un module (le "why").
- `_recall_*.md` / `_spaced_repetition.md` : trackers vivants, tu les remplis toi-même.
- `MAJ.md` en majuscules (README, CHANGELOG, CONTRIBUTING) : docs racine.
- `-> ~XX min` en tête de chaque fichier : budget-temps lecture + exercice.

---

## FILET DE Sécurité (le "moteur manuel")

Chaque `EXO_JEUNE_IA.md` te demande d'écrire toi-même le critère binaire de
réussite : une commande `node solution.js`, une sortie attendue exacte. **Pas
de moteur cache.** Tu comprends ce que tu vérifies. C'est la contrepartie
assumée de la suppression du dossier `.internal/` : un peu plus de discipline
demandée, un peu moins de boite noire subie. Plus formateur, plus honnête.
Utile quand tu doutes d'un chapitre. Pas au démarrage.

---

## BIENVENUE

Ce fichier fait moins de 200 lignes. C'est fait exprès. Tu vois déjà la ligne
d'arrivée, tu connais la carte, tu sais ce qui t'attend. Tu ne peux plus dire
"je me suis perdu au premier click". Si tu te perds quand même : le `first
click replay` (`05-MAITRISE/06_annexes/16_career/04_first_click_replay.md`) sert exactement
a corriger cette trahison-la.

---

## CE QU'IL TE FAUT SUR TA MACHINE

```
Node.js  : v22+ (voir .nvmrc)
npm      : v10+ (inclus avec Node.js)
Editeur  : VSCode recommande (pas obligatoire)
Terminal : n'importe lequel, tu vas y vivre
```

Vérifie avec :

```bash
node -v
npm -v
```

Si t'as pas Node.js : va sur nodejs.org, télécharge la version LTS, installé-la. Reviens après.

---

## 15 MOTS QUE TU VAS CROISER DANS LA ROADMAP (juste en bas)

| Mot             | C'est quoi en une phrase                                                         |
| --------------- | -------------------------------------------------------------------------------- |
| Event Loop      | Le mécanisme qui fait tourner JS sur un seul thread sans jamais bloquer          |
| Runtime         | Le moteur qui exécute ton code pendant que tu regardes ailleurs                  |
| Memory          | Comment ton programme stocké et libère ses données en RAM                        |
| Algorithm       | Une suite d'étapes précises pour résoudre un problème                            |
| Functional (FP) | Coder sans muter d'état, juste des fonctions qui transforment des données        |
| Pattern         | Une solution standard à un problème de conception qui revient souvent            |
| Refactoring     | Améliorer du code qui marche déjà, sans changer ce qu'il fait                    |
| TypeScript (TS) | JavaScript avec des types : le compilateur attrape tes erreurs avant l'exécution |
| Architecture    | Comment organiser un projet pour qu'il tienne quand il grossit                   |
| a11y            | Accessibilité : coder pour que tout le monde puisse utiliser ton site            |
| i18n            | Internationalisation : adapter ton app à plusieurs langues et pays               |
| API             | Le point de contact par lequel deux programmes se parlent                        |
| Scalability     | Tenir la charge quand tu passes de 10 à 10 millions d'utilisateurs               |
| Observability   | Voir ce qui se passe en prod sans attendre qu'un client se plaigne               |
| OOP             | Programmation orientée objet : organiser le code autour d'objets et de classes   |

Tu ne comprends pas encore le mécanisme derrière chaque mot, normal. C'est tout l'objet du curriculum. Ce tableau sert juste à ce que la roadmap ne te paraisse pas en chinois.

---

## DANS QUEL ORDRE LIRE (rappel)

```
1. START_HERE.md                          <= t'es ici
2. 00-SOCLE/01_getting_started/02_day_one.md       <= contexte du metier + poste de travail + premier code
3. 00-SOCLE/03_referentiel/where_you_stand.md      <= les 4 axes sur lesquels tu vas progresser
4. README.md                              <= la roadmap complete des 32 modules (01 -> 32)
5. 00-SOCLE/04_fundamentals/                       <= le vrai depart
```

Chaque fichier renvoie au suivant à sa fin. Suis le fil, te pose pas de question.

---

## FICHIERS RACINE (a quoi ils servent)

- `README.md` : porte d'entrée officielle (roadmap).
- `START_HERE.md` : tu es ici.
- `.nvmrc` : version de Node de référence (source de vérité unique, détaillée dans `05-MAITRISE/06_annexes/29_toolchain/08_NODE_VERSIONS.md`).
- `05-MAITRISE/06_annexes/29_toolchain/08_NODE_VERSIONS.md`, `05-MAITRISE/06_annexes/28_templates/POSTMORTEM.md` : gouvernance technique légère utile au parcours.
- `COMMUNAUTE.md`, `LICENSE` : gouvernance projet.
- Contexte des premiers pas : `00-SOCLE/01_getting_started/02_day_one.md`.
- Guide carrière : `05-MAITRISE/06_annexes/16_career/00_guide.md`.
- Tu veux savoir quel module vieillit vite ? -> `05-MAITRISE/06_annexes/20_PERISSABILITE.md` (et l'index `05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md`).
- Zones grises entre modules 12, 13, 16, 18 (patterns / refactoring / architecture / OOP) ? -> `05-MAITRISE/06_annexes/17_frontieres_modules.md`.

Si ça t'encombre, ignore-les au début et suis juste l'ordre plus haut.

---

## CE QUE C'EST, EN UNE PHRASE

MyFunnyJS, c'est pas un cours JS de plus. C'est une méthode pour construire un cerveau d'ingénieur : comprendre le runtime, lire du code inconnu, debugger un vrai problème, prendre de bonnes décisions d'architecture. JavaScript est juste le terrain d'entraînement.

---

Direction `00-SOCLE/01_getting_started/02_day_one.md`.
