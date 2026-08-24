## perishability_id: PER-0082

stability: perissable
acte: maitrise

---

> **SCÈNE CRAZYDEVS : l’agent de Prison Break a les clés :** la question n’est plus « peut-il agir ? » mais « qui a décidé qu’il avait ces clés, sur quelles limites, avec quel audit et quel bouton d’arrêt ? »

# IA en production : gouvernance, évaluation et sécurité agentique

Le niveau Staff doit savoir traiter l’IA comme un **système socio-technique**, pas comme un prompt.

## Chaîne obligatoire

```text
objectif
  ↓
données
  ↓
modèle / agent
  ↓
outils + permissions
  ↓
évaluation
  ↓
observabilité
  ↓
coût
  ↓
sécurité
  ↓
fallback / arrêt
  ↓
gouvernance
```

### Pourquoi maintenant

NIST fournit un profil GenAI du AI RMF pour identifier et gérer les risques propres aux systèmes génératifs. OWASP publie désormais un Top 10 2026 dédié aux applications agentiques et un LLM Top 10 2026. Les noms évolueront ; le mécanisme reste : identité, permissions, données, outils, objectifs, évaluation, logs, rollback et responsabilité.

- NIST AI RMF : GenAI Profile : https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- OWASP Top 10 for Agentic Applications 2026 : https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP GenAI LLM Top 10 2026 : https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/

## Épreuve

Prends un agent du fil rouge et réponds :

1. quelles actions peut-il réellement effectuer ?
2. quelles permissions sont minimales ?
3. quelle donnée peut-il lire ?
4. quelle sortie doit être évaluée avant effet ?
5. quel événement provoque un kill switch ?
6. comment mesure-t-on le coût par tâche ?
7. comment prouve-t-on qu’un changement de modèle n’a pas cassé les garanties ?

**Aucun corrigé n’est fourni.** Le candidat construit le threat model, les garde-fous et la stratégie de test.
