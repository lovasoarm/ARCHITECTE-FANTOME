---
stability: evolutif
acte: apprendre
noyau: non
route: depth
---

# Leçon-pont 06 : Zero trust et sécurité de la chaîne logicielle

## Résultat attendu

Savoir prouver qui exécute quoi, avec quelles permissions, à partir de quels artefacts et dépendances. Une analyse statique seule ou une connexion chiffrée ne suffit pas.

## Exercices

1. Dresser l'inventaire des identités humaines, identités de services, secrets, artefacts et dépendances.
2. Écrire une matrice `identité × action × ressource` avec refus par défaut.
3. Protéger un service par mTLS dans un labo et tester révocation/rotation.
4. Produire une SBOM, fixer des versions, scanner et expliquer chaque alerte importante.
5. Signer un artefact et vérifier sa provenance dans la CI ; altérer l'artefact et prouver que le contrôle échoue.
6. Écrire un plan de réponse à compromission : isolation, rotation, investigation, restauration et prévention de récidive.
7. En DEPTH uniquement, établir un inventaire crypto et un plan d'agilité/migration post-quantique ; utiliser des bibliothèques maintenues et des standards en vigueur, jamais une primitive maison.

## Références

- [NIST SP 800-218 : SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
- [NIST SSDF 1.2 : draft public, donc statut à revérifier](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd)
- [SLSA Build Track 1.2](https://slsa.dev/spec/v1.2/build-track-basics)
- [OWASP GenAI Security Project](https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/)
