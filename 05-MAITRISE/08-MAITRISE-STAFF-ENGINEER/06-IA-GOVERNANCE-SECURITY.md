---
stability: perissable
acte: maitrise
perishability_id: PER-0082
freshness_registry_id: PER-0082
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-01-28
review_status: a_verifier_date_absente
---

> **SCÈNE CRAZYDEVS : l’agent de Prison Break a les clés :** qui a décidé de ses permissions, sur quelles limites, avec quel audit et quel bouton d’arrêt ?

# Gouvernance et sécurité des systèmes IA en production

## 1. Ce qui doit être gouverné

Un système IA en production combine modèle, données, prompts ou instructions, outils/actions, retrieval, orchestration, utilisateurs, observabilité et mécanismes de repli. La gouvernance doit couvrir le système complet, pas seulement le nom/version du modèle.

Une décision importante doit désigner : propriétaire produit, propriétaire technique, responsable des données, autorité de sécurité, limites d'usage, utilisateurs affectés, mécanisme de contestation et procédure d'arrêt.

## 2. Flux de contrôle

```text
[Utilisateur / requête]
        |
        v
[Authentification + autorisation]
        |
        v
[Validation / classification de risque]
        |
        v
[Orchestrateur / politique]
        |              \
        v               v
[Modèle]         [Outils contrôlés]
        |               |
        +-------+-------+
                v
        [Validation résultat]
                |
       +--------+--------+
       |                 |
       v                 v
[Réponse autorisée] [Refus / escalade / humain]
       |
       v
[Journal sûr / métriques / retour]
```

Les outils doivent avoir des permissions séparées et limitées. Le modèle ne doit pas être la seule barrière de sécurité : valider les entrées et les actions côté service, vérifier l'autorisation à chaque opération et exiger une approbation humaine pour les actions irréversibles ou à fort impact lorsque le risque l'impose.

## 3. Menaces et contrôles

- **Injection de prompt** : contenu non fiable tente de modifier les instructions. Séparer données et instructions, limiter outils, traiter toute source externe comme non fiable et valider les paramètres en code.
- **Exfiltration** : modèle/outil révèle des données. Appliquer contrôle d'accès côté source, minimisation, filtrage de sortie et journalisation adaptée.
- **Abus d'outil** : action excessive ou non autorisée. Allowlist d'outils, schémas stricts, permissions minimales, quotas, confirmations et limites de transaction.
- **Données de retrieval contaminées** : provenance et confiance doivent être conservées ; les documents ne deviennent pas des instructions de confiance.
- **Hallucination ou sortie non conforme** : validation par règles, citation/source, seuil de confiance opérationnel et voie de refus/validation humaine.
- **Supply chain** : dépendances, modèles et artefacts inventoriés, versions/digests, provenance et procédure de mise à jour.
- **Secret dans traces** : redaction en amont, accès aux traces limité, rétention définie et tests de non-exposition.

## 4. Évaluation avant mise en production

Constituer un jeu de cas représentatif, cas limites et attaques ; définir métriques de qualité, sécurité, coût, latence et équité adaptées à l'usage ; mesurer le taux de réussite et les faux positifs/négatifs ; faire une revue humaine des erreurs graves ; fixer les critères de lancement, rollback et arrêt. Ne pas présenter une seule moyenne comme une preuve de sûreté.

Tester la chaîne d'outils avec des appels interdits, paramètres invalides, prompt injection provenant d'une page/document, données cross-tenant et indisponibilité du modèle. Une politique écrite n'est pas une preuve tant qu'elle n'est pas testée.

## 5. Opération et incidents

Monitorer refus, erreurs, appels d'outils, coût par tâche, latence, dérive des données et qualité évaluée. Ne pas enregistrer le prompt complet sans analyse de confidentialité. Prévoir kill switch, dégradation vers une voie non IA, reprise, communication aux utilisateurs et conservation de preuves sans collecte excessive.

Lors d'une fuite ou d'une action non autorisée : désactiver la capacité concernée, révoquer les credentials, limiter l'accès aux données, mesurer le périmètre, prévenir les responsables selon le processus et rétablir uniquement après un test de contrôle.

## 6. Décision de gouvernance : exemple

Un agent peut proposer le remboursement mais pas déclencher seul un paiement au-delà d'un seuil. Le service vérifie le compte, la commande, la politique et le montant ; un humain approuve les cas à risque ; chaque décision garde une raison, une version de politique et un identifiant de corrélation. Si le modèle est indisponible, l'application bascule sur le workflow manuel.

## 7. Exercice et grille /25

Construire un registre des actifs et menaces pour un agent qui consulte des commandes et propose des remboursements. Définir outils, permissions, confirmation, tests adversariaux, métriques, journaux, rétention, rollback et kill switch.

Grille : modèle de menace (5), contrôle d'autorisation dans le code (5), tests adversariaux (4), observabilité/confidentialité (4), repli et incident (4), gouvernance/ownership (3). Échec si le prompt est présenté comme unique mécanisme d'autorisation ou si l'agent possède un credential omnipotent.

## 8. Fraîcheur et preuve

Les exigences réglementaires, offres de modèles et outils changent. Vérifier au moment du projet les sources officielles et politiques applicables, noter date/version et ne pas interpréter ce document comme un avis juridique. Il est marqué `review_status: a_verifier` jusqu'à revue officielle.

**Preuve attendue :** architecture de contrôle, registre de menaces, tests adversariaux, matrice d'accès, plan de réponse à incident et preuve de repli testée. Le passage de cette épreuve ne confère pas à lui seul un titre de Staff/Distinguished.

## Chaîne de gouvernance conservée

```text
objectif -> données -> modèle/agent -> outils + permissions
        -> évaluation -> observabilité -> coût -> sécurité
        -> fallback / arrêt -> gouvernance
```

Le système doit être évalué comme un ensemble socio-technique. Les références initialement utilisées par ce module sont conservées, mais doivent être revérifiées avant une utilisation normative : [NIST AI RMF : GenAI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) et [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/). L'existence d'une ressource ne remplace pas sa revue à la date du projet.

### Épreuve d'agent conservée

Sur un agent du fil rouge, réponds : quelles actions peut-il réellement effectuer ? Quelles permissions sont minimales ? Quelles données peut-il lire ? Quelle sortie doit être évaluée avant effet ? Quel événement déclenche un kill switch ? Comment mesurer le coût par tâche ? Comment prouver qu'un changement de modèle n'a pas cassé les garanties ? Produis un threat model et des tests ; ne t'appuie pas uniquement sur une réponse textuelle du modèle.

<!-- AF-P0-2026-10-30: missing_transfer -->

### Transfert : changer de contexte

Applique le mécanisme de « Gouvernance et sécurité des systèmes IA en production » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
