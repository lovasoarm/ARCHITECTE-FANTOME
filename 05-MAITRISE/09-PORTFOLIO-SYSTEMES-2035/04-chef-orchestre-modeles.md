---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 04 : Le Chef d’Orchestre des Modèles

> Gateway LLM : adaptateurs, routage, fallback, cache sémantique et inférence locale.

**Place dans le parcours :** Avancé : fiabilité et économie d’un ensemble de modèles.  
**Prérequis :** HTTP/API, timeouts/retries, observabilité, coûts ; Tribunal des IA ; notions d’isolation des tenants et protection des secrets.

## Mission

Créer une couche indépendante du fournisseur qui choisit une stratégie adaptée à la tâche et aux contraintes. Le gateway doit gérer explicitement les erreurs et ne pas transformer le fallback en coût caché.

## Version de départ : obligatoire

- [ ] Définir un contrat commun minimal et des adaptateurs fournisseur séparés ; préserver les différences utiles (capabilities, sortie structurée, streaming, politiques de données).
- [ ] Créer un routeur explicable selon type de tâche, capacité requise, latence, coût estimé et niveau de confidentialité. Chaque route possède une raison auditable.
- [ ] Gérer timeouts, retry avec limite, backoff, circuit breaker, budget d’appels, plafond par utilisateur et fallback sans boucles illimitées. Chaque backend de repli doit appliquer la même classification/confidentialité ; si aucun backend autorisé n’est disponible, échouer proprement au lieu de divulguer les données.
- [ ] Journaliser modèle/route, latence, tokens ou proxy de coût, résultat du fallback et erreurs sans écrire le contenu privé par défaut.
- [ ] Ajouter un cache exact puis, uniquement si utile, un cache sémantique. Isoler strictement les tenants, les ACL, versions de modèle, prompts, paramètres, corpus et données sensibles ; invalider quand les droits ou sources changent.
- [ ] Mettre en place un mode dégradé documenté et un mode sans fournisseur externe. L’inférence locale est une option mesurée, pas un prérequis.

## Extensions Depth : une à la fois

- [ ] Mode shadow : évaluer un second modèle sans afficher sa sortie, pour comparer coût/qualité/latence.
- [ ] Routage avec données d’évaluation et seuils ; ne pas router selon le nom du modèle ou son classement populaire uniquement.
- [ ] Budget mensuel simulé, rate limits, mécanisme d’arrêt d’urgence et rapport coût par résultat acceptable.

## Tests d’acceptation

- [ ] Une panne du fournisseur primaire n’entraîne pas un retry/fallback infini ni dépassement du budget prédéfini.
- [ ] Le cache ne renvoie jamais une réponse provenant d’une autre identité, d’une politique de droits antérieure ou d’une configuration incompatible. Un fallback interdit pour une classification de données est refusé.
- [ ] Chaque décision de routage est explicable et peut être rejouée à partir des métadonnées non sensibles.
- [ ] Le mode local ou déterministe a une politique de repli claire, sans prétendre être équivalent au plus grand modèle.

## Chaîne pédagogique

Avant d’ajouter routage ou fallback, exécute le [60 : Laboratoire IA](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) pour poser une baseline de qualité, coût et latence. Chaque choix d’orchestrateur doit être mesuré contre cette baseline.

## Dossier de preuves attendu

Contrat et adaptateurs, ADR de routage, dashboard coût/latence, tests panne fournisseur, threat model cache, politique de données, benchmark comparatif, S6 et rollback.

## Hors périmètre et limites

Pas d’objectif de supporter tous les fournisseurs. Commencer avec deux backends : un stub déterministe et un fournisseur ou modèle local. Ne pas stocker les conversations par défaut.

## Ponts vers AF

[Tribunal des IA](02-tribunal-des-ia.md), [Tour de Contrôle](01-tour-de-controle.md), [Azure Well-Architected comme grille non liée à un fournisseur](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
