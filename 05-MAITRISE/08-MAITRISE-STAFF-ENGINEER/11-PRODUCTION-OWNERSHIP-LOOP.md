---
stability: intemporel
acte: maitrise
noyau: oui
assessment_role: staff_mastery
---

# Production ownership loop : posséder le résultat en production

## 1. Ce que signifie l'ownership

L'**ownership de production** est la responsabilité explicite de comprendre le comportement d'un système, d'en réduire le risque, de répondre aux incidents, de préserver les données, de mesurer les résultats et de faire fermer les actions correctives. Ce n'est pas « être de garde pour tout » ni porter seul toutes les pannes.

Un système bien possédé a des limites, propriétaires, SLO/SLI, runbooks, accès, procédures de changement et dépendances identifiables. La responsabilité est partagée entre équipes avec des interfaces claires.

## 2. Boucle de travail

```text
[Besoin / changement]
        |
        v
[Conception + risques + critères]
        |
        v
[Build / tests / revue]
        |
        v
[Déploiement contrôlé]
        |
        v
[Signaux / SLO / support]
        |
        v
[Incident ou apprentissage]
        |
        v
[Diagnostic + restauration]
        |
        v
[Actions avec propriétaires et échéances]
        |
        +------> [Tests / architecture / documentation]
```

La boucle ne s'arrête pas au déploiement. Elle se ferme lorsque les actions ont une preuve de correction et que les changements améliorent le résultat observable.

## 3. Artefacts minimaux

- service owner et équipe secondaire ;
- architecture et dépendances mises à jour ;
- SLI/SLO ou objectifs adaptés au risque ;
- dashboard et alertes actionnables ;
- runbook pour incidents probables ;
- procédure de déploiement, rollback et restauration ;
- inventaire de secrets/identités ;
- test de sauvegarde/restauration ;
- journal des changements significatifs ;
- postmortems et suivi d'actions.

Un document sans propriétaire, vérification et date de revue peut devenir dangereux. Un runbook doit être essayé, pas seulement lu.

## 4. Scénario d'évaluation

Un service de commande dépasse son SLO pendant une migration. L'alerte arrive, mais le runbook pointe vers une commande obsolète et la personne d'astreinte n'a pas les permissions. L'équipe doit stabiliser sans contourner la sécurité, communiquer, identifier les dépendances et restaurer sans perdre les commandes déjà acceptées.

L'apprenant doit :

1. définir le rôle incident commander et la communication ;
2. identifier les signaux d'impact ;
3. arrêter la promotion risquée ;
4. décider rollback vs hotfix selon compatibilité des données ;
5. préserver l'audit et les identités ;
6. vérifier intégrité, rattrapage et retour au SLO ;
7. assigner les actions correctives.

## 5. Pièges

- Ownership = responsabilité individuelle illimitée : mène à l'épuisement et à une architecture sans équipe.
- Alertes sans action : fatigue d'astreinte.
- Rollback non testé : faux sentiment de sécurité.
- Postmortem sans propriétaire d'action : répétition de l'incident.
- État de service « vert » sans vérification de l'intégrité métier.
- Docs non synchronisées avec la production.

## 6. Exercice et grille /25

Produire un dossier d'exploitation pour un service réel ou de laboratoire : propriétaires, SLO, alertes, runbook, identité, sauvegarde, test de restauration, rollback et postmortem simulé.

Grille : ownership/rôles (4), signaux/SLO (4), déploiement/rollback (5), sécurité/accès (4), reprise/intégrité (4), actions et maintenance (4). Seuil 20/25, aucun zéro en accès ou reprise.

## 7. Exemple de réponse faible et forte

**Faible :** « Je suis responsable du service, je surveille les logs et je corrige vite. » Rien ne précise l'autorité, les signaux, les données ou le test de reprise.

**Forte :** l'équipe propriétaire est nommée, un incident commander coordonne, le SLI métier déclenche l'alerte, l'arrêt des promotions est explicite, le choix de rollback tient compte du schéma, la restauration est vérifiée et chaque action a un propriétaire et une preuve de fermeture.

## 8. Preuve de maîtrise

Lien de service ou laboratoire, runbook essayé, résultat d'un exercice de restauration, postmortem, actions fermées et revue par un autre ingénieur. Ce document évalue une pratique observée ; un exercice réussi ne démontre pas à lui seul l'ownership durable d'un système en production.

## Contrat longitudinal obligatoire conservé

Sur un même fil rouge, garder au minimum trois états datés du système, un changement de produit ou de charge, une dégradation observable, une décision de migration/rollback/réduction de périmètre, une mesure avant/après et une condition qui aurait invalidé la décision. La boucle est : baseline → changement → incident/régression → diagnostic → décision → mitigation → migration/refactor → mesure post-changement → revisite.

Un benchmark synthétique exécuté une seule fois ne ferme pas ce gate. Une simulation peut fermer un niveau d'exercice initial, mais elle ne doit jamais être présentée comme une preuve d'expérience terrain avancée. Créer `PREUVES/OWNERSHIP-LOOP.md` avec horodatages, mesures, décisions et écarts ; un tiers doit pouvoir comprendre le dossier sans explication orale.

### Transfert : changer de contexte

Applique le mécanisme de « Production ownership loop : posséder le résultat en production » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Production ownership loop : posséder le résultat en production** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Fermer la boucle de responsabilité en production

**Mission liée à « Production ownership loop : posséder le résultat en production » :** Pour un service Kintana, relie objectif de fiabilité, SLI/SLO, alertes actionnables, runbook, décision d’incident, rollback et revue après changement.

**Livrable :** Fiche de responsabilité opérationnelle et scénario d’incident annoté.

**Critères d’acceptation :** Chaque alerte mène à une action ; les seuils ont une justification ; l’astreinte et l’escalade ont un propriétaire ; le retour d’expérience produit des actions suivies.

**Transfert obligatoire :** Le SLO est respecté mais les utilisateurs souffrent : identifie le signal manquant.
