# LE DOSSIER UNIQUE : UN SEUL LIVRABLE, SIX FAMILLES

C'est la dernière pièce du fil ARCHITECTE-FANTOME. Elle ne se fait pas sur un nouveau projet : elle se fait sur le système que tu as déjà livré au capstone, [04-EPREUVE/06-CAPSTONE-ARENA](../../04-EPREUVE/06-CAPSTONE-ARENA/README.md).

La règle est simple et elle est dure : un seul document, un seul système, et chaque famille doit apparaître en contact avec au moins une autre. Une section qui parle d'une famille sans jamais nommer une contrainte venue d'une autre est à réécrire.

## La contrainte imposée

Avant d'écrire une ligne, tire une contrainte, ou prends celle qui te fait le plus peur :

1. Le trafic est multiplié par dix en une semaine.
2. La facture d'infrastructure doit baisser de 30% ce trimestre.
3. Un consommateur externe impose une rupture de contrat sous 60 jours.
4. La seule personne qui maîtrise un composant part dans trois semaines.

Le dossier entier répond à cette contrainte. Ce n'est pas un rapport sur ton projet : c'est la décision que tu prends sur ton projet sous cette pression précise.

## Le plan imposé du dossier

| Section | Famille dominante | Ce qu'elle contient | Croisement obligatoire |
| --- | --- | --- | --- |
| 1. Le système aujourd'hui | S1 | schéma ASCII des composants, flux, dépendances externes | cite le découpage en contextes bornés (S2) |
| 2. La décision | S2 | un ADR complet : contexte, options, choix, conséquences. **S'il existe un ADR antérieur sur le même composant** (écrit au capstone ou avant), cette section ne le remplace pas silencieusement : elle l'ouvre, cite la décision d'origine avec sa date, et écrit explicitement ce qui a changé pour justifier la révision. Un ADR qui contredit un ADR antérieur sans le nommer est un reniement, pas une décision. | chiffre le coût de chaque option (S1 et S4) |
| 3. Le prix | S1 et S4 | budget avant, budget après, point mort | relie chaque euro à un effet sur le SLO (S3) |
| 4. Ce qu'on promet encore | S3 | SLO révisé, budget d'erreur, RTO, plan de reprise | dit ce que la décision de la section 2 a dégradé |
| 5. Ce qu'on protège | S3 | surface d'attaque touchée, secrets, droits, journalisation | inclut la brique IA si elle existe (S6) |
| 6. Ce qu'on explique | S5 | la même décision en quatre traductions : direction, produit, ops, conformité. **La traduction "direction" n'est acceptée que publiée** sur un espace public réel où un inconnu peut la lire et la contredire (un commentaire technique sur un forum, un post LinkedIn ouvert aux commentaires, un article de blog personnel indexé). Colle l'URL et la date de publication à la fin de la section. Une note jamais publiée n'a jamais été mise à l'épreuve d'un lecteur qui n'a aucune raison de te ménager. | reprend les chiffres exacts des sections 3 et 4 |
| 7. Ce qu'on transmet | S5 | page de transfert du composant le plus fragile, bus factor | nomme les tests et alertes qui protègent la relève (S3) |
| 8. Les trois tensions | toutes | trois contradictions réelles entre deux familles, et l'arbitrage retenu | c'est la section qui prouve le croisement |

## Pièce jointe obligatoire : `STANDARDS-AGENTS.md`

Le dossier n'est pas seulement huit sections : il porte une pièce jointe, produite en
[03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md](../../03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md).

| Vérification | Critère binaire | Verdict si absent |
| --- | --- | --- |
| `STANDARDS-AGENTS.md` joint, chemin cité dans le dossier | les 4 blocs remplis : décisions autonomes, validations requises, vérification de sortie (commande exécutable), coût plafond (un nombre + l'action au dépassement) | **dossier refusé**, sans examen des huit sections |

Raison : « diriger des agents » est la seule compétence du bloc 5 qui n'était prouvée nulle part.
Un dossier qui décrit un système construit avec des agents, sans dire ce que ces agents décident
seuls ni à quel coût on les coupe, décrit un système que personne ne pilote.

Cette pièce est relue en [RETRO-BLOC-5-MAITRISE.md](../RETRO-BLOC-5-MAITRISE.md) et citée dans les
familles S5 et S6 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## Le test de validité, en une question

Relis la section 8. Si tes trois tensions opposent bien deux familles différentes chacune, avec un chiffre de chaque côté et un arbitrage assumé, le dossier vaut. Si tes tensions sont du type "il faudrait faire mieux sur la sécurité", tu as écrit une liste de bonnes intentions : reprends la section 3 et la section 4, et cherche l'endroit exact où le budget et la promesse de service se contredisent. Cet endroit existe toujours.

## Exigence de forme

- Longueur cible : 6 à 10 pages. Un dossier plus long ne sera pas lu, donc ne servira à rien.
- Chaque chiffre porte sa source et sa date. Un chiffre sans source est une opinion déguisée.
- Zéro terme technique non expliqué dans la section 6, sans exception.
- La publication exigée en section 6 porte sur ton projet fil rouge personnel. Si ton contexte réel est celui d'un employeur, anonymise le nom du produit et de l'entreprise avant de publier : la compétence testée est la clarté envers un lecteur non technique, pas la divulgation d'informations internes.

## Où ça finit

Chaque section alimente une ligne de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md), avec le chemin exact du fichier. Ce fichier de preuves, mis à jour à la fin de ce dossier, est la pièce que tu envoies en premier quand quelqu'un demande ce que tu sais faire.

## Gate sécurité, bloquant (rejouer avant de considérer le dossier fini)

La section 5 ne se contente pas d'être écrite : elle repasse par le même gate que chaque mini-projet du bloc CONSTRUCTION, sur le système réel du capstone cette fois, pas sur un mini-projet.

- Relis [04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md](../../04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md) en entier avant d'écrire la section 5, pas après.
- La section 5 n'est acceptée que si elle nomme, pour le système du capstone : les entrées validées, où vivent les secrets, au moins un droit d'accès vérifié par un test (une requête non autorisée sur une ressource d'un autre utilisateur doit retourner 403 ou 404, jamais 200 avec les données), et le sort des données personnelles si le système en manipule.
- Sans ce test automatisé cité par son chemin exact dans la section 5, le dossier est refusé : une revue de sécurité racontée sans preuve exécutable vaut la même chose qu'une absence de revue, exactement la règle déjà appliquée par `SECURITY_GATE.md` dans [02-CONSTRUCTION/02_mini_projects](../../02-CONSTRUCTION/02_mini_projects/README.md).
- Ce gate est indépendant du niveau atteint sur la famille S3 dans [challenge.md](challenge.md) : S3 mesure le SLO et le RTO, ce gate mesure la sécurité au sens strict. Les deux sont exigés, aucun ne remplace l'autre.

> **Contexte d'entreprise manquant ?** Ce module suppose un comite d'architecture qui objecte a ton dossier. Protocole solo jouable, avec tirage au sort et verdict binaire : [SIMULATION-ENTREPRISE.md](../../06-ANNEXES-TRANSVERSES/08-SIMULATION-ENTREPRISE.md) (protocole 1).
