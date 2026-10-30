---
stability: stable
acte: preuve
noyau: non
route: depth
---

# Contrat commun de preuve : Projets avancés 2035+

Ce contrat s'applique aux dix projets. Le README du projet précise les critères spécifiques ; cette page définit le minimum commun.

## Avant de coder

- [ ] `PROBLEM.md` : utilisateur, problème observé, contraintes, non-objectifs, critère de succès et risque le plus grave.
- [ ] `THREAT-MODEL.md` : actifs, acteurs, frontières de confiance, chemins abusifs plausibles et contrôles choisis.
- [ ] Au moins deux options d'architecture comparées dans un ADR, y compris une option plus simple ou l'option de ne pas construire.
- [ ] `TEST-PLAN.md` : cas normaux, limites, abus, panne, récupération, performance/coût si pertinents ; seuils fixés avant la mesure.
- [ ] Budget de ressources : mémoire, CPU, stockage, bande passante, appels externes et plafonds financiers. Utiliser `non mesuré` plutôt qu'un chiffre inventé.

## Pendant la construction

- Découper en petites tranches démontrables ; tenir un journal des hypothèses qui ont changé.
- Garder un chemin de reproduction pour les bugs, les benchmarks et les incidents.
- Ajouter les tests d'une régression au moment où elle est comprise.
- Préserver une branche ou un commit de la version cassée utile pour l'apprentissage ; ne jamais conserver une faille exposée dans un service public.
- Si l'IA aide à produire du code, noter les parties générées, vérifier les dépendances et licences pertinentes et être capable de justifier le résultat sans l'IA.

## À la sortie

Le dossier du projet contient au minimum :

1. code versionné et instructions de reprise sur une machine propre ;
2. tests automatiques et sorties réelles datées ;
3. ADR et diagramme suffisamment simples pour être révisés ;
4. menace et contrôles ;
5. scénario d'échec et postmortem ;
6. mesures avant/après quand une amélioration est revendiquée ;
7. S6 livraison/exploitation ; G8 évaluation IA quand le projet utilise de l'IA ou comme exercice transversal AF ;
8. “What this proves / does not prove” ;
9. retour d'une personne indépendante et modification faite à la suite de ce retour ;
10. `NEXT.md` : la prochaine limitation importante, pas une liste de rêves.

## Épreuve anti-illusion

Après la première version, tirer au sort une modification non annoncée : contrainte de latence, suppression d'un service, changement de schéma, baisse de budget, nouvel utilisateur avec permissions différentes, sortie IA malformée ou panne de processus. Expliquer le modèle avant de corriger. Si la modification est copiée d'une solution déjà vue, choisir un autre cas.

## Échelle de maturité des preuves

- **T0 : Simulation AF :** local, fixtures synthétiques, aucun utilisateur extérieur.
- **T1 : Projet personnel vivant :** maintenu dans le temps et utilisé pour ton propre besoin.
- **T2 : Pair / association / petit groupe :** retours et usages documentés d'autres personnes.
- **T3 : Client, mission ou open source :** revue externe, issue ou usage réel vérifiable.
- **T4 : Production suivie :** responsabilité soutenue, exploitation, incidents, évolutions et impact documentés.

Une sophistication technique n'augmente pas automatiquement le niveau T0–T4.

## Barème commun (100 points)

| Domaine                                 | Points | Échec éliminatoire                                       |
| --------------------------------------- | -----: | -------------------------------------------------------- |
| Problème et résultats utilisateurs      |     10 | Produit sans besoin ou critère de succès                 |
| Modèle technique et ADR                 |     15 | Choix non défendable ou risques cachés                   |
| Comportement et tests                   |     15 | Pas de reproduction indépendante                         |
| Sécurité et confidentialité             |     15 | Secret, droit d'accès ou action dangereuse non contrôlée |
| Panne, récupération et observabilité    |     15 | Échec critique non détectable ni récupérable             |
| Performance, coût et limites            |     10 | Affirmation chiffrée sans mesure                         |
| Maintenance, docs et automatisation     |     10 | Installation/reprise non reproductible                   |
| Explication, transfert et contradiction |     10 | Incapacité à expliquer ou modifier le système            |

**Verdict :** `PASS` à partir de 80/100 avec aucun échec éliminatoire ; `REVISE` si la preuve est prometteuse mais incomplète ; `FAIL` si un contrôle critique échoue. Le score ne vaut pas grade professionnel.
