# 03 : REPRISE, RPO, RTO ET LA SAUVEGARDE QU'ON N'A JAMAIS RESTAURÉE

Temps de lecture ~11 min

Une sauvegarde jamais restaurée n'est pas une sauvegarde : c'est un fichier. Cette leçon te fait mesurer, chronomètre en main, le temps réel de retour au service, et écrire les deux nombres que tout comité de direction comprend.

## 1. LES DEUX NOMBRES, ET CE QU'ILS COÛTENT

- **RPO** (Recovery Point Objective) : combien de données tu acceptes de perdre. Se mesure en minutes de travail utilisateur.
- **RTO** (Recovery Time Objective) : combien de temps le service peut rester indisponible. Se mesure au chronomètre.

```
                incident
    ----|-----------|-----------|---->
     dernière     panne      service
     sauvegarde              rétabli
        <--RPO-->   <----RTO---->
```

| RPO visé | Mécanisme nécessaire | Effet sur la facture |
| --- | --- | --- |
| 24 h | sauvegarde quotidienne | quasi nul |
| 15 min | sauvegarde incrémentale fréquente | modéré |
| < 1 min | réplication synchrone | fort, et latence d'écriture accrue |

Le troisième palier n'est pas une meilleure version du premier : c'est un autre budget et une autre complexité. Le choix se justifie par la valeur des données perdues, pas par le confort.

## 2. LE TEST DE RESTAURATION, LE SEUL QUI COMPTE

Protocole, à rejouer une fois par trimestre :

1. Annonce l'exercice et lance le chronomètre.
2. Restaure depuis la sauvegarde la plus récente, sur un environnement vierge.
3. Arrête le chronomètre à la première requête utilisateur qui répond correctement, pas au message "restauration terminée".
4. Note l'écart entre le RTO annoncé et le RTO mesuré. Cet écart est ton vrai risque.

```js
// qui casse : la sauvegarde qui tourne, et qui écrit un fichier vide depuis six semaines
cron("0 3 * * *", () => sauvegarder(db)); // aucune vérification de taille, aucune alerte
```

```js
// réaliste : on vérifie que la sauvegarde est plausible, sinon on alerte
const taille = await sauvegarder(db);
if (taille < 0.8 * tailleAttendue) page("sauvegarde suspecte, volume anormal");
```

Intuition : un extincteur accroché au mur rassure. Un extincteur dont personne n'a jamais vérifié la pression rassure tout autant, et c'est exactement le problème.

## 3. LE PLAN DE REPRISE, EN UNE PAGE

Quatre blocs, écrits avant l'incident :

1. **Ce qu'on restaure en premier** : le parcours utilisateur minimal, pas le système entier.
2. **Dans quel ordre** : dépendances d'abord, façade ensuite, tâches de fond en dernier.
3. **Ce qu'on accepte de perdre** : nommé explicitement, avec la personne qui a validé cette perte.
4. **Comment on prévient les utilisateurs** : le message est pré-écrit, parce qu'on écrit mal sous pression.

## 4. LES DÉPENDANCES QU'ON OUBLIE TOUJOURS

- Le DNS et les certificats : expirés pendant l'incident, ils doublent le RTO.
- Les secrets : si le gestionnaire de secrets est dans la zone tombée, tu ne redémarres rien.
- Les migrations de schéma : une restauration ancienne restaurée sur un code récent échoue en silence.
- Les fichiers hors base : le stockage objet a-t-il la même politique de sauvegarde que la base ?

Risque réel : le RTO mesuré en conditions idéales, sur un environnement où les secrets sont déjà présents, ment d'un facteur deux à cinq. Le seul chiffre honnête vient d'une restauration à partir de rien.

## 5. EXERCICES

**Exercice 1 : le chrono (40 min).** Restaure ton projet fil rouge depuis sa dernière sauvegarde, sur un environnement neuf. Note l'heure de départ, l'heure de première réponse correcte, et chaque blocage rencontré. Ce journal vaut plus que le nombre final.

**Exercice 2 : les deux nombres écrits (10 min).** Écris ton RPO et ton RTO dans le fichier `SLO.md` de ton projet, avec la date du test et l'écart mesuré. Un RTO sans date de test est une estimation, et l'exercice de la ligne précédente le démontre à chaque fois.

**Exercice 3 : la liste des oublis (15 min).** Reprends la section 4 et vérifie chaque point sur ton projet. Pour chaque point non couvert, écris la ligne d'action et sa date.

## RÉSUMÉ

Le RPO se paie en mécanisme de sauvegarde, le RTO se mesure au chronomètre et jamais autrement. Une sauvegarde non restaurée est un fichier d'espoir. Le plan de reprise se limite au parcours minimal, dans un ordre écrit, avec un message utilisateur pré-rédigé. Les dépendances oubliées, DNS, secrets, migrations, fichiers, sont ce qui transforme un RTO de 40 minutes en une nuit blanche.

## ET APRÈS

Mieux vaut souvent dégrader que tomber : [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md).
