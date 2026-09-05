---
stability: stable
acte: démontrer
noyau: oui
route: staff-gate
---

# 48 : EXTERNAL REVIEW GATE : revue indépendante

## But

Empêcher que l'apprenant obtienne un verdict uniquement parce qu'il sait très bien défendre son propre raisonnement. La preuve Staff doit survivre à un **regard indépendant**.

## 1. Trois niveaux

| Niveau | Reviewer                                      | Valeur                        |
| ------ | --------------------------------------------- | ----------------------------- |
| R0     | auto-revue                                    | contrôle de base              |
| R1     | pair / mentor non impliqué dans la production | contradiction externe         |
| R2     | reviewer indépendant, idéalement Staff+       | preuve forte de défendabilité |

Pour le **Staff Readiness Gate**, R1 est obligatoire ; R2 est recommandé et devient obligatoire pour un verdict `READY` lorsqu'un reviewer compétent est disponible.

## 2. Revue à l'aveugle

Le reviewer reçoit uniquement :

- contexte ;
- contraintes ;
- décision ;
- alternatives ;
- mesures ;
- artefacts ;
- résultat.

Il ne reçoit pas le journal de raisonnement avant son premier avis.

## 3. Questions du reviewer

1. Qu'est-ce qui vous ferait changer cette décision ?
2. Quelle hypothèse vous semble la plus fragile ?
3. Quel coût ou risque est sous-estimé ?
4. Qu'est-ce qui se passe si la charge double ?
5. Que feriez-vous si le budget était divisé par deux ?
6. Quelle partie de cette solution est la plus difficile à annuler ?
7. Où l'IA pourrait-elle produire une erreur silencieuse ?
8. Quelle preuve manque encore ?

## 4. Rubrique

Noter 0–4 :

- clarté du problème ;
- qualité des options ;
- preuves ;
- compromis chiffrés ;
- sécurité ;
- fiabilité ;
- coût ;
- capacité à réviser ;
- communication non technique ;
- transfert.

**Pass R1 : ≥32/40 et aucun 0 en sécurité, fiabilité, coût ou révision.**

**Pass R2 : ≥34/40**, avec commentaires écrits sur au moins une faiblesse réelle.

## 5. Désaccord obligatoire

Une revue sans objection substantielle n'est pas une preuve forte. Le dossier doit conserver au moins :

```text
objection
réponse initiale
preuve apportée
révision ou maintien
raison finale
```

**Important :** une décision révisée peut être meilleure qu'une décision défendue intacte. Le but est la qualité de décision, pas la victoire rhétorique.
