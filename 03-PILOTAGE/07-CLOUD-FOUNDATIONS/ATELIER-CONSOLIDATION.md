---
stability: intemporel
acte: pratiquer
assessment_role: instructional_checkpoint
---

# Atelier de consolidation : 07-CLOUD-FOUNDATIONS

> **Statut : remédiation documentaire, pas certification.** Le corrigé associé contient les résultats attendus ; ne l'ouvre qu'après ta tentative. Leçon source : [02-modeles_cout.md](02-modeles_cout.md) et [07-RELEVE-REFERENCE-2026.md](07-RELEVE-REFERENCE-2026.md). Les chiffres de la seconde ressource sont une simulation fictive, pas des tarifs réels.

## Objectif

Apprendre à passer d'hypothèses de consommation à un budget mensuel, puis repérer quand une comparaison est invalide. Cet atelier se fait sur papier ou dans un fichier Markdown ; aucune commande ni infrastructure cloud n'est nécessaire.

## Préparation

Ouvre le modèle S1 et relève les paramètres de simulation : 0,02 €/vCPU-h, 0,023 €/GB-mois, 0,08 €/GB d'egress, les forfaits fictifs de base et d'observabilité. Garde l'étiquette `SIMULATION` visible sur chaque résultat.

## Pratique graduée

**Guidé : 15 min.** Recalcule le palier 10 000 utilisateurs : calcul (7 000 vCPU-h), base managée (forfait 210 €), stockage (20 GB), egress (180 GB), observabilité (forfait 25 €). Écris une formule par ligne et une somme finale.

**Semi-guidé : 20 min.** Multiplie uniquement le volume d'egress par dix. Avant de calculer, prédis le nouveau coût d'egress et l'écart avec la facture initiale. Laisse tous les autres postes inchangés.

**Indépendant : 30 min.** Prends une ligne du relevé réel que tu as construit, puis compare-la au paramètre simulé correspondant. Si la région, le SKU, l'unité ou les conditions ne sont pas comparables, explique pourquoi au lieu de produire un pourcentage trompeur. Hors ligne, effectue la comparaison uniquement à l'intérieur du modèle simulé.

## Cas négatif

Retire la région et la configuration SKU d'une ligne tarifaire réelle. Décide si le montant reste défendable. Explique quelle information manque et ce qui doit être vérifié avant de comparer deux offres.

## Remise et réussite

Produis `preuve.md` avec : hypothèses, formules, prédiction, calcul, résultat, comparaison, cas non comparable et limite. Réussite : cinq postes calculés sans erreur d'unité, somme exacte, effet du facteur ×10 correct et aucune donnée fictive présentée comme tarif réel.

**Corrigé distinct :** `corriges/ATELIER-CONSOLIDATION-CORRIGE.md`, à consulter après la remise.
