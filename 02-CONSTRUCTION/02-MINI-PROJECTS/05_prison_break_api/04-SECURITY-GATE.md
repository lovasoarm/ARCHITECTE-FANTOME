---
stability: intemporel
gate: bloquante
acte: comprendre
---

> ### SCÈNE CRAZYDEVS : Prison Break
>
> Le système est maintenant ton Fox River : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# Security Gate : 05_prison_break_api

Temps de lecture ~2 min

> **Gate bloquante locale au projet.** La validation porte sur les surfaces et risques réellement présents dans ce mini-projet. OWASP est un référentiel de classification, pas une liste de dix tests à exécuter mécaniquement.

## Procédure

1. Lis le périmètre réel dans le README, le cahier des charges et les règles du projet ; identifie les données, entrées, acteurs, frontières de confiance et dépendances réellement présents.
2. Copie le modèle commun [`../97-templates/05-SECURITY-GATE.md`](../97-templates/05-SECURITY-GATE.md) dans ce dossier sous le nom `SECURITY_GATE_FILLED.md`.
3. Dans ce registre, ajoute une ligne pour chaque risque pertinent du projet, avec le contrôle, la preuve attendue et l'un des statuts `PASSÉ`, `ÉCHOUÉ`, `NON TESTÉ` ou `NON APPLICABLE`. Toute exclusion doit être motivée. Ne remplis pas artificiellement les dix catégories OWASP.
4. Complète aussi le document final `SECURITY.md` du dépôt apprenant, copié depuis le modèle AF `03-SECURITY.md`. `SECURITY_GATE_FILLED.md` consigne la gate ; `SECURITY.md` contient l'analyse de sécurité du projet.
5. Signe (`nom : date`) et ajoute le lien vers `SECURITY_GATE_FILLED.md` dans le README du projet, section **Publication**.
6. Rejoue les contrôles applicables après toute modification du code ou du contrat. Une commande non exécutée reste `NON TESTÉ`.

## Règle de blocage

- Un item sans preuve **ni** motivation → gate **échouée**, projet **non publiable**.
- Une preuve pointant vers un fichier inexistant → gate **échouée**.
- Pas de signature → gate **échouée**.

## Rappel

OWASP aide à classer les risques pertinents ; il ne crée pas des surfaces absentes du projet. Une ligne applicable mais `NON TESTÉ` empêche de déclarer la gate passée. Un mini-projet sans `SECURITY_GATE_FILLED.md` signé ne peut pas être déclaré terminé.

## Statuts et décision globale

Statuts de ligne autorisés : `PASSÉ` (contrôle exécuté avec preuve suffisante), `ÉCHOUÉ` (contrôle exécuté, résultat insuffisant), `NON TESTÉ` (contrôle applicable non vérifié) et `NON APPLICABLE` (hors périmètre, justification obligatoire).

Décision globale : `ÉCHOUÉE` dès qu'au moins un contrôle applicable est `ÉCHOUÉ` ; `À FAIRE` si aucun contrôle applicable n'a échoué mais qu'au moins un reste `NON TESTÉ` ; `PASSÉE` uniquement lorsque tous les contrôles applicables sont `PASSÉ` et que chaque exclusion `NON APPLICABLE` est justifiée. Une case cochée, un champ rempli ou une commande prévue mais non exécutée ne constitue pas une preuve.
