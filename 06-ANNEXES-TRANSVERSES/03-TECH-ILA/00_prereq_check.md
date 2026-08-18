---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : TECH-ILA

Acte attendu : évaluer.

Temps de lecture ~5 min

> Tu ne dois **pas** ouvrir un niveau TECH-ILA si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce document ne t'apprendra aucun mécanisme : il suppose les mécanismes acquis.

## Questions

1. Qu'est-ce que l'event loop, et que se passe-t-il quand une tâche synchrone longue s'y installe ?
2. Pourquoi un test écrit après le code vérifie surtout que le code fait ce qu'il fait ?
3. Différence entre un mécanisme et son incarnation technologique, avec un exemple pris dans ton fil rouge ?

## Calibration obligatoire : reconnaître le même mécanisme sous deux noms (10 min)

Pour chacune des trois paires, dis en une ligne quel mécanisme unique est en jeu :

1. un `middleware` Express et un `interceptor` NestJS ;
2. un `index` SQL et une `Map` en mémoire ;
3. une `variable d'environnement` et un paramètre injecté dans un constructeur.

### Corrigé

1. Interposer un traitement sur le chemin d'une requête, sans que l'appelant ni le destinataire ne le sachent.
2. Payer de la mémoire et de l'écriture pour transformer une recherche linéaire en recherche quasi constante.
3. Sortir une valeur qui varie selon l'environnement hors du code qui l'utilise, pour que le code reste testable.

## Verdict

- **Les trois questions et deux paires sur trois** → tu peux ouvrir le niveau appelé par ta rétrospective, et lui seul.
- **Moins que ça** → retourne au bloc MyFunnyJS correspondant. TECH-ILA lu trop tôt ne fait que fabriquer du vocabulaire creux.
