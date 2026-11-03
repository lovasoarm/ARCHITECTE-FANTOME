---
stability: intemporel
gate: bloquante
acte: comprendre
---

# Security Gate : 04 BREAKING CACHE

> **Gate bloquante locale au mini-projet.** Elle vérifie les risques spécifiques au cache de résumé de stock. Elle ne constitue pas un audit général OWASP, une revue de sécurité indépendante ou une certification de production.

## Procédure

Pour chaque ligne, fournis une preuve réelle (fichier, test, assertion ou résultat). Si un élément est hors périmètre, explique pourquoi ; n'écris pas simplement `N/A`.

| ID  | Contrôle requis                                                                                                | Preuve attendue                                                          | Résultat     |
| --- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------ |
| G1  | La clé contient tenant et boutique, après validation des identifiants.                                         | test montrant que deux tenants/boutiques ne partagent pas la même entrée | À renseigner |
| G2  | Un appelant ne choisit pas librement le périmètre d'une autre boutique via une clé arbitraire.                 | lecture du service et test ciblé                                         | À renseigner |
| G3  | TTL invalide et clé invalide sont rejetés.                                                                     | tests des entrées négatives / frontières                                 | À renseigner |
| G4  | Un loader en erreur ne crée pas une entrée cache.                                                              | test d'échec du loader puis lecture suivante                             | À renseigner |
| G5  | Une écriture échouée ne provoque pas une invalidation prématurée ; une écriture réussie invalide la bonne clé. | deux tests d'écriture (succès/échec)                                     | À renseigner |
| G6  | Les logs ne contiennent ni secret ni payload de résumé de stock.                                               | inspection des sorties réellement produites                              | À renseigner |
| G7  | Le TTL et la fenêtre de concurrence résiduelle sont documentés.                                                | ADR + `03-SECURITY.md`                                                   | À renseigner |
| G8  | La sérialisation de clé ne confond pas deux couples d'identifiants (y compris avec `:`).                       | test des couples `('a:b','c')` et `('a','b:c')`                          | À renseigner |
| G9  | La cardinalité du cache d'exercice est bornée et le risque des entrées expirées jamais relues est reconnu.     | fixture bornée + limite documentée                                       | À renseigner |

## Décision

- [ ] Tous les contrôles applicables ont une preuve.
- [ ] Les exceptions sont justifiées et les limites assumées.
- [ ] Les commandes et résultats correspondent réellement au dépôt apprenant.
- [ ] Le gate a été rejoué après la dernière modification.

**Statut :** `À FAIRE` / `PASSÉ` / `ÉCHOUÉ` (choisir un seul statut et l'expliquer).

**Nom / date :**

Un gate rempli sans preuves ou copié du modèle ne valide rien. Ne remplace pas ces contrôles ciblés par une checklist OWASP Top 10 hors sujet.
