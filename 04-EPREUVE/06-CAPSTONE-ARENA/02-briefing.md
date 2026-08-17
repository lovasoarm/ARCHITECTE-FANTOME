# Le brief

## Contexte

Tu reçois ce message d'un client fictif, à traiter comme s'il était réel :

> Bonjour,
>
> On dirige un réseau de trois salles d'escalade indépendantes qui viennent de s'associer
> pour partager leurs adhérents. Aujourd'hui chaque salle gère ses réservations de créneaux
> "mur", ses cours collectifs et son inventaire de matériel à la main, sur un tableur
> partagé qui déborde de partout. On aimerait un outil pour centraliser tout ça.
>
> Ce qui compte le plus pour nous : que nos adhérents puissent réserver un créneau dans
> n'importe laquelle des trois salles avec leur même compte, et qu'on sache en temps réel
> combien de personnes sont attendues pour ne pas dépasser la capacité de sécurité. On a eu
> un souci l'an dernier avec un contrôle des pompiers sur ce sujet donc c'est sensible.
>
> On aimerait aussi gérer les cours collectifs (un coach, un créneau, un nombre de places
> limité) et idéalement le prêt de matériel (baudriers, chaussons) mais si c'est trop pour
> une première version on peut vivre sans au début.
>
> Pas de budget précis à vous donner, on préfère voir ce que vous proposez et discuter après.
> On voudrait quelque chose d'utilisable dans les deux mois, sachant qu'on a une saison plus
> calme en été si jamais il fallait itérer après un premier lancement.
>
> Merci d'avance,
> Le collectif des trois salles

```text
Club d'escalade, trois salles
   |
   +-- Salle Centre-ville  --> tarif variable en soiree
   +-- Salle Banlieue       --> tarif reduit le matin
   +-- Salle Troisieme site --> tarif de reference
        |
        v
   Creneaux recurrents (ex: tous les mardis 18h, toute la saison)
        |
        v
   Reservation --> verifie capacite restante --> confirme ou refuse
```

## Contexte métier détaillé

Les trois salles s'appellent Grimpe Centre, Bloc Sud et Voie Haute. Elles existaient chacune
depuis six à neuf ans comme structures associatives indépendantes, avec leur propre logiciel
de caisse (deux d'entre elles utilisent le même logiciel de point de vente pour l'accès au
mur, la troisième gère tout sur papier et Excel). L'association vient d'être créée il y a
trois mois pour mutualiser les adhésions, les coachs et les achats de matériel. Ce
regroupement est fragile politiquement : chaque salle a peur de perdre son identité et son
autonomie de gestion au profit des deux autres.

Environ 1 400 adhérents actifs au total (500 à Grimpe Centre, 600 à Bloc Sud, 300 à Voie
Haute, la plus récente). Un pic de fréquentation le soir en semaine (18h-21h) et le samedi
matin. La capacité de sécurité maximale, fixée par le règlement de sécurité incendie de
chaque établissement recevant du public (ERP), est différente par salle : 45 personnes à
Grimpe Centre, 60 à Bloc Sud, 30 à Voie Haute.

## Parties prenantes et intérêts contradictoires

Le brief donne l'impression d'un client unique et cohérent. En réalité, "le collectif des
trois salles" recouvre quatre personnes aux intérêts parfois opposés, que tu découvriras au
fil des échanges si tu poses les bonnes questions :

- **Amina, gérante de Grimpe Centre et porte-parole du collectif.** Elle a rédigé le brief
  initial. Elle veut le système unifié rapidement parce que c'est elle qui gère aujourd'hui à
  la main la liste des adhérents qui viennent d'une autre salle, et ça lui prend deux heures
  par semaine. Elle est disposée à simplifier le périmètre pour aller vite.
- **Karim, gérant de Bloc Sud.** Sa salle est la plus fréquentée et la plus rentable des
  trois. Il craint qu'un système unifié dilue son avantage commercial (ses cours collectifs
  sont réputés, il ne veut pas que les créneaux se remplissent avec des adhérents des deux
  autres salles au détriment des siens). Il pousse pour que chaque salle garde une priorité de
  réservation sur ses propres créneaux pendant les premières 24 heures d'ouverture, une règle
  absente du brief initial.
- **Sofia, gérante de Voie Haute, la salle la plus récente et la plus petite.** Elle est celle
  qui a le plus à gagner du partage d'adhérents (elle manque de visibilité) et pousse pour que
  le système favorise la découverte des trois salles, pas seulement la gestion des créneaux.
  Elle est aussi la moins équipée techniquement : sa salle n'a ni logiciel de caisse ni accès
  internet fiable en salle, seulement dans le bureau.
