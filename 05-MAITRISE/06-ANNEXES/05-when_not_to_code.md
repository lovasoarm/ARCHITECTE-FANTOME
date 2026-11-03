---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [transmission, fausse_piste]
anti_recipe_key: transmission+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# When NOT to code

Temps de lecture ~5 min

> La meilleure ligne de code est celle qu'on n'écrit pas.

## 5 scénarios

### 1. La spec est floue

Tu vas coder la mauvaise chose. **Retour au jutsu**. Une bonne question > 100 lignes.

### 2. Le besoin existe déjà (mieux fait)

Une lib mature, un outil CLI, un service managé. Écrire à la main = maintenance à vie.
**Contre-piège** : dépendance douteuse (voir `03-PILOTAGE/04-SECURITY/08-supply_chain_sbom.md`).

### 3. La feature est un cache-misère

Le vrai problème est UX, pas technique. Ajouter du code cache le symptôme, aggrave la dette.

### 4. Personne ne l'utilisera

Log-la comme "backlog", ne l'implémente pas. YAGNI.

### 5. La suppression est une feature

50 lignes de moins = moins de bugs, moins de tests, moins d'onboarding. **Supprimer est un livrable.**

## Exercice

Ouvre **un** de tes mini-projets. Trouve :

- 1 fonction qu'on peut **supprimer** sans que personne s'en rende compte.
- 1 dépendance qu'on peut **retirer**.
- 1 feature qu'on peut **remplacer par un lien** vers un outil existant.

Livre un `CLEANUP.md` avec ces 3 items.

---

## Quand NE PAS utiliser l'IA

Sept règles concrètes. Si l'une s'applique : ferme l'IA, réfléchis, décide toi-même.

1. **Tu ne peux pas juger la sortie.** Si tu ne saurais pas dire "c'est faux", n'accepte pas.
2. **Le contexte est sensible** (auth, tribut, RGPD, cryptographie). Le coût d'une hallucination dépasse celui de la lenteur humaine.
3. **La décision est architecturale et engage 6+ mois.** L'IA optimise le token suivant, pas ta dette à 6 mois.
4. **Tu apprends un concept pour la première fois.** Laisser l'IA écrire = ne pas apprendre.
5. **La spec est floue.** L'IA va combler par la médiane du web. Retourne au jutsu.
6. **Le code est déjà correct.** "Fais mieux" à l'IA sur du code juste = régression garantie.
7. **Tu es fatigué, pressé, sous stress.** L'IA amplifie tes mauvaises décisions autant que les bonnes.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Transfert : changer de contexte

Applique le mécanisme de « When NOT to code » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:discovery -->

## Repère visuel utile : Valider un problème avant la feature

```text
demande exprimée
      |
      v
qui rencontre le problème ?
      |
      v
tâche + friction observée
      |
      v
hypothèse mesurable
      |
  +---+---+
  v       v
test   abandon / reformule
```

<!-- AF-LESSON-PROFILE: discovery -->

## Repères de décision

- **Pourquoi :** Un produit peut être parfaitement codé et inutile si la demande initiale n'est pas le vrai problème. La découverte réduit le risque de financer une fonctionnalité non utilisée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette démarche avant une nouvelle feature ou une refonte coûteuse. Pour un incident connu et bloquant, traite d'abord l'urgence puis reviens à l'analyse de fond.
- **Limites :** Un entretien isolé ne prouve pas la demande du marché. Les intentions déclarées peuvent diverger des usages ; cherche des observations, données et contre-exemples.

## Mécanisme : la version sans magie

Sépare demande, utilisateur, tâche, friction et résultat. Formule une hypothèse falsifiable, mesure un signal de départ et définis ce qui te ferait abandonner l'idée.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **When NOT to code** se rattache à ce cas concret : Dans Kintana, le demandeur, l'agent et le superviseur n'ont pas les mêmes problèmes. Une feature demandée par le superviseur peut compliquer le parcours du demandeur.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Valider un problème avant la feature

> **Arc Naruto / Konoha :** ne pars pas en mission parce qu'un chef a crié « go ». Vérifie qui souffre, à quel moment et comment tu sauras que ça va mieux.

**Mission liée à « When NOT to code » :** Choisis un irritant du parcours Kintana. Écris un script d'entretien, interroge au moins deux profils si tu as accès à de vrais participants (sinon étiquette la simulation), observe une tâche, puis formule hypothèse, indicateur et non-objectifs.

**Livrable :** une fiche problème, une carte acteurs/jobs, les observations anonymisées, une baseline ou un statut `NON MESURÉ` et un test d'invalidation.

**Critères d’acceptation :** la demande initiale est séparée du besoin ; les profils et limites de l'échantillon sont précisés ; aucune adoption n'est inventée ; un critère d'abandon est défini.

**Transfert obligatoire :** Un manager réclame un tableau de bord, mais les utilisateurs demandent une notification. Compare les problèmes avant de choisir la solution.
