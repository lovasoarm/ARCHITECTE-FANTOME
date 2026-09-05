---
stability: stable
acte: démontrer
noyau: oui
route: staff-gate
---

# 50 : INCIDENT COMMANDER GATE : décider sous pression

## But

Transformer les connaissances SRE, sécurité, coût, produit et leadership déjà présentes dans AF en une seule compétence intégratrice : **gérer un incident sans perdre le système ni la confiance**.

## 1. Scénario

Le candidat reçoit un incident inédit. Les signaux arrivent progressivement :

- hausse d'erreurs ;
- saturation d'une dépendance ;
- coût qui augmente ;
- alerte sécurité possible ;
- pression produit pour ne pas dégrader le service.

Aucune solution canonique n'est fournie.

## 2. Décisions possibles

Le candidat doit explicitement choisir ou rejeter, selon le contexte :

```text
rollback
feature flag / kill switch
scale
rate limit
degrade gracefully
isoler une dépendance
bloquer un déploiement
protéger les données
communiquer au produit / business
escalader sécurité
```

## 3. Livrables

À la fin :

1. timeline des signaux ;
2. décision par étape ;
3. justification ;
4. impact client ;
5. coût / risque ;
6. postmortem ;
7. action préventive ;
8. signal d'alerte ajouté ou amélioré.

## 4. Grille

| Dimension           | Pass |
| ------------------- | ---: |
| Détection / triage  |  4/5 |
| Sécurité            |  4/5 |
| Fiabilité           |  4/5 |
| Impact produit      |  4/5 |
| Coût                |  3/5 |
| Communication       |  4/5 |
| Décision / rollback |  4/5 |
| Postmortem          |  4/5 |

**Pass global : ≥31/40 et aucun échec critique sécurité/fiabilité.**

## 5. Défense

Le candidat explique ensuite son incident devant un reviewer qui impose une nouvelle contrainte : budget divisé par deux, trafic x2, ou interdiction temporaire d'une dépendance critique. La capacité à réviser est obligatoire.

Ce gate utilise les compétences déjà enseignées ; il n'est pas un nouveau cursus SRE.
