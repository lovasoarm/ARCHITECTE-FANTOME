---
stability: stable
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

# Security gate : retrieval-gateway

- Secrets : uniquement via variables d'environnement ; jamais dans `data/`, les logs ou les commits.
- Prompt injection : le retriever ne traite pas les documents comme des instructions système.
- Output validation : la réponse doit rester liée au contexte retrouvé.
- Data minimization : seuls les extraits nécessaires sont envoyés au provider.
- Timeout : appel LLM limité à 8 s.
- Degraded mode : absence/échec du provider => réponse locale, jamais de boucle de retry infinie.
- Audit : chaque exécution expose `mode`, `model`, `retrieved` et `failure_mode`.
