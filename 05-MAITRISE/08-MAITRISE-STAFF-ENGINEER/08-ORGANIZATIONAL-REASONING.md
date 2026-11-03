---
stability: intemporel
acte: maitrise
noyau: oui
---

# 08 : Organizational Reasoning : décider dans une organisation réelle

Une architecture correcte peut échouer parce qu'elle arrive au mauvais moment, demande une
capacité absente, heurte un budget, crée une dépendance politique ou n'est pas adoptée.
Le raisonnement organisationnel complète l'architecture ; il ne la remplace pas.

## 1. Les cinq cartes

```text
PROBLÈME
  ↓
ACTEURS → intérêts / pouvoir / contraintes
  ↓
OPTIONS → coût / risque / réversibilité
  ↓
ADOPTION → qui doit dire oui ? qui peut bloquer ?
  ↓
CONSÉQUENCE → mesurer puis réviser
```

Pour chaque décision importante, renseigne :

| Carte            | Preuve attendue                               |
| ---------------- | --------------------------------------------- |
| Acteurs          | parties prenantes et dépendances              |
| Incentives       | pourquoi chaque groupe accepterait/refuserait |
| Décision         | option choisie + options rejetées             |
| Séquençage       | quoi faire maintenant, plus tard, jamais      |
| Adoption         | action minimale qui permet la convergence     |
| Risque politique | coût d'un désaccord ou d'un retard            |
| Révision         | signal qui ferait changer d'avis              |

## 2. Ambiguïté : ne pas la supprimer trop tôt

Le Staff ne reçoit pas toujours un problème propre. Il doit parfois décider quelles inconnues
méritent d'être résolues avant d'engager du travail.

Classe chaque inconnue :

```text
bloquante maintenant
utile mais non bloquante
à apprendre par expérimentation
acceptable comme hypothèse temporaire
sans valeur décisionnelle
```

Une bonne décision explique aussi pourquoi une inconnue n'a **pas** été résolue.

## 3. Influence sans autorité

L'objectif n'est pas de « gagner » une discussion. Il est d'obtenir une décision que les personnes
concernées peuvent réellement appliquer.

Protocole :

```text
écouter
→ reformuler l'objection
→ identifier l'hypothèse en conflit
→ apporter une preuve ou accepter la correction
→ proposer une option réversible si possible
→ documenter la décision
```

## 4. Épreuve : la meilleure architecture perd

Le candidat reçoit une architecture techniquement supérieure mais incompatible avec au moins
une contrainte organisationnelle réelle ou plausible : capacité d'équipe, délai, compétence,
budget, contrat ou dépendance.

Il doit choisir entre :

- défendre l'architecture telle quelle ;
- la simplifier ;
- la séquencer ;
- la refuser ;
- ou financer d'abord une réduction d'incertitude.

Le critère principal est **l'adoptabilité sans trahison des invariants critiques**.

## 5. Preuve externe

La meilleure forme de preuve est une décision soumise à un regard indépendant : pair,
mainteneur open source, association, équipe ou client. Utilise `48-EXTERNAL-REVIEW-GATE.md`.

Une simulation peut entraîner la méthode, mais doit rester étiquetée T0.

## 6. Critère de sortie

La réponse est réussie si le candidat peut expliquer simultanément :

**ce qui est techniquement vrai, ce qui est organisationnellement possible, et pourquoi le
séquençage choisi réduit le risque maintenant.**

Ce module renforce G1, G2, G5 et G7 du `37-STAFF-READINESS-GATE` sans créer une nouvelle famille.

### Pratique autonome : production attendue

À partir de « 08 : Organizational Reasoning : décider dans une organisation réelle », produis une variante indépendante du cas suivant : Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **08 : Organizational Reasoning : décider dans une organisation réelle** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Raisonner sur les incitations de l’organisation

**Mission liée à « 08 : Organizational Reasoning : décider dans une organisation réelle » :** Cartographie les équipes Kintana affectées par une migration et leurs incitations, dépendances, coûts locaux et critères de réussite. Propose une séquence qui aligne les intérêts sans masquer les conflits.

**Livrable :** Carte des acteurs, hypothèses d’incitation et plan d’alignement.

**Critères d’acceptation :** Les incitations sont présentées comme hypothèses à vérifier ; les coûts locaux sont visibles ; les désaccords ont un canal de résolution.

**Transfert obligatoire :** Un indicateur global récompense un comportement local nocif : corrige la mesure ou ajoute un contre-indicateur.
