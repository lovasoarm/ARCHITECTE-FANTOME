---
stability: evolutif
acte: maitrise
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/07-gateway-llm-fiabilite.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/07-gateway-llm-fiabilite.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 04 : Le Chef d’Orchestre des Modèles

> Gateway LLM : adaptateurs, routage, fallback, cache sémantique et inférence locale.

**Place dans le parcours :** Avancé : fiabilité et économie d’un ensemble de modèles.  
**Prérequis :** HTTP/API, timeouts/retries, observabilité, coûts ; Tribunal des IA ; notions d’isolation des tenants et protection des secrets.

## Parcours de préparation obligatoire

Commence par valider le [socle commun G0](00-PARCOURS-PREPARATION.md#niveau-0--socle-commun-obligatoire), puis suis les prérequis spécifiques ci-dessous. Un lien lu n’est pas une compétence validée : réussis aussi la preuve de sortie du parcours central.

- [HTTP/REST et API Craft](../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md) et [API Craft](../../02-CONSTRUCTION/19-API-CRAFT/README.md).
- [Async](../../01-CADRAGE/02-ASYNC/README.md), [annulation et délais](../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md), [gestion des erreurs](../../01-CADRAGE/04-ERROR-HANDLING/README.md), [rate limiting](../02-SCALABILITY/07-rate_limiting.md).
- [Observability](../../03-PILOTAGE/05-OBSERVABILITY/README.md), [coût IA](../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/02-COST.md), [Lab IA 60](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md), puis [Leçon-pont 07 : Gateway LLM](LECONS-PONTS/07-gateway-llm-fiabilite.md).
- Étudie d'abord la [Leçon-pont 02 : Évaluation IA](LECONS-PONTS/02-evaluation-et-llm-judge.md), puis termine le [Tribunal des IA](02-tribunal-des-ia.md) avec un verdict `PASS` traçable avant d'automatiser les décisions de routage ; lire sa fiche ou son pont ne suffit pas.

**Gate d'entrée :** le [Tribunal des IA](02-tribunal-des-ia.md) est validé `PASS` ; tu sais aussi gérer un timeout sans supposer que l'effet distant est annulé, limiter les retries, expliquer un circuit breaker, mesurer coût/latence et refuser un fallback incompatible avec la classification des données. Voir le [parcours central](00-PARCOURS-PREPARATION.md#niveau-2--route-ia).

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
