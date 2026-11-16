---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# POSTMORTEM : {nom du mini-projet}

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

> Ce document se remplit **après** avoir terminé le projet, pas pendant.
> L'honnêteté compte plus que l'image. Un POSTMORTEM qui dit "tout s'est
> super bien passé, aucun blocage" est presque toujours un POSTMORTEM
> non rempli. Si tu as vraiment rien à raconter, le projet était sous ton
> niveau.

---

## CE QUI A COINCÉ

### Le moment où tu t'es planté (obligatoire, au moins un)

Décris **précisément** le moment. Pas "c'était dur" : le fichier, l'heure approximative, ce que tu croyais faire vs ce qui se passait vraiment.

**Résolution** : comment tu t'en es sorti, ou pas (c'est OK d'assumer un point resté flou à la fin).

**Leçon** : ce que ça t'apprend sur le sujet en général, pas juste sur ce projet.

---

### Une décision que tu prendrais différemment aujourd'hui

Une seule. La plus douloureuse. Pas trois pour diluer.

**Ce que tu avais fait** :

**Ce que tu ferais maintenant** :

**Pourquoi tu ne l'avais pas fait à l'époque** (contexte, contrainte, ignorance : sois honnête sur la vraie raison).

---

## CE QUE TU NE SAIS PAS ENCORE (mais tu sais où regarder)

> Cette section est un marqueur de maturité, pas de faiblesse. Voir
> [`../../../00-SOCLE/03-REFERENTIEL/04-JE_NE_SAIS_PAS_ENCORE.md`](../../../00-SOCLE/03-REFERENTIEL/04-JE_NE_SAIS_PAS_ENCORE.md)
> pour le pourquoi. Résumé : "je ne sais pas encore, mais je sais où
> regarder si j'en ai besoin" bat "je fais semblant". Toujours.

Liste 1 à 3 points du projet que tu n'as pas complètement maîtrisés, avec **où tu irais chercher** si le sujet remontait demain :

- Point flou : ...
  - Où je regarderais : (module N du curriculum / doc officielle X / commande `Y --help`)
- Point flou : ...
  - Où je regarderais : ...

Si cette section est vide, deux options : soit tu as vraiment tout compris (rare et suspect), soit tu ne t'es pas assez frotté aux parties inconfortables. Retourne relire tes commits douloureux et sois honnête.

---

## CE QUI A VRAIMENT MARCHÉ

Une technique, une méthode, un réflexe qui t'a fait gagner du temps. Nomme-la, dis pourquoi elle a marché **sur ce projet précis**.

---

## GATE SÉCURITÉ : OBLIGATOIRE POUR CLÔTURER LE PROJET

La gate de sécurité s'applique aux mini-projets selon leur périmètre réel. Complète **le document final `SECURITY.md`** du dépôt apprenant avant de clôturer ce POSTMORTEM ; `03-SECURITY.md` est le modèle AF à copier au départ. Les gates locales du projet restent applicables lorsqu'elles couvrent un risque propre à ce projet.

### Registre contextualisé

N'impose pas mécaniquement les dix catégories OWASP à chaque projet. Identifie les risques présents, classe-les si utile avec [OWASP Top 10:2025](https://owasp.org/Top10/2025/) et documente les risques non applicables avec une justification explicite. Un contrôle applicable mais non testé empêche la validation `PASSÉE`.

| ID  | Risque du projet | Contrôle / preuve                | Statut    | Justification si NON APPLICABLE |
| --- | ---------------- | -------------------------------- | --------- | ------------------------------- |
| G1  | `<risque>`       | `<fichier, test ou observation>` | NON TESTÉ | :                               |
| G2  | `<risque>`       | `<fichier, test ou observation>` | NON TESTÉ | :                               |
| G3  | `<risque>`       | `<fichier, test ou observation>` | NON TESTÉ | :                               |

Statuts de ligne autorisés : `PASSÉ`, `ÉCHOUÉ`, `NON TESTÉ`, `NON APPLICABLE` (justification obligatoire pour ce dernier).

### Règle de clôture

- Tous les contrôles applicables sont `PASSÉ` : la gate peut être déclarée `PASSÉE`.
- Au moins un contrôle applicable reste `NON TESTÉ` : la gate reste `À FAIRE`.
- Au moins un contrôle applicable est `ÉCHOUÉ` : la gate est `ÉCHOUÉE`.
- Les contrôles `NON APPLICABLE` doivent être justifiés.

N'affirme pas qu'un scan, un test, un build ou une revue a été réalisé s'il ne l'a pas été. Le POSTMORTEM doit renvoyer vers le même `SECURITY.md` final que la gate ; ne conserve pas deux versions remplies.

### Référence

- `03-PILOTAGE/04-SECURITY/` pour la théorie.
- `../../../00-SOCLE/01-GETTING-STARTED/07-devsec_perso.md` pour l’hygiène minimale.
- `SECURITY.md` du projet pour la version détaillée (ce document constitue la trace
  de clôture).
