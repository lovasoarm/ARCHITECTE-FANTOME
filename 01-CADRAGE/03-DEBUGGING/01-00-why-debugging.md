---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: La méthode scientifique de debug ne dépend d'aucun outil.
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, defaut_cache]
anti_recipe_key: transmission+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

> **Statut de pérennité :** **intemporel** | évolutif | périssable
> Statut effectif de ce module : **intemporel**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : stack trace (00-SOCLE/04-FUNDAMENTALS), async & event loop (01-CADRAGE/02-ASYNC). Exceptions (01-CADRAGE/04-ERROR-HANDLING, approfondi plus loin dans le fil) : tu croiseras `try`/`catch` avant de l'avoir formellement étudié, ce module te donne juste assez pour lire une stack trace, pas pour maîtriser la gestion d'erreur en profondeur. Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# 00 : Pourquoi le debugging

Temps de lecture ~4 min

> **Durée de vie : intemporel.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

> Règle de méthode : cherche d'abord à reproduire le bug dans des conditions documentées, puis explique ce que tu as observé. Si une reproduction déterministe reste impossible (intermittence, timing, charge ou environnement), isole les conditions connues, instrumente le système et formule explicitement l'incertitude. Cette méthode s'applique en JS, en Rust, en SQL, en réseau et en production.

## Le problème que ce module résout

La plupart des devs ne débuggent pas : ils bricolent. Ils changent une ligne au hasard, rechargent, prient, recommencent. Ça marche parfois, par accident, et le vrai bug reste tapi dans l'ombre comme un Horror dans Garo : invisible, patient, prêt à ressortir en production quand un vrai shinobi passe.

Ce module installe une méthode : un bug est un problème à investiguer avec des preuves, pas une malédiction ni une devinette résolue au hasard.

## Qui souffre quand personne ne sait débugger

- L'équipe : un bug non reproduit revient, encore et encore, et bouffe des sprints entiers.
- Le client : il perd confiance après le troisième "on a corrigé" suivi d'un quatrième incident.
- Toi : tu passes tes nuits à changer des lignes au pif au lieu de dormir.

## Où ça vit dans un vrai système

Le debugging n'est pas une étape après le code : c'est un mode de pensée présent partout. Dans les logs d'une API, dans une stack trace d'un worker qui crash, dans un query plan SQL trop lent, dans un heap snapshot qui gonfle, dans un `git bisect` qui traque le commit fautif. Un ingénieur passe plus de temps à lire du code cassé qu'à écrire du code neuf.

## Ce que ce module attaque frontalement

- La panique face à une stack trace : tu apprends à la lire comme un plan de métro, de la station "erreur" jusqu'à la station "cause".
- Le "je change au hasard jusqu'à ce que ça marche" : remplacé par des hypothèses réfutables.
- Le fix qui masque le vrai bug : soigner le symptôme sans toucher la maladie, c'est mettre un pansement sur une fracture.

## Ce que tu vas installer

1. Lire une stack trace comme un plan de métro : point d'entrée, frames, ligne fautive.
2. Formuler des hypothèses réfutables AVANT de toucher au code, et les consigner dans un `HYPOTHESES.md`.
3. Chercher une reproduction déterministe avant le correctif. Si elle reste impossible, ne pas arrêter l'enquête : documenter les conditions connues, instrumenter, collecter un signal représentatif et tester la correction sur le scénario le plus proche disponible.
4. Débugger à l'aveugle : trouver la cause sans même voir la ligne fautive, par élimination.
5. Utiliser les bons outils : breakpoints, `console` structuré, bisection, logs corrélés par id.

## Bugs célèbres : ce que l'histoire enseigne

- Ariane 5 (1996) : une conversion de nombre 64 bits vers 16 bits qui déborde, et une fusée à 370 millions de dollars explose. Leçon : un edge case non testé n'est pas "improbable", il est "pas encore arrivé". Comme une technique interdite : elle tient jusqu'au jour où quelqu'un trouve la faille.
- Knight Capital (2012) : un vieux flag de code mort réactivé par erreur, 440 millions de dollars perdus en 45 minutes. Leçon : le code que tu ne comprends plus est une bombe à retardement. Comme un jutsu interdit oublié dans un parchemin : personne ne sait ce qu'il déclenche.

## Modern / legacy / intemporel

- Moderne : source maps, time-travel debugging, observabilité distribuée avec `trace_id`.
- Legacy : `console.log` partout, et parfois c'est encore la façon la plus rapide.
- Intemporel : la méthode. Reproduire, isoler, formuler une hypothèse, tester une variable à la fois, vérifier. Ça ne périme jamais.

## Prérequis

- Savoir lire une erreur JavaScript simple : repérer le message, le fichier et la ligne, comme dans le premier exercice `Day One` de Getting Started. Il n'est pas nécessaire de maîtriser toute la gestion des erreurs.
- Connaître l'event loop pour analyser les bugs asynchrones (module `01-CADRAGE/02-ASYNC`, placé avant Debugging dans la Route 58).
- Disposer du terminal et du debugger Node configurés selon `00-PREREQUIS.md`.

**Ce qui vient après :** le module `01-CADRAGE/04-ERROR-HANDLING` approfondit la propagation, la classification et le traitement des erreurs. La Route 58 le place volontairement après Debugging ; il n'est donc pas un prérequis de ce module.

## Erreurs classiques de débutant

- Changer plusieurs choses à la fois : quand ça marche, tu ne sais pas laquelle a corrigé.
- Corriger sans reproduire : tu "corriges" un bug qui n'existait peut-être pas.
- Faire confiance à ton intuition plutôt qu'à la preuve : le bug est presque toujours là où tu es sûr qu'il n'est pas.

## Idées reçues à tuer

- "Les bons devs ne font pas de bugs." Faux. Les bons devs les trouvent vite.
- "Il faut être un génie pour débugger." Faux. Il faut une méthode et de la discipline.
- "Le debugger, c'est pour les débutants." Faux. `console.log` en aveugle sur un bug async, ça, c'est amateur.

## Alternatives et compromis

Prévenir plutôt que guérir : tests, types, revue de code réduisent le nombre de bugs, mais n'en éliminent jamais la totalité. Le debugging reste le filet de sécurité ultime. Le compromis : plus tu investis en amont (tests, types), moins tu débugges en aval, mais tu ne descends jamais à zéro.

## À la fin du module

Tu passes de "j'ai peur des bugs" à "je sais conduire une enquête à partir de preuves, même quand le défaut est intermittent". Et pour chaque exercice, tu livreras un `HYPOTHESES.md` : la trace de ton raisonnement avant le correctif.

---

> Pour tout exercice de debugging : utilise le template [`16-HYPOTHESES_TEMPLATE.md`](16-HYPOTHESES_TEMPLATE.md). Pas de correction sans hypothèse écrite.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

<!-- AF-DIAGRAM:debug -->

## Repère visuel utile : Reproduction et correction d'un incident Kintana

```text
signal utilisateur
      |
      v
hypothèses falsifiables
      |
      v
reproduction stable ? -- non --> instrumenter
      | oui
      v
isoler la cause
      |
      v
patch minimal + test de régression
```

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **00 : Pourquoi le debugging** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « 00 : Pourquoi le debugging » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
