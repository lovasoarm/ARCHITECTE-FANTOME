---
stability: stable
acte: pratiquer
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Exercice de cadrage : Mini-projet

Temps de lecture ~2 min

> Tag `[IA séduisante]` : contrainte pédagogique de travail sans assistance de solution ni autocomplétion générative. Cette contrainte repose sur l’auto-déclaration de l’apprenant ; elle n’est pas vérifiable techniquement par ce document.
> Durée indicative : 45 min.
> **Statut V6.5 : entraînement non certifiant :** le brief et sa relecture par toi-même permettent de pratiquer le cadrage, mais ne fournissent pas de correction indépendante. Cette page ne ferme aucune gate. Pour obtenir un retour fiable, suis le [protocole de retour fiable](../../06-ANNEXES-TRANSVERSES/85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md#procedure-de-retour-fiable) ; sans reviewer compétent, conserve le statut `PRATIQUE  : AUTOÉVALUÉ` et note les incertitudes.

## Contexte

Tu joues le rôle du **dev senior** qui accompagne une solution junior sur son
premier mini-projet. L'IA est bornée : elle sait générer du code, elle ne
sait pas juger un scope.

## Mission

Prends `10_legacy_dungeon` ou `13_memory_hunter`. Sans écrire une ligne
de code, produis **un brief de 300 mots max** que tu donnerais à une solution
junior pour qu'elle attaque le projet sans dérailler.

Le brief doit contenir, dans cet ordre :

1. **But mesurable** en une phrase.
2. **Périmètre exclu** (ce que l'IA ne doit surtout PAS coder toute seule
   sans validation humaine, typiquement : les décisions d'architecture,
   la politique d'éviction, le choix de broker).
3. **3 checkpoints** où l'IA doit s'arrêter et te montrer son travail.
4. **1 test d'acceptation** rédigé en langage naturel.

## Auto-vérification (10 min)

Relis ton brief à voix haute. Si un dev de 2 ans XP le lit sans contexte,
peut-il commencer à guider une solution ? Si non, reformule.

Piège classique : le brief liste toutes les fonctions à écrire. C'est la
mauvaise granularité. Le brief doit contraindre les **choix**, pas la
frappe.

Livrable : `BRIEF.md` dans le dossier du mini-projet choisi. Non versionné
si tu le juges brouillon.

## Journal personnel (auto-déclaré, non indépendant)

Le journal peut conserver les dates déclarées et le SHA-256 du fichier pour suivre tes propres versions. Ces éléments locaux ne prouvent ni la date réelle de création, ni l’absence d’assistance, ni l’indépendance du test.

## Préparation obligatoire : verrou LOCK

> Principe LOCK : interdiction de toucher au clavier tant que tu n'as pas
> écrit ton plan d'attaque. Le même verrou que dans le mini-projet 18 et
> dans `01-CADRAGE/03-DEBUGGING/HYPOTHESES_*`. Il n'est pas négociable ici non plus.

Avant de rédiger le brief :

1. Écris ton `HYPOTHESES.md` (une phrase par hypothèse, chacune testable
   isolément).
2. Écris un critère binaire de réussite : une condition observable permettant de décider si le brief respecte le périmètre demandé.
3. Ensuite seulement, rédige le `BRIEF.md` ; aucun code n’est demandé dans cet exercice.

Sans `HYPOTHESES.md` et un critère d’acceptation écrit avant la rédaction de `BRIEF.md`, l’activité ne permet pas d’évaluer correctement le résultat. Le contrôle reste une auto-évaluation : aucun validateur indépendant n’est fourni dans ce module.
