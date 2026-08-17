# Boss Fight : L'entretien de promotion sans métrique claire

## Contrainte de temps

```text
CONTRAINTE DE TEMPS
Reflexion + reponse ecrite : 60 min chrono
Au-dela : tu notes ou tu en etais a 60 min, et tu evalues CETTE
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

Tu es développeur confirmé depuis deux ans et demi dans une entreprise qui édite un logiciel
de gestion de bibliothèque pour clubs sportifs. Tu demandes une promotion vers un poste
senior. Ton manager te répond que l'entreprise n'a pas de grille de compétences formalisée
pour ce passage : la décision se fera "au ressenti du comité de direction". Tu sais que deux
autres collègues, avec moins d'ancienneté mais plus visibles en réunion, sont aussi en lice.
Tu as un mois avant l'entretien de décision. Tu n'as jamais tenu de portfolio de preuves ni
de journal jusqu'ici.

## Les contraintes réelles

- Aucune grille de compétences écrite n'existe dans l'entreprise ; le comité décide sur
  impression générale et témoignages oraux de managers et pairs.
- Tu as, dans ton historique de travail, plusieurs décisions techniques solides mais jamais
  documentées formellement (choix de modélisation, un incident résolu seul un soir, un
  refus argumenté d'une demande mal posée d'un client interne).
- Un mois est trop court pour bâtir un historique de douze semaines de routine complète.
- Les deux collègues concurrents sont plus à l'aise à l'oral en réunion, ce qui influence
  fortement la perception du comité, indépendamment de la compétence réelle.

## Ce qu'on attend de toi

Produis un plan d'un mois (une page) qui :

1. Reconstruit rétroactivement un portfolio de preuves à partir de ton historique réel
   (git log, tickets fermés, messages Slack d'incident, emails) plutôt que d'attendre d'en
   avoir un "propre" : identifie précisément où chercher ces traces.
2. Choisit trois décisions passées à documenter en priorité sous forme d'ADR ou de
   post-mortem courts, avec le critère explicite de sélection (impact réel, pas
   ancienneté ni facilité à raconter).
3. Propose au manager une façon concrète de rendre la décision moins arbitraire pour tout le
   monde (par exemple une grille de critères minimale à trois axes, réutilisable aussi pour
   les collègues en lice), sans que la démarche paraisse une manœuvre gagnant seulement pour
   toi.
4. Assume explicitement ce qui ne peut pas être rattrapé en un mois (pas de véritable
   historique de routine longue) sans se dévaloriser ni bluffer sur une expérience qui
   n'existe pas.

---

*Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée.*

## Grille d'évaluation

| Critère                             | Ce qui est évalué                                                                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reconstruction honnête du portfolio | Les preuves choisies s'appuient sur des faits vérifiables (commits, tickets, incidents réels), pas sur une reformulation flatteuse a posteriori       |
| Sélection des trois décisions       | Le critère de sélection est explicite et défendable, pas "les plus impressionnantes à raconter"                                                       |
| Proposition de grille au manager    | La grille profite objectivement à tous les candidats, pas seulement à toi : sinon elle sera perçue comme une manipulation et se retournera contre toi |
| Honnêteté sur les limites           | Le plan ne prétend pas rattraper en un mois ce qui demande douze semaines ; il assume la limite et mise sur la qualité plutôt que le volume           |

## Seuil de validation chiffré

| Critère | Points |
| --- | --- |
| Reconstruction honnête du portfolio | 25 |
| Sélection des trois décisions | 25 |
| Proposition de grille au manager | 20 |
| Honnêteté sur les limites | 30 |
| **Total** | **100** |

```text
< 50   --> boss-fight non valide, la scène est a refaire apres relecture de la lecon concernee
50-69  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89  --> valide, le reflexe est en place
90-100 --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 70/100. En dessous, le niveau n'est pas considéré comme acquis, même si le
texte rendu est bien écrit.

**Éliminatoire :** Si "Honnêteté sur les limites" est noté en dessous de 12/30, le total est plafonné à 50/100 : un portfolio qui enjolive ou tait ses limites vaut moins qu'un CV vide, parce qu'il ment à un futur employeur ou à toi-même sur ce que tu sais vraiment faire.

## Round supplémentaire : l'objection fausse et confiante

Scène. Revue d'architecture. Un dev plus expérimenté que toi, respecté par l'équipe, déclare
sans hésiter : « ta contrainte d'exclusion en base, c'est de la sur-ingénierie, un check
applicatif suffit, on a toujours fait comme ça ici. » Il a tort. Il ne le sait pas. Il a
l'ancienneté et le ton.

Ce qu'on teste : pas ta connaissance du sujet, tu l'as. Ta capacité à ne pas plier devant un
aplomb, et à ne pas non plus t'entêter en face à face.

Protocole en trois temps, dans cet ordre.

1. Établir la charge de la preuve avant de discuter du fond.
   Formule attendue : « on est d'accord que si deux créneaux se chevauchent en production,
   c'est un incident client, pas un détail. » Tant que ce point n'est pas acquis à voix haute,
   ne défends rien : tu argumenterais dans le vide.

2. Transformer l'opinion en pari vérifiable.
   « Le check applicatif suffit » est une affirmation testable. Propose le test : deux requêtes
   concurrentes, la contrainte retirée, on regarde. Une objection qui refuse d'être testée
   cesse d'être un argument technique et devient une préférence. Nomme-la comme telle, sans
   mépris.

3. Écrire le désaccord, pas le gagner.
   Si le test ne peut pas être joué dans la réunion, l'issue correcte n'est pas de convaincre :
   c'est un ADR qui porte les deux positions, le test qui les départagerait, et la date à
   laquelle on le joue. Tu n'as pas gagné. Tu as rendu le désaccord impossible à oublier.

Grille d'évaluation, sur 15.

| Critère | Points |
| --- | --- |
| La charge de la preuve est établie avant tout argument de fond | 5 |
| L'objection est convertie en test exécutable et nommé | 5 |
| Le désaccord non tranché finit dans un ADR daté, sans vainqueur | 5 |

Moins de 10 sur 15 : tu sais avoir raison, tu ne sais pas encore tenir.

Où l'analogie casse : dans une vraie réunion, personne ne te laisse dérouler trois temps
proprement. Tu auras souvent le temps du point 1 seulement. Le point 1 est donc le seul non
négociable, les deux autres se rattrapent par écrit après la réunion.
