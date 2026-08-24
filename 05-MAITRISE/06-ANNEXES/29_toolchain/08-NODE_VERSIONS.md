## perishability_id: PER-0072

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# NODE_VERSIONS.md

Temps de lecture ~4 min

> **Source de vérité unique** : le fichier `.nvmrc` (racine) fixe la version
> Node de référence. Ce document explique la politique, les minimums historiques
> et la procédure de mise à jour. En cas de doute, `.nvmrc` fait foi.
>
> **Dernière revue : 2026-08-22.**

## Version courante

- `.nvmrc` : **Node 22 (22.23.2 pour AF) LTS (`v22`)**
- Ligne de référence du curriculum : **Node 22 (22.23.2 pour AF) LTS**
- Node 20 est **EOL depuis le 24 mars 2026** et n'est plus une version de
  référence, de CI ou de support du curriculum.

Vérifie ta version :

```bash
node -v
nvm install
nvm use
# doit afficher v22.x
```

## Minimum par module

Le curriculum est désormais évalué sur **Node 22 (22.23.2 pour AF)**. Les minimums historiques
ci-dessous ne constituent pas des versions de support indépendantes : ils
indiquent seulement l'ancien niveau d'API requis par les exercices.

| Module           | Minimum pédagogique historique |         Référence d'exécution |
| ---------------- | -----------------------------: | ----------------------------: |
| 01 → 07          |                             18 |     Node 22 (22.23.2 pour AF) |
| 08 memory        |                             20 |     Node 22 (22.23.2 pour AF) |
| 14 typescript    |                             20 |     Node 22 (22.23.2 pour AF) |
| 15 runtime_env   |                             20 |     Node 22 (22.23.2 pour AF) |
| 20 realtime      |                             20 |     Node 22 (22.23.2 pour AF) |
| 23 ai_native_dev |                             20 |     Node 22 (22.23.2 pour AF) |
| 24 → 28          |                             20 |     Node 22 (22.23.2 pour AF) |
| 30 mini_projects |                             20 | Node 22 (22.23.2 pour AF) LTS |

Les scripts et la CI doivent utiliser `.nvmrc` plutôt qu'une plage vague
du type `>=20` ou `>=22` pour choisir le runtime d'exécution.

---

## Politique de version

**État au 23/08/2026 :** Node 22 (22.23.2 pour AF) est une ligne LTS encore supportée. La
référence du cursus reste `v22`, afin de préserver la reproductibilité de la
fusion et du corpus source.

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
runtime. Node 22 (22.23.2 pour AF) reste LTS au moment de cette édition ; le choix `v22` est donc
cohérent avec la source ARCHITECTE-FANTOME et avec la correction demandée par l'audit.

---

## Contrôle de sortie

Avant de publier une version d'ARCHITECTE-FANTOME :

- `test -f .nvmrc`
- `cat .nvmrc` retourne `v22`
- les workflows CI utilisent `node-version-file: '.nvmrc'` ou un équivalent
- aucun script ne traite l'absence de `.nvmrc` comme un état normal
- les tests ciblés du mini-projet 17 ne produisent aucun `[WARN]` de version

Cette section est périssable : relis ce fichier à chaque changement de LTS
et note la date de revalidation.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
