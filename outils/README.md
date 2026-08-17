---
stability: perissable_2028
acte: évaluer
---

# outils/ — les verrous de livraison

Acte attendu : évaluer.

Aucun de ces scripts n'enseigne quoi que ce soit. Ils existent pour une seule raison : une promesse de qualité qu'on ne peut pas rejouer soi-même n'est pas une preuve, c'est une déclaration. Node >= 18, aucune dépendance à installer.

## Les quatre verrous

| Commande | Ce qu'elle refuse |
| --- | --- |
| `node outils/verifier_numerotation.mjs .` | deux fichiers avec le même numéro local, ou un trou dans la séquence d'un dossier |
| `node outils/verifier_liens.mjs . --ecrire` | un lien relatif qui ne résout pas sur disque ; régénère `VERIFICATION_LIENS.md` avec les vrais nombres |
| `node outils/generer_perissabilite.mjs` | un en-tête `stability:` absent de l'index de péremption ; régénère `05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md` |
| `node outils/controle_livraison.mjs --strict` | tout le reste : en-tête manquant, lien cassé, deux titres de niveau 1 identiques dans un dossier, exercice de jeûne IA en double ou non numéroté, fichier généré sans son générateur, montant en euros sans relevé daté, gate sécurité absent des modules cloud / SLO / DDD |

`node outils/generer_index_dossiers.mjs` régénère les blocs `CONTENU-DOSSIER` des `README.md` : il existe parce que ces blocs sont marqués « généré », et qu'un fichier généré ne se livre pas sans son générateur.

## L'ordre à respecter

```bash
node outils/generer_index_dossiers.mjs
node outils/generer_perissabilite.mjs
node outils/verifier_liens.mjs . --ecrire
node outils/verifier_numerotation.mjs .
node outils/controle_livraison.mjs --strict
```

Les générateurs d'abord, les vérificateurs ensuite : on vérifie l'état livré, pas un état intermédiaire.

## La règle qui survit à ces scripts

Aucun fichier « généré » ne survit sans son générateur dans le même zip. Si l'outillage disparaît, la section « Preuves de qualité du dépôt » du README, `VERIFICATION_LIENS.md`, l'index de péremption et les blocs `CONTENU-DOSSIER` disparaissent dans le même mouvement — sinon le dépôt certifie ce que personne ne peut plus vérifier.

## Code de sortie

`0` = livrable. `1` = refus, avec la liste nommée des fautes. Un refus ne se contourne pas en retirant le contrôle : il se corrige dans le contenu.
