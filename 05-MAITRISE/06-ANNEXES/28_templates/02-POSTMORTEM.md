---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# POSTMORTEM : {titre}

<!-- AF-DIAGRAM:incident -->

```text
Signal
  │
  ▼
Triage ─► Mitigation ─► Recovery ─► Postmortem
  ▲                                  │
  └────────────── learning ─────────┘
```

La gestion d’incident transforme un signal de panne en restauration puis en apprentissage durable.

Temps de lecture ~5 min

## Contexte

Quoi, quand, où. Qui a été impacté.

## Timeline

- HH:MM : événement 1
- HH:MM : événement 2

## Cause racine

Pas la cause proximale. La vraie.

## Impact

Utilisateurs, revenu, réputation. Chiffré si possible.

## Ce qui a bien marché

Vraiment. Nomme.

## Ce qui a mal marché

Vraiment. Nomme.

## Actions correctives

- [ ] Action 1 : owner : deadline
- [ ] Action 2 : owner : deadline

## Protection des données

Toute donnée réelle (users, clients, endpoints internes) doit être anonymisée. Un post-mortem circule.

Check de publication : voir `PUBLICATION_CHECKLIST.md` dans ce même dossier.

### Pratique autonome : production attendue

À partir de « POSTMORTEM : {titre} », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **POSTMORTEM : {titre}** se rattache à ce cas concret : Pour Kintana, une compétence comme l'idempotence n'est acquise que si tu sais l'expliquer, l'implémenter et vérifier le rejeu et les conflits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Référentiel de compétences par preuves

> **Arc DBZ / Capsule Corp. :** Bulma ne dit pas « je suis forte » parce qu'elle a lu le manuel. Elle vérifie ce que l'outil permet réellement.

**Mission liée à « POSTMORTEM : {titre} » :** Établis ton état initial sur une tranche Kintana : sélectionne trois compétences, réalise une tâche de chacune sans suivre un corrigé, garde les tests et note ce que tu n'as pas pu démontrer.

**Livrable :** un registre de compétences avec preuves liées, statut honnête, date de révision et prochain test de transfert.

**Critères d’acceptation :** chaque statut pointe vers un artefact ; une compétence non testée reste `NON ÉVALUÉE` ; aucune preuve déclarative ne vaut une exécution ; les lacunes ont une action de remédiation.

**Transfert obligatoire :** Reprends une compétence dans un langage ou un composant différent et vérifie si le principe se transfère réellement.
