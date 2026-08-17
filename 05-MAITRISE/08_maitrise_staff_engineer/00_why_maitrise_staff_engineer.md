> **CE MODULE RÉUTILISE** : capstone livré (04-EPREUVE/06-CAPSTONE-ARENA), bases de données (01_databases), scalabilité (02_scalability), cas limites (03_edge_cases), agents IA (04_ai_agents_and_autonomy), routine de maintien (05-DAY-TO-LEGEND), plus les cinq modules Staff greffés en amont : [02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md), [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md), [03-PILOTAGE/07_cloud_foundations](../../03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md), [03-PILOTAGE/08_produit_cout_roi](../../03-PILOTAGE/08_produit_cout_roi/00_why_produit_cout_roi.md), [03-PILOTAGE/11_leadership_mentorat](../../03-PILOTAGE/11_leadership_mentorat/00_why_leadership_mentorat.md). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> **OÙ CE MODULE EST RECROISÉ** : c'est le dernier palier du fil, donc il ne prépare rien d'autre : il consomme. Son unique livrable, décrit dans [01_dossier_unique.md](01_dossier_unique.md), oblige les six familles S1 à S6 à tenir ensemble sur un seul système déjà livré, sous une contrainte imposée après coup. Ses sorties alimentent directement [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

# POURQUOI CE MODULE MÉRITE TON TEMPS : LA MAÎTRISE SE PROUVE APRÈS LA LIVRAISON

Le capstone prouve que tu sais construire. Ce module prouve que tu sais tenir. La différence entre un bon développeur senior et un Staff Engineer se voit rarement le jour de la mise en production : elle se voit six mois plus tard, quand la charge a triplé, que le budget a été coupé de 30%, qu'un contrat d'API doit changer et qu'une personne de l'équipe part.

Ce palier n'ajoute pas de concept nouveau. Il te met en situation où les concepts déjà appris se contredisent, et où quelqu'un doit trancher par écrit. Cette personne, c'est toi.

## 1. CE QUI CHANGE APRÈS LA PREMIÈRE LIVRAISON

Intuition : dans Breaking Bad, la première production réussie n'est jamais le problème. Le problème, c'est la logistique, les partenaires, la trésorerie et les traces qu'on laisse. Un système livré, c'est pareil : il entre dans sa phase la plus coûteuse le jour où il marche.

```
livraison --> usage réel --> contraintes contradictoires --> arbitrage écrit
                                    |
                       coût, charge, contrat, départ d'une personne
```

## 2. LES QUATRE PRESSIONS QU'ON TE METTRA

1. **Charge** : le trafic est multiplié par dix. Ce qui casse en premier n'est presque jamais ce que tu avais prévu (module [02_scalability](../02_scalability/00_why_scalability.md)).
2. **Budget** : on te demande 30% de facture en moins sans dégrader le service visible.
3. **Contrat** : un consommateur externe exige un changement en rupture, avec date imposée.
4. **Équipe** : la personne qui connaissait un composant part dans trois semaines. Ton bus factor devient visible.

Risque réel : la faute classique n'est pas de mal arbitrer, c'est d'arbitrer sans écrire. Six mois plus tard, personne ne se souvient pourquoi, et l'équipe suivante défait la décision en croyant corriger un oubli.

## 3. LE FORMAT DE PREUVE

Une décision de Staff Engineer se prouve par trois artefacts, jamais par un discours :

- L'ADR, pour la décision et les options écartées.
- Le chiffre, pour l'ordre de grandeur et sa source.
- Le post-mortem ou la revue, pour ce que la réalité a démenti.

## 4. EXERCICES

**Exercice 1 : la coupe de 30% (25 min).** Reprends ton budget cloud du capstone. Trouve trois façons de réduire de 30%. Écris pour chacune ce qu'elle coûte en SLO, en complexité ou en délai de livraison. Tranche, et écris l'ADR.

**Exercice 2 : le départ annoncé (15 min).** Liste les composants de ton projet dont une seule personne comprend le fonctionnement. Pour le pire, écris la page de transfert que tu voudrais recevoir si tu arrivais demain sur ce composant sans rien connaître.

**Exercice 3 : le dossier unique (le vrai travail).** Il est décrit intégralement dans [01_dossier_unique.md](01_dossier_unique.md). Compte plusieurs sessions : c'est la dernière pièce du parcours.

## RÉSUMÉ

Un système entre dans sa phase la plus coûteuse le jour où il fonctionne. Les quatre pressions qui révèlent un Staff Engineer sont la charge, le budget, le contrat et le départ d'une personne : aucune ne se résout en écrivant du code seul. Une décision non écrite sera défaite par quelqu'un d'autre, de bonne foi. La maîtrise se prouve par trois artefacts, ADR, chiffre, post-mortem, appliqués au même système.
