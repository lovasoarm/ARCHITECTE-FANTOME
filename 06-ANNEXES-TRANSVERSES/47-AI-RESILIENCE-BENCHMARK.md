---
stability: perissable
acte: démontrer
noyau: non
route: core-gate
---

# 47 : AI RESILIENCE BENCHMARK : humain / IA / agent

## But

Mesurer la valeur humaine restante lorsque l'automatisation progresse. Le but n'est pas de battre un agent : il est de montrer **où l'humain doit encore décider, vérifier, arrêter ou redessiner le système**.

## 1. Les cinq tâches

1. implémenter une fonctionnalité non triviale ;
2. diagnostiquer un bug reproductible ;
3. produire une première architecture ;
4. planifier une migration avec rollback ;
5. gérer un incident sous contraintes.

## 2. Trois conditions

### A : Human only

L'apprenant travaille sans IA générative.

### B : AI assisted

L'apprenant utilise un assistant mais garde la décision et le contrôle du flux.

### C : Agentic

Un agent peut lire plusieurs fichiers, proposer des changements, exécuter des outils et produire des artefacts dans les permissions qui lui sont accordées.

Les outils exacts peuvent changer. **Le mécanisme d'évaluation ne dépend d'aucun fournisseur.**

## 3. Mesures obligatoires

```text
temps humain
temps agent
coût direct / proxy de coût
nombre de changements
bugs introduits
failles de sécurité introduites
tests passants
tests manquants
régressions
temps de revue
révisions demandées
qualité finale
```

## 4. Human Judgment Residual Value

Calculer une fiche qualitative et, lorsque les mesures sont comparables, une valeur quantitative :

```text
valeur humaine résiduelle =
  décisions non délégables
+ erreurs détectées par l'humain
+ contraintes ajoutées par l'humain
+ vérifications qui changent réellement la sortie
+ décisions d'arrêt / rollback
```

Ce n'est **pas** une formule universelle ni un indicateur salarial. C'est un instrument interne de réflexion.

## 5. Acceptation

Passer une épreuve AI-native exige de montrer au moins :

- une délégation utile ;
- une sortie agent acceptée ;
- une sortie agent rejetée ;
- une correction humaine motivée ;
- un contrôle des permissions ;
- un mécanisme d'arrêt ;
- un artefact final vérifiable.

**Échec critique :** accepter une sortie importante sans preuve de vérification.

## 6. Répétition

Rejouer le même benchmark avec :

- une contrainte différente ;
- un outil différent ; ou
- un agent plus capable.

Le score ne doit pas récompenser la mémorisation d'un fournisseur précis.

**Temps CORE ajouté : 0 h.** Le benchmark utilise des livrables déjà produits ; il remplace une partie de la simple démonstration par une mesure comparative.
