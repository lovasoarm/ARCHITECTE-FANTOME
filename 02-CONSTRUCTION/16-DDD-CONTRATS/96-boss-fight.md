---
stability: intemporel
acte: construction
noyau: oui
type: boss
cognitive_level: L9
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# BOSS FIGHT : MODULE 16 : LA RUPTURE DE CONTRAT EN DIRECT

Durée : 3 h, chronomètre lancé. Un seul essai par semaine.

## Le scénario

Vendredi 16 h. Ton API v1 est consommée par trois clients : ton propre front, un partenaire, et un
script de reporting interne. Le métier impose une évolution qui **casse** : le champ `statut` passe
de texte libre à un enum de cinq valeurs, et deux statuts historiques disparaissent.

## Les cinq manches

1. **Cartographie (30 min)** : qui consomme quoi, avec quel volume. Produit : un tableau à trois
   colonnes (client, appels/jour, champs utilisés). Le volume est mesuré, pas estimé.
2. **Contrat v2 (45 min)** : publie la v2, garde la v1 servie, ajoute la traduction bidirectionnelle
   des deux statuts disparus. Aucun client ne tombe pendant la manche.
3. **Preuve (45 min)** : jeu de cas exécutable des deux versions, rejoué en CI. Une v1 non testée
   pendant le double service est une v1 déjà cassée.
4. **Extinction datée (30 min)** : en-tête `Sunset`, entrée de changelog, message d'annonce au
   partenaire en 10 lignes, sans jargon.
5. **Contradiction (30 min)** : un contradicteur (réel ou la passe écrite de
   [../../06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md))
   attaque ta date d'extinction comme trop courte. Tu tiens ou tu bouges, par écrit, avec un chiffre.

## Conditions de passage (toutes obligatoires)

- [ ] Zéro requête client en erreur pendant la bascule, prouvé par les logs.
- [ ] La v1 et la v2 passent le même jeu de cas métier, avec traduction.
- [ ] Une date d'extinction existe, avec le nom du responsable et le canal d'annonce.
- [ ] Gate sécurité : la v2 n'expose aucun champ nouveau non prévu au contrat (diff de schéma joint).
- [ ] `ADR/rupture-contrat.md` est écrit et daté.

## Échec automatique

Renommer un champ sans double service. Annoncer une extinction sans date. Découvrir un consommateur
après la bascule.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `16-DDD-CONTRATS` ensemble. Il se passe une fois, sur artefact.

Les quatre actes se cochent dans l'ordre, et aucun ne se coche sur une lecture :

- [ ] **Construire** : le livrable existe, il tourne, il est daté dans ton dépôt.
- [ ] **Expliquer** : tu le racontes en cinq lignes à quelqu'un qui n'a pas le contexte.
- [ ] **Justifier** : tu écris le critère qui a tranché, et l'option que tu as écartée.
- [ ] **Défendre** : le contradicteur attaque le point faible, tu réponds par écrit.

Un acte non coché n'est pas un retard : c'est le palier qui n'est pas fini. Reporte le
résultat dans [PROGRESSION.md](../../PROGRESSION.md).

<!-- VERDICT-BOSS:fin -->

<!-- GATE-SECURITE:debut -->

## Gate sécurité : la porte qui ne s'ouvre pas sans elle

Un livrable d'architecture ne se rend pas sans ces deux vérifications. Elles ne sont pas
des bonus : un livrable qui les rate est refusé, même si tout le reste est juste.

- [ ] **Aucun secret en clair** : aucune clé d'API, aucun mot de passe, aucune donnée sensible
      dans le dépôt, les captures, les logs ou les exemples. Tu montres où ils sont lus à la place.
- [ ] **Rayon d'impact écrit** : tu nommes qui peut lire quoi, et ce que coûte une fuite —
      la surface d'attaque et l'impact en cas de fuite, en une phrase chacun.

<!-- GATE-SECURITE:fin -->

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
