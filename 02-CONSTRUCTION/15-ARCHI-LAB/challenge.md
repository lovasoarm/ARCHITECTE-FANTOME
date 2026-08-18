# Challenge : Refactorer un système couplé en modules sains

## Contexte

Reprends (ou crée si tu n'en as pas déjà un) un projet concret : la gestion de créneaux d'un
cabinet vétérinaire, avec au minimum ces fonctionnalités : création d'un rendez-vous,
vérification de disponibilité, calcul du prix selon le type de consultation, envoi d'une
confirmation, et mise à jour du stock de vaccins si l'acte en consomme un. Écris-le d'abord
volontairement de façon couplée : tout dans un seul fichier de traitement de la requête,
exactement comme dans la scène du niveau. Cette étape n'est pas optionnelle : tu dois avoir
sous les yeux le problème réel avant de le corriger, sinon le refactoring suivant restera un
exercice théorique sans valeur d'apprentissage.

## Livrable

1. Une version "couplée" du système (peut être minimale, 150-300 lignes suffisent), avec un
   commit ou une copie clairement identifiée comme point de départ.
2. Une version refactorée qui respecte les 4 couches (UI, cas d'usage, domaine, infra), avec
   inversion de dépendance entre le domaine et l'infra (au moins une interface de repository).
3. Un fichier `DECISIONS.md` qui documente, pour chaque module créé : sa responsabilité
   unique en une phrase, ce dont il dépend, ce qui en dépend.
4. Une suite de tests qui prouve que les règles métier (disponibilité, calcul de prix) se
   testent sans base de données ni serveur HTTP démarré.
5. Un paragraphe qui identifie explicitement la source de vérité du stock de vaccins, et ce
   qui se passe si deux rendez-vous consomment le dernier vaccin en stock au même instant.

## Critères de réussite mesurables

- Zéro import direct d'un détail d'infrastructure (SQL, client HTTP, etc.) dans le dossier
  domaine : vérifiable par une recherche de texte (`grep`) qui doit retourner zéro résultat.
- Les tests des règles métier s'exécutent en moins d'une seconde, sans dépendance externe
  démarrée (pas de Docker, pas de vraie base).
- Le graphe de dépendances entre modules (traçable à la main ou avec un outil comme
  `dependency-cruiser`) ne contient aucun cycle.
- Ajouter un deuxième canal d'entrée (par exemple, une commande CLI qui crée un rendez-vous)
  ne nécessite de créer qu'un nouveau fichier dans la couche UI, sans modifier le domaine ni
  le cas d'usage : teste-le réellement, ne te contente pas de l'affirmer.
- `DECISIONS.md` répond, pour chaque module, à la question "si je supprime ce module et le
  remplace par un autre respectant la même interface, combien d'autres fichiers dois-je
  modifier ?" avec une réponse chiffrée, pas une estimation vague.

## Ce que ce challenge ne demande pas

Il ne demande pas d'utiliser un framework précis, ni de respecter à la lettre un pattern
nommé (Clean Architecture, Hexagonal...). Il demande de prouver, par du code qui tourne et des
tests qui passent, que tu maîtrises les forces sous-jacentes vues dans ce niveau. Un
"Hexagonal Architecture" mal compris et mal appliqué ne vaut rien de plus qu'un fichier
couplé : c'est le comportement du code face au changement qui compte, pas le nom du pattern
affiché dans le README.

## Livrable additionnel : arbitrer sans adversaire

Écris **deux ADR opposés, également défendables**, sur la même décision de frontière de ton
projet fil rouge (par exemple : garder le module dans le processus, ou l'extraire en service).
Contraintes : même contexte, mêmes contraintes connues, aucune option volontairement affaiblie.
Chacun doit contenir ses conséquences négatives réelles ; un lecteur neutre doit hésiter.

Puis ajoute **10 lignes qui tranchent** : la décision retenue, le critère qui a fait la
différence, et la valeur observable de ce critère aujourd'hui sur ton projet (nombre de
déploiements couplés, taille de l'équipe, budget de latence, coût de la compensation). Nomme
explicitement ce qui te ferait rouvrir la décision.

Ce qui invalide cette partie : un ADR « épouvantail » écrit pour perdre, ou un critère
d'arbitrage non mesurable (« c'est plus propre », « c'est plus moderne »).

## Durée cible

10 h, égal à la durée de ce niveau dans [CURRICULUM.md](../../06-ANNEXES-TRANSVERSES/03-CURRICULUM-HISTORIQUE.md). Si tu dépasses
largement ce budget, c'est un signal à noter dans ta rétrospective de bloc, pas une raison
de bâcler la fin du livrable.

## Horodatage

En tête de ton livrable, note deux dates à la minute : le moment où tu as écrit la première
ligne, le moment où tu as écrit la dernière. Note aussi si tu avais déjà commencé à imaginer
la solution avant la première date. Cette dernière mention n'est pas une confession : c'est la
seule façon de savoir, plus tard, si ce document a orienté ta décision ou s'il l'a maquillée
après coup.
