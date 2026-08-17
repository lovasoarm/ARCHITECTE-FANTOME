# Grille d'évaluation chiffrée

## Scène d'ouverture

Comme un jury de sélection de tercio dans une arène qui note chaque passe sur des critères
écrits avant le combat, pas sur l'impression laissée à la sortie, cette grille existe pour que
ton score ne dépende jamais de qui tient le stylo ce jour-là.

## Principe

Chaque critère noté est sur 20. Le total est sur 260. Cette grille sert à l'auto-évaluation
(livrable 5 du niveau) et à toute revue externe ultérieure. Un score sans justification
écrite ne compte pas : la justification est ce qui prouve que tu comprends pourquoi tu te
notes ainsi, pas seulement que tu sais lister des points.

Deux critères sont éliminatoires : ils ne rapportent pas de points, mais leur absence rend le
capstone non validable, quel que soit le score obtenu sur le reste de la grille.

## Critères éliminatoires (à valider avant tout calcul de score)

| Critère éliminatoire                                       | Condition de passage                                                                                                       |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Arborescence de livraison conforme                          | La structure de dossier correspond exactement à celle décrite dans `03-deliverables.md`, sans fichier manquant ni renommé        |
| Revue de risques du Niveau 15 présente, signée, et vérifiée par au moins un test automatisé | `REVUE-DE-RISQUES.md` existe, couvre sécurité, coûts et données personnelles, porte une signature datée, **et** `tests/` contient au moins un test qui prouve qu'une mitigation décrite dans la revue est effective : une requête HTTP non autorisée sur une ressource appartenant à un autre utilisateur doit retourner un code 403 ou 404, jamais un code 200 avec les données de la victime |

```text
Un des deux critères éliminatoires manquant ou incomplet --> score final plafonné à 0/260,
quel que soit le détail du reste de la grille. Ce n'est pas une pénalité, c'est un blocage :
un livrable qui n'a pas la forme attendue ou qui n'a pas traité les risques du projet n'est
pas un capstone recevable, indépendamment de la qualité du code.
```

## Grille chiffrée (sur 260)

