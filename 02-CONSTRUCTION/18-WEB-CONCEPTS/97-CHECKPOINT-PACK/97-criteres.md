---
stability: intemporel
acte: évaluer
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Critères de vérification : `18-WEB-CONCEPTS`

Ce pack ne juge pas ta lecture : il juge ce que tu peux ouvrir et défendre.

<!-- JALON-TECH-ILA:debut -->

## Jalon TECH-ILA

Ce module porte un jalon du référentiel TECH-ILA. Le critère est **binaire** : il est
validé, ou il est **non valide**. Il n'y a pas de validation partielle, et une lecture ne
vaut pas validation.

- [ ] L'artefact demandé par ce module existe, il est daté, il tourne.
- [ ] Tu sais le défendre à l'oral en trois minutes, sans relire tes notes.

Tant qu'une case reste vide, le jalon est **non valide** : le module suivant peut s'ouvrir,
le jalon reste dû. Référentiel : [03-TECH-ILA](../../../06-ANNEXES-TRANSVERSES/04-TECH-ILA/README.md).

<!-- JALON-TECH-ILA:fin -->

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une page de liste charge 20 éléments, puis l'utilisateur change de filtre. Le critère observable est : l'URL ou l'état de filtre reflète la sélection, la liste affichée correspond au filtre et le bouton Retour restaure l'état précédent selon le contrat annoncé. Le scénario nominal passe ; un filtre sans résultat affiche un état vide compréhensible au lieu de conserver les anciens éléments. **Limite :** cette vérification ne démontre pas à elle seule le référencement, la performance sur réseau lent ni l'accessibilité au lecteur d'écran ; ces critères doivent être testés séparément.

**À toi :** Une équipe consulte des mesures récentes ; le réseau tombe, le cache contient des données anciennes et les droits changent pendant la session. Construis un cas minimal qui illustre « Critères de vérification : `18-WEB-CONCEPTS` » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
