---
stability: intemporel
acte: pratiquer
cognitive_level: L9
perturbation_modes: [decision_inversee, preuve_partielle]
anti_recipe_key: decision_inversee+preuve_partielle
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Boss Fight : La migration du vendredi et le tarif qui ne peut pas attendre

## Contrainte de temps

```text
CONTRAINTE DE TEMPS
Reflexion + reponse ecrite : 40 min chrono
Au-dela : tu notes ou tu en etais a 40 min, et tu evalues CETTE
version-la. La version finie compte pour ta progression, pas pour
ta note.
```

## Règle d'antériorité (obligatoire)

Écris ta réponse complète dans ton `JOURNAL.md`, horodatée à la minute, AVANT de faire
défiler jusqu'à la grille d'évaluation. La grille est volontairement placée en fin de
fichier.

Si ton horodatage est postérieur à ta première lecture de la grille, ce boss-fight vaut 0,
quelle que soit la qualité de ta réponse. Tu ne triches pas contre un correcteur : tu
triches contre le seul entraînement à la pression que ce niveau te propose.

## La situation

Tu es seul responsable du schéma de refacturation d'énergie. Jeudi soir, le service commercial
t'annonce qu'un nouveau tarif réglementaire entre en vigueur lundi matin à 00h00, décidé par le
régulateur national, sans marge de négociation sur la date. Le schéma actuel de `tarif_energie`
n'a pas de période de validité : une seule ligne "tarif courant" est mise à jour en place à
chaque changement, comme il a toujours été fait depuis la création du logiciel. Le calcul de
facturation du trimestre en cours, déjà à moitié exécuté sur les dix premiers jours d'un cycle
de trente, dépend de cette même table. La table `tarif_energie` est lue à chaque calcul de
facture, plusieurs fois par seconde en période de pointe (fin de trimestre, dans dix jours).

Ton manager te propose la solution la plus rapide qu'il connaît : écrire un script qui, dimanche
soir à minuit, fait un `UPDATE tarif_energie SET prix_kwh = ...` en place, comme d'habitude, et
"on verra pour le vrai historique la prochaine fois qu'on aura du temps, là c'est urgent, le
régulateur ne négocie pas la date". Le service facturation, de son côté, te demande si les
factures déjà émises ce trimestre avec l'ancien tarif devront être recalculées ou pas : personne
ne le sait encore, la réponse dépendra d'un texte réglementaire encore en discussion. Tu as
jusqu'à dimanche soir.

## Les contraintes réelles

- Le changement de tarif est non négociable dans sa date : lundi 00h00, sans exception.
- Le schéma actuel ne distingue pas "tarif courant" de "tarif applicable à telle date" : un
  `UPDATE` en place efface silencieusement la trace du tarif précédent.
- Le calcul de facturation en cours d'exécution touche des factures à cheval sur les deux
  tarifs (dix premiers jours à l'ancien tarif, vingt jours restants au nouveau) : un `UPDATE`
  en place au mauvais moment ferait facturer TOUT le trimestre au nouveau tarif, y compris les
  jours déjà consommés sous l'ancien.
- Personne ne sait encore si les factures déjà émises devront être recalculées rétroactivement
  une fois le texte réglementaire définitif publié : la réponse peut arriver après lundi.

## Ce qu'on attend de toi

Produis une décision écrite (une page maximum) qui :

1. Refuse explicitement le `UPDATE` en place, avec le mécanisme précis de ce niveau qui explique
   pourquoi il produirait un résultat faux, pas seulement "risqué" : illustre avec le cas concret
   des dix jours déjà consommés sous l'ancien tarif.
2. Propose un schéma minimal livrable avant dimanche soir qui introduit une période de validité
   sur `tarif_energie`, sans réécrire tout le système de facturation en urgence.
3. Explique comment le calcul de facturation en cours doit lire le bon tarif selon la date
   réelle de consommation, pas selon la date d'exécution du calcul.
4. Répond à l'incertitude sur le recalcul rétroactif des factures déjà émises : propose une
   décision de modélisation qui reste correcte QUEL QUE SOIT ce que dira le texte réglementaire
   plus tard (indice : la leçon sur les snapshots explicites de facture s'applique directement).
5. Propose une vérification concrète, exécutable dimanche soir avant minuit, qui prouve que le
   nouveau tarif sera bien appliqué à partir de lundi 00h00 sans intervention manuelle supplémentaire.

---

_Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée._

## Grille d'évaluation

| Critère                                       | Ce qui est évalué                                                                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Refus argumenté de l'`UPDATE` en place        | Le refus s'appuie sur le mécanisme précis (perte d'historique, application rétroactive fausse d'un tarif), pas une prudence générique                          |
| Schéma minimal livrable en un jour            | La proposition (colonne de période, contrainte d'exclusion ou vérification applicative) est réellement réalisable dans le délai, sans refonte disproportionnée |
| Cohérence de la lecture du tarif applicable   | La solution garantit que chaque facture lit le tarif en vigueur à la date de la consommation qu'elle facture, pas à la date du calcul                          |
| Robustesse face à l'incertitude réglementaire | La décision reste correcte que le recalcul rétroactif soit finalement exigé ou non, sans pari risqué sur l'une ou l'autre issue                                |
| Vérifiabilité                                 | La vérification proposée est concrète et exécutable, pas un vœu pieux ("on testera bien")                                                                      |

## Seuil de validation chiffré

| Critère                                       | Points  |
| --------------------------------------------- | ------- |
| Refus argumenté de l'UPDATE en place          | 25      |
| Schéma minimal livrable en un jour            | 20      |
| Cohérence de la lecture du tarif applicable   | 20      |
| Robustesse face à l'incertitude réglementaire | 20      |
| Vérifiabilité                                 | 15      |
| **Total**                                     | **100** |

```text
< 50   --> boss-fight non valide, la scène est a refaire apres relecture de la lecon concernee
50-69  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89  --> valide, le reflexe est en place
90-100 --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 70/100. En dessous, le niveau n'est pas considéré comme acquis, même si le
texte rendu est bien écrit.

**Éliminatoire :** Si "Refus argumenté de l'UPDATE en place" est noté en dessous de 10/25, le total est plafonné à 50/100 : accepter ou ne pas refuser clairement l'UPDATE en place produit une facturation fausse en production, quelle que soit la qualité du reste de la copie.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `08-DATA-SPELLS` ensemble. Il se passe une fois, sur artefact.

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

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
