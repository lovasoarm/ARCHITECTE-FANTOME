---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [decision_inversee, temps_limite]
anti_recipe_key: decision_inversee+temps_limite
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 00 : Prereq check : capstone arena

<!-- AF-DIAGRAM:slo -->

```text
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

<!-- AF-DIAGRAM:capstone -->

```text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

Temps de lecture ~8 min

> **Périmètre de la porte :** cette page est l'autorité d'entrée au Capstone. Elle ne
> transforme pas les autres modules du bloc `04-EPREUVE` en prérequis. Bonus Vault, Tool
> Cave, Realtime et Big App Snoop gardent leurs objectifs locaux ; les terminer tous n'est
> pas exigé pour ouvrir le Capstone. En revanche, les pièces ci-dessus, un `PORTAGE.md` au
> niveau `PORTAGE_CONÇU` ou `PORTAGE_EXÉCUTÉ`, et les éléments chiffrés de la tension n°1
> sont obligatoires. **Aucun compte cloud, carte bancaire, abonnement ou achat de ressource
> n'est requis pour ouvrir ou réaliser le Capstone.** La revue de risques est un livrable du
> jalon 3, à signer et dater avant son premier commit de code. Elle doit respecter les
> critères de `04-evaluation-grid.md` et de `03-deliverables.md`, notamment les tests
> automatisés de contrôle d'accès horizontal et de concurrence ; ce n'est pas une gate d'entrée.

> Cette porte n'est pas un questionnaire de confiance : c'est un **contrôle d'existence sur
> disque**. Le capstone est l'épreuve finale du parcours, et l'addendum Staff Engineer
> ([06-addendum-staff-engineer.md](06-addendum-staff-engineer.md)) exige quatre pièces déjà
> produites dans les modules amont. Tant que les quatre fichiers n'existent pas dans **ton**
> dépôt, le capstone ne démarre pas. Une intention ne se relit pas.

## Contrôle 1 : les quatre pièces existent physiquement

Réponse binaire par ligne : le fichier existe et contient les éléments listés, ou il n'existe pas.
Il n'y a pas de « presque ».

| #   | Pièce exigée par l'addendum                                                                                         | Fichier attendu dans TON dépôt                                             | Produit au module                                                                                                                                                                                                                                                                                                                                     | Existe ?  |
| --- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | ADR principal, dont un ADR de découpage en contextes bornés                                                         | `PREUVES/ADR-PRINCIPAL.md`                                                 | [16-DDD-CONTRATS/01-00-why-ddd-contrats.md](../../02-CONSTRUCTION/16-DDD-CONTRATS/01-00-why-ddd-contrats.md)                                                                                                                                                                                                                                          | oui / non |
| 2   | Budget cloud chiffré à trois échelles, prix publics relevés et datés (sans achat ni compte fournisseur)             | `PREUVES/06A-BUDGET-CLOUD.md` + `PREUVES/RELEVE-TARIFAIRE.md`              | [07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md)                                                                                                                                                                                                                                | oui / non |
| 3   | SLO écrit par toi, budget d'erreur et RTO mesuré                                                                    | `PREUVES/SLO.md`                                                           | [06-FIABILITE-SLO/02-sli_slo_budget_erreur.md](../../03-PILOTAGE/06-FIABILITE-SLO/02-sli_slo_budget_erreur.md)                                                                                                                                                                                                                                        | oui / non |
| 4   | Au moins une pièce parmi S4, S5, S6 (arbitrage chiffré, soutenance en quatre traductions ou preuve de livraison/exploitation) | `PREUVES/ARBITRAGE.md`, `PREUVES/SOUTENANCE.md` ou `PREUVES/LIVRAISON-EXPLOITATION.md` | [08-PRODUIT-COUT-ROI/02-grille_cout_risque_valeur.md](../../03-PILOTAGE/08-PRODUIT-COUT-ROI/02-grille_cout_risque_valeur.md), [11-LEADERSHIP-MENTORAT/01-00-why-leadership-mentorat.md](../../03-PILOTAGE/11-LEADERSHIP-MENTORAT/01-00-why-leadership-mentorat.md) ou 04-EPREUVE/04-BIG-APP-SNOOP/90_preuve de vérification dans le livrable staff.md | oui / non |

Les exemplaires de référence de ces quatre pièces sont dans
[06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/README.md](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/README.md) : ils montrent la forme attendue, ils ne
remplacent aucun de tes fichiers.

**Accès sans frais :** les relevés tarifaires sont des recherches documentaires sur des pages
publiques ; ils ne demandent ni création de compte, ni carte bancaire, ni lancement de ressource.
Si un calculateur réclame une connexion, utilise les pages tarifaires publiques ou marque la ligne
`NON COMPARABLE` avec sa raison. Ne crée jamais une ressource payante pour obtenir un prix.

## Contrôle 2 : la matière de la tension n°1 est disponible

La tension n°1 du capstone est imposée et chiffrée. Elle ne peut pas s'écrire sans ces trois
éléments, à vérifier maintenant et non le jour de la rédaction :

1. un prix de calcul, de base managée, de stockage objet et d'egress, chacun avec **URL complète et date** ([05-releve_tarifaire_reel.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md)) ;
2. le coût de la seconde zone calculé ligne par ligne, inter-zones compris ([03-rayon_impact_zones.md](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/03-rayon_impact_zones.md), section 3 bis) ;
3. un coût d'une minute d'arrêt, justifié en une phrase métier, écrit dans `PREUVES/SLO.md`.

## Verdict

- **Les quatre pièces existent et les trois éléments du contrôle 2 sont là** → tu démarres le capstone.
- **Une pièce manque** → tu ne démarres pas. Tu retournes au module qui la produit, et tu la produis. Le capstone n'est pas l'endroit où l'on rattrape un module sauté : il est l'endroit où l'on prouve qu'on ne l'a pas sauté.
- **Deux pièces manquent ou plus** → tu reviens en arrière d'un palier entier avant d'ouvrir ce module.

> La différence entre cette porte et les seize autres du dépôt : les autres testent ce que tu
> sais, celle-ci teste ce que tu as **livré**. Un jury ne lit pas des souvenirs.

## Et après

La porte franchie, l'ordre de lecture est : [01-01-why-this-level.md](01-01-why-this-level.md), puis
[02-briefing.md](02-briefing.md), puis l'addendum
[06-addendum-staff-engineer.md](06-addendum-staff-engineer.md) avant d'écrire la première ligne.

## Pièce supplémentaire exigée depuis S-09 : `PREUVES/PORTAGE.md`

Le fichier existe physiquement, annonce explicitement son mode et comporte les tests de contrat
comparables sur les deux implémentations ainsi que l'écart de coût calculé depuis un relevé daté.

- **`PORTAGE_CONÇU` :** seconde implémentation dans un autre langage, exécutée localement ; tests de
  contrat passés des deux côtés ; fournisseur cible décrit, plan et limites explicités ; coût
  théorique sourcé et daté. Ce niveau ouvre le Capstone sans achat ni compte cloud.
- **`PORTAGE_EXÉCUTÉ` :** service réellement déployé chez le second fournisseur, tests comparables
  passés sur les deux cibles et preuve d'exécution datée. Ce niveau ferme S7 ; il n'est pas imposé
  comme condition d'accès au Capstone.

Voir [04-EPREUVE/README.md](../README.md) et le
[modèle de portage](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
