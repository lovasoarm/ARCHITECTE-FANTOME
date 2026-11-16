---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, solution_concurrente]
anti_recipe_key: constraints_injectees+solution_concurrente
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Pitch : "Pourquoi moi et pas une solution ?"

Temps de lecture ~5 min

Trois pitchs types. Adapte, mais garde la structure.

---

## Pitch 1 : Le débuggeur (30s)

> "Une IA génère du code. Elle ne débugge pas un système en prod à 3h du matin quand la métrique s'effondre. Ma valeur, c'est de lire un stack trace, formuler une hypothèse, la vérifier, et écrire un post-mortem qu'un autre dev peut relire dans 6 mois. j'ai fait ça 5 fois dans ce parcours, j'ai les ADR et les LEAK_REPORT pour le prouver."

Preuve à sortir : `02-CONSTRUCTION/02-MINI-PROJECTS/13_memory_hunter/LEAK_REPORT_*.md`.

---

## Pitch 2 : L'architecte (30s)

> "l'IA propose 10 solutions. Elle ne choisit pas. Ma valeur, c'est de peser un trade-off avec le contexte métier, l'écrire dans un ADR, et défendre le choix 6 mois plus tard face à quelqu'un qui n'était pas là. Voici mon ADR sur l'eviction du cache : voilà pourquoi j'ai pris LRU et pas LFU."

Preuve : `../../02-CONSTRUCTION/02-MINI-PROJECTS/13_memory_hunter/ADR/ADR-001_decision.md`.

---

## Pitch 3 : Le passeur (30s)

> "Une solution écrit du code. Elle n'onboarde pas un junior. Ma valeur, c'est de rendre lisible ce que l'équipe fait, dans le code, dans les docs, dans la revue. Voici trois PR où mon commentaire a évité un bug en prod."

Preuve : trois liens PR de ton portfolio.

---

## Anti-pattern

Ne dis **jamais** "je suis meilleur qu'une solution". Dis "j'utilise l'IA comme un stagiaire brillant mais dangereux : je vérifie tout ce qu'elle produit, et je décide". Nuance qui te fait passer de junior à mid.

---

## "Je ne sais pas" vs "Je ne sais pas encore"

Distinction critique en entretien et en revue.

- **"Je ne sais pas."** Fin. Sans plan. Signale un mur.
- **"Je ne sais pas encore."** Ouvre : _"voici comment j'irais chercher la réponse : docs officielles, minimal reproducer, benchmark, question à un pair."_

Un ingénieur crédible dit souvent le second. Jamais le premier tout court.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Un CV affirme « expérience de production Kubernetes », mais la personne n'a déployé qu'un exercice local. La formulation honnête devient « laboratoire local Kubernetes : déploiement simulé, manifeste versionné, aucun trafic réel ni astreinte ». Elle peut ensuite expliquer ce que le lab démontre et ce qu'il ne démontre pas. **Pourquoi :** un pitch crédible ne transforme pas une simulation en expérience de production.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Pitch : "Pourquoi moi et pas une solution ?" » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:pitch_defense -->

## Repère visuel : pitch honnête face à une objection

```text
besoin de l'interlocuteur
          |
          v
problème que je sais traiter
          |
          v
preuve et résultat vérifiables
          |
          v
limites / ce que je ne revendique pas
          |
          v
objection -> réponse sourcée -> prochaine preuve
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Un pitch professionnel aide un interlocuteur à comprendre quelle valeur tu peux apporter et sur quelles preuves repose cette affirmation.
- **Quand l’utiliser / quand l’éviter :** Utilise-le en entretien, en présentation de projet ou pour répondre à une proposition concurrente. Ne transforme pas une promesse future, une contribution d'équipe ou une simulation en résultat personnel acquis.
- **Limites :** Une présentation fluide ne remplace pas la compétence. Le besoin du recruteur, le contexte et les critères du poste déterminent la pertinence du pitch.

## Mécanisme : la version sans magie

Adapte ton message au problème de l’interlocuteur, relie une affirmation à une preuve précise, expose les limites et prépare une réponse factuelle à une objection.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pitch : "Pourquoi moi et pas une solution ?"** se rattache à un entretien pour un rôle d'ingénierie : l'interlocuteur compare une embauche, une solution logicielle déjà disponible et une automatisation. Tu dois répondre à son besoin réel sans te présenter comme interchangeable ni promettre une compétence non démontrée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : défendre une valeur professionnelle sans survendre

**Mission liée à « Pitch : Pourquoi moi et pas une solution ? » :** prépare un pitch de 90 secondes pour un poste choisi. Présente le besoin de l'équipe, une compétence qui répond à ce besoin, une preuve personnelle vérifiable, une limite réelle et la façon dont tu réduirais cette limite. Prépare ensuite trois objections : « un outil IA peut déjà le faire », « tu n'as pas d'expérience de production », « pourquoi ne pas recruter un profil déjà spécialisé ? ».

**Livrable :** `PITCH-90S.md` avec le texte prononçable, le poste ciblé, les liens des preuves, les limites explicites et des réponses courtes aux objections. Sépare ce que tu as réalisé seul, en équipe, en simulation et en production.

**Critères d’acceptation :** chaque affirmation de compétence pointe vers une preuve ; le besoin de l'équipe est traité avant l'auto-promotion ; aucune expérience n'est inventée ; les limites sont assumées ; le pitch reste compréhensible sans jargon non expliqué.

**Transfert obligatoire :** adapte le même pitch à un interlocuteur non technique et à un ingénieur senior. Garde les faits constants, mais change le vocabulaire, la priorité et le niveau de détail.
