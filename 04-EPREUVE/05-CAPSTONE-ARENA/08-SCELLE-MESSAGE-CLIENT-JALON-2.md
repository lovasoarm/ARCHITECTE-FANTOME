---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [transmission, decision_inversee]
anti_recipe_key: transmission+decision_inversee
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# ENVELOPPE SCELLÉE - ne pas lire avant le jalon 2

<!-- AF-DIAGRAM:capstone -->

```text
text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

Temps de lecture ~2 min

Ce fichier contient un changement de spécification envoyé par le client.
Il ne se lit qu'une fois, au moment où tu as terminé le jalon 2 (architecture posée,
ADR écrits, seuil 12/20 franchi).

Si tu lis ces lignes avant ce moment : tu viens de neutraliser le seul exercice du parcours
qui teste si ton architecture encaisse un changement imprévu. Il n'y a pas de second
exemplaire. Referme, avance jusqu'au jalon 2, reviens.

Ce que tu perds en lisant trop tôt : la preuve, pour toi seul, que tes frontières étaient
posées pour de bonnes raisons et pas par imitation. Une architecture qui connaît d'avance le
changement qu'elle devra encaisser ne prouve rien.

---

## Message client : à ouvrir au jalon 2 (Architecture)

Ce fichier n'a de valeur que si tu l'ouvres au bon moment : après avoir figé ton schéma de
données et horodaté ton ADR du jalon Architecture, jamais avant. Voir la consigne complète
dans [`05-changement-de-spec.md`](05-changement-de-spec.md).

## Le message

> "En fait on a oublié de vous dire un truc important : les trois salles n'ont pas le même
> tarif. La salle du centre-ville est plus chère en soirée, celle de banlieue a un tarif
> réduit le matin, et on veut pouvoir créer des créneaux récurrents (tous les mardis à 18h,
> pendant toute la saison) plutôt que de recréer chaque créneau à la main chaque semaine.
> Ça change beaucoup de choses pour vous ?"

Ce n'est pas un caprice de client capricieux. C'est le scénario normal d'un projet réel :
une contrainte tombe après que tu as figé une structure, parce que le client ne savait pas
lui-même que cette contrainte existait avant de voir ton architecture prendre forme.

Retourne maintenant dans [`05-changement-de-spec.md`](05-changement-de-spec.md) pour traiter
ce message avec la méthode de mesure du coût de spec drift.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
