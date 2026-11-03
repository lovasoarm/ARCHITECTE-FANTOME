---
stability: intemporel
acte: comprendre
cognitive_level: L2
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> **Référence différée :** tu n'as pas à planifier les six pierres maintenant. Utilise ce document après avoir réellement étudié une notion ou terminé un module. Les pierres non étudiées restent simplement « pas encore vues » ; aucun quiz, calendrier ou suivi futur ne conditionne l'entrée dans Fundamentals. Un rappel peut être court et adapté à ton temps disponible.

# Répétition espacée : calendrier explicite sur les six pierres

Temps de lecture ~2 min

> Tu apprends une fois, tu oublies vite. La répétition espacée est le
> méthode bien étudiée pour améliorer la rétention à long terme sans monopoliser le temps d'étude
> ta vie. Ce fichier fournit le calendrier et les mini-quiz.

## Les six pierres du curriculum

Rappel court (voir `03-competences.md` pour la version longue) :

1. **Fondamentaux JS** : syntaxe, types, portée, closures
2. **Async** : promises, async/await, event loop
3. **Structures de données & algo** : complexité, patterns classiques
4. **Debugging & tests** : reproduction, isolation, TDD
5. **Architecture & design** : patterns, tradeoffs, découpage
6. **Système & réseau** : HTTP, DB, cache, scalabilité

## Calendrier de rappel par pierre (J+1 / J+7 / J+21 / J+60)

<!-- AF-DIAGRAM:recall -->

```text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

Après avoir étudié un sujet et réalisé une première pratique, tu peux choisir un ou plusieurs rappels. Le calendrier ci-dessous est une proposition, pas une obligation :

| Échéance | Durée cible | Format                                                   |
| -------- | ----------- | -------------------------------------------------------- |
| **J+1**  | 10 min      | Mini-quiz de rappel (voir template ci-dessous)           |
| **J+7**  | 20 min      | Re-lire le grimoire + refaire **1** exo au hasard        |
| **J+21** | 30 min      | Expliquer 3 concepts phares à voix haute, sans notes     |
| **J+60** | 45 min      | Refaire le `00-PREREQUIS.md` du module comme un débutant |

Si tu rates un rappel : ne le remonte pas dans la file, décale d'une
semaine et note-le dans `PLATEAU_JOURNAL.md`. Deux rappels ratés
d'affilée sur une même pierre → tu es en train d'oublier, priorise.

## Template de mini-quiz de rappel (J+1 et J+21)

Copier dans un fichier `retention/<pierre>_J+<n>.md` :

```bash
# Rappel <pierre> : J+<n>

## Questions (à répondre à voix haute AVANT de lire les indices)

1. [définition]  Cite la définition en 1 phrase de : ___________
2. [code]        Écris en 3 lignes un exemple de : ___________
3. [tradeoff]    Cite un cas où tu N'utiliserais PAS : ___________
4. [analogie]    Explique à un non-dev : ___________
5. [debug]       Quel symptôme te fait suspecter : ___________

## Auto-notation

- 5/5 : passe au rappel suivant
- 3-4/5 : re-lis les concepts ratés, refais le quiz dans 3 jours
- <3/5 : le module n'est pas ancré, retourne au grimoire
```

## Pierres actives (à maintenir à jour)

| Pierre       | Dernière révision | Prochain rappel | Note dernier quiz |
| ------------ | ----------------- | --------------- | ----------------- |
| Fondamentaux | à remplir         | à remplir       | à remplir         |
| Async        | à remplir         | à remplir       | à remplir         |
| DS & algo    | à remplir         | à remplir       | à remplir         |
| Debug & test | à remplir         | à remplir       | à remplir         |
| Archi        | à remplir         | à remplir       | à remplir         |
| Système      | à remplir         | à remplir       | à remplir         |

Ce tableau est facultatif. Tu peux noter uniquement le sujet que tu as réellement étudié et le prochain rappel utile. Ne remplis pas les lignes des modules que tu n'as pas encore abordés.

## Pourquoi ce fichier existe

Sans répétition espacée, tu re-fais les mêmes bugs 6 mois plus tard sans
te souvenir de la solution. La charte du curriculum insiste sur
l'intemporel vs le périssable : la répétition espacée est ce qui rend
l'intemporel effectivement durable **dans ta tête**, pas juste dans les
fichiers.

## CHECKPOINT DE PROFONDEUR : différé après l’étude des notions concernées

### Variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Répétition espacée : calendrier explicite sur les six pierres » à une technologie ou une version différente de celle de la leçon. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Kintana est un cas fictif qui servira plus tard à réviser des compétences de système. Il n'est pas nécessaire d'y appliquer un calendrier de rappel avant d'avoir appris ces compétences.

## Mission utile : un rappel simple

**Livrable et critères d’acceptation :** une phrase de rappel sur une notion déjà étudiée, puis un mot corrigé après consultation de la leçon. Si aucune notion n’a encore été étudiée, cette activité reste différée et ne produit aucun livrable.

Choisis une notion que tu as vraiment étudiée cette semaine. Cache tes notes et essaie de l'expliquer en une phrase. Rouvre ensuite la leçon et note un élément que tu avais oublié. Si tu n'as pas encore étudié de notion, ne fais rien : reviens ici plus tard.

### Transfert : facultatif et différé

L'application à une nouvelle technologie ou à un contexte différent sera demandée seulement après l'apprentissage de la notion concernée.
