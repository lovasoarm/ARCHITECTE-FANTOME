---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# ARCHITECTURE & HUMAN BIASES : quand les biais deviennent des systèmes

Une architecture n'est pas seulement le résultat de contraintes techniques. Elle porte les peurs, incitations et habitudes de ceux qui la conçoivent.

## Carte de lecture

| Signal humain       | Risque architectural possible | Indice à chercher                | Garde-fou                 |
| ------------------- | ----------------------------- | -------------------------------- | ------------------------- |
| peur du changement  | système figé                  | migrations repoussées sans seuil | fenêtre de réouverture    |
| culte de l'élégance | surarchitecture               | abstractions sans gain mesuré    | test de simplicité        |
| ego technique       | technologie irremplaçable     | dépendance à une personne        | documentation + transfert |
| urgence permanente  | optimisation du présent       | dette ignorée                    | budget de dette           |
| ownership flou      | service sans propriétaire     | incidents renvoyés ailleurs      | responsabilité explicite  |

## Épreuve

Sur ton fil rouge, identifie un mécanisme humain qui a laissé une trace dans l'architecture. Produis :

1. l'observation ;
2. l'hypothèse sur l'incitation ou le biais ;
3. l'effet technique ;
4. une contre-mesure structurelle qui fonctionne même lorsque tu n'es pas là.

Pas de diagnostic psychologique des personnes. On analyse des comportements observables et leurs effets sur le système.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une équipe est récompensée sur le nombre de tickets fermés. Elle ferme rapidement les cas simples et reporte les incidents complexes, ce qui améliore le tableau de bord tout en augmentant le risque global. L'observation est le temps de résolution par gravité et le nombre de réouvertures ; l'hypothèse porte sur l'incitation créée par la métrique ; la contre-mesure combine gravité, réouverture et âge du backlog. On corrige le système de mesure sans diagnostiquer les personnes.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « ARCHITECTURE & HUMAN BIASES : quand les biais deviennent des systèmes », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Repérer un biais encodé dans un système

```text
parcours ou règle par défaut
          |
          v
qui est avantagé / pénalisé ?
          |
          v
barrière ou alternative
          |
          v
mesure des effets
          |
          v
révision avec les personnes touchées
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **ARCHITECTURE & HUMAN BIASES : quand les biais deviennent des systèmes** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Repérer un biais encodé dans une architecture

**Mission liée à « ARCHITECTURE & HUMAN BIASES : quand les biais deviennent des systèmes » :** Examine un flux Kintana où des règles ou interfaces peuvent favoriser certains utilisateurs ou masquer des voix. Identifie le biais plausible, son mécanisme et un contrôle de conception.

**Livrable :** Carte biais/mécanisme/impact, contre-mesure et test ou revue ciblée.

**Critères d’acceptation :** Le biais n’est pas inféré de l’identité d’une personne ; le mécanisme est concret ; la contre-mesure a une limite déclarée.

**Transfert obligatoire :** Le contrôle réduit un biais mais en crée un autre : documente le compromis et l’observation nécessaire.
