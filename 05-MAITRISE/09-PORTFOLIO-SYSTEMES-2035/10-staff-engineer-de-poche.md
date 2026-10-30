---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 10 : Le Staff Engineer de Poche

> Assistant de revue d’architecture sur code, RFC et ADR avec GraphRAG vérifiable.

**Place dans le parcours :** Projet intégrateur : uniquement après avoir produit un vrai corpus de preuves.  
**Prérequis :** RAG Blindé, Tribunal des IA, recherche structurée, sécurité des dépôts, ADR, revue de conception et outils en lecture seule.

## Mission

Construire un assistant qui aide à retrouver le contexte de décisions, expose les contradictions entre le code et les documents et prépare une revue de design. Il ne remplace ni l’auteur ni le reviewer et n’a pas de pouvoir de merge ou d’exécution.

## Version de départ : obligatoire

- [ ] Index de dépôt versionné couvrant code, README, docs, RFC, ADR, issues exportées avec droits et provenance. Garder chemin de fichier, commit, plage de lignes et type de preuve.
- [ ] Définir explicitement le graphe : fichier importe module, décision remplace décision, exigence est couverte par test, service dépend de service. Si aucune relation de graphe réelle n’est exploitée, appeler le système RAG et non GraphRAG.
- [ ] Répondre avec sources précises (chemin, commit, lignes ou section) et afficher les sources insuffisantes ou contradictoires.
- [ ] Passer les design docs sur une grille déclarée : invariants, panne, sécurité, coût, migrations, observabilité, rollback, alternatives et risque résiduel.
- [ ] Garder le mode lecture seule ; toute proposition de modification est un diff non appliqué avec validation humaine explicite.
- [ ] Évaluer le retrieval, la citation, le refus, les fausses contradictions et les fuites à partir d’un corpus de cas validé par un humain.

## Extensions Depth : une à la fois

- [ ] Détecter une évolution d’ADR et demander de réévaluer les documents qui dépendent de l’ancienne décision.
- [ ] Effectuer un contrôle de conformité aux règles de repo (liens cassés, preuve S6/G8 manquante, test sans seuil, coût affirmé sans mesure).
- [ ] Faire une revue aveugle par un pair : l’assistant et le reviewer humain évaluent indépendamment le même document, puis on compare leurs omissions.

## Tests d’acceptation

- [ ] Chaque affirmation technique importante a au moins une source identifiable ; si le code a changé, le système avertit que l’index ne correspond plus au HEAD.
- [ ] Un document secret ou un dépôt non autorisé ne fuit ni via retrieval, ni cache, ni résumés mémorisés.
- [ ] Les conclusions d’une version de modèle différente sont comparées sur le même dataset avant mise à jour.
- [ ] L’assistant peut admettre “je ne sais pas” et distinguer fait lu, inférence et suggestion.

## Dossier de preuves attendu

Schéma source/commit/graphe, policy de lecture, set d’évaluation, rapport des citations, review rubric, exemple de design review avec changements humains, limitations et ADR sur GraphRAG vs RAG.

## Hors périmètre et limites

Pas d’accès administrateur au poste, pas de commande shell ni de modification autonome, pas d’exécution de merge, pas de prétention à produire une architecture incontestable. Le projet dépend de vrais documents accumulés ; ne fabrique pas un corpus pour simuler l’impact.

## Ponts vers AF

[RAG Blindé](03-rag-blinde.md), [Tribunal des IA](02-tribunal-des-ia.md), [Dossier unique Staff](../08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md), [Gate revue externe](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
