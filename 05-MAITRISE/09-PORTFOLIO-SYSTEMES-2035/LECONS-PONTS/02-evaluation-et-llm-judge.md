---
stability: evolutif
acte: apprendre
noyau: non
route: depth
---

# Leçon-pont 02 : Évaluer une application IA sans croire à un score magique

## Résultat attendu

Construire un jeu d'évaluation versionné, savoir reconnaître les métriques pertinentes, séparer les contrôles déterministes de l'évaluation sémantique et quantifier les limites d'un LLM-juge.

## Chaîne de preuve

`objectif utilisateur → cas représentatifs → labels/rubrique → métrique → seuil → régression injectée → décision → réévaluation`.

Un score ne vaut que pour la population, les cas, les versions et le seuil documentés. Un score moyen peut masquer un sous-groupe défaillant : droits d'accès, langues, requêtes impossibles, long contexte ou cas rares.

## Exercices

1. Versionner un jeu de tests avec happy paths, erreurs, cas limites, refus et attaques.
2. Créer au moins cinq assertions déterministes : schéma, validité des citations, droits d'accès, limites d'appels et données attendues.
3. Annoter un petit sous-ensemble de réponses par une personne humaine selon une grille explicite.
4. Exécuter un juge LLM sur le même sous-ensemble, comparer ses accords/désaccords et exemples de faux pass/faux fail.
5. Injecter une régression connue. Prouver que la CI échoue.
6. Si la variabilité du modèle le permet, exécuter plusieurs fois un échantillon ; ne pas présenter une seule mesure comme stable sans justification.

## Garde-fous

- Le juge LLM ne décide jamais seul de l'autorisation d'accès ou d'une opération irréversible.
- Les cas de test ne doivent pas contenir de secrets réels.
- Ne pas générer puis évaluer automatiquement tous les cas sans contrôle de couverture et de qualité des labels.
- Mesurer coût, latence et abstention avec la qualité, pas à sa place.

## Chaîne avec le projet

Le [Laboratoire IA de bout en bout](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) transforme ces principes en séquence : versionner les cas, définir les métriques avant de tester, injecter une régression, puis examiner les erreurs par sous-groupe. Le juge LLM n'est jamais la source de vérité pour les droits d'accès.

## Références

- [Ragas : overview des métriques](https://docs.ragas.io/en/stable/concepts/metrics/overview/)
- [NIST : Generative AI Profile (AI RMF)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [OWASP GenAI Security Project](https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/)
