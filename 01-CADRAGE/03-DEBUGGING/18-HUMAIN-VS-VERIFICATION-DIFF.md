---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : salle de revue :** deux patches arrivent dans la même PR. Ton travail n’est pas de deviner qui les a écrits ; c’est de vérifier lequel respecte le contrat, ce qu’il laisse sans preuve et quel risque il introduit.

# Revue de patch : prouver le comportement, pas deviner l’auteur

Temps de lecture : ~10 min · Exercice : ~35 min

## Pourquoi cette leçon existe

Un patch écrit par une personne ou proposé par un outil peut être correct, incomplet, excessif ou faux. Le style, la longueur, les commentaires, le nom des variables et l’indentation ne permettent pas d’établir fiablement son origine ni sa qualité.

Une revue utile juge des éléments observables : contrat, comportement, tests, dépendances réelles, effets de bord, sécurité et coût de maintenance. **Ne classe jamais un patch comme « humain » ou « IA » à partir de son apparence.** Si la provenance est utile pour la traçabilité, elle se consigne séparément ; elle ne remplace pas l’analyse technique.

## 1. Le contrat avant le patch

La fonction `moyenne(nombres)` doit respecter ce contrat explicite :

- `nombres` doit être un tableau de nombres finis ; sinon, la fonction lève `TypeError` ;
- un tableau vide retourne `null` ;
- un tableau valide non vide retourne sa moyenne arithmétique ;
- la fonction ne modifie pas le tableau fourni.

Sans ce contrat, deux comportements différents peuvent sembler raisonnables. La première tâche du reviewer est donc de repérer ce qui est spécifié, ce qui ne l’est pas et ce qui doit être clarifié.

## 2. Deux patches à examiner

### Patch A

```js
function moyenne(nombres) {
  if (!Array.isArray(nombres) || nombres.length === 0) {
    return null;
  }
  const somme = nombres.reduce((acc, nombre) => acc + nombre, 0);
  return somme / nombres.length;
}
```

### Patch B

```js
function moyenne(nombres) {
  if (!Array.isArray(nombres)) {
    throw new TypeError("nombres doit être un tableau");
  }
  if (
    nombres.some(
      (nombre) => typeof nombre !== "number" || !Number.isFinite(nombre),
    )
  ) {
    throw new TypeError("toutes les valeurs doivent être des nombres finis");
  }
  if (nombres.length === 0) {
    return null;
  }
  const somme = nombres.reduce((acc, nombre) => acc + nombre, 0);
  return somme / nombres.length;
}
```

Le patch A traite le tableau vide, mais confond une entrée invalide avec ce cas et n’applique pas toutes les validations du contrat. Le patch B couvre les validations annoncées et le cas vide. Cette conclusion vient du contrat et du comportement du code, **pas d’une hypothèse sur l’auteur**. Les deux patches pourraient avoir été écrits par la même personne, par deux personnes ou par un outil.

## 3. Protocole de revue fondé sur des preuves

1. **Contrat :** écris les entrées autorisées, les sorties, les erreurs et les invariants avant de juger l’implémentation.
2. **Couverture :** relie chaque règle à au moins un cas de vérification ; relève les règles non testées.
3. **Comportement :** simule les cas limites et vérifie les effets de bord, l’ordre et l’état partagé pertinents.
4. **Dépendances :** confirme les méthodes et versions dans la documentation ou le code de la dépendance réellement utilisée ; ne valide pas une API supposée.
5. **Risque :** examine sécurité, confidentialité, autorisations, coût, complexité et compatibilité selon le périmètre du changement.
6. **Verdict :** formule un constat précis, sa preuve, son impact et la correction ou clarification attendue.

Un test vert prouve seulement que le cas testé passe. Il ne démontre pas à lui seul que le contrat entier est respecté. Inversement, une différence de style n’est pas un défaut tant qu’elle n’a pas de conséquence démontrable.

## 4. Exercice : revue contradictoire (35 min)

1. Écris le contrat de `moyenne` avec tes propres mots et transforme chaque règle en cas de test.
2. Pour les patches A et B, remplis une matrice `règle / comportement observé / preuve / verdict`.
3. Ajoute un cas qui n’est pas déjà représenté dans les exemples, puis explique pourquoi il est utile.
4. Rédige une review de cinq lignes maximum : défaut bloquant, preuve, impact, demande de correction et condition d’acceptation.
5. Demande à un pair de contester ton verdict ou, sans pair disponible, écris l’objection la plus forte et réponds-y explicitement comme exercice individuel.

**Interdit pédagogique :** ne donne aucune étiquette d’auteur (`humain`, `IA`, `généré`, `junior`) à un patch à partir de son style. Ce n’est ni le but ni une preuve valide.

## Ancrage produit / terrain : Kintana

Une PR Kintana modifie la création d’une demande après un retry réseau. Le reviewer ne cherche pas si le patch « ressemble à de l’IA » : il vérifie le contrat d’idempotence, le comportement en cas de double soumission, la transaction, les clés de corrélation et le test qui distingue une création unique de deux créations.

**Preuve à conserver :** contrat, matrice de cas, extrait de diff, résultat des vérifications et limites non couvertes. Distingue toujours `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` et `PRODUCTION` selon le travail réellement effectué.

## Résumé

Une revue solide ne devine pas une origine. Elle confronte un changement à son contrat et à des preuves reproductibles, puis expose clairement ce qui reste inconnu.

<!-- AF-DIAGRAM:debug -->

## Repère visuel utile : revue de patch

```text
contrat explicite
      |
      v
cas attendus + cas limites
      |
      v
comportement vérifié
      |
      v
risques et écarts documentés
      |
      v
verdict traçable
```

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Une revue protège le contrat métier et révèle les écarts que les tests existants ne couvrent pas encore.
- **Quand l’utiliser / quand l’éviter :** Utilise cette démarche pour toute modification qui change un comportement, une dépendance ou un risque. N’infère pas la compétence ou l’origine d’un auteur à partir du style.
- **Limites :** Une revue ne prouve que ce qui a été examiné. Sans environnement, données ou test pertinents, formule une limite au lieu de présenter une hypothèse comme un fait.

## Mécanisme : la version sans magie

Définis le contrat, relie les exigences aux comportements observables, cherche les cas non couverts, évalue les conséquences et formule un verdict lié à une preuve.

## Mission utile : Kintana : revue d’un changement d’idempotence

**Livrable :** une review courte d’une PR fictive ou autorisée, accompagnée du contrat, des cas de test, de la preuve observée et des risques résiduels.

**Critères d’acceptation :** chaque remarque cite un comportement ou une exigence ; les faux positifs stylistiques sont écartés ; les données sensibles ne sont pas exposées ; le verdict distingue bloquant, question et suggestion.

**Transfert obligatoire :** applique la même grille à un changement qui touche une API externe ou une migration de données. Explique quelles preuves supplémentaires deviennent nécessaires.
