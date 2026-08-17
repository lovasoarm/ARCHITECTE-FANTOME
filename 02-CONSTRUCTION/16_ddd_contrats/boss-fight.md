# Boss Fight : Le contrat qu'on te force à casser

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
triches contre le seul entraînement à la pression que ce module te propose.

## La situation

Tu es responsable du contexte borné "surveillance" de Fox River, celui qui expose le
contrat `{ idDetenu, risque }` consommé par le contexte "logistique" (voir `01` et `03`).
Le directeur de l'établissement, sous pression d'un audit externe qui vient de tomber ce
matin, exige que le champ `risque` (deux valeurs possibles aujourd'hui : `eleve`, `normal`)
passe immédiatement à une échelle chiffrée de 1 à 10, "pour être précis face aux
auditeurs". Il veut le changement en production avant la fin de la journée, dans le
service qui alimente déjà trois consommateurs : `logistique-service` (assigne le nombre
d'escortes), `notifications-service` (alerte les familles) et `reporting-service`
(tableau de bord de direction, déjà présenté en axe résilience dans l'exercice précédent).
Aucun des trois n'a été prévenu. Le directeur ne veut pas entendre parler de "double run"
ou de "date d'extinction" : "on n'a pas le temps, change le champ, les autres s'adapteront."
Un développeur junior de ton équipe propose déjà, sans attendre ta décision, de modifier
`evaluerRisque` directement en place pour renvoyer un chiffre, "vu que c'est plus précis
de toute façon".

## Les contraintes réelles

- `logistique-service` utilise `risque === "eleve"` en dur dans trois endroits du code pour
  décider du nombre d'escortes (2 ou 4, cf. `01_langage_contextes_bornes.md`).
- `notifications-service` envoie un message différent aux familles selon la valeur
  actuelle de `risque` ; le texte du message est déjà écrit et validé juridiquement,
  changer sa condition de déclenchement demande une revue légale, pas seulement un
  déploiement de code.
- `reporting-service` a un graphique de direction basé sur un comptage des deux valeurs
  actuelles ; ce graphique part demain matin dans une présentation au conseil
  d'administration.
- L'audit externe porte sur la traçabilité des décisions, pas sur la granularité de
  l'échelle : rien dans les exigences de l'audit n'impose une échelle chiffrée, c'est une
  interprétation du directeur.
- Tu as quatre heures avant la fin de la journée de travail de ton équipe.

## Ce qu'on attend de toi

Produis une décision écrite (une page maximum) qui :

1. Refuse explicitement les deux extrêmes proposés (changer le contrat en place
   aujourd'hui sans prévenir personne, et attendre une migration complète en bonne et due
   forme avant de répondre quoi que ce soit au directeur) en expliquant en une phrase
   pourquoi chacun est un pari perdant, avec un mécanisme précis tiré de `03` à l'appui de
   chaque leçon.
2. Vérifie d'abord si le besoin réel de l'audit correspond à la demande du directeur :
   une exigence de traçabilité peut se satisfaire sans casser un contrat consommé par
   trois services le jour même. Nomme la solution la moins coûteuse qui répond à
   l'exigence réelle sans toucher au contrat existant, si elle existe.
3. Si un changement de contrat est malgré tout justifié à terme, propose le plan concret
   réalisable dans les quatre heures restantes : quel champ ajouté en parallèle (pas
   remplacé), quel consommateur migre en premier et pourquoi, quelle date d'extinction tu
   annonces dès aujourd'hui pour l'ancien champ, et à qui tu l'annonces avant, pas après,
   le déploiement.
4. Réponds nommément au développeur junior : pourquoi modifier `evaluerRisque` en place
   est le scénario qui casse `logistique-service` en production sans qu'aucun test de
   logistique ne l'ait vu venir (relie ta réponse au risque décrit dans
   `01_langage_contextes_bornes.md`), et quelle est la version corrigée de sa proposition.

## Partie orale (obligatoire)

Une fois le texte écrit rendu, enregistre-toi en audio ou vidéo pendant 3 minutes maximum,
répondant à voix haute au directeur comme s'il te demandait, en personne, pourquoi tu ne
livres pas son changement aujourd'hui. Sans lire ton texte mot à mot, sans notes au-delà
d'un post-it de mots-clés. Réécoute l'enregistrement une seule fois et note toi-même, avant
toute relecture externe, un point où ta réponse orale était plus faible que ta réponse
écrite.

---

*Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée.*

## Grille d'évaluation

| Critère | Ce qui est évalué |
| --- | --- |
| Refus argumenté des deux extrêmes | La justification s'appuie sur un mécanisme concret de rupture de contrat (cf. `03`), pas sur une prudence générique ou une obéissance non discutée |
| Distinction besoin réel / demande formulée | La réponse vérifie explicitement si l'exigence d'audit (traçabilité) peut être satisfaite sans casser le contrat, avant de proposer une migration |
| Plan de migration réalisable en quatre heures | Le plan ajoute un champ en parallèle, ne supprime rien le jour même, nomme un ordre de migration des trois consommateurs et une date d'extinction écrite immédiatement |
| Réponse au développeur junior | L'explication relie la modification en place à une rupture silencieuse chez un consommateur, avec la version corrigée de sa proposition (champ ajouté, pas remplacé) |
| Ton | La décision est assumée et défendable devant le directeur en personne, sans céder sur le fond pour éviter le conflit |
| Justesse à l'oral sous contrainte de temps, sans texte préparé lu mot à mot | La réponse orale tient la même logique que le texte écrit, sans relecture mot à mot, dans le temps imparti |

## Seuil de validation chiffré

| Critère | Points |
| --- | --- |
| Refus argumenté des deux extrêmes | 20 |
| Distinction besoin réel / demande formulée | 20 |
| Plan de migration réalisable | 25 |
| Réponse au développeur junior | 20 |
| Ton | 15 |
| Justesse à l'oral sous contrainte | 20 |
| **Total** | **120** |

```text
< 50   --> boss-fight non valide, la scene est a refaire apres relecture de 03_contrats_migration.md
50-69  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89  --> valide, le reflexe est en place
90-100 --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 84/120. En dessous, le module n'est pas considéré comme acquis, même si
le texte rendu est bien écrit.

**Éliminatoire :** Si "Plan de migration réalisable en quatre heures" est noté en dessous
de 12/25, le total est plafonné à 60/120 : proposer une migration qui casse un des trois
consommateurs le jour même, même enrobée d'un bon discours, montre que la discipline de
contrat du module n'a pas été assimilée.

## ET APRÈS

Une fois ce boss-fight passé, ouvre [grimoire.md](grimoire.md), le mémo dense de ce module.
