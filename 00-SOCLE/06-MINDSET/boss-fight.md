# Boss fight : Un lead conteste ton choix en réunion

## Contrainte de temps

```text
CONTRAINTE DE TEMPS
Reflexion + reponse ecrite : 25 min chrono
Au-dela : tu notes ou tu en etais a 25 min, et tu evalues CETTE
version-la. La version finie compte pour ta progression, pas pour
ta note.
```

## Règle d'antériorité (obligatoire)

Écris ta réponse complète dans ton `JOURNAL.md`, horodatée à la minute, AVANT de faire
défiler jusqu'à la grille d'évaluation. La grille est volontairement placée en fin de
fichier.

Si ton horodatage est postérieur à ta première lecture de la grille, ce boss-fight vaut 0,
quelle que soit la qualité de ta réponse. Tu ne triches pas contre un correcteur : tu
triches contre le seul entraînement à la pression que ce niveau te propose.

## Mise en situation (avant la vraie scène)

Konoha, salle de mission. Kakashi étale la carte : "Naruto, ton plan attaque tout de suite,
sans éclaireur. La dernière fois qu'on a fait ça, on a perdu deux hommes dans une embuscade."
Naruto répond que la mission presse et que sonder le terrain fera perdre l'effet de surprise.
Kakashi ne cède pas sur le principe, mais admet que le temps manque vraiment cette fois.
Ce n'est pas un désaccord d'ego : c'est une expérience passée qui pèse contre une urgence réelle.
Retiens cette tension : c'est exactement celle que tu vas devoir gérer ci-dessous, sans ninjas
mais avec un ADR.

## La scène

Tu présentes ton ADR (celui du challenge, ou un choix réel sur ton projet fil rouge) en
réunion d'équipe. Tu as choisi de stocker l'historique des statuts d'une tournée de
livraison (créée, en préparation, en route, livrée, incident) sous forme d'une seule colonne
`statut_actuel` mise à jour à chaque changement, plutôt que sous forme d'une table
d'événements append-only qui garderait chaque transition.

Un lead technique, présent pour la première fois à une réunion sur ce projet, t'interrompt :

> "Je ne comprends pas pourquoi vous ne gardez pas l'historique complet dès le départ. Ça
> coûte trois fois rien à l'écriture, et le jour où le service client demande 'pourquoi cette
> livraison a mis quatre heures de plus que prévu', vous n'aurez rien à leur montrer. On a eu
> exactement ce problème sur un projet précédent, et on l'a payé cher six mois après."

Il n'est pas hostile, mais il est catégorique, et il a une expérience concrète derrière son
objection. La salle attend ta réponse. Tu ne peux pas répondre "on verra plus tard" : c'est
une réunion de décision, pas de brainstorming.

## Ce qu'on attend de toi

Rédige, comme si tu répondais en réunion puis par écrit dans l'ADR mis à jour, une réponse
qui :

- ne rejette pas l'objection sans l'avoir réellement pesée (le lead a raison sur un point
  précis : lequel ?) ;
- ne cède pas non plus immédiatement par confort social : si ta décision reste défendable
  compte tenu du contexte réel du projet, dis-le et explique pourquoi son expérience
  précédente ne s'applique pas forcément telle quelle ici ;
- s'appuie sur des faits vérifiables du projet (volume attendu, contraintes de délai,
  compétences de l'équipe) plutôt que sur une préférence esthétique pour l'une ou l'autre
  architecture ;
- propose, si pertinent, un compromis à coût mesuré plutôt qu'un choix binaire : par exemple
  une dette volontaire documentée avec un seuil de migration explicite (leçon 03).

Livre un court texte (une demi-page) qui pourrait être ajouté tel quel à la section
"Conséquences" ou "Options considérées" de ton ADR pour montrer que l'objection a été prise
en compte, pas juste survolée.

## Partie orale (obligatoire)

Une fois le texte écrit rendu, enregistre-toi en audio ou vidéo pendant 3 minutes maximum,
répondant à voix haute à l'objection du lead comme si tu étais réellement en situation :
sans lire ton texte mot à mot, sans notes au-delà d'un post-it de mots-clés. Réécoute
l'enregistrement une seule fois et note toi-même, avant toute relecture externe, un point
où ta réponse orale était plus faible que ta réponse écrite.

## Second tour : la réplique

Ton texte est rendu. Le lead ne s'arrête pas là. Trois répliques probables, selon ce que tu as
répondu :

1. Si tu as reconnu son point mais maintenu ta décision : *"D'accord, mais qui va se souvenir
   dans six mois qu'il y avait un seuil de migration ? Ce genre de note se perd toujours."*
2. Si tu as cédé et proposé de tout migrer vers une table d'événements tout de suite : *"Tu es
   sûr ? Il y a cinq minutes tu m'expliquais pourquoi ce n'était pas la priorité. Qu'est-ce qui
   a changé, à part que j'ai insisté ?"*
3. Si tu as donné un seuil chiffré : *"Ce chiffre, tu l'as sorti d'où, là, tout de suite ? Ou il
   était déjà dans ton analyse avant que je pose la question ?"*

