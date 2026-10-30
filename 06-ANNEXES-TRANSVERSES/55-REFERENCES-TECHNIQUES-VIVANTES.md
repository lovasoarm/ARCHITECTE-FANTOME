---
stability: perissable
acte: reference
noyau: non
route: support
freshness_registry_id: PATH:06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-04-28
review_status: a_verifier_date_absente
---

# 55 : Références techniques vivantes

> Vérification initiale : 28 octobre 2026. Ce répertoire est une porte d'entrée, pas une certification de conformité. Avant tout travail réel, contrôler la version, le statut, la date et la compatibilité avec le projet.

## Carrière et portée technique

- [GitLab : Staff/Principal/Distinguished career and job descriptions](https://handbook.gitlab.com/job-description-library/engineering/development/management/): responsabilités actuelles décrites par une entreprise ; à comparer à d'autres grilles et offres, pas à considérer comme standard universel.
- [GitLab : Principal Engineer](https://handbook.gitlab.com/job-description-library/engineering/development/management/principal-engineer/): influence transverse, stratégie, mentorat et impact mesurable.
- [GitLab : Distinguished Engineer](https://handbook.gitlab.com/job-description-library/engineering/development/management/distinguished/): expertise multi-domaines, influence large, architecture et décisions importantes.

## IA et systèmes agentiques

- [NIST AI RMF : AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): cadre volontaire pour identifier et gérer les risques associés à l'IA ; vérifier les mises à jour puisque le cadre est en évolution.
- [NIST : Generative AI Profile, AI 600-1](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence): profil de risques et actions pour les systèmes génératifs.
- [OWASP GenAI : Top 10 for LLM and GenAI Applications](https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/): prompt injection, disclosure, supply chain, poisoning, excessive agency, embeddings et consommation sans borne. Toujours lire la version publiée la plus récente.
- [MCP : release de spécification du 28 juillet 2026](https://blog.modelcontextprotocol.io/posts/2026-07-28/): point de référence daté pour le protocole ; les SDK évoluent également. Ne pas figer des exercices sur une API non maintenue.
- [Ragas : métriques d'évaluation](https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/): exemples de métriques RAG et agentiques ; les métriques doivent être calibrées pour le cas d'usage, elles ne sont pas des vérités universelles.

## Sécurité logicielle et chaîne d'approvisionnement

- [NIST SP 800-218 : Secure Software Development Framework 1.1](https://csrc.nist.gov/pubs/sp/800/218/final): pratiques de développement sécurisé intégrables au cycle logiciel.
- [NIST SP 800-218 Rev. 1 : initial public draft 1.2](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd): brouillon publié en décembre 2025 ; vérifier s'il a été remplacé avant de s'y appuyer comme norme actuelle.
- [SLSA : Build track 1.2](https://slsa.dev/spec/v1.2/build-track-basics): niveaux de provenance et durcissement de build ; choisir un niveau démontrable plutôt que déclaratif.

## Observabilité et architectures

- [OpenTelemetry documentation](https://opentelemetry.io/docs/): framework ouvert et neutre vis-à-vis des fournisseurs pour instrumentation, collecte et export des traces, métriques et logs.
- [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/): grille utile de fiabilité, sécurité, coût, opérations et performance ; ses exemples de services sont Azure-spécifiques.
- [PostgreSQL documentation](https://www.postgresql.org/docs/current/): référence pour comparer les comportements d'une base éprouvée ; le moteur maison CrazyDB doit rester pédagogique.
- [Raft : papier et ressources](https://raft.github.io/): point de départ pour les invariants du consensus et les tests de sûreté.
- [Local-first software : Kleppmann et al., Onward! 2019](https://martin.kleppmann.com/2019/10/23/local-first-at-onward.html): propriété des données, hors ligne et systèmes de synchronisation.

## Règle de renouvellement

Pour chaque dépendance ou protocole touchant sécurité, IA, builds, cryptographie ou agentique, noter : version testée, version consultée, date, changement attendu, risque de migration, stratégie de retour arrière. Les URLs `latest`, `current`, `main` et les pages de blogs sont des points d'entrée mouvants : enregistrer une release/tag ou un commit quand une preuve doit être reproductible.
