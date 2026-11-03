---
stability: evolutif
acte: pilotage
noyau: oui
type: challenge
cognitive_level: L4
perturbation_modes: [regression, changement_contexte]
anti_recipe_key: regression+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# CHALLENGE : `06A-BUDGET-CLOUD.md`

Temps de lecture ~2 min

Durée : 1 h 30. Solo.

## Livrable unique : `06A-BUDGET-CLOUD.md` dans ton fil rouge

1. L'action utilisateur représentative et sa consommation détaillée.
2. La facture mensuelle aux trois paliers (100 / 10 000 / 1 000 000), une ligne par poste, egress
   inclus, coûts fixes inclus.
3. Les hypothèses, écrites à côté des nombres.
4. Le **relevé personnel daté** : où tu as lu chaque prix, quel jour, avec la capture ou l'URL.
5. Les trois leviers que tu appliquerais si la facture doublait, chiffrés.
6. Le coût de sortie du fournisseur choisi.

## Interdit

Reprendre les valeurs de `07-RELEVE-REFERENCE-2026.md`. Elles servent de contrôle de vraisemblance, pas
de source.

## Barème (12 points, 9 pour passer)

Trois paliers complets (3) · egress présent et non nul (2) · hypothèses explicites (2) · relevé daté
et sourcé (3) · coût de sortie chiffré (2).

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.


## Barrière de réussite non compensable

Une erreur critique de sécurité, d'intégrité des données ou de falsification de preuve entraîne une reprise ciblée, même si le total de points atteint le seuil. Une simulation doit être nommée comme simulation ; elle ne vaut pas preuve de production.

## Vérification papier / exécution cloud

Sur papier, le challenge doit fournir un diagramme réseau, une matrice identité/permission, des frontières de données, un chemin de déploiement, un budget estimé avec région/date/source, un modèle de panne et une procédure de restauration. Une architecture qui ne mentionne pas l'identité de service, la sortie réseau, les sauvegardes et le coût de sortie est incomplète. Les prix ne doivent pas être figés sans date et région. La validation cloud réelle exige un environnement contrôlé, un budget plafond et un plan de destruction des ressources ; elle n'est pas déclarée exécutée par le présent audit.
