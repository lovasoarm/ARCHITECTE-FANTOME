---
stability: intemporel
acte: évaluer
---

# criteres : verification_pack de DDD et contrats

Ce pack est le mode de verification declare des exercices de ce module, `EXO_JEUNE_IA` compris. Il se passe seul, sans IA : une IA qui corrige un drill invalide le drill.

Ordre impose, toujours le meme dans tout le repo :

| Drill | Ce qu'il verifie | Critere binaire |
| --- | --- | --- |
| [drill_1.md](drill_1.md) | restituer sans support | les cinq elements ecrits de memoire, chacun avec sa ligne "ca casse quand" |
| [drill_2.md](drill_2.md) | appliquer sur un cas neuf | un artefact dans le depot, sur un cas jamais traite, avec un chiffre mesure |
| [drill_3.md](drill_3.md) | expliquer a voix haute | moins de deux minutes, quatre points dits, zero terme non definissable |

## Critere de refus securite (bloquant, ajoute en S-11)

Ce critere ne se negocie pas et ne se compense pas : il precede les trois drills.

| Verification | Portee | Verdict |
| --- | --- | --- |
| Aucun secret en clair | l'ADR, les contrats publies et les exemples de charge utile, plus tout extrait colle dans tes reponses de drill | Un seul secret en clair = **module non valide**, meme avec trois drills REUSSI |

Compte comme secret en clair : cle d'API, jeton, mot de passe, chaine de connexion complete,
certificat prive, identifiant de compte de service, URL signee non expiree. Compte aussi :
un secret « anonymise » a la main dont il reste assez pour deviner le service et le compte.

Ce qui est attendu a la place : une reference nommee (`SECRET_NOM` injecte a l'execution), et
une ligne qui dit ou le secret est reellement stocke et qui peut le lire.

Procedure de verification, avant de te declarer valide :

1. Recherche dans les fichiers livres les motifs evidents (`key`, `token`, `password`, `secret`,
   `BEGIN PRIVATE KEY`, `postgres://`, `mongodb+srv://`).
2. Verifie l'historique, pas seulement l'etat courant : un secret retire au dernier commit reste
   un secret publie.
3. Si tu en trouves un : il est compromis. Tu le revoques d'abord, tu corriges le fichier ensuite,
   et tu notes la date de revocation. Corriger sans revoquer ne leve pas le refus.

La securite cesse ici d'etre un prerequis declare : c'est le seul critere du pack capable de
refuser un livrable par ailleurs excellent.

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
