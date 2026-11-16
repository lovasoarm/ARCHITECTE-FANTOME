---
stability: intemporel
last_reviewed: 2026-11
depends_on_vendor: false
acte: comprendre
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Chaque garde-fou doit être adapté au risque réel et appuyé par une preuve.

# Security Gate Template : risques propres au projet

> **Gate bloquante.** Les contrôles applicables doivent être testés et reliés à une preuve. Une ligne `NON APPLICABLE` exige une justification concrète ; une ligne `NON TESTÉ` ne peut pas être déclarée passée.

Le fichier `03-SECURITY.md`, distribué dans chaque dossier de mini-projet, est le **modèle AF d’analyse de sécurité**. L’apprenant le copie une fois vers `SECURITY.md` à la racine de son dépôt, puis complète uniquement `SECURITY.md`. Le présent fichier `05-SECURITY-GATE.md` est le modèle commun de registre de contrôles : il peut être copié sous `SECURITY_GATE_FILLED.md` pour consigner la gate. Ne maintiens pas deux copies remplies de l’analyse de sécurité.

Pour classer les risques pertinents, consulte la référence canonique [OWASP Top 10:2025](https://owasp.org/Top10/2025/) et le cours [OWASP du module Security](../../../03-PILOTAGE/04-SECURITY/14-owasp_checklist.md). OWASP aide à classifier les risques ; il ne remplace pas le modèle de menace du projet et n'impose pas dix catégories artificiellement à chaque application.

## Métadonnées

- Projet : `<nom du mini-projet>`
- Version évaluée : `<git sha ou tag>`
- Évaluateur : `<toi>`
- Date : `<YYYY-MM-DD>`
- Périmètre : `<composants, interfaces, données et environnements couverts>`

## Registre des risques et contrôles

| ID  | Risque identifié            | Contrôle adapté                  | Preuve exacte (fichier/test/log/config) | Statut    | Justification si NON APPLICABLE |
| --- | --------------------------- | -------------------------------- | --------------------------------------- | --------- | ------------------------------- |
| G1  | `<risque propre au projet>` | `<contrôle et résultat attendu>` | `<chemin + commande ou observation>`    | NON TESTÉ | :                               |
| G2  | `<risque propre au projet>` | `<contrôle et résultat attendu>` | `<chemin + commande ou observation>`    | NON TESTÉ | :                               |
| G3  | `<risque propre au projet>` | `<contrôle et résultat attendu>` | `<chemin + commande ou observation>`    | NON TESTÉ | :                               |

Ajoute une ligne par risque pertinent. Pour chaque catégorie OWASP non retenue, indique pourquoi elle ne s'applique pas au périmètre ; ne copie pas une liste générique sans analyse.

## Statuts autorisés

- `PASSÉ` : contrôle exécuté et preuve suffisante présente.
- `ÉCHOUÉ` : contrôle exécuté, résultat insuffisant ou risque non maîtrisé.
- `NON TESTÉ` : contrôle applicable dont la vérification n'a pas été faite.
- `NON APPLICABLE` : hors périmètre, avec justification obligatoire.

## Décision globale déterministe

- `ÉCHOUÉE` si au moins un contrôle applicable est `ÉCHOUÉ`.
- `À FAIRE` si aucun contrôle applicable n’a échoué mais qu’au moins un est `NON TESTÉ`.
- `PASSÉE` uniquement si tous les contrôles applicables sont `PASSÉ` et tous les `NON APPLICABLE` sont justifiés.

Une case remplie, une checklist copiée ou une commande non exécutée ne constitue pas une preuve. Toute limite d'environnement doit être indiquée `NON TESTÉ` avec sa raison.

## Signature

- Décision globale : `À FAIRE` / `ÉCHOUÉE` / `PASSÉE`
- Vérifié par : `<nom>`
- Date : `<YYYY-MM-DD>`
- Limites restantes : `<liste ou aucune>`
