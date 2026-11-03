---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 13-RUNTIME-ENV

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `05-process_env_argv.md` la précondition déterminante pour `process env argv`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Configuration via env et argv

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Lire et valider un port

```js
const rawPort = process.env.PORT ?? "3000";
const port = Number(rawPort);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT doit être un entier entre 1 et 65535");
}
console.log(`Port configuré : ${port}`);
```

Sans `PORT`, le défaut `3000` est utilisé. Avec `PORT=8080`, le nombre 8080 est accepté. Le programme ne doit pas utiliser la chaîne brute comme si c’était déjà un nombre.

### Exemple B : Un argument invalide doit être refusé

Pour `node app.js --port 8080`, le parser doit associer la valeur `8080` à `--port`, la convertir et la valider. Pour `node app.js --port abc`, il doit afficher une erreur de configuration et quitter sans démarrer le serveur. Un secret tel qu’un token ne doit pas être passé dans les arguments si cela l’expose à l’historique shell ou à la liste des processus ; utilise un gestionnaire de secrets ou une variable protégée.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
