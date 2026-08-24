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
