---
stability: intemporel
acte: pilotage
noyau: oui
route: complete
---

# 11 : LEADERSHIP ET MENTORAT : L'INFLUENCE SANS AUTORITÉ

> Palier 3 : Pilotage. Durée estimée : 7 h 30.
> **Préparation individuelle possible** : chaque exercice de ce module a une forme de préparation jouable seul, sur du
> code open source public ou sur ton propre historique. Aucune équipe n'est présupposée.

## Ce que tu sauras faire

1. Écrire une revue de code à trois niveaux annoncés (bloquant / recommandation / goût).
2. Expliquer la même décision à un junior, à un pair, à une direction.
3. Dire « je ne sais pas » d'une façon qui augmente ta crédibilité au lieu de la réduire.
4. Écrire les standards que suivent les agents IA que tu diriges.

## Parcours

| Fichier                             | Objet                 | Durée  | Variante solo          |
| ----------------------------------- | --------------------- | ------ | ---------------------- |
| `01-00-why-leadership-mentorat.md`  | pourquoi              | 45 min | :                      |
| `02-revue_de_code_trois_niveaux.md` | revue à trois niveaux | 45 min | dépôt open source      |
| `03-expliquer_trois_publics.md`     | trois publics         | 45 min | écrit + enregistrement |
| `04-aveu_ignorance.md`              | aveu d'ignorance      | 45 min | journal daté           |
| `05-standards_pour_agents.md`       | standards pour agents | 45 min | natif solo             |
| `90-grimoire.md`                    | lignes à retenir      | 30 min | :                      |
| `95-challenge.md`                   | mise en pratique      | 1 h 30 | oui                    |
| `96-boss-fight.md`                  | épreuve de passage    | 3 h    | oui                    |

## Livrables

Une revue de code sur commit immuable et une note d’une page pour direction préparent S5. Le mentorat et l’influence doivent être corroborés par une interaction réelle. `STANDARDS-AGENTS.md` relève de G8 et n’est requis que si des agents autonomes sont utilisés.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Prereq check : leadership / mentorat](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : leadership et mentorat](01-00-why-leadership-mentorat.md)
- [La revue de code à trois niveaux](02-revue_de_code_trois_niveaux.md)
- [Expliquer à trois publics](03-expliquer_trois_publics.md)
- [L'aveu d'ignorance](04-aveu_ignorance.md)
- [Standards pour agents : diriger ce qui n'est pas humain](05-standards_pour_agents.md)
- [05 : Le plan de mentorat : objectifs, jalons datés, bilan](06-plan_de_mentorat.md)
- [BOSS fight : module 11 : la décision que tu dois faire accepter](96-boss-fight.md)
- [Challenge : trois pièces de leadership, produites seul](95-challenge.md)
- [Grimoire : leadership et mentorat](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Préparer l'environnement

Lire [`SETUP.md`](SETUP.md) avant toute commande ou installation. Les prérequis locaux de l'activité priment sur les indications générales.

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Sept situations de leadership : décider, expliquer et obtenir un mouvement collectif](07-SCENARIOS-LEADERSHIP-ARBITRAGES.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **décision qui traverse les équipes** : Rédige une RFC/ADR sur une décision Kintana qui affecte API, données et exploitation. Compare au moins deux options, demande une revue contradictoire et transforme les objections en critères d’acceptation. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : La décision a un propriétaire, un coût, un plan de migration et une condition de révision ; l’adoption réelle reste « non démontrée » tant qu’une équipe ne l’a pas adoptée.
