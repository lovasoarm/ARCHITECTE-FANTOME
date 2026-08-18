---
stability: stable
acte: évaluer
---

# Correction LOT 5 — Verrouillage : tout regenere, toutes les regles mordues, 0 refus

Date : 2026-08-18 — LOT 5 du plan de correction (obligatoire avant de declarer 10/10)

## 1. Index et rapports regeneres, dans cet ordre

```bash
node 99-COULISSES/outillage/generer_carte.mjs            # 6 paliers, 56 modules
node 99-COULISSES/outillage/generer_index_dossiers.mjs   # index de dossiers
node 99-COULISSES/outillage/generer_perissabilite.mjs    # index de perissabilite
node 99-COULISSES/outillage/generer_route_survie.mjs     # B1 : 14 etapes, Boss de sortie
node 99-COULISSES/outillage/generer_progression.mjs      # B5 : grille des checkpoints
node 99-COULISSES/outillage/verifier_annexes.mjs         # 13 annexes, 0 refus
node 99-COULISSES/outillage/verifier_univers.mjs         # 0 univers hors liste blanche
node 99-COULISSES/outillage/verifier_numerotation.mjs    # 0 refus
node 99-COULISSES/outillage/verifier_liens.mjs . --ecrire# rapport horodate, empreinte
node 99-COULISSES/outillage/controle_livraison.mjs       # 0 refus
```

Un defaut a ete trouve et corrige au passage : `generer_perissabilite.mjs` produisait un lien
vers `06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md`, fichier deplace lors de A14.
Le generateur renvoie desormais au relevé de reference A5. Le rapport de liens etait donc
« 0 casse » sur un index perime : il est maintenant 0 casse sur l'index regenere.

## 2. Tests de morsure joues (chaque regle nouvelle casse volontairement, puis reparee)

| Regle | Morsure jouee | Refus obtenu |
| --- | --- | --- |
| 1 (dette d'en-tetes, LOT 5) | fichier ajoute sans `acte:` | `EN-TETE-DETTE : 687 en-tetes incomplets pour un plafond declare a 686` |
| 21 (route survie, B1) | `03_testing` passe a `route: complete` | `ROUTE-SURVIE : declare route: complete alors que le filtre dit survie` |
| 21 (route survie, B1) | `ROUTE-SURVIE.md` retire | `ROUTE-SURVIE : ... manque` + 2 refus `LIEN` |
| 22 (progression, B5) | famille `S4` renommee | `PROGRESSION : famille S4 absente du bloc BADGES` |
| 22 (progression, B5) | badge passe a `ACQUIS` | `PROGRESSION : etat de badge hors VIDE | PARTIEL | COUVERT` |
| 22 (progression, B5) | grille modifiee sans regeneration | `PROGRESSION : grille de checkpoints perimee` |

Les regles anterieures (liste blanche racine, chiffres generes, gabarit grimoire, contrat de
validation B4, gate securite A17, Boss a 4 pieces B2, dossiers non vides, 0 lien casse) restent
actives et ont ete rejouees par le controle complet : 22 regles, 0 refus.

## 3. Journal

Une ligne datee par correction dans `99-COULISSES/CHANGELOG-CORRECTIONS.md` (B1, B5, LOT 5
ajoutees), et un rapport par correction dans `99-COULISSES/archives/corrections/`
(`CORRECTION-B1.md`, `CORRECTION-B5.md`, ce fichier).

## 4. Dette d'en-tetes herites

Ni ignoree ni maquillee : declaree, datee et **plafonnee** par
[DECISION-DETTE-ENTETES-HERITES.md](../DECISION-DETTE-ENTETES-HERITES.md). Le plafond est de
686 avertissements, la mesure du jour vaut 686, et le controle refuse desormais toute
augmentation. Le plafond ne se releve jamais : il ne peut qu'etre abaisse.

## 5. Etat final de la grille de sortie

| # | Ligne | Etat |
| --- | --- | --- |
| 1 | 0 lien casse, rapport regenere et horodate | FAIT (rejoue : 1933 `.md`, 4997 liens, 0 casse) |
| 2 | 1 seul comptage de modules, genere depuis le disque | FAIT |
| 3 | 0 fichier de fabrication dans le champ de l'apprenant | FAIT |
| 4 | 0 montant sans URL complete + date | FAIT |
| 5 | S1 a S6 : six familles couvrables, aucune creuse | FAIT (badges B5 adosses aux artefacts) |
| 6 | 0 inversion de prerequis, 0 marqueur « anticipe » | FAIT |
| 7 | 1 seule regle de gabarit grimoire | FAIT |
| 8 | 0 grande section validable sans artefact | FAIT (contrat B4) |
| 9 | 1 Boss tous les deux modules, 4 pieces | FAIT (B2) |
| 10 | 6 niveaux visibles au premier ecran | FAIT (B3) |
| 11 | 1 route survie explicite, sans duplication, finissant par une soutenance | FAIT (B1) |
| 12 | 1 seul fichier de progression, alimente par des artefacts | FAIT (B5) |

Critere d'arret atteint : douze lignes sur douze, chacune verifiee par une commande, aucune
par une opinion.
