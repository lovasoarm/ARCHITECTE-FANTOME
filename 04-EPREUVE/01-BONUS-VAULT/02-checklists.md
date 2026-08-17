# Checklists : mise en prod, revue, incident, sécurité, onboarding, passation

## Le piège

Une mise en prod du système de tournées de livraison se fait un jeudi après-midi sans
checklist, "parce qu'on connaît la procédure par cœur". Le job de migration de base tourne,
mais personne n'a vérifié que le job précédent (nettoyage de vieilles tournées) était bien
terminé : les deux se chevauchent, la table est verrouillée en plein import, trois chauffeurs
reçoivent des tournées vides le vendredi matin. Rien de nouveau ne s'est passé : c'est un
oubli déjà commis deux fois auparavant, jamais transformé en vérification systématique.

## Ce qui se passe vraiment

Une checklist n'existe pas pour compenser un manque de compétence. Elle existe parce que la
mémoire humaine sous pression ou sous routine oublie systématiquement les mêmes étapes,
indépendamment du niveau d'expertise : c'est un phénomène documenté dans tous les métiers à
forte charge cognitive (aviation, chirurgie), pas une spécificité du développement logiciel.

```text
Sans checklist                          Avec checklist
--------------------------              --------------------------
Chaque exécution redécouvre        -->    Chaque exécution vérifie les mêmes
les mêmes pièges, au hasard             points, dans le même ordre, sans
                                         dépendre de la mémoire du moment
```

Une checklist utile a trois propriétés : elle est courte (moins de 10 points, sinon elle est
ignorée sous pression), elle est vérifiable (chaque point a une réponse oui/non observable,
pas une impression), et elle est vivante (révisée après chaque incident qu'elle n'a pas
prévenu).

### Mise en prod

- [ ] Le changement a été testé sur un environnement représentatif du volume de production.
- [ ] Un plan de rollback existe et a été testé, pas seulement écrit.
- [ ] Aucun autre déploiement ou job planifié ne chevauche cette fenêtre.
- [ ] Les métriques à surveiller après déploiement sont identifiées à l'avance (pas
      découvertes après coup en cherchant quoi regarder).
- [ ] Une personne est explicitement responsable de surveiller les 30 minutes suivant le
      déploiement : pas "l'équipe" en général.
- [ ] Le déploiement a lieu à un horaire où une intervention rapide est possible en cas de
      problème (jamais un vendredi 17h sur un système critique).
- [ ] Les migrations de base de données ont été testées sur une copie de la volumétrie réelle,
      pas sur une base de développement vide.
- [ ] Un message de communication de mise en prod est prêt, à envoyer immédiatement en cas
      d'anomalie observée.

### Revue de code

- [ ] Je peux résumer l'intention du changement en une phrase avant de lire le diff ligne
      par ligne.
- [ ] Les cas limites du domaine métier précis sont couverts, pas seulement le chemin
      heureux.
- [ ] Les tests ajoutés échoueraient sur l'ancien code et passent sur le nouveau : vérifié,
      pas supposé.
- [ ] Aucune règle métier n'est dupliquée silencieusement à un autre endroit du code déjà
      existant.
- [ ] Je signale au moins un point précis, positif ou négatif : une revue qui approuve sans
      commentaire n'a souvent pas vraiment eu lieu.
- [ ] Le nommage des variables et fonctions reflète le vocabulaire métier du domaine, pas des
      termes techniques génériques qui obligent à deviner l'intention.
- [ ] Si le changement touche un chemin critique (paiement, sécurité, données personnelles),
      une deuxième personne a explicitement approuvé, pas seulement l'auteur du diff.

### Gestion d'incident

- [ ] L'impact utilisateur réel est mesuré avant de chercher la cause (qui est affecté,
      combien, depuis quand).
- [ ] Une communication de statut est envoyée aux parties prenantes avant d'avoir la
      solution complète : le silence pendant un incident coûte plus cher que l'incident lui-
      même en confiance.
- [ ] La priorité est donnée à limiter l'impact (rollback, feature flag) avant de comprendre
      la cause racine complète.
- [ ] Un post-mortem est planifié dans les 48h, pendant que les détails sont encore frais.
- [ ] Le post-mortem cherche des causes systémiques, pas un responsable individuel.
- [ ] Une personne assure explicitement le rôle de coordination pendant l'incident, distincte
      de la ou des personnes qui interviennent techniquement.
- [ ] Chaque action corrective décidée au post-mortem a un responsable nommé et une date,
      sinon elle ne sera jamais faite.

### Onboarding

- [ ] La personne a accès à tous les outils nécessaires avant son premier jour, pas
      découvert au fil de la première semaine.
- [ ] Une première tâche réelle mais à faible risque est identifiée à l'avance, livrable en
      2-3 jours, pour créer un premier cycle de feedback rapide.
- [ ] Un point de contact unique est désigné pour les questions, pas "toute l'équipe" par
      défaut : la diffusion de responsabilité réduit la probabilité qu'une question trouve
      une réponse.
- [ ] La documentation d'architecture existante est vérifiée à jour avant d'être partagée,
      une documentation obsolète est pire que l'absence de documentation.
- [ ] Un point de suivi à 2 semaines et à 6 semaines est planifié à l'avance, pas improvisé
      si un problème survient.

### Revue de sécurité minimale

