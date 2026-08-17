# 01 : LANGAGE UBIQUITAIRE ET CONTEXTES BORNÉS
Temps de lecture ~9 min

## 1. LE LANGAGE UBIQUITAIRE

Intuition : dans Prison Break, "le plan" ne veut pas dire la même chose pour Michael (le tatouage complet) et pour Sucre (la sortie de ce soir). Les deux ont raison dans leur contexte. Le drame commence quand on met les deux dans la même table.

Le **langage ubiquitaire** (ubiquitous language : un mot du métier = un mot du code, sans traduction dans la tête) est la première règle du DDD.

```js
const evasion = { id: "fox-river-01", statut: "preparee" };
```

Risque réel : quand le code dit `item` et que le métier dit "évasion", chaque nouvelle recrue réinvente la traduction, et deux versions cohabitent au bout de six mois.

## 2. CONTEXTE BORNÉ

Intuition : dans Dragon Ball Z, la salle de l'esprit et du temps a ses propres règles de temps. Un **contexte borné** (bounded context : une zone où un mot a un sens et un seul), c'est ça.

```
CONTEXTE "SURVEILLANCE"        CONTEXTE "LOGISTIQUE"
  detenu.dangerosite             detenu.poids_transport
        |                                |
        +---- contrat d'échange ---------+
              (id_detenu, horodatage)
```

```js
export function evaluerRisque(detenu) {
  return detenu.incidents30j > 2 ? "eleve" : "normal";
}
export function planifierTransfert({ idDetenu, risque }) {
  return { idDetenu, escorte: risque === "eleve" ? 4 : 2 };
}
```

```js
// qui casse : le contexte logistique importe l'objet complet
import { detenu } from "../surveillance/model.js";
// six mois plus tard, surveillance renomme incidents30j -> incidentsRecents
// logistique casse en production, sans qu'aucun test de logistique ne parle
// de surveillance. Le bug arrive par un import, pas par un contrat.
```

Risque réel : deux contextes qui partagent un modèle finissent toujours par se bloquer mutuellement sur les déploiements.

## EXERCICES

**Exercice 1 : le procès des deux mots (15 min).** Ton projet fil rouge contient au moins un mot qui veut dire deux choses selon qui le prononce. Trouve-le. Écris les deux définitions côte à côte, puis tranche : deux contextes bornés, ou un seul mot renommé des deux côtés. Écris la décision en trois lignes dans ton ADR.

**Exercice 2 : la carte de Fox River (20 min).** Dessine en ASCII les contextes de ton projet fil rouge, avec les flèches d'échange entre eux. Règle du jeu : chaque flèche doit être annotée par les champs exacts qui la traversent. Si une flèche transporte "l'objet entier", tu n'as pas de contrat, tu as un import déguisé.

## RÉSUMÉ

Un mot du métier n'a droit qu'à une définition par contexte. Un contexte borné se prouve par un modèle autonome et un contrat étroit, jamais par un simple dossier. Suite : [02_cqrs_coherence_terme.md](02_cqrs_coherence_terme.md).
