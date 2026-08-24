---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, regression]
anti_recipe_key: preuve_partielle+regression
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# 15 : Autorisation : RBAC, ABAC, IDOR

Temps de lecture ~9 min

> **Principe universel** : l'authentification répond « qui es-tu », l'autorisation répond
> « as-tu le droit sur **cet objet-là** ». La première est traitée dans
> [05-auth_flows.md](05-auth_flows.md) ; la seconde est celle qui fuit en production.

Le classement OWASP place le contrôle d'accès cassé en tête depuis 2021, et la raison est
prosaïque : l'authentification se teste au premier écran, l'autorisation se teste sur chacune
des trois cents routes.

## 1) RBAC : le droit vient du rôle

```text
role  admin      -> facture:lire, facture:ecrire, utilisateur:supprimer
role  comptable  -> facture:lire, facture:ecrire
role  client     -> facture:lire
```

Simple, lisible, auditable. Sa limite arrive vite : « le comptable lit les factures **de sa
propre filiale** ». Le rôle ne porte pas cette information, alors les équipes inventent
`comptable_filiale_nord`, puis `comptable_filiale_nord_lecture_seule`, et l'explosion
combinatoire est en marche.

## 2) ABAC : le droit vient des attributs

La décision devient une fonction de l'utilisateur, de la ressource et du contexte :

```js
// Une seule fonction de décision, appelée partout. Pas de `if (user.role === 'admin')`
// disséminé dans les routes : un droit écrit à trente endroits diverge à trente endroits.
export function autorise(acteur, action, ressource) {
  if (!acteur) return false;
  if (acteur.role === "admin") return true;
  switch (action) {
    case "facture:lire":
      // Appartenance vérifiée sur la ressource CHARGÉE, pas sur l'identifiant fourni.
      return ressource.organisationId === acteur.organisationId;
    case "facture:ecrire":
      return (
        ressource.organisationId === acteur.organisationId &&
        acteur.role === "comptable" &&
        ressource.statut !== "cloturee"
      );
    default:
      return false; // refus par défaut : toute action non listée est interdite
  }
}
```

**Refus par défaut** est la seule règle qui vieillit bien : la route ajoutée l'an prochain par
quelqu'un d'autre sera fermée tant que personne n'a écrit son droit.

## 3) IDOR : la faille qui n'a besoin d'aucun outil

```text
GET /api/factures/1042   -> ta facture, 200
GET /api/factures/1043   -> la facture du voisin, 200   <-- IDOR
```

Aucune injection, aucun contournement de session : l'utilisateur est bien authentifié, il
change juste un nombre dans l'URL. Le code fautif est presque toujours celui-ci :

```js
// FAUX : on filtre sur l'identifiant fourni, on n'a jamais vérifié le propriétaire.
const facture = await db.factures.findById(req.params.id);
res.json(facture);

// JUSTE : on charge, puis on demande la décision. Et on répond 404, pas 403 :
// un 403 confirme que la facture 1043 existe, ce qui est déjà une fuite.
const facture = await db.factures.findById(req.params.id);
if (!facture || !autorise(req.acteur, "facture:lire", facture))
  return res.sendStatus(404);
res.json(facture);
```

Deux compléments qui coupent des familles entières d'attaque : des identifiants non devinables
(UUID plutôt que des entiers séquentiels : un ralentisseur, pas une protection), et la même
vérification côté **liste** (`GET /api/factures` doit filtrer par organisation, sinon la
pagination livre tout ce que la route unitaire refuse).

## 4) Escalade de privilèges

Elle passe rarement par la porte d'entrée. Les trois chemins habituels :

- **champ soumis en trop** : le formulaire de profil accepte `role` parce que le code fait
  `Object.assign(utilisateur, req.body)` : liste blanche obligatoire ;
- **contrôle côté client seulement** : le bouton est caché, la route ne l'est pas ;
- **rôle qui s'accumule** : personne ne retire les droits d'une mission finie. Un droit
  s'accorde avec une date de fin, comme un secret (voir
  [11-secrets_et_rotation.md](11-secrets_et_rotation.md)).

## Exercice (45 min) : chasse à l'IDOR chez toi

1. Liste **toutes** les routes de ton dépôt fil rouge qui reçoivent un identifiant de
   ressource. Tableau : route, ressource, propriétaire attendu.
2. Pour chacune, écris un test avec deux utilisateurs de deux organisations différentes :
   Alice crée, Bob lit. Le test réussit quand Bob reçoit 404.
3. Fais tourner : compte combien de routes échouent au premier passage. Ce nombre est
   l'information intéressante de l'exercice : note-le avant de corriger.
4. Corrige en centralisant : une seule fonction `autorise()`, appelée après chargement.
5. Rejoue la route de **liste** : Bob ne doit voir aucune ligne d'Alice, y compris en page 2.

## Livrable

Section « Autorisation » de `REVUE-SECURITE.md` : la matrice rôles × actions × conditions, le
tableau des routes avec leur statut avant/après, le nombre de routes vulnérables au premier
passage, et le lien vers le fichier de tests qui rejoue la chasse. Avec les sections écrites en
[13](11-secrets_et_rotation.md) et [14](12-chiffrement_repos_transit.md), le fichier couvre la
pièce sécurité de S3 dans [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## (attention) Piège

Un middleware `requireAuth` sur toutes les routes donne un sentiment de couverture totale. Il
ne vérifie que la première question. Toutes les IDOR du monde passent à travers un
`requireAuth` parfaitement fonctionnel.

## Où l'analogie casse

Le badge d'immeuble : il ouvre certaines portes, comme un rôle. Mais un badge ne peut pas
ouvrir la porte « du dossier de quelqu'un d'autre » : dans un logiciel, la porte est
paramétrée par un nombre que l'utilisateur choisit lui-même. C'est là que l'analogie s'arrête,
et c'est précisément là que se produit l'incident.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
