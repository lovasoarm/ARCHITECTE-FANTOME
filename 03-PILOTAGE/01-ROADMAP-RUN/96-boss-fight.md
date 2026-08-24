---
stability: intemporel
acte: pratiquer
cognitive_level: L9
perturbation_modes: [solution_concurrente, fausse_piste]
anti_recipe_key: solution_concurrente+fausse_piste
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : coach du village :** tu n'as pas 40 matchs à préparer, tu en as trois cette semaine. La question n'est donc pas “que peut-on construire ?” mais “quel pari vaut le terrain maintenant ?”.

# Boss Fight : Un sponsor qui veut une date avant que tu aies un plan

## Contrainte de temps

```text
CONTRAINTE DE TEMPS
Reflexion + reponse ecrite : 30 min chrono
Au-dela : tu notes ou tu en etais a 30 min, et tu evalues CETTE
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

Tu es en charge du projet de refacturation d'énergie pour le syndic de 40 immeubles (voir
`01-01-why-this-level.md`). Il est 9h. Le directeur du syndic t'appelle : il a un rendez-vous
avec le conseil syndical dans deux heures et doit leur annoncer une date de mise en
production, "pour les rassurer". Il te demande : "Tu peux me donner une date maintenant ? Je
sais que c'est tôt, donne-moi juste un ordre de grandeur, on affinera après."

Tu n'as pas encore vérifié si les tantièmes des 40 immeubles totalisent bien 10 000 chacun
(hypothèse à risque identifiée mais non testée). Tu n'as pas non plus le format d'export
attendu par le prestataire d'impression des factures. Tu sais, par expérience, qu'une date
"provisoire" donnée sous pression devient systématiquement la date officielle dans l'esprit
de tout le monde sauf le tien.

## Ce qu'on attend de toi

Rédige, comme si tu répondais réellement au directeur au téléphone, ta réponse complète.
Elle doit :

1. Ne pas donner de date ferme sans avoir vérifié le risque le plus cher : mais sans dire
   simplement "je ne sais pas", ce qui ne rassure personne et ne répond pas au besoin réel
   du directeur (rassurer le conseil syndical dans deux heures).
2. Proposer une alternative concrète que le directeur peut réellement utiliser dans sa
   réunion de 11h : par exemple un engagement vérifiable à court terme plutôt qu'une date
   finale incertaine.
3. Expliquer, en une ou deux phrases utilisables par un non-technicien, pourquoi donner une
   date maintenant serait plus risqué que d'attendre trois jours pour vérifier les
   tantièmes.
4. Fixer toi-même, dans ta réponse, une date de rendez-vous où tu reviendras avec une
   vraie date : pas "je te tiens au courant", un engagement précis et daté.

## Ce que ce boss fight entraîne vraiment

Ce n'est pas un exercice de planning, c'est un exercice de posture sous pression sociale. La
compétence technique de ce niveau (risk-first planning) ne sert à rien si tu craques dès
qu'un sponsor insiste. Le vrai boss ici, c'est l'envie de faire plaisir tout de suite au
détriment de la vérité trois semaines plus tard.

---

_Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée._

## Grille d'évaluation

| Critère                  | Ce qui est raté                                                                                     | Ce qui est réussi                                                                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gestion de la pression   | Tu cèdes et donnes une date pour faire plaisir, ou tu refuses sèchement sans proposer d'alternative | Tu proposes une alternative concrète et utilisable dans les deux heures                                                                                                          |
| Communication du risque  | Tu utilises du jargon de planning ("on n'a pas fini le risk assessment")                            | Tu formules le risque en conséquence business compréhensible ("si les tantièmes sont faux, certains copropriétaires seront sur- ou sous-facturés, ce qui est pire qu'un retard") |
| Engagement               | Tu restes vague sur la suite ("je te recontacte")                                                   | Tu fixes une date précise de retour avec un livrable nommé                                                                                                                       |
| Cohérence avec le niveau | Tu donnes une date basée sur une somme de tâches connues                                            | Tu expliques que la date dépend d'abord de la vérification du risque le plus cher                                                                                                |

## Seuil de validation chiffré

| Critère                  | Points  |
| ------------------------ | ------- |
| Gestion de la pression   | 20      |
| Communication du risque  | 30      |
| Engagement               | 25      |
| Cohérence avec le niveau | 25      |
| **Total**                | **100** |

```text
< 50   --> boss-fight non valide, la scène est a refaire apres relecture de la lecon concernee
50-69  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89  --> valide, le reflexe est en place
90-100 --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 70/100. En dessous, le niveau n'est pas considéré comme acquis, même si le
texte rendu est bien écrit.

**Éliminatoire :** Si "Communication du risque" est noté en dessous de 12/30, le total est plafonné à 50/100 : donner une date sans exposer le risque qui la menace revient à mentir par omission au sponsor, ce qui coûte plus cher que dire non tout de suite.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `01-ROADMAP-RUN` ensemble. Il se passe une fois, sur artefact.

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

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
