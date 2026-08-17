---
stability: intemporel
acte: restituer
---

![MyFunnyJS](assets/title.svg)

# MyFunnyJs

Temps de lecture ~3 min

**MyFunnyJS : 32 modules de fond (01 -> 32) + 2 préludes (`00-SOCLE/01_getting_started/`, `00-SOCLE/03_referentiel/`) + 19 mini-projets + 1 drill trimestriel de survie (voir `05-MAITRISE/06_annexes/16_career/05_ai_famine_drill.md`), apprenable seul.**

> **Nouveau ici ?** Va directement lire [`START_HERE.md`](START_HERE-myfunnyjs.md).
> Ce README tient volontairement court. Le detail est en annexe.

---

> **AVANT TOUT** : si tu n'as jamais installé Node de ta vie, va faire [`00-SOCLE/01_getting_started/01_install.md`](../00-SOCLE/01_getting_started/01_install.md) d'abord. Reviens ici après.

> **Auto-vérification des exercices** : chaque `EXO_JEUNE_IA.md` te demande d'écrire toi-même le critère binaire de réussite (une commande `node solution.js`, une sortie attendue exacte). Pas de moteur cache, pas de boite noire : tu vois ton test, tu vois ta sortie, tu compares. C'est ca, la vraie discipline.

## CE QUE C'EST

Un curriculum pour passer de "je copie-colle" a "je comprends ce que je fais, pourquoi je le fais, et je peux le défendre 6 mois après".

JS n'est que le vecteur. On construit les **six pierres** (détaillées dans `00-SOCLE/03_referentiel/`) qui te rendent difficile a remplacer par une IA : Runtime, Mémoire, Asynchrone, Architecture, Debugging, Pensée Transférable.

En 2026, taper du code vite ne vaut plus rien : l'IA le fait déjà. Ce qui reste rare : comprendre, choisir, sécuriser, debugger. Ce curriculum sert a ca.

---

## PAR OU COMMENCER (dans l'ordre, sans réfléchir)

1. Lis `START_HERE.md` (5 min).
2. Ouvre `00-SOCLE/01_getting_started/02_day_one.md` : tu écris tes 3 premières lignes de JS.
3. Va voir `00-SOCLE/03_referentiel/where_you_stand.md` : tu comprends ou tu en es.
4. Reviens ici, regarde la roadmap ci-dessous.
5. Attaque `00-SOCLE/04_fundamentals/`. Un fichier après l'autre.

Si tu bloqués plus de 2 jours -> tu ouvres `PLATEAU_JOURNAL.md` (a toi de créer). Si 7 jours -> `05-MAITRISE/06_annexes/16_career/03_plateau_playbook.md`.

---

## LES 5 Règles DU JEU

1. **Lis chaque `.md` en entier avant de coder.** La leçon est dans le texte, pas dans le code.
2. **Code toi-même.** L'IA propose, tu décides. Copier-coller sans comprendre : seule faute grave.
3. **Finis les mini-projets.** C'est la que les concepts s'assemblent en vrai geste. Chacun avec gate OWASP validée (voir `02-CONSTRUCTION/02_mini_projects/_templates/01_POSTMORTEM_TEMPLATE.md`).
4. **Remplis TDD_JOURNAL, POSTMORTEM, ADR.** Ce ne sont pas des formalités. **Chaque ADR déclenche un OBJECTION_STORM chronomètre** (voir `05-MAITRISE/06_annexes/19_interview/03_objection_storm.md`).
5. **Rejoué le drill `solo_vs_copilot`** aux checkpoints imposés : sinon tu ne mesures rien. **Checkpoint bloquant après le module 14 : crosslang challenge** (voir `05-MAITRISE/06_annexes/16_career/01_crosslang_challenge.md`).

---

## ROADMAP Condensée

> Deux préludes non numérotés ouvrent le parcours : `00-SOCLE/01_getting_started/`
> (installer Node/Git, premier code) et `00-SOCLE/03_referentiel/` (la boussole des six
> pierres et l'auto-diagnostic). Viennent ensuite les **32 modules de fond**,
> en séquence continue `01 -> 32`, sans trou :

```
01 -> 07  Fundamentals · Problem Solving · Async · Debugging · Errors · Testing · Math
08 -> 11  Memory · Data Structures · Algorithms · Functional
12 -> 17  Patterns · Refactoring · TypeScript · Runtime · Architecture · Web Concepts
          [CHECKPOINT BLOQUANT apres 14 : crosslang challenge]
18 -> 22  OOP · Web Inclusive · Realtime · API · Security
23        AI-Native Dev
24 -> 28  Databases · Scalability · Observability · Team · Edge Cases
29        AI Agents & Autonomy
30        19 mini-projets (Legacy Dungeon, Memory Hunter, Distributed Arena...)
          + drill trimestriel "IA en panne" (voir 05-MAITRISE/06_annexes/16_career/05_ai_famine_drill.md)
31        Annexes : transferabilite, interview, portfolio, career, ethique
          Carte detaillee : 05-MAITRISE/06_annexes/15_ARBORESCENCE.md
Templates reutilisables : 05-MAITRISE/06_annexes/28_templates/  (POSTMORTEM, HYPOTHESES, PUBLICATION)
32        Tools
```

Arborescence complète, a consulter au besoin (pas a lire d'une traite) : [`05-MAITRISE/06_annexes/15_ARBORESCENCE.md`](../05-MAITRISE/06_annexes/15_ARBORESCENCE.md).

---

## QUAND ES-TU "Diplôme" DE MYFUNNYJS ?

Cinq conditions binaires. Aucune n'est optionnelle :

1. Les **32 modules** ont chacun un POSTMORTEM personnel signe.
2. Les **19 mini-projets** sont livres avec gate OWASP validée (0 TODO dans le POSTMORTEM).
3. Le **crosslang challenge** est passe (6/6 sur la grille, produit commité dans un langage non-JS).
4. Un **first click replay** (`05-MAITRISE/06_annexes/16_career/04_first_click_replay.md`) a été filmé avec un vrai débutant : 0 a 2 hésitations en 30 min.
5. Ton **DEPENDENCY_LEDGER.md** personnel tient depuis 3 mois avec dépendance IA < 25 % et ratio lecture/écriture >= 2x.

Tu peux te bloquer 4/5 pendant des mois : ca veut dire que tu progresses, pas que tu es arrivé. Le diplôme ne se distribué pas, il se défend a l'oral (`05-MAITRISE/06_annexes/19_interview/03_objection_storm.md`).

---

## COMMENT Démarrer (5 min)

```bash
node -v   # >= 22 (LTS 2026, voir .nvmrc) (voir .nvmrc, source de verite unique)
git --version
```

Puis ouvre [`START_HERE.md`](START_HERE-myfunnyjs.md).

---

Licence : voir [`LICENSE`](../LICENSE) : tu peux réutiliser et adapter le matériel
dans le cadre qui y est décrit. Communauté : `COMMUNAUTE.md`. Version de Node :
`.nvmrc` (référence) détaillée dans `05-MAITRISE/06_annexes/29_toolchain/08_NODE_VERSIONS.md`.
Le fichier `00-SOCLE/03_referentiel/DEPENDENCY_LEDGER.md` est fourni comme modèle vide a copier :
ce n'est pas TON registre personnel. Ton propre `DEPENDENCY_LEDGER.md` (voir
`00-SOCLE/01_getting_started/02_day_one.md`) est a créer et tenir a jour a la racine
de ton propre projet, pas un fichier fourni par le curriculum.

---
