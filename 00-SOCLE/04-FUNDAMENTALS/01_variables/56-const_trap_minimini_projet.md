---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : The const trap : const ne veut pas dire immuable

> **Repère :** sépare la réaffectation du binding et la modification du contenu de l’objet.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

`const` protège le **lien**, pas le **contenu**. Ton objet `personalInfo` déclaré en `const` ne peut pas être réassigné, mais toutes ses propriétés restent modifiables. L'outil natif de JavaScript pour vraiment figer un objet, c'est `Object.freeze()` : avec une limite majeure qu'il faut voir de ses propres yeux : le gel est **superficiel** (shallow), les objets imbriqués restent mutables.

## APPLICATION

- Prouve en 3 lignes qu'une propriété d'un objet `const` peut être modifiée : réassigne `personalInfo.role`, puis affiche l'objet.
- Applique `Object.freeze(personalInfo)` dans `data/personal.js`, retente la même modification et constate qu'elle est ignorée silencieusement (ou lève une erreur en mode strict).
- Ajoute à `personalInfo` un sous-objet, par exemple `contact: { email, linkedin }` (ou les `stats` d'un projet), gèle à nouveau l'objet parent, puis modifie `personalInfo.contact.email` : la modification passe. Note ce que ça démontre : `Object.freeze` ne gèle qu'un niveau.
- Écris une petite fonction `deepFreeze(obj)` qui parcourt les valeurs et rappelle `Object.freeze` sur chaque sous-objet, applique-la, et vérifie que le champ imbriqué est enfin protégé.

## Critère de réussite

- [ ] Prouve en 3 lignes qu'une propriété d'un objet `const` peut être modifiée.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle est la différence exacte entre `const` et `Object.freeze()`, et pourquoi un objet gelé peut-il encore changer ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes données personnelles sont protégées contre les mutations directes.

Tu sais maintenant distinguer un lien constant d'une valeur immuable, et tu connais la limite du gel superficiel. Tu sais maintenant distinguer `const`, `Object.freeze()` et une stratégie d'immutabilité profonde. Le `deepFreeze()` écrit ici est pédagogique : il ne couvre ni les cycles, ni les prototypes, ni les propriétés non énumérables, et n'est donc pas une stratégie de production. Commit `data/personal.js`.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 56-const_trap_minimini_projet » :** Dans `domain/requests/`, conserve une référence constante vers une demande puis distingue la réaffectation interdite de la mutation encore possible de son contenu. Choisis et teste le contrat d’immutabilité réellement voulu.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
