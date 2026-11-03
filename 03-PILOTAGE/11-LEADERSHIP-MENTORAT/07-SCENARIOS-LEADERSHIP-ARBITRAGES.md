---
stability: stable
acte: arbitrer
---

# Sept situations de leadership : décider, expliquer et obtenir un mouvement collectif

Ces scénarios s'évaluent sur la qualité du diagnostic, la clarté des intérêts, la décision explicite, la communication, les conséquences et le suivi. Une réponse « il faut communiquer » n'est pas suffisante : il faut préciser qui, quoi, quand, par quel canal et comment vérifier que l'action a changé la situation.

## 1. Désaccord technique : monolithe modulaire ou microservices

**Contexte.** Deux équipes souhaitent extraire immédiatement un module de facturation en microservice. Une équipe invoque l'autonomie de déploiement ; l'autre craint transactions distribuées, on-call et latence.

**Enjeux.** Indépendance de changement, cohérence de données, ownership, coûts opérationnels et blast radius.

**Options.** (A) extraire immédiatement ; (B) clarifier les frontières et isoler le module dans un monolithe modulaire ; (C) extraire un seul flux pilote avec métriques et retour possible.

**Critères.** Rythme de changement indépendant, nécessité d'isolation, capacité d'exploitation, données détenues, latence, maturité des contrats, coût total.

**Erreur fréquente.** Chercher le consensus de préférence (« microservices modernes ») plutôt qu'un test de besoin et de capacités.

**Réponse faible.** « Faisons un POC et on verra. » Aucun succès mesurable, propriétaire ou condition d'arrêt.

**Réponse solide.** « Nous mesurons d'abord les déploiements couplés et incidents de coordination. Nous clarifions le propriétaire des invariants. Si le besoin d'indépendance est confirmé, nous extrayons un flux non critique via un contrat versionné, avec SLO, coûts, plan de migration et seuil d'abandon. »

**Grille /10.** diagnostic factuel 2, options 2, risques 2, test/indicateurs 2, décision et communication 2.

## 2. Influence sans autorité

**Contexte.** Une équipe propriétaire d'une API ne priorise pas un problème de compatibilité qui bloque tes consommateurs.

**Enjeux.** Dépendance inter-équipes, responsabilité floue et délais.

**Options.** Escalade immédiate ; accord bilatéral avec contrat ; contournement temporaire ; arbitrage de roadmap avec données.

**Critères.** Impact client, coût du blocage, sécurité, délai, réversibilité et responsabilité.

**Erreur fréquente.** Envoyer un long message accusatoire ou parler au nom d'une équipe sans l'avoir consultée.

**Réponse faible.** « Ils doivent faire leur travail, je vais escalader. »

**Réponse solide.** Partager un exemple reproductible, quantifier les consommateurs impactés, proposer deux options, demander un propriétaire et une date, documenter l'exception temporaire et fixer un point de décision commun.

**Grille /10.** faits 2, compréhension des intérêts 2, proposition 2, engagement mutuel 2, suivi 2.

## 3. Arbitrage entre équipes

**Contexte.** Sécurité demande une validation supplémentaire ; produit veut livrer vendredi ; exploitation veut réduire le changement.

**Enjeux.** Risque, délai, capacité et responsabilité.

**Options.** Reporter ; réduire le périmètre ; livraison progressive ; accepter un risque avec autorité habilitée et expiration.

**Critères.** Gravité/impact, réversibilité, exposition, contrôle compensatoire, obligation contractuelle, fenêtre de déploiement.

**Erreur fréquente.** Traiter la sécurité comme un veto absolu ou le délai comme un fait qui écrase tous les risques.

**Réponse faible.** « On livre et on corrige après. »

**Réponse solide.** Décomposer le périmètre, identifier les contrôles manquants, choisir le plus petit changement réversible, faire approuver toute acceptation de risque par le bon propriétaire, définir rollback et signal d'arrêt.

**Grille /10.** parties/risques 2, options 2, contrôles 2, autorité et trace 2, décision/suivi 2.

## 4. Résistance au changement

**Contexte.** Une équipe contourne un Golden Path parce que le template ralentit un déploiement et génère des erreurs.

**Enjeux.** Adoption, confiance, sécurité et qualité de plateforme.

**Options.** Imposer ; retirer le contrôle ; observer le parcours et corriger ; créer une exception temporaire.

**Critères.** Friction observée, risque réellement contrôlé, fréquence, coût de contournement, dette de migration.

**Erreur fréquente.** Accuser l'équipe de « résistance » sans analyser la conception du chemin.

**Réponse faible.** « Il faut former les développeurs et leur interdire le bypass. »

**Réponse solide.** Observer une exécution, identifier étape fautive, séparer garde-fou essentiel du choix non nécessaire, publier correction, fournir voie d'exception auditable et mesurer l'adoption ainsi que les échecs après changement.

**Grille /10.** écoute 2, diagnostic 2, sécurité 2, action 2, mesure 2.

## 5. Communication à la direction

