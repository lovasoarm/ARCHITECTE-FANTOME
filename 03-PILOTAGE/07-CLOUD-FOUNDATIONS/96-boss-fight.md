---
stability: evolutif
acte: pilotage
noyau: oui
type: boss
cognitive_level: L9
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# BOSS FIGHT : MODULE 07 : LA FACTURE A TRIPLÉ CE MOIS-CI

Durée : 3 h. Un essai par semaine.

## Le scénario

La facture passe de 180 € à 560 € sans déploiement notable. La direction demande une réponse
aujourd'hui : cause, correction, et engagement chiffré pour le mois prochain.

## Les manches

1. **Instruire (45 min)** : décompose la facture par poste et trouve le poste responsable. Produis le
   tableau avant/après, en unités facturées, pas en euros seulement.
2. **Reproduire (30 min)** : écris la chaîne causale : quel changement de trafic ou de configuration
   produit ce poste. Une hypothèse non vérifiable est rejetée.
3. **Corriger (45 min)** : applique un levier réel sur ton projet (cache, rétention, extinction), et
   **mesure** l'effet sur 24 h.
4. **Engager (30 min)** : écris l'engagement du mois suivant : plafond, alerte de dépassement à 80 %,
   et ce que tu arrêtes si le plafond est atteint.
5. **Porter (30 min)** : chiffre le même mois chez un second fournisseur avec ton relevé daté, et
   conclus : rester ou partir, avec le coût de sortie.

## Conditions de passage

- [ ] Poste responsable identifié avec des unités, pas des intuitions.
- [ ] Levier appliqué **et** mesuré (avant/après, 24 h minimum).
- [ ] Plafond + alerte à 80 % en place.
- [ ] Relevé tarifaire personnel daté de moins de 30 jours.
- [ ] Gate sécurité : la réduction de rétention ne casse aucune obligation de conservation ; écris-le.

## Échec automatique

Répondre en euros sans unité facturée. Recopier `07-RELEVE-REFERENCE-2026.md`. Promettre une baisse non
mesurée.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `07-CLOUD-FOUNDATIONS` ensemble. Il se passe une fois, sur artefact.

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

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
