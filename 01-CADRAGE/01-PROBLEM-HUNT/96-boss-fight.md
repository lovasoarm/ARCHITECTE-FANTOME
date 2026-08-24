---
stability: intemporel
acte: pratiquer
cognitive_level: L9
perturbation_modes: [constraints_injectees, fausse_piste]
anti_recipe_key: constraints_injectees+fausse_piste
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Boss Fight : Problem Hunt

## Contrainte de temps

```text
CONTRAINTE DE TEMPS
Reflexion + reponse ecrite : 25 min chrono
Au-dela : tu notes ou tu en etais a 25 min, et tu evalues CETTE
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

Tu es sur le projet du réseau de cabinets vétérinaires (voir `95-challenge.md`). Ton document de
cadrage est terminé et validé par la direction. Une semaine plus tard, en réunion de lancement
technique, le directeur général : qui n'était pas présent lors du cadrage initial : dit ceci :

> "En fait j'ai réfléchi, ce qu'il nous faut vraiment c'est une appli complète de gestion de
> rendez-vous en ligne pour les propriétaires d'animaux, avec paiement intégré. Les urgences,
> c'est un détail, le vrai enjeu commercial c'est de moderniser l'image du réseau. On peut
> lancer ça dans un mois, l'équipe de dev a l'air compétente."

Il ajoute : "de toute façon, votre document de cadrage, c'est juste du papier, ce qui compte
c'est ce qu'on livre."

Tu as trente minutes avant la fin de la réunion pour répondre. Le reste de l'équipe technique
te regarde. La direction financière du réseau, également présente, semble sensible à
l'argument "modernisation de l'image".

## Ce que tu dois faire

Rédige, en markdown, ta réponse telle que tu la formulerais réellement à l'oral dans cette
réunion, puis un paragraphe d'analyse à part expliquant ta stratégie. Ta réponse doit :

- Ne pas rejeter l'idée du directeur général sur un ton de mépris ou de supériorité
  méthodologique : il a un vrai enjeu business, pas une lubie.
- Distinguer clairement, dans ton argumentation, le job to be done déjà identifié (urgences)
  du nouveau besoin proposé (image de marque, rendez-vous en ligne), sans prétendre qu'ils
  sont incompatibles à terme.
- Utiliser au moins un signal faible ou une donnée concrète de ton document de cadrage pour
  ancrer ta réponse dans du réel plutôt que dans un principe abstrait ("il faut suivre le
  cadrage").
- Proposer une voie qui ne soit ni un refus net ni une capitulation totale sur le mois annoncé.

---

_Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée._

## Grille d'évaluation

| Critère                                       | Ce qui est évalué                                                     | Signal d'échec                                                   |
| --------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Respect du besoin de l'interlocuteur          | La réponse reconnaît l'enjeu business réel du directeur               | La réponse le traite comme une distraction sans valeur           |
| Usage du cadrage comme outil, pas comme dogme | Le cadrage sert à éclairer la décision, pas à la bloquer par principe | La réponse se limite à "on a déjà décidé, on ne change pas"      |
| Ancrage dans le réel                          | Au moins un signal faible ou une donnée concrète est cité             | La réponse reste abstraite, sans preuve terrain                  |
| Proposition constructive                      | Une troisième voie est proposée, avec un chemin concret               | La réponse est un simple oui ou un simple non                    |
| Tenue de la relation                          | Le ton reste collaboratif, pas défensif ni condescendant              | Le ton laisse penser que le directeur a tort d'avoir une opinion |

## Seuil de validation chiffré

| Critère                                       | Points  |
| --------------------------------------------- | ------- |
| Respect du besoin de l'interlocuteur          | 15      |
| Usage du cadrage comme outil, pas comme dogme | 25      |
| Ancrage dans le réel                          | 20      |
| Proposition constructive                      | 20      |
| Tenue de la relation                          | 20      |
| **Total**                                     | **100** |

```text
< 50   --> boss-fight non valide, la scène est a refaire apres relecture de la lecon concernee
50-69  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89  --> valide, le reflexe est en place
90-100 --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 70/100. En dessous, le niveau n'est pas considéré comme acquis, même si le
texte rendu est bien écrit.

**Éliminatoire :** Si "Usage du cadrage comme outil, pas comme dogme" est noté en dessous de 10/25, le total est plafonné à 55/100 : brandir le document de cadrage comme un mur au lieu d'un outil de décision est l'échec exact que ce niveau existe pour éviter.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `01-PROBLEM-HUNT` ensemble. Il se passe une fois, sur artefact.

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

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
