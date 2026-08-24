## perishability_id: PER-0068

stability: perissable
acte: epreuve
noyau: oui
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: high
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Addendum Staff Engineer au Capstone

<!-- AF-DIAGRAM:capstone -->

```text
text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

Temps de lecture ~2 min

Le livrable existant (fil rouge + arène) **reste**. Cet addendum impose les
contraintes Staff : sans elles, tu as un projet, pas une preuve de familles
croisées. Recroisement exigé par
[PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md) (S1, S3, S4, S5).

Ces quatre pièces sont **notées dans la grille principale**
([04-evaluation-grid.md](04-evaluation-grid.md)) : 80 points sur 340, pas un bonus
séparé. Si une des quatre pièces manque, le capstone est recevable comme exercice de
dérive, **pas** comme preuve Staff, et le titre réellement obtenu change (voir la section
« Familles Staff exigées » de la grille).

## 1. Budget cloud à trois paliers

Dans `PREUVES/06A-BUDGET-CLOUD.md` (gabarit :
[06A-BUDGET-CLOUD.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/06A-BUDGET-CLOUD.md)) :

|    Palier |      Utilisateurs | Ce qui doit changer, pas seulement le multiplicateur   |
| --------: | ----------------: | ------------------------------------------------------ |
|       100 |     apprentissage | une AZ, pas d'IA payante obligatoire, logs 7 j         |
|    10 000 |  tenue du service | SLO 99,5 %, plafond IA, egress nommé                   |
| 1 000 000 | limite économique | la ligne qui explose (souvent egress ou IA) + le refus |

Une ligne par catégorie : calcul, stockage, base, observabilité, **IA**, **egress**.
Chaque prix : source, date, URL. Un tableau qui ne fait que `×100` sans changer
les hypothèses n'est pas un budget.

## 2. Un SLO chiffré + RTO mesuré chrono en main

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Phrase d'objectif, fenêtre (ex. 30 j), budget d'erreur en **requêtes ratées par
semaine**, alertes qui **réveillent** quelqu'un. Puis un drill : restauration
réelle, **chronomètre en main**, RTO écrit (minutes, pas « assez vite »).

Le SLO doit être **tenable** avec le budget du palier 10 000. Si les deux ne se
contredisent nulle part, l'un des deux n'est pas chiffré (tension S1 × S3).

## 3. Note à une direction non technique

Une page, zéro jargon non expliqué. Elle annonce : la décision, la valeur
utilisateur, le coût (un nombre du budget S1), le risque, le SLO, l'option
refusée. C'est la pièce S5 du dossier unique (section 6), réutilisée ici.

## 4. Une décision REFUSÉE par écrit, avec le chiffre du refus

Exemples recevables : seconde région (**696 € / 12 mois** d'exercice HA de base),
CQRS marche 3 (**60 € + 180 € d'ops**), IA sans plafond (**139 k€** au palier
1 000 000 avant disjoncteur).

Le refus vit dans un ADR : option, chiffre, perte acceptée, **seuil de réouverture**.
Un « on verra plus tard » n'est pas un refus.

## Vérification croisée

| Pièce            | Doit apparaître aussi dans            |
| ---------------- | ------------------------------------- |
| Budget 3 paliers | tensions capstone + dossier unique §3 |
| RTO chrono       | note de direction + `SLO.md`          |
| Note direction   | S5, contradicteur objection 2 ou 20   |
| Refus chiffré    | ADR + addendum + dossier unique       |

À 100 users on paie l'apprentissage. À 10 000 on paie la tenue. À 1 000 000 on
nomme la limite. Le [boss fight IA](../04-BIG-APP-SNOOP/96-boss-fight.md) et le
[contradicteur](../../06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md) attaquent ces
quatre pièces, pas le README du repo.

## 5. Gate de certification `PREUVES/`

Le capstone peut être techniquement réussi sans être certifié Staff.

Avant la soutenance finale, le dépôt apprenant doit fournir `PREUVES/00_INDEX.md`
et les sept pièces attendues. Le jury vérifie les chemins, les commits, les dates
de mesure et les recroisements.

Une pièce absente = famille non prouvée.

### S6 : produit IA réel

La pièce S6 doit pointer vers un produit ou une brique réellement exécutée, avec :

- architecture ;
- jeu d'évaluation versionné ;
- coût et plafond ;
- sécurité ;
- observabilité ;
- modes d'échec et réponse dégradée ;
- décision explicite d'au moins un cas où l'IA est refusée.

Le laboratoire [Produit IA de référence](../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/README.md)
sert de référence pédagogique ; il ne remplace pas la preuve personnelle.

### S7 : portage réellement exécuté

Le portage doit montrer la même capacité chez un second fournisseur et dans un
second langage. Un diagramme ou un `terraform plan` seul ne suffit pas pour la
mention « exécuté » : joindre une preuve d'exécution datée.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
