---
stability: intemporel
acte: pratiquer
cognitive_level: L9
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Boss Fight : La demande impossible du vendredi

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

## Situation

Vendredi 16h. Le client (le cabinet vétérinaire) appelle en direct : "Il faut que la confirmation
de rendez-vous soit instantanée, les clients au téléphone n'attendent pas. On lance lundi matin,
c'est déjà annoncé aux clients par SMS." Ton lead technique est en congé. Le backend de vérification
de disponibilité met actuellement 1,5 seconde à répondre en moyenne, jusqu'à 4 secondes aux heures
de pointe (deux praticiens, planning chargé). Tu sais qu'une confirmation optimiste sur un
créneau peut créer un double rendez-vous en cas de conflit : situation déjà vécue par le passé sur
ce même produit (voir la leçon 1). Le commercial qui a vendu la deadline n'a jamais mentionné la
réservation concurrente aux clients pendant la démo.

Tu as jusqu'à lundi 8h.

## Contraintes réelles à tenir en tête

- Tu ne peux pas changer le temps de réponse du backend de disponibilité en un week-end.
- Une confirmation optimiste fausse un jour d'ouverture, avec des clients réels au bout du fil, est
  un incident de confiance, pas un bug technique mineur.
- Refuser purement et simplement "l'instantané" sans proposition alternative va probablement être
  entendu comme un blocage technique, pas une décision produit.

## Ce qu'on attend de toi

Une proposition écrite (une page maximum) qui :

1. Explique en langage non technique pourquoi l'optimisme pur est dangereux ici, avec l'exemple du
   double rendez-vous, sans jargon d'état ou de race condition brut.
2. Propose une alternative concrète qui donne une sensation de rapidité sans mentir sur le résultat
   (par exemple : retour visuel instantané "Réservation en cours" en moins de 200ms, confirmation
   réelle affichée dès que le serveur répond, avec un message honnête en cas de conflit).
3. Donne un chiffre : le temps perçu réel de ta proposition (feedback immédiat + confirmation réelle
   sous 1,5 à 4 secondes) comparé au risque du tout-optimiste (rendez-vous parfois faux, corrigé a
   posteriori par un appel de l'accueil).
4. Dit clairement ce qui n'est pas faisable d'ici lundi et pourquoi, sans dramatiser ni minimiser.

---

_Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée._

## Grille d'évaluation

| Critère                             | Insuffisant                                                        | Correct                                               | Solide                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Compréhension du risque métier      | Ignore le risque de doublon ou le traite comme un détail technique | Le mentionne                                          | L'illustre avec l'impact concret sur un client réel                                                      |
| Qualité de l'alternative proposée   | Refuse sans alternative, ou accepte l'optimiste pur sans garde-fou | Propose un compromis vague                            | Propose un mécanisme précis (feedback instantané + confirmation réelle) réalisable dans le délai         |
| Communication vers le non-technique | Utilise du jargon (race condition, idempotence) sans traduire      | Reste compréhensible mais générique                   | Convainc avec un exemple concret et un chiffre                                                           |
| Honnêteté sur les limites           | Prétend que tout est faisable                                      | Dit que ce n'est pas faisable sans expliquer pourquoi | Explique la contrainte réelle (temps de réponse backend) et propose un plan pour l'améliorer après lundi |

## Seuil de validation chiffré

| Critère                             | Points  |
| ----------------------------------- | ------- |
| Compréhension du risque métier      | 30      |
| Qualité de l'alternative proposée   | 25      |
| Communication vers le non-technique | 20      |
| Honnêteté sur les limites           | 25      |
| **Total**                           | **100** |

```text
< 50   --> boss-fight non valide, la scène est a refaire apres relecture de la lecon concernee
50-69  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89  --> valide, le reflexe est en place
90-100 --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 70/100. En dessous, le niveau n'est pas considéré comme acquis, même si le
texte rendu est bien écrit.

**Éliminatoire :** Si "Compréhension du risque métier" est noté en dessous de 12/30, le total est plafonné à 50/100 : ignorer ou minimiser le risque de double rendez-vous rend le reste de la proposition dangereux à livrer, aussi bien écrit soit-il.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `01-USER-WIZARD` ensemble. Il se passe une fois, sur artefact.

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
