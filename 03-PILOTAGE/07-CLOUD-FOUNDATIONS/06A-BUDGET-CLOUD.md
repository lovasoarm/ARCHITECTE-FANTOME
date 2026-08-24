## perishability_id: PER-0061

stability: perissable
acte: appliquer
cognitive_level: L3
perturbation_modes: [regression, changement_contexte]
anti_recipe_key: regression+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# GABARIT VIVANT : 06A-BUDGET-CLOUD.md

Temps de lecture ~2 min

> Relevé le 2026-08-14, chez les fournisseurs cités dans ce fichier, unité indiquée par ligne, URL : pages tarifaires publiques, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle. Protocole imposé : [../../06-ANNEXES-TRANSVERSES/17A-PROTOCOLE-DONNEE-SOURCEE.md](../../06-ANNEXES-TRANSVERSES/17A-PROTOCOLE-DONNEE-SOURCEE.md).

Format imposé du livrable de la famille S1. Copie ce fichier dans `PREUVES/06A-BUDGET-CLOUD.md` de ton dépôt et remplis-le. L'exemplaire rempli de référence est [02-S1-BUDGET-CLOUD.md](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/02-S1-BUDGET-CLOUD.md).

## 1. Hypothèses de trafic

| Palier    | Utilisateurs actifs/mois | Requêtes/s en pointe | Volume stocké | Source de l'hypothèse |
| --------- | ------------------------ | -------------------- | ------------- | --------------------- |
| 100       |                          |                      |               |                       |
| 10 000    |                          |                      |               |                       |
| 1 000 000 |                          |                      |               |                       |

## 2, 3, 4. Facture par palier

Un tableau par palier, une ligne par catégorie, **egress obligatoire même à zéro** :

| Catégorie       | Service | Unité | Coût mensuel | Chez | Relevé le | URL |
| --------------- | ------- | ----- | ------------ | ---- | --------- | --- |
| Calcul          |         |       |              |      |           |     |
| Base de données |         |       |              |      |           |     |
| Stockage objet  |         |       |              |      |           |     |
| Egress          |         |       |              |      |           |     |
| Observabilité   |         |       |              |      |           |     |
| **Total**       |         |       |              |      |           |     |

## 5. Coût par utilisateur actif

Un nombre par palier, et une phrase disant pourquoi il monte, descend ou reste stable.

## 6. Ce que ce budget révèle

La ligne qui explose en premier, et à quel palier elle devient dominante.

## 6bis. Portage chez un second fournisseur

Le même tableau, chez l'autre fournisseur relevé, suivi de la liste "ce qui change de nature, pas seulement de prix" et de la phrase de réversibilité. Consigne complète : [99-PORTAGE-MENTAL.md](99-PORTAGE-MENTAL.md).

## 7. Recroisements obligatoires

- Tenabilité avec `PREUVES/SLO.md` : ce que coûterait la neuvième suivante.
- Reprise dans la section 3 du dossier unique et dans les tensions du capstone.

## Règles de validité

- Chaque chiffre porte ses quatre colonnes de traçabilité : Relevé le, Chez, Unité, URL. Un chiffre sans URL est une opinion datée.
- Aucun montant n'est repris du cours : les montants du repo sont des exemples de forme, pas des sources.
- La ligne egress ne se supprime jamais, même quand elle vaut 0,18 €.
- Une grille tarifaire citée porte une date de péremption, comme dans [04-choisir_fournisseur.md](04-choisir_fournisseur.md).

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
