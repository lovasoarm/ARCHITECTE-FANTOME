# Grimoire : Bonus Vault

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Contrôle d'accès côté serveur | Vérification du droit d'agir faite sur le serveur, à chaque requête, jamais dans l'affichage. | `if (reservation.membre_id !== session.membre_id) return 403;` (le contrôle vit sur le serveur, jamais dans le rendu) | le passe de service qui ouvre la porte des cuisines / le contrôle des billets à la coupée du navire. Où l'analogie casse : une porte physique se referme seule, une route HTTP reste ouverte à qui connaît l'URL. | un videur à l'entrée voit passer tout le monde ; l'interface n'est qu'une entrée parmi d'autres : l'appel direct à l'API contourne l'écran, donc un bouton masqué ne protège rien et le droit se revérifie à chaque requête. |
| IDOR | Accès à la ressource d'autrui en changeant un identifiant dans l'URL ou le corps de requête. | `GET /reservations/1042` (change 1042 en 1043 : si tu vois la donnée, tu as un IDOR) | les casiers numérotés d'un vestiaire sans clé / les dossiers patients rangés par numéro aux urgences. Où l'analogie casse : au vestiaire il faut être présent, ici un script essaie 100 000 numéros par minute. | un numéro de chambre d'hôtel n'ouvre pas la porte du voisin ; dans une API, incrémenter un identifiant suffit tant que le serveur ne vérifie pas que la ressource appartient à l'appelant : la faille n'est pas dans l'identifiant, elle est dans l'absence de vérification. |
| Secret commité | Clé, mot de passe ou jeton poussé dans l'historique du dépôt, donc public dès le premier clone. | `git log -p -S 'sk_live' \| head` (l'historique garde le secret même après suppression) | une clé laissée sous le paillasson et déjà photographiée / une lettre postée qu'on ne peut plus reprendre | une clé retirée de sous le paillasson n'y est plus ; un secret commité reste dans l'historique et dans tous les clones déjà faits : supprimer le fichier ne fait rien, seule la rotation du secret referme la porte. |
| Rotation de secret | Remplacement planifié d'un secret, avec période de double validité pour ne rien couper. | `API_KEY_CURRENT` + `API_KEY_PREVIOUS` acceptées 24 h, puis suppression de la seconde | le changement d'équipe en cuisine avec passation / le relais de quart en navigation. Où l'analogie casse : un quart se termine à heure fixe, un secret traîne dans des clients que tu ne contrôles pas. | changer une serrure prend une minute ; une rotation de secret impose une période de double validité et un inventaire des consommateurs, sinon elle coupe le service au lieu de le protéger. |
| Donnée personnelle | Toute donnée identifiant une personne, directement ou par recoupement de deux champs. | `SELECT date_naissance, code_postal, sexe FROM membres` (ce triplet ré-identifie la majorité des gens) | l'empreinte laissée sur un outil de l'atelier / le numéro de dossier des urgences croisé avec l'annuaire. Où l'analogie casse : une empreinte s'efface, une donnée diffusée ne se rappelle jamais. | un nom sur une boîte aux lettres identifie une personne ; une donnée personnelle inclut aussi ce qui identifie par recoupement (code postal, date, appareil) : le champ pris isolément paraît anodin, la jointure ne l'est pas. |
| Minimisation | Ne collecter que les champs dont un usage écrit existe aujourd'hui, pas « au cas où ». | `-- champ retire : profession (aucun usage produit, 0 requete en 6 mois)` | la mise en place minimale avant un service en cuisine / le poids embarqué avant une course en montagne. Où l'analogie casse : un sac s'allège en route, une colonne collectée depuis six mois est déjà une dette légale. | garder au cas où ne coûte rien dans un grenier ; chaque champ collecté ajoute une obligation légale, un coût de stockage et une surface de fuite : la question n'est pas « est-ce utile ? » mais « quel usage écrit existe aujourd'hui ? ». |
| Durée de conservation | Délai décidé à l'avance par catégorie de donnée, avec purge automatique et responsable nommé. | `DELETE FROM logs_acces WHERE cree_le < now() - interval '90 days';` (planifié, pas manuel) | la date de péremption en chambre froide / l'archivage légal d'un livre de bord. Où l'analogie casse : un produit périmé se voit, une donnée périmée reste utilisable et donc reste volée. | un archivage prolongé semble prudent ; une durée de conservation sans purge automatique et sans responsable nommé n'existe pas : la donnée reste, et c'est elle qui fuit le jour de l'incident. |
| Egress | Coût du trafic sortant de ton hébergeur vers l'extérieur, facturé au gigaoctet, invisible en développement. | `# 1 image 2 Mo x 50 000 vues = 100 Go sortants --> le poste qui explose en premier` | la livraison payée au kilomètre depuis l'atelier / le ravitaillement héliporté d'un refuge. Où l'analogie casse : le transporteur envoie une facture attendue, l'egress arrive après consommation, sans devis. | un péage se paie à l'entrée d'une autoroute ; l'egress ne se paie qu'à la sortie et n'apparaît jamais en développement local : une page qui recharge une image lourde à chaque appel se voit sur la facture, pas dans les tests. |
| Coût à la requête | Coût réel d'un appel : calcul, base, réseau, journalisation, divisé par le nombre d'appels. | `cout_mensuel / requetes_mensuelles` (à recalculer après chaque ajout de dépendance) | le coût matière d'un plat au menu / le coût d'une manœuvre supplémentaire en régie. Où l'analogie casse : le coût matière est stable, le coût logiciel chute avec l'échelle puis remonte par paliers. | un ticket de caisse affiche un prix unique ; le coût d'une requête additionne calcul, base, réseau et journalisation : la ligne la plus chère est souvent le log, pas le traitement. |
| Quota | Plafond imposé par appelant ou par compte, pour qu'un usage anormal ne consomme pas tout le budget. | `if (appels_du_jour(compte) > 10_000) return 429;` | le nombre de couverts acceptés par service / la capacité maximale d'un refuge. Où l'analogie casse : un refuge plein se voit à l'œil nu, un quota franchi n'existe que si tu l'as codé. | une limite de vitesse s'applique à tous pareil ; un quota mal posé bloque l'utilisateur légitime en pic et laisse passer l'abus lent : il se calibre sur un usage mesuré et daté, pas sur une intuition. |
| Budget alerte | Seuil de dépense qui déclenche une notification avant la facture, pas après. | `# alerte a 50 %, 80 %, 100 % du budget mensuel prevu` | le voyant de niveau bas d'une régie / l'altimètre qui sonne avant la limite d'oxygène. Où l'analogie casse : un voyant coupe rarement le service, un dépassement de budget peut couper le tien. | un plafond bancaire refuse la dépense ; un budget alerte ne bloque rien, il prévient : sans action décidée d'avance et sans destinataire, il ne fait que documenter le dépassement après coup. |
| ADR de risque | Décision de sécurité ou de coût figée par écrit, avec le risque accepté et son signal de réouverture. | `## Risque accepte : pas de chiffrement au repos. Reouverture : premier client soumis a audit.` | le compte rendu de manœuvre au carnet de bord / la fiche de sécurité affichée à l'atelier. Où l'analogie casse : la fiche affichée contraint tout le monde, un ADR n'engage que ceux qui le relisent. | accepter un risque à l'oral engage tant que la personne est là ; un ADR de risque nomme le risque accepté et le signal qui impose de rouvrir la décision : sans ce signal, le risque devient un état permanent que plus personne n'assume. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Écart au gabarit

