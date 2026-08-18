---
stability: intemporel
acte: évaluer
---

# criteres : verification_pack de api craft

Ce pack est le mode de verification declare des exercices de ce module. Il se passe seul, sans IA : une IA qui corrige un drill invalide le drill.

Ordre impose, toujours le meme dans tout le repo :

| Drill | Ce qu'il verifie | Critere binaire |
| --- | --- | --- |
| [drill_1.md](drill_1.md) | restituer sans support | les cinq elements ecrits de memoire, chacun avec sa ligne "ca casse quand" |
| [drill_2.md](drill_2.md) | appliquer sur un cas neuf | un artefact dans le depot, sur un cas jamais traite, avec un chiffre mesure |
| [drill_3.md](drill_3.md) | expliquer a voix haute | moins de deux minutes, quatre points dits, zero terme non definissable |

## Critere de refus securite (bloquant, ajoute en A17)

Ce module produit un livrable d'architecture (ADR, budget, SLO ou schema). Le gate securite
precede les drills et ne se compense pas.

| Verification | Portee | Verdict |
| --- | --- | --- |
| Aucun secret en clair, rayon d'impact du livrable ecrit | le livrable d'architecture rendu et tout extrait colle dans les drills | Un seul secret en clair, ou aucun rayon d'impact ecrit = **module non valide**, meme avec tous les drills REUSSI |

Rayon d'impact : qui casse si ce livrable est applique tel quel (services, donnees, personnes),
et qui detient les droits d'y toucher. Une ligne suffit, mais elle est nommee et chiffree.

Reference unique du critere : [identite, droits et secrets](../../../03-PILOTAGE/04_security/README.md).

## Contrat de validation (B4, bloquant)

Ces quatre criteres precedent les drills et valent pour toute grande section. Ils sont dans cet
ordre, sans variante, et aucun ne se valide en lisant.

| # | Axe | Critere binaire | Verdict si absent |
| --- | --- | --- | --- |
| 1 | CONSTRUCTION | un artefact existe dans le depot du fil rouge : code, schema, budget, SLO ou ADR | **non valide** |
| 2 | EXPLICATION | le meme artefact explique a trois publics : un enfant, un pair, une direction non technique | **non valide** |
| 3 | JUSTIFICATION | pourquoi ce choix plutot qu'un autre, avec au moins un nombre date et source ([releve de reference](../../../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md)) | **non valide** |
| 4 | DEFENSE | trois objections, trois reponses, une concession ecrite ([contradicteur](../../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md)) | **non valide** |

Aucune case de simple lecture n'existe dans ce depot : lire ne valide rien, jamais.

## Regle de verdict

Reussi ou non reussi, rien entre les deux. Au moindre doute : non reussi. Les trois drills doivent etre REUSSI pour que le module compte comme valide dans la retrospective de son palier.

## Trace

Note dans ton depot, a la racine du projet fil rouge, une ligne par drill : `<module> : drill_1 REUSSI le <date>`. Un drill sans date n'a pas eu lieu.

## Jalon TECH-ILA (bloquant, ajoute en A13)

TECH-ILA n'est pas une lecture de confort : c'est le **parcours parallele obligatoire** du depot
([README](../../../06-ANNEXES-TRANSVERSES/03-TECH-ILA/README.md)). Ce module porte son jalon 3 sur 6. Le jalon precede les trois drills
et ne se compense pas.

| Verification | Portee | Verdict |
| --- | --- | --- |
| Jalon 3 TECH-ILA franchi | [Niveau 3 : Backend](../../../06-ANNEXES-TRANSVERSES/03-TECH-ILA/tech-ila/03-niveau-3-backend.md) | Jalon non franchi = **module non valide**, meme avec trois drills REUSSI |

Niveau attendu, binaire : une API qui tourne, avec authentification posee, un cache ou une file justifie, et le comportement en erreur decrit.

Trace exigee : une ligne datee dans ton depot, `TECH-ILA jalon 3 franchi le <date> : <chemin de l'artefact>`.
Sans artefact et sans date, le jalon n'a pas eu lieu.
