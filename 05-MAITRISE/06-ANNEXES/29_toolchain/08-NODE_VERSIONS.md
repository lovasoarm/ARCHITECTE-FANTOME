---
perishability_id: PER-0072

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_type: primary
source_url: https://nodejs.org/en/about/previous-releases
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « NODE_VERSIONS.md ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# NODE_VERSIONS.md

Temps de lecture ~4 min

> **Source de vérité unique** : le fichier `.nvmrc` (racine) fixe la version
> Node de référence. Ce document explique la politique, les minimums historiques
> et la procédure de mise à jour. En cas de doute, `.nvmrc` fait foi.
>
> **Dernière vérification ciblée du statut des branches : 2026-11-03.**

## Version courante

État officiel des branches au **3 novembre 2026** : Node 22.x et 24.x sont en Maintenance LTS ; Node 26.x est en Active LTS depuis le 28 octobre 2026 ; Node 27.x est en Alpha ; la première publication 27.0.0-alpha.0.0.0 affichée au blog officiel date du 29 octobre 2026. Node 20 est EOL depuis le 30 avril 2026. Les dates peuvent évoluer : consulte le [calendrier officiel](https://nodejs.org/en/about/previous-releases) avant une migration.

- `.nvmrc` : **Node 22.23.4** (version exacte de référence AF)
- Ligne de référence du curriculum : **Node 22.23.4** ; les autres versions Node 22.x demandent une vérification de compatibilité distincte.
- Node 20 est **EOL depuis le 30 avril 2026** et n'est plus une version de
  référence, de CI ou de support du curriculum.

Vérifie ta version :

```bash
node -v
nvm install
nvm use
# doit afficher v22.23.4 pour une reproduction exacte
```

## Minimum par module

La référence reproductible du curriculum est **Node 22.23.4** ; les statuts officiels des branches au 3 novembre 2026 sont distincts de ce pin. Les minimums historiques
ci-dessous ne constituent pas des versions de support indépendantes : ils
indiquent seulement l'ancien niveau d'API requis par les exercices.

| Module           | Minimum pédagogique historique |         Référence d'exécution |
| ---------------- | -----------------------------: | ----------------------------: |
| 01 → 07          |                             18 |     Node 22 (22.23.4 pour AF) |
| 08 memory        |                             20 |     Node 22 (22.23.4 pour AF) |
| 14 typescript    |                             20 |     Node 22 (22.23.4 pour AF) |
| 15 runtime_env   |                             20 |     Node 22 (22.23.4 pour AF) |
| 20 realtime      |                             20 |     Node 22 (22.23.4 pour AF) |
| 23 ai_native_dev |                             20 |     Node 22 (22.23.4 pour AF) |
| 24 → 28          |                             20 |     Node 22 (22.23.4 pour AF) |
| 30 mini_projects |                             20 | Node 22 (22.23.4 pour AF) LTS |

Les scripts et la CI doivent utiliser `.nvmrc` plutôt qu'une plage vague
du type `>=20` ou `>=22` pour choisir le runtime d'exécution.

---

## Politique de version

**Mise à jour au 03/11/2026 :** Node.js 22.23.4 a été publié le 21/10/2026 comme mise à jour de sécurité. AF adopte cette version comme nouvelle référence exacte ; elle remplace le pin précédent 22.23.3. Voir les [notes officielles de Node.js 22.23.4](https://nodejs.org/en/blog/release/v22.23.4).

La version exacte de référence du dépôt est `v22.23.4` : c'est la valeur de `.nvmrc`. Les références à « Node 22 » désignent la branche de compatibilité, pas une preuve que chaque version mineure a été testée. Au 3 novembre 2026, Node 22 et 24 sont en Maintenance LTS, Node 26 en Active LTS et Node 27 en Alpha ; le dépôt conserve son pin pour la reproductibilité et ne revendique aucune compatibilité d’exécution avec Node 24 ou Node 26.

La politique est volontairement simple :

1. `.nvmrc` est la seule version canonique.
2. Toute CI qui choisit Node doit lire `.nvmrc`.
3. Toute documentation qui donne un exemple de `node -v`, `nvm install` ou
   `engines` doit rester cohérente avec cette référence.
4. Une montée de version exige une décision datée, un passage CI complet et
   une relecture des mini-projets sensibles au runtime.
5. Le dépôt peut préparer la prochaine ligne LTS en parallèle, mais cela ne
   remplace jamais la ligne canonique tant que la bascule n'est pas décidée.

### Pourquoi 22 et pas 20 ?

Node 20 est désormais EOL. Conserver Node 20 comme référence créerait une
contradiction entre la reproductibilité pédagogique et la maintenance du
runtime. Node 22 (22.23.4 pour AF) reste le choix reproductible retenu pour ce corpus ; toute autre version doit être validée séparément.

---

## Contrôle de sortie

Avant de publier une version d'ARCHITECTE-FANTOME :

- `test -f .nvmrc`
- `cat .nvmrc` retourne `22.23.4`
- les workflows CI utilisent `node-version-file: '.nvmrc'` ou un équivalent
- aucun script ne traite l'absence de `.nvmrc` comme un état normal
- les tests ciblés du mini-projet 17 ne produisent aucun `[WARN]` de version

Cette section est périssable : relis ce fichier à chaque changement de LTS
et note la date de revalidation.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Transfert : changer de contexte

Applique le mécanisme de « NODE_VERSIONS.md » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:tooling -->

## Repère visuel utile : Outil reproductible pour l'équipe Kintana

```text
problème répétitif
       |
       v
solution native ?
   | oui       | non
   v           v
simple     outil évalué
               |
               v
version + tests + docs
               |
               v
usage reproductible
```

<!-- AF-LESSON-PROFILE: tooling -->

## Repères de décision

- **Pourquoi :** La toolchain et les outils de diagnostic réduisent les tâches répétitives et rendent le comportement du système visible.
- **Quand l’utiliser / quand l’éviter :** Choisis un outil quand il résout un problème fréquent et mesurable. Vérifie sa licence, sa maintenance, ses versions, ses permissions et son coût avant de l'ajouter.
- **Limites :** Un outil n'est pas une politique de qualité. Un benchmark, logger ou générateur peut donner une fausse confiance si son protocole et ses limites ne sont pas écrits.

## Mécanisme : la version sans magie

Décris le problème, compare l'outil à une commande native ou à une alternative plus simple, épingle sa version et vérifie le résultat qu'il produit.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **NODE_VERSIONS.md** se rattache à ce cas concret : L'équipe Kintana doit pouvoir diagnostiquer une panne et refaire un build sans dépendre d'une configuration cachée sur le poste d'une seule personne.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Outil reproductible pour l'équipe Kintana

> **Arc Capsule Corp. / DBZ :** le bon outil accélère le diagnostic ; dix outils mal choisis ne font que déplacer le bazar.

**Mission liée à « NODE_VERSIONS.md » :** Automatise une opération récurrente du cycle Kintana (analyse, benchmark, log, build ou debug). Ajoute un mode dry-run si l'action est destructive et une vérification qui empêche l'outil de masquer une erreur.

**Livrable :** outil/script, README d'usage, tests sur succès/échec, version épinglée et comparaison au processus manuel.

**Critères d’acceptation :** les arguments sont validés ; les erreurs ont un code de sortie ; aucune donnée sensible n'est imprimée ; la même commande donne une sortie compréhensible et reproductible.

**Transfert obligatoire :** Exécute l'outil sur une autre machine ou avec une version différente. Documente les prérequis et le mode dégradé.