**Critère de notation ajouté : tenue de position ou changement d'avis justifié.** Réponds à ce
second tour par écrit (5 lignes maximum). Est-ce que tu tiens ta position avec un nouvel
argument, ou changes-tu d'avis avec une raison précise et nouvelle ? Un changement d'avis motivé
uniquement par la pression du second tour, sans fait nouveau, est traité comme un échec de ce
critère.

## Ce que tu dois savoir défendre

1. Explique pourquoi "cette solution a causé un problème sur un autre projet" n'est ni une
   preuve qu'elle en causera un ici, ni une raison de l'ignorer.
2. Donne un seuil chiffré concret (volume de tournées, fréquence de demandes du service
   client) qui, s'il était dépassé, justifierait de migrer vers une table d'événements.
3. Explique la différence entre céder à une objection parce qu'elle est fondée et céder à une
   objection parce qu'elle est exprimée avec assurance.

---

*Ne fais défiler au-delà de cette ligne qu'une fois ta réponse écrite et horodatée.*

## Grille d'évaluation

| Critère                                      | Ce qui est évalué                                                                                                                                                        | Échec typique                                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Reconnaissance du point valide               | Le texte identifie précisément ce que le lead a raison de signaler (perte d'information si un jour un historique fin est nécessaire)                                     | Réponse défensive qui ignore l'objection ou la caricature                                                               |
| Distinction contexte / généralité            | Le texte explique pourquoi l'expérience du lead sur un autre projet ne se transpose pas automatiquement (volume différent, besoin métier différent, délai différent)     | Le texte traite l'analogie comme automatiquement valide ou automatiquement invalide sans l'examiner                     |
| Fondation sur des faits, pas des préférences | Le texte cite au moins un élément vérifiable du projet réel (volume de tournées/jour, fréquence des demandes du service client, délai de livraison de la fonctionnalité) | Le texte reste au niveau des principes généraux ("la simplicité c'est important") sans jamais toucher au projet concret |
| Réversibilité explicite                      | Le texte propose un seuil ou un signal observable qui déclencherait la migration vers une table d'événements, si le choix actuel est maintenu                            | Le choix est présenté comme définitif et fermé, sans condition de révision                                              |
| Absence de céder par confort social          | Si la décision initiale reste justifiée compte tenu du contexte, le texte le dit clairement sans se rétracter juste parce que le lead est catégorique                    | Le texte change de position uniquement à cause du ton assuré de l'interlocuteur, sans nouvel argument                   |
| Longueur et densité                          | Le texte tient dans environ 200 mots, sans détour                                                                                                                        | Réponse diluée qui noie l'argument dans des formules de politesse                                                       |
| Justesse à l'oral sous contrainte de temps, sans texte préparé lu mot à mot | La réponse orale tient la même logique que le texte écrit, sans relecture mot à mot, dans le temps imparti | La réponse orale est un résumé appauvri du texte, ou dépasse largement les 3 minutes |
| Grimoire : « Dette volontaire » ([./grimoire.md](grimoire.md)) | Le seuil de migration proposé correspond à une dette volontaire réellement écrite (raccourci + signal de remboursement daté), pas une vague promesse | Aucun signal de remboursement explicite n'est fourni |
| Grimoire : « Hypothèse testable » ([./grimoire.md](grimoire.md)) | Le seuil chiffré proposé est formulé comme une hypothèse testable, avec un seuil vérifiable | Le seuil reste flou ou non mesurable |
| Grimoire : « Asymétrie des erreurs » ([./grimoire.md](grimoire.md)) | Le texte compare le coût de construire à tort et de ne pas construire à tort avant de trancher | Le texte ignore que les deux sens d'erreur n'ont pas le même coût |
| Tenue de position ou changement d'avis justifié | Au second tour, la réponse tient bon avec un nouvel argument ou change d'avis pour une raison nouvelle et nommée | La position change uniquement parce que le lead insiste une deuxième fois |

## Seuil de validation chiffré

| Critère | Points |
| --- | --- |
| Reconnaissance du point valide | 20 |
| Distinction contexte / généralité | 15 |
| Fondation sur des faits, pas des préférences | 15 |
| Réversibilité explicite | 15 |
| Absence de céder par confort social | 25 |
| Longueur et densité | 10 |
| Justesse à l'oral sous contrainte | 20 |
| Grimoire : Dette volontaire | 10 |
| Grimoire : Hypothèse testable | 10 |
| Grimoire : Asymétrie des erreurs | 10 |
| Tenue de position ou changement d'avis justifié | 15 |
| **Total** | **165** |

```text
< 50 % du total   --> boss-fight non valide, la scène est a refaire apres relecture de la lecon concernee
50-69 % du total  --> valide avec reserve, identifie le critere le plus faible avant de le compter comme acquis
70-89 % du total  --> valide, le reflexe est en place
90-100 % du total --> valide avec excellence, ce niveau de justesse est celui attendu en situation reelle
```

Seuil de passage : 116/165 (environ 70 %). En dessous, le niveau n'est pas considéré comme acquis, même si le
texte rendu est bien écrit.

**Éliminatoire :** Si "Absence de céder par confort social" est noté en dessous de 10/25, le total est plafonné à 91/165 quel que soit le reste : céder à une objection uniquement parce qu'elle est exprimée avec assurance annule la valeur de tout raisonnement par ailleurs correct.
