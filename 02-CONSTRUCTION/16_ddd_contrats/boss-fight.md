---
stability: intemporel
acte: construction
noyau: oui
type: boss
---

# BOSS FIGHT — MODULE 16 : LA RUPTURE DE CONTRAT EN DIRECT

Durée : 3 h, chronomètre lancé. Un seul essai par semaine.

## Le scénario

Vendredi 16 h. Ton API v1 est consommée par trois clients : ton propre front, un partenaire, et un
script de reporting interne. Le métier impose une évolution qui **casse** : le champ `statut` passe
de texte libre à un enum de cinq valeurs, et deux statuts historiques disparaissent.

## Les cinq manches

1. **Cartographie (30 min)** — qui consomme quoi, avec quel volume. Produit : un tableau à trois
   colonnes (client, appels/jour, champs utilisés). Le volume est mesuré, pas estimé.
2. **Contrat v2 (45 min)** — publie la v2, garde la v1 servie, ajoute la traduction bidirectionnelle
   des deux statuts disparus. Aucun client ne tombe pendant la manche.
3. **Preuve (45 min)** — jeu de cas exécutable des deux versions, rejoué en CI. Une v1 non testée
   pendant le double service est une v1 déjà cassée.
4. **Extinction datée (30 min)** — en-tête `Sunset`, entrée de changelog, message d'annonce au
   partenaire en 10 lignes, sans jargon.
5. **Contradiction (30 min)** — un contradicteur (réel ou la passe écrite de
   [../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md))
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