**Contexte.** Un incident a retardé un lancement ; la direction demande si l'architecture est « mauvaise » et combien coûterait une refonte.

**Enjeux.** Décision, confiance, coût et compréhension du risque.

**Options.** Défendre l'équipe ; demander refonte ; présenter une réduction ciblée du risque ; différer avec plan d'action.

**Critères.** Faits connus/inconnus, impact, cause systémique, alternatives, coût et risque résiduel.

**Erreur fréquente.** Masquer l'incertitude par du jargon ou promettre une refonte qui garantit zéro panne.

**Réponse faible.** « Le problème est complexe et nécessite Kubernetes/une refonte. »

**Réponse solide.** Résumer impact et durée, distinguer faits/hypothèses, décrire facteur déclenchant et lacunes de détection, comparer deux investissements avec coût et bénéfice mesurable, recommander un plan avec point de contrôle.

**Grille /10.** concision 2, vérité/incertitude 2, impact métier 2, options/coûts 2, recommandation 2.

## 6. Mentorat difficile

**Contexte.** Un ingénieur autonome répète des erreurs de concurrence et rejette les revues de code comme trop strictes.

**Enjeux.** Qualité, sécurité psychologique, responsabilité et progression.

**Options.** Reprendre le code ; augmenter les contrôles ; définir objectifs d'apprentissage ; changer temporairement le périmètre.

**Critères.** Nature de l'erreur, contexte, expérience, feedback reçu, impact potentiel, soutien disponible.

**Erreur fréquente.** Confondre mentorat et correction permanente, ou éviter une conversation difficile.

**Réponse faible.** « Lis la doc sur les threads et sois plus vigilant. »

**Réponse solide.** Choisir un exemple précis, demander le raisonnement, identifier le modèle mental manquant, pratiquer sur un test concurrentiel minimal, définir un objectif observable et réévaluer après une période convenue. Les défauts bloquants restent bloquants pendant la progression.

**Grille /10.** respect/faits 2, diagnostic 2, objectif observable 2, soutien 2, suivi 2.

## 7. Décision impopulaire

**Contexte.** Une livraison demandée par une date publique doit être reportée car la restauration de données n'a jamais été testée.

**Enjeux.** Réputation, perte de données, confiance et coût du retard.

**Options.** Livrer tel quel ; réduire l'exposition ; retarder ; livrer sous une dérogation de risque approuvée et limitée si elle est acceptable.

**Critères.** Impact potentiel, probabilité, capacité réelle de restauration, dérogation autorisée, protections alternatives et coût du report.

**Erreur fréquente.** Décider seul sans expliquer les éléments observés, ou transformer la décision en posture morale.

**Réponse faible.** « Je ne veux pas prendre de risque, on reporte. »

**Réponse solide.** Montrer le test manquant, quantifier l'impact maximal plausible, proposer le test/restauration minimal avant décision, définir les conditions de livraison et communiquer les options à l'autorité responsable du risque.

**Grille /10.** risque concret 2, preuve 2, options 2, autorité 2, communication 2.

## Évaluation finale

Choisir deux scénarios et produire une note décisionnelle d'une page chacun. Faire relire par un pair ou comparer à la réponse solide. Pour chaque scénario, noter : faits, suppositions, personnes affectées, décision, propriétaire, délai, mesure et condition de réouverture. Seuil : 16/20 pour chaque scénario. Toute réponse qui cache un risque matériel, manipule les indicateurs ou promet une certitude non démontrée échoue.

**Preuve de maîtrise :** décisions datées et anonymisées, retours de personnes concernées, résultat mesuré et réflexion sur ce qui a changé dans la décision après feedback.

## Transfert inter-équipe

Choisis un des scénarios et rejoue-le avec une autre contrainte : équipe distante, budget réduit de moitié ou échéance réglementaire avancée. Garde les faits invariants, mets à jour les options et justifie ce qui change. **Vérification :** l'ADR ou la note de décision doit nommer l'hypothèse qui a basculé le choix et l'indicateur qui fera réexaminer la décision.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Traiter un arbitrage de leadership

```text
situation et acteurs
       |
       v
intérêts + contraintes
       |
       v
options et coûts
       |
       v
décision expliquée
       |
       v
suivi et apprentissage
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Sept situations de leadership : décider, expliquer et obtenir un mouvement collectif** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Résoudre un arbitrage de leadership de bout en bout

**Mission liée à « Sept situations de leadership : décider, expliquer et obtenir un mouvement collectif » :** Choisis deux scénarios parmi les situations du dossier et traite-les comme des décisions Kintana : diagnostic, personnes concernées, options, décision, communication, suivi et condition de révision.

**Livrable :** Deux fiches d’arbitrage et une synthèse des principes réutilisables.

**Critères d’acceptation :** Les conséquences sur plusieurs équipes sont visibles ; la décision a un propriétaire ; la consultation n’est pas confondue avec un veto collectif.

**Transfert obligatoire :** Un scénario devient irréversible : identifie les points de contrôle à déplacer avant l’engagement.