| Critère                                    | /20 | Ce qui est vérifié                                                                                                                                                                                                            |
| ------------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cadrage et gestion de l'ambiguïté          | 20  | Les hypothèses sont explicites, numérotées, classées par confiance. Le périmètre V1/V2 est justifié par un argument de valeur ou de risque, pas par facilité d'exécution.                                                     |
| Justesse architecturale                    | 20  | Les choix structurants sont justifiés avec au moins un compromis écarté nommé. Le modèle de données central résiste à une analyse de concurrence sur le point sensible du brief.                                              |
| Preuve de fonctionnement du point critique | 20  | Le comptage de capacité est testé automatiquement sous accès concurrent, pas seulement vérifié manuellement une fois. Le test échoue si on retire la protection de concurrence (vérifie-le en le désactivant volontairement). |
| Qualité de communication du livrable       | 20  | Une personne qui n'a pas suivi le projet peut comprendre le périmètre, l'architecture et les limites connues en lisant les documents seuls, sans explication orale.                                                           |
| Honnêteté sur les limites et la dette      | 20  | La roadmap post-V1 nomme précisément ce qui est fragile ou reporté, sans minimiser ni dramatiser. Aucune affirmation non vérifiée présentée comme un fait acquis.                                                             |
| Délégation à l'IA                          | 20  | `TDD_JOURNAL.md` ou l'auto-évaluation liste précisément ce qui a été délégué à une IA sur le jalon V1 (génération, suggestion, revue), ce qui ne l'a pas été, et pourquoi ce partage était le bon compromis pour ce projet.    |
| Protocole d'enquête (`HYPOTHESES.md`)      | 20  | Le bug documenté a été rendu déterministe avant toute correction. Au moins trois hypothèses falsifiables sont posées, dont au moins une explicitement réfutée par une expérience. Le correctif est prouvé par 200 exécutions consécutives sans échec du test qui échouait avant, pas par une seule exécution réussie.                |
| Transfert de décision hors stack           | 20  | `TRANSFERT.md` est présent : la retranscription conserve l'invariant métier exact ; le texte distingue explicitement mécanisme intemporel et syntaxe remplaçable, sans les confondre.                                                                                                                                              |
| Reformulation du besoin (`cahierdescharges.md`) | 20 | Le document intègre explicitement les ajustements du changement de spec (`05-changement-de-spec.md`), pas seulement le besoin initial. Les hypothèses du Livrable 1 sont reprises et confrontées à ce qui s'est réellement passé.                                                                                                  |
| Honnêteté du postmortem (`POSTMORTEM.md`)   | 20  | Nomme au moins une décision technique que l'auteur referait différemment avec ce qu'il sait maintenant, avec la raison précise. Un postmortem qui ne liste aucun regret concret ne peut pas dépasser 8/20 : ça signale une auto-évaluation complaisante, pas honnête.                                                              |
| Contrôle d'antériorité du jalon Architecture | 20  | L'ADR du jalon Architecture (voir `05-changement-de-spec.md`) est daté, dans `TDD_JOURNAL.md` ou `ADR/`, **avant** la date d'ouverture déclarée de `SCELLE-message-client-jalon-2.md`. Si l'ADR n'est pas daté, ou daté après l'ouverture de l'enveloppe scellée, ce critère vaut 0/20 intégralement, quelle que soit la qualité de l'ADR lui-même. |
| Antériorité de la revue de risques         | 20  | `REVUE-DE-RISQUES.md` porte une date antérieure au premier commit de code du jalon 3, vérifiable dans `TDD_JOURNAL.md`. Si la revue est datée après le début du développement, ce critère vaut 0/20 intégralement, quelle que soit la qualité de la revue. Une revue écrite après coup décrit, elle n'oriente pas. |
| Testabilité du code                        | 20  | Tu nommes précisément trois points du code où un effet de bord (écriture en base, appel réseau, horloge système) est isolé derrière une frontière explicite (interface, port, fonction d'accès unique), et tu montres, pour chacun, le test qui profite de cet isolement (test rapide sans dépendance réelle, ou double de test injecté). |

## Coût du changement de spec (mesuré, pas noté séparément)

Le coût du changement de spec décrit dans `05-changement-de-spec.md` n'est pas un critère
noté à part entière sur 20 : il est la preuve exigée à l'intérieur des critères "Justesse
architecturale" et "Honnêteté sur les limites et la dette". Concrètement :

```text
Justesse architecturale        : le tableau de fichiers touchés (catégories A/B/C) doit
                                  figurer dans TDD_JOURNAL.md ; un diff de catégorie C
                                  large sans discussion fait perdre au moins 8 points ici
Honnêteté sur les limites      : le tableau d'heures (compréhension, modèle, métier,
                                  effets de bord) doit être présent et honnête ; son
                                  absence fait perdre au moins 6 points ici
```

Un capstone qui n'a mesuré ni fichiers touchés ni heures pour ce changement de spec ne peut
pas dépasser 12/20 sur "Justesse architecturale", même si le reste de l'architecture est
solide : parce que l'absence de mesure est elle-même le signe que la leçon du changement de
spec n'a pas été prise au sérieux.

## Délégation à l'IA : ce qui est attendu dans la justification

Le critère "Délégation à l'IA" ne juge pas la quantité d'assistance utilisée, il juge la
qualité de la décision de déléguer ou non. Une réponse recevable distingue au minimum :

```text
Délégué à l'IA          : ex. génération du squelette de tests répétitifs, relecture
                           orthographique du README, suggestions de noms de variables
Non délégué             : ex. modèle de données central, logique de comptage de capacité,
                           arbitrages de périmètre du cadrage
Pourquoi ce partage      : ex. "le comptage de capacité est le point sensible du brief,
                           je voulais comprendre chaque ligne moi-même avant de la défendre
                           à l'oral ; le squelette de tests répétitifs n'a pas cette valeur
                           d'apprentissage, déléguer là était le bon calcul de temps"
```

Une réponse qui dit seulement "j'ai utilisé une IA pour m'aider" ou "je n'ai pas utilisé
d'IA" sans cette décomposition ne peut pas dépasser 5/20 sur ce critère : l'absence de
distinction est elle-même un signal que la délégation n'a pas été pensée, seulement subie ou
évitée par principe.

Rappel : les jalons Cadrage et Architecture (voir `challenge.md`) sont sous jeûne d'IA
obligatoire et déclaré. Une délégation IA détectée sur ces deux jalons malgré une déclaration
de jeûne signée est une fraude à la déclaration, pas une simple perte de points : elle
invalide le capstone entier.

## Seuils

```text
< 156/260     -> le capstone n'est pas validé, reprendre le cadrage avant de continuer le code
156-194/260   -> validé avec réserve, identifier et corriger le critère le plus faible avant de
                présenter ce projet comme référence
195-233/260  -> validé, projet présentable en portfolio avec ses limites assumées à l'oral
234-260/260  -> validé avec excellence, ce niveau de rigueur est celui attendu en conditions
                professionnelles réelles sur un projet à enjeu de sécurité

Palier 195-233 et 234-260 : la revue de risques (REVUE-DE-RISQUES.md) doit être non seulement
présente (critère éliminatoire) mais aussi jugée complète par une relecture externe (trois
familles de risques couvertes, mitigations concrètes) pour que le score franchisse 195/260.
Une revue de risques minimaliste plafonne le score final à 194/260, même si le reste de la
grille dépasse ce seuil.
```

## Piège fréquent dans l'auto-évaluation

Se noter haut sur "preuve de fonctionnement" parce que "ça marche quand je teste à la main"
est l'erreur la plus commune de ce niveau. Sans test automatisé de concurrence explicite sur
le comptage de capacité, ce critère ne peut pas dépasser 10/20, quelle que soit la qualité
perçue du reste : parce que c'est précisément le point que le brief signale comme sensible
(l'incident avec les pompiers), et qu'une vérification manuelle ne prouve rien sous charge
réelle.

Second piège, moins visible : le postmortem édulcoré. Écrire "globalement tout s'est bien
passé" dans `POSTMORTEM.md` et se noter haut dessus est une auto-évaluation complaisante, pas
un bilan. Un postmortem sans aucun regret technique nommé plafonne à 8/20 sur son critère :
un projet réel produit toujours au moins une décision qu'on referait autrement.

## Analogie

Analogie : une grille chiffrée, c'est le contrôle qualité au passe avant l'envoi, et la check-list de sécurité avant appareillage.
Où l'analogie casse : la check-list marine est vérifiée par un tiers, ici c'est toi qui coches, d'où les critères d'antériorité.

## Ce que tu dois savoir défendre

- Pourquoi une preuve manuelle du comptage de capacité ne suffit pas, même si elle rassure.
- Pourquoi la grille pénalise autant l'absence de justification écrite qu'un score
  objectivement bas sur un critère.
- Pourquoi les deux critères éliminatoires ne rapportent aucun point mais peuvent plafonner
  le score final à zéro : quelle différence de nature ça révèle par rapport aux critères
  notés sur 20.
- Comment tu utiliserais cette grille différemment si le brief n'avait contenu aucune
  contrainte de sécurité : quel critère perdrait alors son poids critique.
- Pourquoi une hypothèse réfutée dans `HYPOTHESES.md` compte pour le critère "Protocole
  d'enquête" au même titre qu'une hypothèse confirmée.
- Pourquoi une retranscription de décision qui change de langage mais perd l'invariant métier
  ne vaut aucun point sur "Transfert de décision hors stack", même si le code produit compile.

## Comment noter concretement chaque critère

Noter au jugement global produit toujours un score gonfle. La méthode qui tient : pour chaque
critère sur 20, tu ecris d'abord la preuve, ensuite le score. Pas l'inverse. Si tu n'arrives
pas a ecrire la preuve en une phrase verifiable par un tiers, le critère ne depasse pas 10.

```text
Bareme de reference, applicable a chacun des 10 criteres

 0 - 5    Livrable absent, ou present mais sans lien avec le brief
 6 - 10   Livrable present, aucune preuve verifiable, aucune justification ecrite
11 - 14   Preuve partielle : un cas traite, les cas limites non couverts
15 - 17   Preuve complete sur le cas nominal + au moins un cas limite documente
18 - 20   Preuve complete, cas limites couverts, ET arbitrage explicite ecrit
          (ce qui a ete sacrifie, et pourquoi)
```

Le saut entre 17 et 18 est le plus dur du bareme, et c'est voulu : il separe "j'ai fait le
travail" de "je sais defendre pourquoi je l'ai fait comme ca". Un projet qui marche
parfaitement mais dont aucune décision n'est justifiee par écrit plafonne mecaniquement a
170/200. C'est un bon score, pas un score de niveau 12.

## Exemple de notation remplie

```text
Critere                              Score   Preuve invoquee
------------------------------------------------------------------------------
Comprehension du besoin reel          16/20  3 questions au client, reponses
                                             consignees, 1 hypothese refutee
Protocole d'enquete                   18/20  HYPOTHESES.md: 5 hypotheses, 2
                                             confirmees, 2 refutees, 1 ouverte
Preuve de fonctionnement              11/20  test manuel + 1 test automatise,
                                             mais aucun test de concurrence
Revue de risques                       9/20  2 familles couvertes sur 4 ->
                                             plafonne le total a 194/260
cahierdescharges.md                   15/20  perimetre et non-objectifs ecrits,
                                             criteres d'acceptation flous
POSTMORTEM.md                         17/20  2 regrets techniques nommes, 1
                                             action corrective datee
------------------------------------------------------------------------------
Total partiel                        86/120  -> plafonne par la revue de risques
```

Lire ce tableau correctement : le score brut n'est pas le message. Le message est que la
revue de risques faible annule le bénéfice d'un protocole d'enquête excellent. C'est la
lecon que la grille est concue pour faire apparaitre.

## Ce que tu emportes

- Un bareme ou la preuve precede le score, et pas l'inverse.
- La conscience que deux critères eliminatoires pesent plus que 260 points cumules.
- Un reflexe de relecture : tout score au-dessus de 17 doit pointer un arbitrage écrit.

## Compromis

| Option                                             | Coût                                  | Bénéfice                                             | Quand choisir                                         |
| --------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| Noter chaque critère avec preuve écrite d'abord    | Plus lent à remplir                    | Score défendable devant un tiers                        | Toujours, c'est la méthode imposée par ce niveau            |
| Notation globale au ressenti                        | Rapide                                 | Aucun : score gonflé, non défendable                    | Jamais dans ce niveau                                        |
| Ignorer le contrôle d'antériorité si l'ADR est bon | Gagne du temps de relecture            | Aucun : masque une fraude potentielle sur l'ordre des jalons | Jamais : le critère est binaire (daté avant, ou 0)          |

## Pièges classiques

- **Noter avant d'écrire la preuve.** Symptôme : tu changes le score après coup pour qu'il
  corresponde à la preuve que tu viens d'écrire, au lieu de l'inverse.
- **Confondre un ADR présent avec un ADR daté avant l'ouverture de l'enveloppe scellée.** Symptôme : tu ne sais pas répondre à
  quelle heure précise ton ADR a été écrit, par rapport à l'ouverture de l'enveloppe scellée.
- **Déclarer une frontière d'effet de bord sans test qui en profite.** Symptôme : tu cites une
  interface, mais aucun test ne s'exécute plus vite ou plus simplement grâce à elle.
- **Laisser un critère éliminatoire "presque" rempli.** Symptôme : tu te dis que 90% de la
  revue de risques suffit ; le critère est binaire, pas un pourcentage.
