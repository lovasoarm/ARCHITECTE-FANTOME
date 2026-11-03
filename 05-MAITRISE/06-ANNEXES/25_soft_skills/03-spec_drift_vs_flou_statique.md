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

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** « L'écran doit être rapide » est un flou statique tant qu'aucun seuil n'est donné. Après validation d'un objectif p95 inférieur à 200 ms, une demande ultérieure porte ce seuil à 120 ms : c'est un drift, car une exigence auparavant claire change. Le premier cas appelle une question de clarification ; le second appelle une modification datée du contrat et une nouvelle mesure. La réponse ne doit ni inventer le premier seuil ni ignorer le deuxième.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Spec drift vs flou statique » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Distinguer ambiguïté initiale et dérive

```text
besoin initial
     |
     v
spécification écrite
     |
     v
comportement observé
     |
     v
ambiguïté initiale ou dérive ?
     |
     v
clarification / décision de changement
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Spec drift vs flou statique** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Détecter dérive de spécification et ambiguïté initiale

**Mission liée à « Spec drift vs flou statique » :** Compare pour une fonctionnalité Kintana le besoin initial, la décision écrite et le comportement observé. Classe chaque écart comme omission, changement accepté ou dérive non décidée.

**Livrable :** Table de traçabilité besoin/décision/comportement et proposition de clarification.

**Critères d’acceptation :** Les changements acceptés sont distingués des écarts accidentels ; chaque divergence a un propriétaire et une prochaine action.

**Transfert obligatoire :** Une demande nouvelle arrive en cours de réalisation : mets à jour le contrat sans réécrire rétroactivement l’historique.