Ce niveau n'a pas de `boss-fight.md` (voir [README.md](README.md), section « Écart au
gabarit »). La section `## Comportements évalués en boss-fight` exigée par
[_STYLE.md](../../06-ANNEXES-TRANSVERSES/meta/_STYLE.md) est donc portée par la colonne « Ce que tu dois savoir défendre » du
tableau ci-dessus, et par les critères de [challenge.md](challenge.md).

## Choisir un format de décision

```text
Réversible, une personne          --> rien d'écrit, ou une ligne de commit
Structurant, équipe restreinte    --> ADR
Traverse plusieurs équipes        --> RFC
Doit convaincre une audience non technique --> one-pager
```

## ADR : squelette minimal

```text
# ADR-NNNN : [titre court, verbe d'action]
## Statut (proposée / acceptée / dépréciée) : date
## Contexte (contraintes connues au moment de la décision)
## Décision (une phrase, sans ambiguïté)
## Conséquences (+ bénéfices, - coûts réels, jamais uniquement des +)
```

## Checklists : les quatre moments à risque

```text
Mise en prod   --> rollback testé, fenêtre sans chevauchement, métriques définies avant
Revue de code  --> cas limites couverts, tests qui échouent sur l'ancien code
Incident       --> impact mesuré avant cause, communication avant solution complète
Onboarding     --> accès prêts avant J1, première tâche à faible risque sous 2-3 jours
```

## Trouver une ressource durable

```text
Question filtre : explique-t-elle POURQUOI une contrainte existe,
ou seulement COMMENT contourner la contrainte avec l'outil du moment ?

Sources qui durent : livres de mécanismes, post-mortems publics, papiers fondateurs,
documentation de standards, code source de projets reconnus et anciens.
```

## Anti-patterns : reconnaissance rapide

```text
God Object              --> un fichier que plus personne ne comprend en entier
Copier-Coller Métier    --> même règle codée à plusieurs endroits, jamais synchronisée
Faux Consensus          --> réunion "d'accord" sans décision formulée explicitement
Test Alibi              --> test qui vérifie l'absence de crash, pas la valeur correcte
Dette Technique Silencieuse --> raccourci jamais nommé, jamais budgété pour remboursement
Héros Systémique        --> une seule personne indispensable pour comprendre le système
Yak Shaving Involontaire --> le sous-problème avale le problème d'origine
Cargo Cult Architectural --> copier la forme d'une architecture sans le contexte qui la justifie
```

## Principe transversal

```text
Un format, une checklist, une ressource ou un pattern n'a de valeur que si son coût
d'usage est inférieur au coût de l'erreur qu'il prévient. Mesure les deux avant d'adopter
un outil de ce coffre par principe.
```
