---
stability: stable
acte: comprendre
---

# FIXTURE : MEMORY HUNTER

Temps de lecture ~2 min

Une seule fixture est fournie. Elle montre une closure qui conserve un `Buffer` parce qu'elle reste dans le tableau `listeners` après éviction de son entrée de Map. Ce tableau est un registre de callbacks ordinaire, pas un `EventEmitter` : la fixture illustre la famille « closure retenue » ; le vrai cas `.on()` sans retrait doit être construit séparément. Les quatre autres familles du projet sont à construire dans `../src/` ; elles ne sont pas cachées dans ce fichier.

## Ce que tu as

- `00_leaky.js` : script instrumenté qui affiche `rss / heapUsed / external / arrayBuffers / cache size / listeners count` à chaque tick nominal d'environ une seconde. Il contient volontairement une rétention. Son exécution s'arrête automatiquement après 20 ticks (environ 20 secondes) et alloue au maximum 20 buffers de 1 Mio (20 MiB de payload), afin de limiter l'impact sur ta machine.

## Ta mission (3 étapes, dans l'ordre)

### Étape 1 : Observer sans modifier le code

Depuis ce dossier, lance la commande facultative :

```bash
node --expose-gc --inspect 00_leaky.js
```

Le script s'arrête seul après 20 secondes. Tu peux l'interrompre avant avec `Ctrl+C`. N'augmente pas `MAX_TICKS`, `BUFFER_BYTES` ou le nombre d'allocations. Note les mesures aux ticks 5, 10, 15 et 20 dans un rapport :

- `rss`, `heapUsed`, `external` et `arrayBuffers` ;
- taille de la Map ;
- nombre de listeners conservés.

Question : la taille de la Map reste-t-elle bornée alors que le nombre de listeners augmente ? Quelle référence garde les buffers accessibles ?

### Étape 2 : Snapshot chirurgical

Suis le protocole de `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc/06-heap_snapshot_hands_on.md`. Prends un snapshot pendant la période bornée, par exemple vers le tick 5 puis vers le tick 20, avec le même environnement et la même méthode. Compare les chemins de rétention. Un snapshot isolé ou un chiffre RSS isolé ne suffit pas à conclure.

### Étape 3 : Fix + preuve

Dans ta copie de travail, crée une version corrigée sous `src/` ou dans ton dépôt d'exercice. Retire la closure de `listeners` lorsque l'entrée correspondante est évincée, ou remplace le mécanisme par un cycle de vie qui libère explicitement cette référence ; compare ensuite les mêmes indicateurs avec le même protocole. Vérifie aussi que l'éviction et les autres comportements fonctionnels restent corrects.

## Livrable de cette fixture

Ajoute ce cas comme l'un de tes cinq rapports, avec :

- les mesures aux quatre ticks ;
- le chemin de rétention identifié ;
- le diff de correction ;
- les contrôles fonctionnels après correction ;
- les limites de la mesure.

Le seuil RSS `< 50 MB` n'est pas un critère universel : conclus à partir du chemin de rétention, des références conservées, des mesures comparables et de leurs limites.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [`00_leaky.js`](00_leaky.js)

<!-- CONTENU-DOSSIER:fin -->
