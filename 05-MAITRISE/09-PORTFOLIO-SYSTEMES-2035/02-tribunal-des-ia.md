---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 02 : Le Tribunal des IA

> Lab d’évaluation versionné, juge LLM calibré, régressions CI et red teaming.

**Place dans le parcours :** Fondation de confiance pour tout projet intégrant des modèles.  
**Prérequis :** Tests et CI de base, JSON/HTTP, jeu de données versionné ; laboratoire 19-PRODUIT-IA-REFERENCE et G8.

## Mission

Construire un dispositif qui détecte une dégradation d’un système IA sans faire du LLM-juge une vérité oracle. Les critères doivent refléter l’usage et être reproductibles autant que possible.

## Version de départ : obligatoire

- [ ] Créer un jeu d’évaluation versionné couvrant cas attendus, ambiguïtés, abstention, données absentes, sorties malformées et cas adversariaux.
- [ ] Séparer les tests déterministes (format, citations présentes, règles d’accès, invariants) des métriques nécessitant un jugement sémantique.
- [ ] Si un LLM-juge est utilisé, définir une grille, calibrer sur un sous-ensemble annoté par un humain, mesurer désaccords et faux positifs/faux négatifs.
- [ ] Enregistrer versions de modèle, prompts, paramètres, données, dates et coûts ; rendre les résultats comparables sans prétendre à une parfaite reproductibilité d’un service distant.
- [ ] Brancher les tests sur CI : échec sur une régression critique de sécurité ou de contrat ; seuils de qualité fixés avant l’exécution.
- [ ] Inclure tests de prompt injection, divulgation de données, tool calls abusifs, surconsommation et réponses non fondées.

## Extensions Depth : une à la fois

- [ ] Comparer deux modèles, prompts, retrievers ou versions sur le même jeu de tests et examiner le coût par succès plutôt que le seul score moyen.
- [ ] Ajouter un set holdout non utilisé pour régler le système ; documenter les risques de fuite de benchmark.
- [ ] Simuler une régression que le LLM-juge note faussement comme une amélioration ; montrer comment le test déterministe ou l’évaluation humaine la révèle.

## Tests d’acceptation

- [ ] La CI détecte une régression injectée connue et indique les cas échoués, pas seulement un score agrégé.
- [ ] Le résultat conserve l’identifiant du dataset et versions exactes ; un tiers peut relancer un échantillon.
- [ ] Le LLM-juge ne décide pas seul des contrôles d’accès, des sorties structurées critiques ou des résultats de sécurité.
- [ ] Les cas sensibles ne sont pas envoyés à un fournisseur sans justification, consentement et protection adaptées.

## Chaîne pédagogique

Utilise [60 : Laboratoire IA de bout en bout](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) pour garder séparés les tests de contrat, retrieval, génération, sécurité des accès et budgets. Ce projet ne doit pas réduire l’évaluation à un score moyen.

## Dossier de preuves attendu

`evals/cases.jsonl`, rubric, résultats JSON/Markdown, versioning de dataset, workflow CI, rapport de calibration du juge, rapport red team, G8.

## Hors périmètre et limites

Ne pas présenter le “LLM-as-a-judge” comme objectif parfait ; ne pas optimiser sur un seul score sans examiner les cas échoués. Un benchmark n’est pas la validation clinique/légale d’un système.

## Ponts vers AF

[G8 : laboratoire IA](../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/README.md), [NIST GenAI Profile et OWASP GenAI](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
