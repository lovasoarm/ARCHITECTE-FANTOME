---
stability: intemporel
gate: bloquante
acte: comprendre
---

# Security Gate : 04 BREAKING CACHE

> **Gate bloquante locale au mini-projet.** Elle vérifie les risques spécifiques au cache de résumé de stock. Elle ne constitue pas un audit général OWASP, une revue de sécurité indépendante ou une certification de production.

## Procédure

Pour chaque ligne, fournis une preuve réelle (fichier, test, assertion ou résultat). Si un élément est hors périmètre, explique pourquoi ; attribue `NON APPLICABLE` avec une justification concrète.

| ID  | Contrôle requis                                                                                                | Preuve attendue                                                          | Statut    |
| --- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------- |
| G1  | La clé contient tenant et boutique, après validation des identifiants.                                         | test montrant que deux tenants/boutiques ne partagent pas la même entrée | NON TESTÉ |
| G2  | Un appelant ne choisit pas librement le périmètre d'une autre boutique via une clé arbitraire.                 | lecture du service et test ciblé                                         | NON TESTÉ |
| G3  | TTL invalide et clé invalide sont rejetés.                                                                     | tests des entrées négatives / frontières                                 | NON TESTÉ |
| G4  | Un loader en erreur ne crée pas une entrée cache.                                                              | test d'échec du loader puis lecture suivante                             | NON TESTÉ |
| G5  | Une écriture échouée ne provoque pas une invalidation prématurée ; une écriture réussie invalide la bonne clé. | deux tests d'écriture (succès/échec)                                     | NON TESTÉ |
| G6  | Les logs ne contiennent ni secret ni payload de résumé de stock.                                               | inspection des sorties réellement produites                              | NON TESTÉ |
| G7  | Le TTL et la fenêtre de concurrence résiduelle sont documentés.                                                | ADR + `SECURITY.md`                                                      | NON TESTÉ |
| G8  | La sérialisation de clé ne confond pas deux couples d'identifiants (y compris avec `:`).                       | test des couples `('a:b','c')` et `('a','b:c')`                          | NON TESTÉ |
| G9  | La cardinalité du cache d'exercice est bornée et le risque des entrées expirées jamais relues est reconnu.     | fixture bornée + limite documentée                                       | NON TESTÉ |

## Décision

- [ ] Tous les contrôles applicables ont une preuve.
- [ ] Les exceptions sont justifiées et les limites assumées.
- [ ] Les commandes et résultats correspondent réellement au dépôt apprenant.
- [ ] Le gate a été rejoué après la dernière modification.

**Nom / date :**

Un gate rempli sans preuves ou copié du modèle ne valide rien. Ne remplace pas ces contrôles ciblés par une checklist OWASP Top 10 hors sujet.

## Statuts et décision globale

Statuts de ligne autorisés : `PASSÉ` (contrôle exécuté avec preuve suffisante), `ÉCHOUÉ` (contrôle exécuté, résultat insuffisant), `NON TESTÉ` (contrôle applicable non vérifié) et `NON APPLICABLE` (hors périmètre, justification obligatoire).

Décision globale : `ÉCHOUÉE` dès qu'au moins un contrôle applicable est `ÉCHOUÉ` ; `À FAIRE` si aucun contrôle applicable n'a échoué mais qu'au moins un reste `NON TESTÉ` ; `PASSÉE` uniquement lorsque tous les contrôles applicables sont `PASSÉ` et que chaque exclusion `NON APPLICABLE` est justifiée. Une case cochée, un champ rempli ou une commande prévue mais non exécutée ne constitue pas une preuve.