- **Le comité des coachs**, consulté une fois par Amina mais non signataire du brief : ils
  veulent pouvoir bloquer des créneaux pour de la maintenance du mur (changement de voies) sans
  que ça ressemble à un cours annulé aux yeux des adhérents. Cette contrainte n'apparaît nulle
  part dans le message initial et n'émergera que si tu la fais émerger par une question ou une
  démo.

Cette divergence d'intérêts signifie qu'un livrable "qui plaît à Amina" ne suffit pas : un
livrable qui avantage structurellement une salle sur les deux autres relance une tension
politique que le projet est censé apaiser, pas aggraver.

## Données existantes

- Grimpe Centre et Bloc Sud utilisent le même logiciel de caisse et peuvent en exporter un
  fichier CSV des adhérents actifs (nom, email, date d'adhésion, statut de paiement), mais pas
  d'historique de réservations passées : ce logiciel ne gérait que l'accès physique par badge,
  pas les créneaux.
- Voie Haute n'a aucun export possible : sa liste d'adhérents est un fichier Excel tenu à la
  main, avec des doublons connus et des emails parfois absents.
- Aucune des trois salles ne dispose d'un historique numérique des créneaux passés : impossible
  de calibrer automatiquement une capacité "habituelle" par créneau à partir de données
  historiques, il faudra la faire déclarer manuellement au lancement.

## Contraintes légales

- Le comptage de capacité en temps réel est lié à la réglementation ERP (établissement
  recevant du public) : chaque salle a un effectif maximal autorisé, contrôlé par la
  commission de sécurité locale. Le dépassement n'est pas seulement un inconfort commercial,
  c'est une infraction pouvant entraîner une fermeture administrative temporaire. C'est ce qui
  s'est produit l'an dernier à Bloc Sud, d'où la sensibilité du sujet dans le brief.
- Les données des adhérents (nom, email, historique de paiement, éventuellement des données de
  santé si un jour un certificat médical est demandé) relèvent du RGPD. Le partage
  d'adhérents entre trois structures juridiquement distinctes suppose une base légale claire
  (l'association nouvellement créée doit être le responsable de traitement unique, ou chaque
  salle reste responsable de ses propres données et un accord de sous-traitance encadre le
  partage). Ce point n'est pas résolu par le client au moment du brief : il te revient de le
  signaler comme un risque à traiter avant tout partage effectif de données entre salles, pas
  après.
- Aucune contrainte de paiement en ligne n'est mentionnée dans le brief : les adhésions sont
  payées en salle, en direct. Ne pas construire un système de paiement en ligne serait donc un
  choix de périmètre légitime, pas une omission, tant que le brief ne le demande pas.

## Budget et échéances

- Aucun chiffre de budget n'est donné explicitement. Le silence sur ce point n'est pas une
  liberté totale : en mission réelle, tu proposerais toi-même une fourchette d'effort (en
  jours-homme) avec un ordre de grandeur de coût, que le client validerait ou contesterait.
  Dans ce niveau, cette proposition prend la forme de ton estimation en fourchette dans le
  Livrable 1 (`03-deliverables.md`).
- Échéance annoncée : "utilisable dans les deux mois". Cette formulation est délibérément
  ambiguë : elle ne précise ni la date de départ du décompte, ni ce que "utilisable" signifie
  concrètement (ouvert à tous les adhérents ? testé sur une seule salle pilote ? démonstration
  interne seulement ?).
- Fenêtre d'itération mentionnée : la "saison plus calme en été". C'est un signal que le
  client accepte, voire attend, un cycle de correction après un premier lancement en conditions
  réelles, pas un produit figé et parfait dès le jour 1.

## Ce qui est explicitement hors périmètre

- Le paiement en ligne des adhésions ou des cours (payé en salle, hors sujet du projet).
- La gestion de la comptabilité ou de la facturation de l'association elle-même.
- Un système de badges physiques ou de contrôle d'accès matériel (les salles gardent leur
  logiciel de caisse existant pour l'accès physique, ce projet gère seulement les créneaux et
  les réservations).
- Une application mobile native : un site web responsive suffit, aucune mention d'app store
  n'apparaît dans le brief ni dans les échanges ultérieurs.
- La migration automatique de l'historique de réservations passées : il n'existe pas, comme
  indiqué dans la section données existantes, donc rien à migrer sur ce point.

