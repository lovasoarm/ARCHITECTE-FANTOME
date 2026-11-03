---
stability: stable
---

**SCÈNE CRAZYDEVS : Boss final :** ton architecture est plausible, ton budget est joli et ton agent IA applaudit. Puis un junior te montre une contrainte que tu n’avais pas vue. Le niveau Staff commence là.

# BIAS-LOG

Ne cherche pas à diagnostiquer les autres. Cherche le mécanisme qui aurait pu déformer **ta** décision.

| Décision | Biais suspecté | Preuve contre ma préférence | Personne qui pourrait me contredire | Mesure | Compensation structurelle |
| -------- | -------------- | --------------------------- | ----------------------------------- | ------ | ------------------------- |

Biais prioritaires : confirmation, ancrage, sunk cost, authority bias, statu quo, planning fallacy, survivorship, ownership, escalation of commitment, loss aversion.

Le but n'est pas d'avoir « zéro biais ». Le but est de construire des garde-fous qui rendent un biais moins dangereux.

## Exemple travaillé : cas métier

**Exemple résolu (fictif).** Pendant un incident, l'équipe accuse d'abord le dernier développeur ayant touché le code. Le biais possible est l'attribution à une personne avant l'examen du système. Le log consigne le fait (l'incident suit une release), l'interprétation initiale, les éléments qui la contredisent (la même erreur existe sur l'ancienne version) et la contre-mesure (chronologie, comparaison de configuration, revue sans blâme). Il décrit un comportement observable, pas un diagnostic psychologique.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « BIAS-LOG », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
