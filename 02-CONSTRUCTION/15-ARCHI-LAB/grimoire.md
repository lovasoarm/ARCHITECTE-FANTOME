# Grimoire : Niveau 06, Archi-Lab

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Mémo à ouvrir avant de trancher un découpage de modules ou un choix monolithe/services. Sert
à nommer le mécanisme qui casse, pas à réciter du vocabulaire d'architecture.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Couplage | A quel point un module doit connaître l'intérieur d'un autre pour fonctionner. | `import { calculTarif } from "../facturation/interne/moteur";` | commis qui doit connaître la recette secrète du chef pour dresser un plat / grimpeur qui dépend du nœud exact fait par un autre pour avancer | « commis qui doit connaître la recette secrète du chef pour dresser... » se rejoue à l'identique, le code non ; sur Couplage, le coût du réseau entre deux composants séparés est de plusieurs ordres de grandeur au-dessus d'un appel local. Chiffre le coût de retour arrière avant de découper. |
| Cohésion | A quel point les éléments d'un module ont une seule raison commune de changer. | `export const ModuleReservation = { creer, annuler, deplacer };` | poste dédié uniquement aux desserts en cuisine / cordée dédiée uniquement à l'équipement, rien d'autre | « poste dédié uniquement aux desserts en cuisine » se corrige toute seule quand elle dérape ; sur Cohésion, le découpage optimise un critère (déploiement, équipe, donnée) et dégrade les autres. Vérifie dans le code qu'un import interdit échoue vraiment. |
| Dépendance dirigée | Une flèche A dépend de B, qui ne doit jamais former de cycle dans le graphe global. | `// domaine/reservation.ts n'importe jamais depuis infra/*` | commande qui va toujours de la salle vers la cuisine, jamais l'inverse / ordre qui descend toujours du skipper vers l'équipage | « commande qui va toujours de la salle vers la cuisine, jamais l'inverse » se rejoue à l'identique, le code non ; sur Dépendance dirigée, un appel synchrone entre composants crée une dépendance de disponibilité invisible sur le diagramme. Écris l'ADR avec les options rejetées et la condition qui la rendrait obsolète. |
| Inversion de dépendance | Le domaine définit une interface, l'infra l'implémente. | `interface DepotReservation { sauver(r: Reservation): Promise<void>; }` | le chef définit la recette, le fournisseur s'adapte au cahier des charges / le skipper fixe le cap, le moteur s'adapte à la demande | « le chef définit la recette, le fournisseur s'adapte au cahier des... » décrit un monde où chaque étape se voit ; sur Inversion de dépendance, un appel synchrone entre composants crée une dépendance de disponibilité invisible sur le diagramme. Date le schéma et fixe la prochaine relecture. |
| Source de vérité | La copie d'une donnée désignée comme faisant foi en cas de désaccord. | `const stockReel = await depotStock.lireQuantite(produitId);` | le carnet de commandes du chef fait foi, pas le tableau affiché en salle / le livre de bord fait foi, pas le souvenir d'un matelot | « le carnet de commandes du chef fait foi, pas le tableau affiché en... » tient tant que rien ne tombe en route ; sur Source de vérité, le découpage optimise un critère (déploiement, équipe, donnée) et dégrade les autres. Date le schéma et fixe la prochaine relecture. |
| Cohérence éventuelle | Un décalage temporaire et assumé entre une copie et sa source de vérité. | `// cache invalidé sous 5s, jamais utilisé pour une décision irréversible` | ardoise du jour pas encore mise à jour partout en salle / position GPS affichée avec quelques secondes de retard | « ardoise du jour pas encore mise à jour partout en salle » suppose que quelqu'un surveille ; sur Cohérence éventuelle, le coût du réseau entre deux composants séparés est de plusieurs ordres de grandeur au-dessus d'un appel local. Écris l'ADR avec les options rejetées et la condition qui la rendrait obsolète. |
| Monolithe modulaire | Une seule unité de déploiement organisée en modules à frontières claires, sans appel réseau interne. | `// src/modules/{reservation,facturation,notif}/ dans un seul déploiement` | une seule cuisine avec des postes bien séparés, pas trois restaurants distincts / un seul bateau avec des cabines dédiées, pas trois navires | « une seule cuisine avec des postes bien séparés, pas trois... » a une frontière visible à l'oeil ; sur Monolithe modulaire, le coût du réseau entre deux composants séparés est de plusieurs ordres de grandeur au-dessus d'un appel local. Chiffre le coût de retour arrière avant de découper. |
| Critères monolithe vs services | Autonomie organisationnelle, isolation de charge, isolation de risque, maturité opérationnelle. | `// 0 critere vrai --> rester en monolithe modulaire` | ouvrir une cuisine séparée seulement si une équipe distincte la gère vraiment / affréter un second bateau seulement si la charge le justifie vraiment | « ouvrir une cuisine séparée seulement si une équipe distincte la... » se corrige toute seule quand elle dérape ; sur Critères monolithe vs services, la réversibilité de la décision se paie au moment du découpage, pas après. Vérifie dans le code qu'un import interdit échoue vraiment. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Le gradient de couplage (du pire au meilleur)

```text
Contenu > Commun > Controle > Donnee > Message
(le pire)                              (le mieux, realiste = donnee le plus souvent)
```

## Les 4 couches et leur règle de dependance

```text
UI --> Cas d'usage --> Domaine <-- Infra (implemente une interface du Domaine)
```

Le Domaine ne connait ni HTTP, ni SQL, ni JSON, ni aucun framework.

## Checklist avant de committer un module

- [ ] Je peux decrire ce module en une phrase sans "et".
- [ ] Si je le supprime et le remplace par une autre implementation du meme contrat, je sais
      exactement combien de fichiers je dois toucher ailleurs (idealement zero).
- [ ] Aucun import ne remonte d'une couche "basse" (infra) vers une couche "haute" (domaine,
      cas d'usage, UI).
- [ ] La règle métier qu'il porte se teste sans base de données ni serveur demarre.
- [ ] Je sais nommer sa source de vérité si ce module manipule une donnée dupliquee ailleurs.

## Les 4 critères de décision monolithe vs services

1. Autonomie organisationnelle réelle entre equipes.
2. Isolation de charge/scalabilite radicalement differente.
3. Isolation de risque ou de conformite.
4. Maturite operationnelle de l'equipe pour absorber le coût réseau/deploiement.

Zero critère vrai --> monolithe modulaire, sans hesitation.

## Heuristique de secours

Quand tu doutes du decoupage : demande-toi "quand cette chose change, qu'est-ce que je suis
oblige de changer avec ?" Si la réponse est "beaucoup de choses sans rapport apparent",
le decoupage est mauvais, indépendamment de ce que dit le nom des dossiers.

## Si tu rates le boss-fight

Relis d'abord le critère qui a plafonne ta note : troisieme voie réalisable, réponse aux
microservices, ou mecanisme anti-recidive. Redessine le graphe de dependances de la scene
avant de repondre a nouveau, en identifiant precisement le couplage fautif. Relis le gradient
de couplage ci-dessus. Attends 48 h avant de retenter le boss-fight pour juger la scene a
froid. Si l'echec se reproduit sur le meme critère, redescends au niveau 05 relire
"invariant" : un mauvais decoupage cache souvent un invariant mal place.
