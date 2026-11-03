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

<!-- AF-DIAGRAM:portfolio -->

## Repère visuel utile : Dossier de preuve examinable

```text
problème -> rôle -> artefact
                   |
                   v
             commande reproductible
                   |
                   v
             résultat + limites
                   |
                   v
             revue / objection
                   |
                   v
             preuve renforcée ou claim retiré
```

<!-- AF-LESSON-PROFILE: portfolio -->

## Repères de décision

- **Pourquoi :** Un portfolio crédible relie compétence, artefact, décision et résultat sans transformer une simulation en expérience réelle.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour montrer ton travail à un reviewer, entretien ou équipe. Mets en avant une preuve profonde plutôt qu'une collection de technologies.
- **Limites :** Un portfolio personnel ne démontre pas à lui seul influence organisationnelle ou impact production. Respecte confidentialité, licences et données non publiques.

## Mécanisme : la version sans magie

Présente le problème, ton rôle, les contraintes, les choix, le code/tests, la mesure, les limites et ce qui a changé après feedback.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pitch : "Pourquoi moi et pas une solution ?"** se rattache à ce cas concret : Les tranches Kintana peuvent servir de cas d'étude LAB ; les contributions externes ou travaux en entreprise doivent être séparés et attestés selon les faits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dossier de preuve examinable

> **Arc Arène Staff :** ton portfolio n'est pas une vitrine de captures. C'est un dossier que quelqu'un peut examiner, contredire et reproduire.

**Mission liée à « Pitch : "Pourquoi moi et pas une solution ?" » :** Transforme une tranche Kintana en dossier de portfolio. Donne accès au commit, aux commandes reproductibles, aux tests, à l'ADR et aux limites. Fais une revue par un pair si possible ; sinon note `EXTERNAL_REVIEW: NOT RUN`.

**Livrable :** une étude de cas courte, liens d'artefacts, résultat de tests, décisions et registre des limites.

**Critères d’acceptation :** ton rôle est précis ; les faits sont datés ; les résultats LAB/PILOT/PRODUCTION sont séparés ; les chiffres sont reproductibles ; aucune contribution d'équipe n'est revendiquée comme individuelle.

**Transfert obligatoire :** Un reviewer conteste une mesure ou un choix. Ajoute la preuve qui manque ou retire la revendication au lieu de défendre un chiffre fragile.
