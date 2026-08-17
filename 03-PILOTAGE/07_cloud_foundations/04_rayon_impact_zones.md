---
stability: perissable_2027
acte: appliquer
---

# 04 : RAYON D'IMPACT, ZONES ET LE PRIX D'UNE NEUVIÈME

Temps de lecture ~11 min

Choisir une topologie, c'est acheter une promesse de disponibilité. Cette leçon relie directement le SLO écrit au module [06_fiabilite_slo](../06_fiabilite_slo/01_sli_slo_budget_erreur.md) à une ligne de facture, dans les deux sens.

## 1. LES TROIS TOPOLOGIES, ET CE QU'ELLES ACHÈTENT

| Topologie | Survit à | Surcoût typique | Complexité ajoutée |
| --- | --- | --- | --- |
| Mono-zone | rien de plus qu'une panne machine | référence | aucune |
| Multi-zone | la perte d'un centre de données | +80 à +130% sur les composants répliqués | réplication et bascule à tester |
| Multi-région | la perte d'une région entière | x2,5 à x4 | cohérence des données, latence, exploitation double |

Le saut de mono-zone à multi-zone est presque toujours justifié dès qu'un utilisateur paie. Le saut à multi-région ne l'est que si une phrase écrite l'exige : contrainte réglementaire, contrat client, ou SLO au-delà de 99,95%.

## 2. LA CARTE DU RAYON D'IMPACT

Pour chaque composant, trois colonnes, et la carte se remplit en une heure :

```
composant --> ce qui tombe avec lui --> ce que l'utilisateur voit --> temps de retour
```

| Composant | Rayon d'impact | Vu par l'utilisateur | Retour estimé |
| --- | --- | --- | --- |
| Base principale | écriture et lecture | plus rien ne fonctionne | RTO base |
| Cache | lectures plus lentes | lenteur, service maintenu | quelques minutes |
| File d'événements | synchronisation entre contextes | données périmées, affichage décalé | rattrapage automatique |
| Fournisseur de paiement | encaissement | échec au moment du paiement | dépend du tiers |

La colonne "vu par l'utilisateur" est celle qu'on présente à un non-technicien. Les deux autres servent à décider.

## 3. LE PRIX D'UNE NEUVIÈME, CALCULÉ ET NON RESSENTI

```
coût de la neuvième = facture(topologie cible) - facture(topologie actuelle)
gain = minutes d'indisponibilité évitées * coût d'une minute d'arrêt
```

Le coût d'une minute d'arrêt s'estime avec le métier : revenu horaire perdu, coût de traitement des réclamations, pénalité contractuelle éventuelle. Un ordre de grandeur assumé et daté vaut mieux que l'absence de chiffre.

Intuition : une assurance ne s'achète pas au sentiment, mais en comparant la prime au sinistre probable. Une neuvième supplémentaire est exactement une prime d'assurance.

## 4. LES DÉPENDANCES QUI ANNULENT TA REDONDANCE

Trois cas classiques où l'on paie du multi-zone sans l'obtenir :

1. Une **dépendance mono-zone** dans la chaîne : un service tiers, un cache, un montage de fichiers. Le maillon faible fixe la disponibilité réelle.
2. Une **bascule jamais testée** : la réplique existe, personne n'a jamais vérifié que le basculement fonctionne, ni combien de temps il prend.
3. Un **plan de contrôle partagé** : DNS, gestionnaire de secrets, chaîne de déploiement. S'ils tombent, la redondance des données ne sert à rien.

Risque réel : une facture multi-zone payée douze mois pour une disponibilité mono-zone constatée le jour de l'incident. C'est le pire des deux mondes, et c'est fréquent.

## 5. EXERCICES

**Exercice 1 : la carte d'impact (25 min).** Remplis le tableau de la section 2 pour ton fil rouge, tous composants inclus, tiers compris.

**Exercice 2 : le prix de la neuvième (20 min).** Prends ton SLO actuel. Chiffre le passage au palier supérieur, en euros par mois, et écris la phrase que tu dirais au commanditaire : "cette neuvième coûte X par mois, et voici ce qu'elle évite".

**Exercice 3 : le maillon faible (15 min).** Cherche dans ta carte la dépendance qui plafonne ta disponibilité réelle. Écris ce que tu ferais si le budget augmentait de 20%, et ce que tu ferais s'il n'augmentait pas.

## RÉSUMÉ

Trois topologies, trois promesses, trois factures : le multi-zone se justifie vite, le multi-région rarement et par écrit. Le rayon d'impact se cartographie composant par composant, avec la colonne "ce que voit l'utilisateur". Une neuvième supplémentaire est une prime d'assurance qui se compare au coût d'une minute d'arrêt. Et une redondance annulée par un maillon mono-zone est une dépense pure.

## ET APRÈS

Reste à choisir un fournisseur sans se laisser enfermer : [05_choisir_fournisseur.md](05_choisir_fournisseur.md).
