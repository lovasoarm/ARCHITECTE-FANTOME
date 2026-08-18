# Grimoire : Bonus Vault

Ce grimoire comporte deux tables : le mémo à 4 colonnes, puis la table de défense orale à
3 colonnes (écart de format assumé, voir [_STYLE.md](../.meta/_STYLE.md)).

| Terme | Définition | Code | Analogies |
| --- | --- | --- | --- |
| Contrôle d'accès côté serveur | Vérification du droit d'agir faite sur le serveur, à chaque requête, jamais dans l'affichage. | `if (reservation.membre_id !== session.membre_id) return 403;` (le contrôle vit sur le serveur, jamais dans le rendu) | le passe de service qui ouvre la porte des cuisines / le contrôle des billets à la coupée du navire. Où l'analogie casse : une porte physique se referme seule, une route HTTP reste ouverte à qui connaît l'URL. |
| IDOR | Accès à la ressource d'autrui en changeant un identifiant dans l'URL ou le corps de requête. | `GET /reservations/1042` (change 1042 en 1043 : si tu vois la donnée, tu as un IDOR) | les casiers numérotés d'un vestiaire sans clé / les dossiers patients rangés par numéro aux urgences. Où l'analogie casse : au vestiaire il faut être présent, ici un script essaie 100 000 numéros par minute. |
| Secret commité | Clé, mot de passe ou jeton poussé dans l'historique du dépôt, donc public dès le premier clone. | `git log -p -S 'sk_live' | head` (l'historique garde le secret même après suppression) | la clé du local à outils laissée sur le tableau de l'atelier / le code du coffre écrit dans le journal de bord. Où l'analogie casse : reprendre la clé suffit dans l'atelier, ici il faut la révoquer, pas la retirer. |
| Rotation de secret | Remplacement planifié d'un secret, avec période de double validité pour ne rien couper. | `API_KEY_CURRENT` + `API_KEY_PREVIOUS` acceptées 24 h, puis suppression de la seconde | le changement d'équipe en cuisine avec passation / le relais de quart en navigation. Où l'analogie casse : un quart se termine à heure fixe, un secret traîne dans des clients que tu ne contrôles pas. |
| Donnée personnelle | Toute donnée identifiant une personne, directement ou par recoupement de deux champs. | `SELECT date_naissance, code_postal, sexe FROM membres` (ce triplet ré-identifie la majorité des gens) | l'empreinte laissée sur un outil de l'atelier / le numéro de dossier des urgences croisé avec l'annuaire. Où l'analogie casse : une empreinte s'efface, une donnée diffusée ne se rappelle jamais. |
| Minimisation | Ne collecter que les champs dont un usage écrit existe aujourd'hui, pas « au cas où ». | `-- champ retire : profession (aucun usage produit, 0 requete en 6 mois)` | la mise en place minimale avant un service en cuisine / le poids embarqué avant une course en montagne. Où l'analogie casse : un sac s'allège en route, une colonne collectée depuis six mois est déjà une dette légale. |
| Durée de conservation | Délai décidé à l'avance par catégorie de donnée, avec purge automatique et responsable nommé. | `DELETE FROM logs_acces WHERE cree_le < now() - interval '90 days';` (planifié, pas manuel) | la date de péremption en chambre froide / l'archivage légal d'un livre de bord. Où l'analogie casse : un produit périmé se voit, une donnée périmée reste utilisable et donc reste volée. |
| Egress | Coût du trafic sortant de ton hébergeur vers l'extérieur, facturé au gigaoctet, invisible en développement. | `# 1 image 2 Mo x 50 000 vues = 100 Go sortants --> le poste qui explose en premier` | la livraison payée au kilomètre depuis l'atelier / le ravitaillement héliporté d'un refuge. Où l'analogie casse : le transporteur envoie une facture attendue, l'egress arrive après consommation, sans devis. |
| Coût à la requête | Coût réel d'un appel : calcul, base, réseau, journalisation, divisé par le nombre d'appels. | `cout_mensuel / requetes_mensuelles` (à recalculer après chaque ajout de dépendance) | le coût matière d'un plat au menu / le coût d'une manœuvre supplémentaire en régie. Où l'analogie casse : le coût matière est stable, le coût logiciel chute avec l'échelle puis remonte par paliers. |
| Quota | Plafond imposé par appelant ou par compte, pour qu'un usage anormal ne consomme pas tout le budget. | `if (appels_du_jour(compte) > 10_000) return 429;` | le nombre de couverts acceptés par service / la capacité maximale d'un refuge. Où l'analogie casse : un refuge plein se voit à l'œil nu, un quota franchi n'existe que si tu l'as codé. |
| Budget alerte | Seuil de dépense qui déclenche une notification avant la facture, pas après. | `# alerte a 50 %, 80 %, 100 % du budget mensuel prevu` | le voyant de niveau bas d'une régie / l'altimètre qui sonne avant la limite d'oxygène. Où l'analogie casse : un voyant coupe rarement le service, un dépassement de budget peut couper le tien. |
| ADR de risque | Décision de sécurité ou de coût figée par écrit, avec le risque accepté et son signal de réouverture. | `## Risque accepte : pas de chiffrement au repos. Reouverture : premier client soumis a audit.` | le compte rendu de manœuvre au carnet de bord / la fiche de sécurité affichée à l'atelier. Où l'analogie casse : la fiche affichée contraint tout le monde, un ADR n'engage que ceux qui le relisent. |

## Défense orale

| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| ADR | Six mois plus tard, personne ne sait pourquoi ce choix a été fait, donc l'équipe le refait ou le défait au hasard. | Pourquoi un ADR sans section « conséquences négatives » est-il une publicité et pas une décision ? |
| RFC | Une décision transverse est imposée par une équipe, puis sabotée passivement par les autres. | Comment sais-tu qu'un sujet mérite une RFC plutôt qu'un ADR, sans invoquer sa difficulté technique ? |
| One-pager | La décision se joue sur la personne qui parle le mieux en réunion, pas sur les options réelles. | Traduis un compromis d'architecture en une phrase de coût et de risque, sans terme technique. |
| Dette de sécurité | On confond « pas encore attaqué » et « protégé » ; l'incident arrive au pire moment. | Quelle dette de sécurité as-tu acceptée sur ton projet, avec quel signal de réouverture chiffré ? |
| Coût unitaire | Une feature rentable en démo devient une perte à 10 000 utilisateurs, et personne ne le voit avant la facture. | Donne le coût unitaire de ton projet fil rouge et le poste qui explose en premier si le trafic ×100. |
| Donnée personnelle | On collecte par défaut, on stocke sans limite, et le moindre incident devient une obligation légale de notification. | Pourquoi la pseudonymisation d'un identifiant ne suffit-elle pas à sortir une table du champ des données personnelles ? |
| Rétention | La base grossit indéfiniment, le coût de stockage et l'impact d'une fuite grossissent avec elle. | Quelle est ta durée de rétention par catégorie de donnée, et qui exécute la purge ? |
| Format de décision | Décisions triviales sur-documentées, décisions structurantes jamais écrites : les deux échecs coexistent. | Sur quels deux critères tranches-tu entre rien d'écrit, un ADR, une RFC et un one-pager ? |

## Écart au gabarit

Ce niveau n'a pas de `boss-fight.md` (voir [README.md](README.md), section « Écart au
gabarit »). La section `## Comportements évalués en boss-fight` exigée par
[_STYLE.md](../.meta/_STYLE.md) est donc portée par la colonne « Ce que tu dois savoir défendre » du
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