- [ ] Toute entrée utilisateur (formulaire, paramètre d'URL, en-tête, fichier importé) est
      validée côté serveur, pas seulement côté client.
- [ ] Aucun secret (clé API, mot de passe, jeton) n'apparaît en clair dans le code source ou
      l'historique de commits : vérifié par une recherche, pas supposé absent.
- [ ] Les droits d'accès aux données sont vérifiés au niveau de chaque endpoint, pas
      seulement dans l'interface qui les appelle.
- [ ] Les dépendances tierces du projet ont été vérifiées contre les vulnérabilités connues
      (audit automatique) dans les 30 derniers jours.
- [ ] Les messages d'erreur renvoyés à l'utilisateur ne révèlent pas de détail d'implémentation
      exploitable (chemin de fichier, requête SQL, version de librairie).
- [ ] Les données personnelles ou sensibles sont chiffrées au repos et en transit, pas
      seulement l'une des deux.
- [ ] Un journal d'audit existe pour les actions sensibles (suppression, changement de droits,
      export de données), avec l'identité de l'auteur et l'horodatage.

### Passation (départ ou changement de rôle)

- [ ] La liste des accès de la personne (comptes, secrets, dépôts, environnements) est
      recensée avant son départ, pas reconstituée après coup dans l'urgence.
- [ ] Chaque accès listé est explicitement révoqué ou transféré, avec une date de revue à 30
      jours pour vérifier qu'aucun oubli ne subsiste.
- [ ] Les connaissances non écrites (pourquoi telle décision d'architecture, quel système est
      fragile, quel client demande un traitement particulier) sont capturées dans un document
      avant le dernier jour, pas dans la mémoire de la personne qui part.
- [ ] Un successeur ou un responsable temporaire est nommé pour chaque responsabilité tenue
      par la personne, avant son départ effectif.
- [ ] Les mots de passe partagés ou secrets connus de la personne sont changés, même si la
      séparation est amiable.
- [ ] Un entretien de sortie recueille explicitement ce qui n'a jamais été documenté ailleurs :
      raccourcis pris sous pression, dette technique connue, systèmes redoutés par l'équipe.

## Grille de revue à froid d'une checklist

Une fois par trimestre, ou juste après un incident qu'une checklist n'a pas empêché, passe
chaque checklist utilisée dans cette grille :

| Question | Signal que la checklist a un problème |
| --- | --- |
| Combien de points a-t-elle ? | Plus de 10 : elle sera lue en diagonale sous pression |
| Chaque point a-t-il une réponse oui/non observable ? | Un point du type "vérifier que tout va bien" n'est pas vérifiable |
| A-t-elle été mise à jour après le dernier incident du même type ? | Non : elle donne une fausse sécurité |
| Est-elle suivie de mémoire ou réellement relue à chaque usage ? | De mémoire : elle a cessé de remplir sa fonction |

## Compromis

| Option                                              | Coût                               | Bénéfice                                                          | Quand choisir                                                                            |
| --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Pas de checklist, confiance dans l'expérience       | Zéro coût de maintenance           | Rapide sur les cas triviaux, mais répète les mêmes oublis         | Jamais sur un moment à fort enjeu ou irréversible                                        |
| Checklist rigide, jamais mise à jour                | Coût de rédaction initial          | Fausse sécurité si elle ne reflète plus la réalité du système     | À éviter : une checklist doit être révisée après chaque incident qu'elle n'a pas prévenu |
| Checklist courte et vivante, révisée après incident | Discipline de mise à jour continue | Vérification systématique des vrais points de rupture historiques | Approche par défaut recommandée pour les quatre moments listés ici                       |

## Pièges classiques

- **La checklist qu'on suit de mémoire sans la relire.** Symptôme : les mêmes deux ou trois
  points sont systématiquement oubliés, toujours les mêmes.
- **Une checklist trop longue pour être suivie sous pression.** Symptôme : elle est ignorée
  entièrement dès qu'un incident réel survient, parce que personne n'a le temps de la lire
  en entier.
- **Une checklist jamais mise à jour après un incident qu'elle n'a pas empêché.** Symptôme :
  le même type d'incident se reproduit à l'identique un an plus tard.
- **Confondre checklist et documentation d'architecture.** Symptôme : la checklist devient un
  document de 15 pages que plus personne ne lit avant une mise en prod urgente.
- **Cocher les cases sans exécuter réellement la vérification.** Symptôme : la case "plan de
  rollback testé" est cochée alors que le rollback n'a jamais été exécuté une seule fois.

## Analogie

Analogie : une checklist, c'est la vérification avant appareillage, et le contrôle des sécurités avant de lancer une machine d'atelier.
Où l'analogie casse : la machine s'arrête si la sécurité manque ; ta mise en prod, elle, part quand même.

## Ce que tu dois savoir défendre

- Explique pourquoi une checklist compense un phénomène cognitif universel et non un manque
  de compétence individuelle.
- Donne un exemple d'incident réel (vécu ou documenté) que l'une de ces checklists aurait
  empêché, et le point précis qui aurait été vérifié.
- Explique pourquoi une checklist non mise à jour après un incident devient une fausse
  sécurité.

## Ce que tu emportes

Six checklists prêtes à coller dans un outil de tickets ou de mise en prod, et une grille
de revue à froid pour éviter qu'elles deviennent des rituels vides. Règle simple à retenir :
une checklist qui dépasse dix points ou qui n'a pas changé depuis un an mérite d'être
questionnée avant d'être suivie une fois de plus.
