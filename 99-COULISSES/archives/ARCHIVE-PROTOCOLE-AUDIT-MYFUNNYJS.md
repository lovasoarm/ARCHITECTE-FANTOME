---
stability: intemporel
acte: évaluer
---

> **Document historique, ne pas suivre.** Archivé le 2026-08-16. Trace historique du
> protocole d'audit appliqué au dépôt MyFunnyJS avant la fusion. Ce n'est pas la carte à
> suivre : ce qui fait autorité aujourd'hui, c'est
> [outils/controle_livraison.mjs](../../outils/controle_livraison.mjs) et le
> [README.md](../../README.md) racine. Conservé ici pour qu'un audit futur puisse comparer
> une régression à l'intention d'origine, voir [archives/README.md](README.md).

# ARCHIVE : protocole d'audit MyFunnyJS

Acte attendu : évaluer.

## Statut de fidélité

Ce texte est la reconstitution intégrale du protocole tel qu'il était appliqué, établie à
partir de ses traces sur disque (structure des rapports d'audit, verdicts, vocabulaire des
sections). Aucune formulation n'est inventée pour embellir le protocole : là où la trace ne
permettait pas de trancher, la règle est notée `trace partielle`.

## 1. Périmètre

- Tout fichier `.md` du dépôt, sans échantillonnage.
- Tout script d'outillage exécutable.
- Les fichiers générés sont audités comme les autres : un générateur ne dispense de rien.

## 2. Échelle de verdict

| Niveau | Nom | Effet |
| --- | --- | --- |
| 1 | Bloquant | interdit la livraison |
| 2 | À corriger | interdit la montée de note |
| 3 | Améliorable | consigné, non bloquant |
| 4 | Angle mort | zone non couverte par l'audit, déclarée |
| 5 | Réserve | doute non tranché faute de preuve |

Règle héritée, et volontairement durcie depuis : dans le dépôt actuel, les cinq niveaux sont
traités comme fatals. Un chantier n'est clos que si un contrôle automatisé le verrouille.

## 3. Séquence d'audit

1. Inventaire mécanique : nombre de fichiers, de mots, de liens, de blocs de code.
2. Contrôle de forme : typographie, accents, emojis, largeur de tableaux, noms de fichiers.
3. Contrôle de structure : gabarit de module, préfixes numériques, liens entrants.
4. Contrôle de fond : un exercice est-il vérifiable seul, et par quel verdict binaire.
5. Contrôle de péremption : tout chiffre porte-t-il sa date et sa source.
6. Verdict par famille de compétences, puis verdict global sur dix.

## 4. Règles de preuve

- Un audit cite toujours le chemin du fichier et le numéro de ligne.
- Une affirmation sans chemin de fichier est une opinion, elle ne compte pas.
- Un scan partiel est déclaré comme tel, avec son pourcentage de couverture.
  `trace partielle` : le seuil de couverture minimal n'apparaît nulle part.

## 5. Ce que ce protocole ne couvrait pas

- La durée : il jugeait l'instant d'une décision, jamais sa tenue six mois plus tard.
- La jouabilité en solo des exercices de leadership.
- La reproductibilité de ses propres comparaisons, faute d'archivage de ses règles.
  C'est précisément le défaut que cette archive corrige.
