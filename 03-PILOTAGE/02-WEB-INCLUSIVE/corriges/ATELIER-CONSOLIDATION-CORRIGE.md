---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 02-WEB-INCLUSIVE

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `02-a11y-why-it-matters.md` la précondition déterminante pour `a11y why it matters`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemples résolus : Accessibilité et usage réel

Les exemples ci-dessous sont des **fixtures pédagogiques** : les résultats sont déduits des entrées affichées ou des hypothèses explicitement données. Ils ne prétendent pas qu’une commande, un service ou une infrastructure a été exécuté dans cette release.

### Exemple A : Champ de formulaire étiqueté

```html
<label for="email">Adresse e-mail</label>
<input id="email" name="email" type="email" autocomplete="email" />
```

Le label est associé au champ par `for`/`id`. Le nom accessible ne dépend pas du placeholder, qui peut disparaître à la saisie. L’ordre de tabulation natif permet d’atteindre le champ et son nom peut être annoncé par un lecteur d’écran.

### Exemple B : Le placeholder seul ne remplace pas un label

```html
<input name="email" placeholder="Adresse e-mail" />
```

Le texte indicatif peut disparaître lorsque l’utilisateur saisit sa valeur et ne fournit pas, à lui seul, un label persistant. Le contre-test consiste à parcourir le formulaire au clavier et à examiner le nom accessible du champ. La correction est d’ajouter un label associé ; la couleur seule ne doit pas être l’unique signal d’erreur.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties qui dépendent d’une exécution n’ont pas été calculées ici : exécute l’exercice dans l’environnement prévu par la leçon, compare le résultat à ces critères et conserve ta preuve. Ne présente jamais un résultat attendu comme une exécution réellement observée. Ce corrigé guide le raisonnement ; il ne prétend pas fournir une implémentation complète.
