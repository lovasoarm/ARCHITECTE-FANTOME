---
perishability_id: PER-0081

stability: "perissable"
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: high
assessment_role: staff_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://go.dev/doc/"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « 07 : Transfert hors écosystème ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 07 : Transfert hors écosystème

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Transférer sans copier les détails accidentels

```text
contexte A
   |
   v
invariant à préserver
   |
   v
hypothèses qui changent
   |
   v
adaptation au contexte B
   |
   v
validation locale
```

## Mission

Choisis un service **non trivial** du fil rouge (pas un hello-world). Réécris la
partie déterminante dans un **second langage ou runtime**, sans recopier les détails
accidentels de la première solution (SDK, chemins, noms de tables « parce que c'était déjà là »).

Deux niveaux de preuve sont reconnus, sans les confondre :

- **Préparation du Capstone : `PORTAGE_CONÇU` :** exécute les deux implémentations dans des environnements locaux distincts et fais passer les mêmes tests de contrat ; décris le fournisseur cible, les services équivalents, le plan, le rollback, les prix publics datés et les limites. Aucun compte ni paiement cloud n'est requis. Cette preuve ouvre le Capstone, mais ne valide pas S7.
- **Maîtrise Staff : `PORTAGE_EXÉCUTÉ` :** déploie réellement le service chez un **second fournisseur**, rejoue les tests comparables sur les deux cibles et joins les URLs/logs/captures datés ainsi que les mesures côté cible. Cette preuve seule peut fermer S7.

## Contenu imposé de `PORTAGE.md`

La première ligne de preuve doit déclarer `mode: PORTAGE_CONÇU` ou `mode: PORTAGE_EXÉCUTÉ`. Pour le mode conçu, les éléments de fournisseur cible sont marqués `DESIGN` et ne sont jamais présentés comme exécutés.

1. Invariants conservés (contrats, SLO, plafond IA, schéma métier).
2. Décisions **repensées** et leur coût (ce qui n'a pas survécu au portage).
3. Delta mensuel **estimé** en `PORTAGE_CONÇU` à partir des prix publics datés, ou **constaté** en `PORTAGE_EXÉCUTÉ` sur une charge comparable (mêmes quatre postes que le relevé tarifaire). N'invente jamais une facture ou une consommation.
4. En `PORTAGE_CONÇU` : SLO de référence, hypothèses de capacité, méthode de mesure du SLO/RTO cible et statut `DESIGN` / `NOT RUN`. En `PORTAGE_EXÉCUTÉ` : SLO et RTO réellement **mesurés** côté cible, protocole et résultats datés.
5. Preuve reproductible : dépôt ou archive, commandes exactes et dates ; les deux implémentations et tests locaux en mode conçu, puis URLs/logs/captures et mesures fournisseur en mode exécuté.

Les exigences de mesure réelle chez le second fournisseur s'appliquent uniquement à `PORTAGE_EXÉCUTÉ` et à la fermeture de S7. Un dossier `PORTAGE_CONÇU` reste complet pour l'accès au Capstone s'il documente honnêtement les estimations, hypothèses et éléments `NOT RUN`.

Une différence de syntaxe n'est pas un transfert. L'épreuve porte sur les
contrats, les limites, les pannes et le coût.

## Validation solo

Dépôt public ou archive reproductible. Pas d'équipe réelle exigée. La validation de `PORTAGE_CONÇU` peut être faite sans fournisseur actif ; la validation de `PORTAGE_EXÉCUTÉ` exige les preuves de déploiement cible. Modèle :
[S7-PORTAGE](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md).

Le [boss fight](96-boss-fight.md) peut attaquer cette pièce : « qu'est-ce qui casse
si je change de fournisseur ? » : objection 18 du contradicteur.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **07 : Transfert hors écosystème** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Transférer une décision hors de son écosystème

**Mission liée à « 07 : Transfert hors écosystème » :** Transpose une décision Kintana dans un contexte différent (petite équipe, autre secteur ou autre contrainte réglementaire). Sépare le principe invariant des hypothèses propres à Kintana.

**Livrable :** Tableau invariants/hypothèses, décision adaptée et limites du transfert.

**Critères d’acceptation :** Le transfert ne copie pas les outils par réflexe ; chaque hypothèse invalidée conduit à une adaptation explicite.

**Transfert obligatoire :** Le nouvel environnement n’a pas les mêmes capacités d’exploitation : simplifie la solution en préservant l’invariant.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Go : Documentation](https://go.dev/doc/)
- [Python : asyncio](https://docs.python.org/3/library/asyncio.html)
- [Java : Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)
- [.NET : SynchronizationContext](https://learn.microsoft.com/en-us/dotnet/api/system.threading.synchronizationcontext)

> **Limite de transfert entre runtimes :** ne transpose pas directement les règles d’exécution asynchrone d’un langage à l’autre. En .NET, le contexte capturé par `await` dépend notamment de l’environnement : une application UI peut installer un `SynchronizationContext`, alors qu’une application console n’en installe généralement pas. `await` ne signifie donc pas « reprendre toujours sur le même thread ». Go, Java, Python et Rust ont leurs propres modèles de concurrence et d’ordonnancement ; compare les garanties et les primitives documentées, pas seulement la syntaxe.
