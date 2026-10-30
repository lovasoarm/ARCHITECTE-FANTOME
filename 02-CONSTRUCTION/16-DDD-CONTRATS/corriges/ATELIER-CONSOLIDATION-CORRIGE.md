# Corrigé différé : 16-DDD-CONTRATS

**Ne lire qu'après l'atelier.** Ce document est un guide de correction et non une sortie d'exécution certifiée.

## Raisonnement attendu

1. Identifier dans `06-exercice_architecture_trop_belle.md` la précondition déterminante pour `exercice architecture trop belle`.
2. Produire une prédiction spécifique et falsifiable ; relever les entrées, l'environnement et la commande exacte.
3. Comparer la sortie observée à la prédiction. Ne pas modifier plusieurs facteurs en même temps.
4. Expliquer causalement la divergence : précondition, transformation, puis effet. Une simple copie de réponse échoue au critère d'autonomie.
5. Répéter le cas positif et le cas volontairement faux ; mesurer ou décrire le changement.

## Exemple de réponse structurée (à instancier à partir du cours)

- **Contexte :** `exercice architecture trop belle`, source `06-exercice_architecture_trop_belle.md`.
- **Prédiction :** « avec l'entrée X et la précondition P, la propriété Y doit tenir ».
- **Cas négatif :** « si P est supprimée, Y n'est plus garantie ; je vérifie un échec par assertion, mesure ou refus explicite ».
- **Diagnostic :** « l'hypothèse P manque », pas « mauvais code ».
- **Correctif :** vérifier P à la frontière ou ajuster le modèle ; relancer exactement les deux cas.
- **Transfert :** montrer l'impact de P dans une fonctionnalité réelle et consigner son test de non-régression.

## Barème / 10

Prédiction précise (2), preuve reproductible (2), cas négatif observé (2), diagnostic et correctif (2), transfert contextualisé (2). **Un cas inventé ou sans trace obtient zéro sur le critère de preuve.**

**Limite :** les sorties attendues dépendant de la leçon et de l'environnement n'ont pas été calculées ici ; elles doivent être contrôlées par le formateur. Ne pas confondre ce guide avec une solution technique entièrement implémentée.