## Demandes tardives (à injecter en cours de projet)

Ces trois demandes n'apparaissent pas dans le message initial. Elles tombent à des moments
précis du projet, comme en situation réelle, et testent ta capacité à absorber un changement
sans reconstruire à chaque fois depuis zéro.

```text
J+12 (pendant le jalon Architecture)  : voir 05-changement-de-spec.md
                                         tarification differenciee par salle + creneaux
                                         recurrents
J+24 (apres le jalon Architecture)    : voir boss-fight.md
                                         une quatrieme salle rejoint le reseau, dans un
                                         fuseau horaire different
J+30 (pendant le jalon V1)            : demande du comite des coachs (voir ci-dessus),
                                         remontee tardivement par Amina : pouvoir bloquer
                                         un creneau pour maintenance du mur sans qu'il
                                         apparaisse comme un cours annule aux adherents
```

La troisième demande (J+30) n'a pas de fichier dédié dans ce niveau : elle teste ta capacité à
traiter un changement de périmètre mineur sans procédure formalisée, en le documentant
toi-même dans ton `TDD_JOURNAL.md` avec la même rigueur que les deux premières.

## Ce que ce brief contient vraiment

Lis-le une seconde fois. Il contient, mélangés sans hiérarchie explicite :

- Un besoin fonctionnel central non négociable : la réservation multi-salles avec compte
  partagé et comptage de capacité en temps réel (motivé par une contrainte de sécurité
  réelle, pas un confort).
- Un besoin secondaire explicitement dégradable : cours collectifs et prêt de matériel,
  que le client accepte de reporter.
- Une contrainte de délai floue ("dans les deux mois") sans définition de ce que signifie
  "utilisable".
- Une absence totale de contrainte budgétaire explicite, ce qui n'est pas une liberté totale
  mais un signal qu'il faudra proposer un cadrage toi-même.
- Un indice caché mais capital : "souci avec un contrôle des pompiers" signifie que le
  comptage de capacité n'est pas une fonctionnalité de confort, c'est une exigence de
  conformité que tu dois traiter avec la rigueur d'une contrainte légale, pas d'une feature
  parmi d'autres.
- Des intérêts contradictoires entre parties prenantes, non exprimés dans le message écrit
  mais réels dans la dynamique du projet, qui rendent certains arbitrages de périmètre
  politiquement sensibles en plus d'être techniquement complexes.

## Ce que tu dois produire avant de lire la suite

Avant d'ouvrir `03-deliverables.md`, écris pour toi-même, sur une feuille séparée :

1. Trois hypothèses explicites sur ce que "utilisable dans les deux mois" signifie pour ce
   client, classées par plausibilité.
2. La fonctionnalité que tu identifies comme non négociable, avec la phrase exacte du brief
   qui te le prouve.
3. Deux questions que tu poserais au client si tu avais un contact direct, et deux hypothèses
   de repli si le client ne répond pas à temps.
4. Une phrase sur la manière dont tu géreras la tension entre Karim (priorité à ses propres
   créneaux) et Sofia (visibilité partagée entre les trois salles) sans favoriser
   structurellement l'une des deux salles dans ton architecture.

Ce n'est pas un exercice de style. La qualité de ton découpage dans `challenge.md` dépendra
directement de la rigueur de ce travail préalable.

## Analogie

Analogie : un brief ambigu, c'est une commande criée à moitié pendant le service, et un ordre de mission reçu en mer avec une position approximative.
Où l'analogie casse : au passe tu peux faire répéter tout de suite, un client répond parfois trois jours plus tard.

## Ce que tu dois savoir défendre

- Pourquoi la mention du contrôle des pompiers change le niveau d'exigence attendu sur le
  comptage de capacité, par rapport à une fonctionnalité de confort classique.
- Pourquoi l'absence de budget explicite n'est pas une liberté sans contrainte, mais un
  signal qu'il te revient de proposer une structure de coût toi-même.
- Comment tu justifierais, face au client, de reporter les cours collectifs et le prêt de
  matériel à une deuxième phase sans donner l'impression de réduire ta prestation.
- Comment ton architecture évite de favoriser structurellement Bloc Sud (la salle la plus
  puissante politiquement) au détriment de Voie Haute (la plus fragile), alors que rien dans
  le brief écrit ne mentionne explicitement ce risque.
- Pourquoi l'absence de base légale claire pour le partage de données entre les trois
  structures juridiques est un risque à signaler avant le lancement, et pas un détail
  administratif à régler après coup.
