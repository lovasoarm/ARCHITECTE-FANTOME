---
stability: stable
acte: gouvernance
noyau: oui
route: staff-gate
---

# 49 : TERRAIN MATURITY GATE : du curriculum au monde réel

## But

Rendre impossible la confusion entre une excellente simulation et une expérience professionnelle réelle.

## 1. Échelle canonique

| Niveau | Preuve                                              | Ce qu'on peut dire                                       |
| ------ | --------------------------------------------------- | -------------------------------------------------------- |
| T0     | simulation AF                                       | preuve pédagogique                                       |
| T1     | projet personnel réellement utilisé                 | usage externe limité                                     |
| T2     | petit groupe / association / pair externe           | confrontation à des utilisateurs ou contraintes externes |
| T3     | open source actif / mission / client                | contexte professionnel ou public réel                    |
| T4     | production suivie avec responsabilité dans la durée | preuve forte d'exploitation et d'ownership               |

**T0 ≠ T4.** Aucun titre professionnel ne doit être inféré automatiquement d'un niveau T0.

## 2. Fiche de preuve

```text
Preuve :
Niveau terrain : T0 / T1 / T2 / T3 / T4
Contexte :
Qui a réellement utilisé le système ?
Contrainte réelle :
Signal observé :
Décision prise :
Résultat :
Coût réel / proxy :
Incident / surprise :
Feedback externe :
Artefact vérifiable :
Limites :
Prochaine itération :
```

## 3. Exigences Staff

Un verdict `READY` du curriculum peut être accordé avec T0/T1 si toutes les autres preuves sont solides, mais il doit alors être libellé :

> **READY : curriculum / Staff-track preparation**

et non :

> **preuve d'expérience professionnelle Staff**.

Pour déclarer une expérience Staff réelle, il faut des éléments de terrain compatibles avec T3/T4, le scope, la durée et le contexte d'organisation.

## 4. Production : seuils de preuve

Pour une preuve annoncée comme « production » :

- environnement réel ou explicitement identifié comme simulation ;
- métriques accessibles ;
- incidents ou changements observables ;
- ownership identifié ;
- période d'observation ;
- résultat reproductible.

**Interdiction :** transformer un déploiement de démonstration en « production » par simple vocabulaire.

## 5. Pont professionnel

Le [43-PONT-PREUVE-TERRAIN.md](43-PONT-PREUVE-TERRAIN.md) explique comment monter de T0 vers T4. Ce gate ne demande pas de créer des heures CORE supplémentaires : il impose une **étiquette de vérité** sur chaque preuve.
