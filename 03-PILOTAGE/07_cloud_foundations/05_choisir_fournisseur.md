---
stability: perissable_2027
acte: appliquer
---

# 05 : CHOISIR UN FOURNISSEUR SANS S'ENFERMER

Temps de lecture ~10 min

> **BANDEAU DE PÉREMPTION.** Les montants de ce fichier sont des ordres de grandeur relevés en **2026-08**, hors remises négociées et hors offres régionales. Ils périment vite : au-delà de **2027-02**, ne les cite plus tels quels, relève la grille du jour et remplace le tableau. Ce qui ne périme pas, c'est la méthode de comparaison et la liste des postes à comparer.

## 1. COMPARER DES CHOSES COMPARABLES

Un comparatif de fournisseurs n'a de sens que sur **ta** charge, exprimée en unités : vCPU-heures, Go-mois, Go sortants, opérations. Comparer des noms d'offres ne donne rien.

> Relevé le 2026-08-14, chez fournisseur A (hyperscaler généraliste) et fournisseur B (fournisseur européen), unité indiquée colonne par colonne, URL : pages tarifaires publiques citées ci-dessous, à revérifier avant 2027-02. Protocole appliqué : [../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

Ces montants ne sont pas des références : ce sont des **exemples datés**, conservés pour montrer la forme d'un relevé correct. Le tien les remplace.

| Poste | Unité | Chez | Relevé le | Ordre de grandeur | URL |
| --- | --- | --- | --- | --- | --- |
| Calcul conteneur | 1 vCPU + 2 Go, 730 h/mois | A et B | 2026-08-14 | 25 à 40 € | page tarifaire calcul du fournisseur, à recopier telle quelle dans ton relevé |
| Base relationnelle managée | 2 vCPU, 8 Go, 100 Go disque | A et B | 2026-08-14 | 130 à 220 € | page tarifaire base managée |
| Stockage objet | 100 Go-mois | A et B | 2026-08-14 | 2 à 3 € | page tarifaire stockage objet |
| Opérations sur stockage | 1 million de lectures | A et B | 2026-08-14 | 0,30 à 0,50 € | page tarifaire stockage objet, section opérations |
| Egress | 100 Go sortants | A et B | 2026-08-14 | 7 à 12 € | page tarifaire transfert sortant |
| Journaux | 100 Go ingérés | A et B | 2026-08-14 | 40 à 90 € | page tarifaire observabilité |

La colonne URL de ton propre relevé contient une adresse complète, pas une description : ici elle est décrite parce qu'une adresse figée dans un cours pourrit en six mois, chez toi elle est écrite en clair parce qu'elle doit être cliquable devant un comité.

Deux constats stables au-delà de la grille : l'egress et les journaux sont les postes où les écarts entre fournisseurs sont les plus grands, et ce sont ceux qu'on oublie de comparer.

## 2. LES QUATRE CRITÈRES QUI COMPTENT PLUS QUE LE PRIX

1. **Réversibilité** : combien de jours pour partir, et quel est le coût de sortie des données (l'egress de la migration).
2. **Compétence disponible** : ce que ton équipe sait déjà exploiter, la nuit, sous stress.
3. **Conformité et localisation** : où sont les données, qui peut y accéder juridiquement.
4. **Surface managée** : chaque service managé pris est une astreinte en moins et un enfermement en plus.

## 3. L'ENFERMEMENT, DOSÉ VOLONTAIREMENT

L'enfermement fournisseur n'est pas un mal absolu : c'est un échange. La règle tenable est de **s'enfermer sur ce qui est banal et de rester portable sur ce qui est vital**.

```
portable   : ton modèle de données, tes contrats d'API, ton code métier
enfermé OK : file managée, stockage objet, identité, observabilité
```

Risque réel : l'abstraction maison écrite "pour rester portable" coûte souvent plus cher, en temps d'équipe, que la migration qu'elle prétend éviter et qui n'arrivera jamais.

## 4. EXERCICES

**Exercice 1 : ta charge en unités (20 min).** Traduis ton palier 10 000 utilisateurs en vCPU-heures, Go-mois, Go sortants et opérations. C'est la seule base de comparaison honnête.

**Exercice 2 : le relevé daté (20 min).** Relève toi-même trois prix unitaires (calcul, egress, journaux) chez deux fournisseurs. Note pour chacun : la date, le fournisseur, l'unité de facturation exacte, l'URL. Mode de vérification : critère binaire du [verification_pack/drill_2.md](verification_pack/drill_2.md). Un relevé sans URL ne compte pas.

**Exercice 3 : le coût de sortie (15 min).** Chiffre ce que coûterait de sortir tes données de ton fournisseur actuel aujourd'hui : volume x tarif egress, plus le temps d'équipe. Ce nombre est ton degré d'enfermement réel.

## RÉSUMÉ

On compare des unités, pas des noms d'offres, et on n'oublie ni l'egress ni les journaux. Le prix arrive après la réversibilité, la compétence disponible et la conformité. L'enfermement se dose : banal côté fournisseur, vital côté portable. Et toute grille tarifaire citée porte sa date et sa date de péremption.

## ET APRÈS

Le [portage multi-cloud](06_portage_multicloud.md) te fait refaire le budget chez le second fournisseur. Puis le [grimoire](grimoire.md) fige le vocabulaire, puis le [challenge](challenge.md) produit ton `BUDGET-CLOUD.md`.
