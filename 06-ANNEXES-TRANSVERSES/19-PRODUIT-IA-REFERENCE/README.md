perishability_id: PER-0102
---
stability: perissable
acte: appliquer
noyau: oui
---

# Produit IA de référence : `retrieval-gateway`

Ce laboratoire formalise une exigence essentielle : **S6 doit laisser une preuve
technique réellement démontrable**, pas seulement un cahier des charges.

Le produit est volontairement **offline-first** :

- le retriever fonctionne sans compte cloud ni clé API ;
- un provider LLM réel peut être branché derrière une interface unique ;
- les évaluations de retrieval sont déterministes ;
- sécurité, coût, observabilité et failure modes sont écrits à côté du code.

## Ce que le produit démontre

1. ingestion de documents locaux ;
2. retrieval lexical déterministe ;
3. construction d'un contexte limité et traçable ;
4. appel optionnel d'un provider LLM ;
5. réponse dégradée propre si le provider est indisponible ;
6. métriques de coût et de latence ;
7. jeu d'évaluation versionné ;
8. ADR et revue de sécurité.

## Lancer

```bash
node src/cli.mjs "Quel est le SLO du service ?"
node eval/run.mjs
```

Sans variable d'environnement LLM, le produit retourne une réponse déterministe
à partir du contexte retrouvé. Avec un provider compatible, `src/llm_client.mjs`
peut être remplacé/branché sans modifier le retriever.

## Gate S6

Un apprenant doit être capable de montrer :

- l'architecture ;
- le jeu d'évaluation ;
- les cas où l'IA est volontairement refusée ;
- le budget d'appel ;
- les garde-fous de sécurité ;
- un postmortem de panne du provider ;
- les mêmes invariants après changement de modèle.

Ce dossier est une **preuve de référence du curriculum**, pas la preuve personnelle
du diplômé. La preuve personnelle doit être recopiée et exécutée dans `PREUVES/`.
