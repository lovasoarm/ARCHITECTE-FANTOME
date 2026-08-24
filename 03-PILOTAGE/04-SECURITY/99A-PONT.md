---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# PONT : de sécuriser du code humain à sécuriser du code généré

Temps de lecture ~2 min

> **ARRÊTE-TOI ICI.** Ce pont relie la sécurité du code humain à la lecture critique d'une sortie d'IA dans le gros codebase. Il mène à `04-EPREUVE/04-BIG-APP-SNOOP/`, pas à un second cursus IA.

## POURQUOI CE PONT EXISTE

Tu sais reconnaître XSS, CSRF, injection SQL et secrets fuités. Dans `04-BIG-APP-SNOOP/`, tu dois repérer les mêmes classes de risques dans un système que tu n'as pas conçu, y compris lorsqu'un correctif généré par IA paraît propre. La menace ne change pas ; le contexte et l'incertitude changent.

## CE QUE TU MAÎTRISES DÉJÀ

- Auditer une entrée utilisateur.
- Reconnaître un pattern OWASP dans du code.
- Refuser un secret hardcodé, même dans un exemple qui passe localement.

## VOCABULAIRE NOUVEAU

- **Hallucination** : une API, un comportement ou une justification inventée qui n'existe pas dans le système réel.
- **Plausible-mais-faux** : code qui compile, tourne, et implémente mal le contrat métier ou de sécurité.
- **Prompt injection** : entrée qui détourne l'instruction adressée au modèle.
- **Fuite de secret via IA** : une clé ou une donnée sensible injectée dans un contexte où elle ne doit pas apparaître.

## PIÈGE MENTAL

Faire confiance à un snippet généré parce qu'il ressemble à du code que tu aurais écrit. La ressemblance rassure ; elle ne prouve rien.

## EXERCICE-CHARNIÈRE

L'IA te propose `crypto.createHash('md5').update(pass).digest('hex')` pour hasher un mot de passe. Nomme les trois problèmes et la correction minimale.

Réponse attendue : MD5 est inadapté au stockage de mots de passe, le salage doit être géré par un KDF adapté, et le coût de calcul doit être choisi puis mesuré.

## TRANSITION

Ouvre ensuite [`04-BIG-APP-SNOOP/README.md`](../../04-EPREUVE/04-BIG-APP-SNOOP/README.md). Si tu bloques, reviens au module précédent : ce pont existe précisément pour empêcher qu'un code « propre » soit confondu avec du code sûr.
