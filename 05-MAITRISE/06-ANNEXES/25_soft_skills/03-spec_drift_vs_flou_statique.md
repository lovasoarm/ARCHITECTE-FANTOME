---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Spec drift vs flou statique

Temps de lecture ~4 min

> W.7 opererationnalise. Ce fichier existe pour que la distinction
> "flou statique vs flou mouvant" ne reste pas une note orale.

## Le flou statique

- La spec est floue **au depart**.
- Elle ne change pas pendant que tu codes.
- Symptome : tu passes 2 h a la clarifier, puis tu implementes tranquille.
- Reflexe : question fermee au PO, ADR courte, on avance.

## Le spec drift (flou mouvant)

- La spec est claire au depart.
- Elle **change en cours de sprint**, parfois plusieurs fois par jour.
- Symptome : tu refais la meme fonction trois fois avec des criteres
  differents. Tu perds pied. Tu deviens agressif en review.
- Reflexe : pas plus de clarification. Il faut un dispositif :
  1. `05-SPEC-DRIFT-TRIGGERS.md` (voir mini-projet 18) : liste des signaux
     qui declenchent une revalidation systematique de la spec.
  2. Log par commit du "quel etait le critere au moment ou j'ai commite".
  3. Refus des changements silencieux : toute mutation de spec passe par
     un ADR ou elle n'a pas eu lieu.

## Pourquoi ca compte

Un dev qui confond les deux :

- traite un drift comme un flou statique -> il reclarifie sans fin, il
  brule son capital de sympathie et il livre en retard.
- traite un flou statique comme un drift -> il installe de la
  bureaucratie inutile la ou une simple question aurait suffi.

## Ou ca vit dans le curriculum

- Trigger technique : `02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/05-SPEC-DRIFT-TRIGGERS.md`.
- Mental : ce fichier.
- Communication : `03-PILOTAGE/10-TEAM-CRAFT/09-how_to_ask.md`.

## Test binaire

Tu maitrises la distinction si tu peux, en 30 s, dire pour un ticket
donne : "flou statique -> je pose 2 questions" ou "drift -> j'installe
un ADR + un log de spec".

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
