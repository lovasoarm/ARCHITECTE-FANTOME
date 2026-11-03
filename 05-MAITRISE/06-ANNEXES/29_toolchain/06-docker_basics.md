---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, changement_echelle]
anti_recipe_key: temps_limite+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Docker basics : containeriser une app node : dockerfile, compose, multi-stage builds

Temps de lecture ~9 min

"Ça marche chez moi" c'est la phrase la plus dangereuse du camp. le sniper teste son plan sur son terrain, ça marche. Il l'applique sur un autre terrain, ça foire, parce que le sol est différent, l'humidité est différente, les ressources dispo sont différentes. Docker réduit les différences d’environnement en décrivant une image et ses dépendances. Il améliore la reproductibilité, mais ne rend pas deux machines absolument identiques : le noyau, l’architecture CPU, les permissions, le réseau et les services externes peuvent encore changer le résultat.

---

## 1) LE CONCEPT : ISOLATION, PAS VIRTUALISATION COMPLÈTE

Erreur fréquente : penser qu'un container Docker c'est comme une machine virtuelle (VM). C'est faux, et la différence compte.

```text
MACHINE VIRTUELLE                    CONTAINER
------------------                    ---------
exécute un OS invité                  partage le noyau de l’OS hôte
virtualise le matériel                 isole des processus et ressources
démarrage généralement plus lourd     démarrage souvent plus léger
taille variable, souvent importante   taille variable, souvent plus petite
isolation par hyperviseur              isolation par mécanismes du noyau
```

Ces différences sont des tendances, pas des garanties de durée ou de taille. Aucune isolation n’est absolue : une mauvaise configuration, une faille du noyau ou de l’hyperviseur et des permissions excessives peuvent exposer l’hôte. Sur Windows et macOS, Docker Desktop utilise généralement une machine virtuelle Linux pour exécuter les conteneurs Linux : le conteneur ne partage donc pas directement le noyau Windows ou macOS.

```json
[MACHINE HÔTE]
  |
  +-- [Container 1] -- ton app Node, isolée
  +-- [Container 2] -- une base de données, isolée
  +-- [Container 3] -- un cache Redis, isolé

  (tous partagent le même kernel, mais chacun voit son propre filesystem,
   ses propres processus, son propre réseau)
```

**Technique :** un container utilise des fonctionnalités du noyau Linux (namespaces, cgroups) pour isoler un processus comme s'il tournait seul sur sa machine, sans le coût de virtualiser un OS entier. C'est pour ça que c'est rapide et léger comparé à une VM classique.

---

## 2) DOCKERFILE : LA RECETTE DE TON ENVIRONNEMENT

```dockerfile
# On part d'une image de base : Node déjà installé, version précise
# "alpine" = une distribution Linux minimaliste, très légère
FROM node:22.23.4-alpine

# Le dossier où tout va se passer DANS le container
WORKDIR /app

# On copie d'abord SEULEMENT les fichiers de dépendances
# (pas tout le code source pour l'instant, c'est volontaire, voir plus bas)
COPY package.json package-lock.json ./

# Installation des dépendances DANS le container
RUN npm ci

# MAINTENANT on copie le reste du code source
COPY . .

# Documente le port prévu dans le container ; ne publie pas le port à lui seul
EXPOSE 3000

# La commande qui démarre l'app quand le container se lance
CMD ["node", "src/index.js"]
```

```text
ordre des instructions dockerfile --> chaque ligne crée une "couche" (layer) en cache
si une couche n'a pas changé   --> Docker la réutilise, pas besoin de la refaire
```

**Pourquoi l'ordre compte (et pourquoi on copie les fichiers de dépendances AVANT le code) :**

```text
MAUVAIS ORDRE :
COPY . .       <-- copie tout, y compris le code qui change à CHAQUE commit
RUN npm ci       <-- cette étape se relance à CHAQUE build, même pour 1 ligne changée

BON ORDRE :
COPY package.json package-lock.json ./  <-- les deux manifestes changent rarement
RUN npm ci       <-- cette étape reste en cache tant que ces fichiers ne changent pas
COPY . .        <-- le code change souvent, mais cette étape est rapide
```

**Important :** `npm ci` a besoin d’un `package-lock.json` cohérent avec `package.json`. Le copier avant `npm ci` permet une installation reproductible.

**Publication du port :** `EXPOSE 3000` documente le port prévu dans le conteneur ; il ne démarre pas le serveur et ne publie pas le port vers ta machine. Pour publier le port, utilise par exemple `docker run -p 8080:3000 image` (port 8080 sur la machine → port 3000 dans le conteneur) ou la section `ports` de Compose. Le processus Node doit lui-même écouter sur le port 3000 et, pour recevoir des connexions venant de l’extérieur du conteneur, généralement sur `0.0.0.0` plutôt que seulement `127.0.0.1`.

**Qui casse en prod :** un mauvais ordre peut refaire l’installation des dépendances inutilement. Le temps exact dépend du cache, du réseau, de la taille du projet et de la machine ; ne promets pas un facteur d’accélération universel.

---

## 3) MULTI-STAGE BUILD : LE CAMP DE BASE VS LE CAMP D'EXPÉDITION

Tu as pas besoin d'emporter tout ton atelier de réparation en expédition. Juste l'outil fini. Un multi-stage build applique ce principe : utiliser une image complète (avec tous les outils de build) pour CONSTRUIRE l'app, puis ne garder que le résultat fini dans une image finale minimaliste.

```dockerfile
# ===== STAGE 1 : construction =====
FROM node:22.23.4-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# Cette étape produit un dossier /app/dist avec le code compilé/optimisé

# ===== STAGE 2 : exécution =====
FROM node:22.23.4-alpine AS runner
WORKDIR /app
# On copie SEULEMENT le résultat du build, pas les outils qui ont servi à le produire
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/index.js"]
```

```text
image avec UN SEUL stage (tout en un) --> contient outils de build + code source + node_modules dev
                      facilement 500 Mo à 1 Go

image avec multi-stage         --> contient SEULEMENT le code compilé + dépendances de prod
                      souvent 80-150 Mo
```

**Technique :** chaque `FROM` démarre un nouveau stage. `COPY --from=builder` ne transfère que les fichiers demandés. Le stage final ne reçoit donc pas automatiquement tous les outils ou fichiers du stage de construction. Vérifie toutefois ce que contient `dist` : des source maps ou des fichiers copiés par erreur peuvent encore révéler des éléments que tu ne voulais pas livrer.

**Qui casse en prod :** une image sans multi-stage qui embarque tout l'outillage de build, les `devDependencies`, le code source non compilé. Résultat : une image énorme, plus lente à déployer, avec une surface d'attaque (zone exploitable par un attaquant) plus grande, parce que plus d'outils présents = plus de vulnérabilités potentielles.

---

## 4) DOCKER COMPOSE : ORCHESTRER PLUSIEURS CONTAINERS ENSEMBLE

Une vraie app a rarement un seul container. Elle a une app, une base de données, peut-être un cache. Docker Compose décrit tout ce petit camp en un seul fichier. Attention : un `depends_on` court impose un ordre de démarrage, mais ne prouve pas que la base accepte déjà les connexions. Pour attendre un service prêt, ajoute un healthcheck et utilise la condition `service_healthy`.

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000" # port machine hôte : port container
    depends_on:
      db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgres://camp:secret@db:5432/survivants

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=camp
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=survivants
    volumes:
      - db_data:/var/lib/postgresql/data # persiste les données même si le container redémarre
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U camp -d survivants"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  db_data:
```

```js
// Une seule commande lance TOUT le camp en même temps :
// docker compose up
//
// app et db démarrent, dans le même réseau virtuel Docker,
// et "db" devient un nom d'hôte résolvable DEPUIS le container "app"
// (regarde DATABASE_URL : "db" est le nom du service, pas une IP en dur)
```

**Pourquoi ça compte :** sans Compose, il faudrait lancer chaque container manuellement, configurer le réseau à la main, gérer l'ordre de démarrage soi-même. Compose décrit tout ça de façon déclarative (tu décris l'état voulu, pas les étapes pour y arriver) et reproductible. Ici, `service_healthy` attend le succès du healthcheck de PostgreSQL. Ce contrôle de disponibilité reste minimal : l'application doit aussi gérer proprement une perte de connexion après le démarrage. Le mot de passe `secret` est une valeur fictive réservée au labo local ; ne la réutilise pas et ne la présente jamais comme une gestion de secret de production.

**Qui casse en prod :** un `depends_on` court sans healthcheck peut lancer l'application avant que la base accepte les connexions. Même avec `service_healthy`, une base peut tomber plus tard : le service applicatif doit toujours gérer les erreurs et les reconnexions selon une politique bornée.

---

## EXERCICES

EXO 1 : Le camp portable :
Containerise un petit serveur Node existant (ou crée-en un minimal avec Express) avec un Dockerfile respectant le bon ordre (dépendances avant code source). Build l'image, lance-la, vérifie qu'elle répond bien sur le port exposé.

EXO 2 : Le sac allégé :
Transforme ton Dockerfile en multi-stage build. Compare la taille de l'image finale avant/après avec `docker images`. Note la différence en pourcentage et explique en une phrase d'où vient le gain.

EXO 3 : Le camp complet :
Crée un `docker-compose.yml` qui lance ton app Node ET une base PostgreSQL (ou Redis) ensemble. Pour PostgreSQL, ajoute un healthcheck et utilise `depends_on` avec `condition: service_healthy`. Vérifie que l'app peut joindre la base par le nom du service, pas une IP en dur ; arrête ensuite la base pour observer comment l'app traite une perte de connexion.

---

## RÉSUMÉ

Docker isole au niveau processus, pas au niveau OS complet : c'est pour ça que c'est léger et rapide comparé à une VM. L'ordre des instructions dans un Dockerfile détermine ce qui reste en cache, donc la vitesse de chaque build. Le multi-stage build sépare la construction de l'exécution, pour une image finale minimaliste sans outils de build inutiles en prod. Docker Compose orchestre plusieurs containers ensemble de façon déclarative, avec un réseau et une résolution de noms automatiques entre services. "Ça marche chez moi" devient "ça marche partout pareil", point final.

<!-- AF-DIAGRAM:tooling -->

## Repère visuel utile : Outil reproductible pour l'équipe Kintana

```text
problème répétitif
       |
       v
solution native ?
   | oui       | non
   v           v
simple     outil évalué
               |
               v
version + tests + docs
               |
               v
usage reproductible
```

<!-- AF-LESSON-PROFILE: tooling -->

## Repères de décision

- **Pourquoi :** La toolchain et les outils de diagnostic réduisent les tâches répétitives et rendent le comportement du système visible.
- **Quand l’utiliser / quand l’éviter :** Choisis un outil quand il résout un problème fréquent et mesurable. Vérifie sa licence, sa maintenance, ses versions, ses permissions et son coût avant de l'ajouter.
- **Limites :** Un outil n'est pas une politique de qualité. Un benchmark, logger ou générateur peut donner une fausse confiance si son protocole et ses limites ne sont pas écrits.

## Mécanisme : la version sans magie

Décris le problème, compare l'outil à une commande native ou à une alternative plus simple, épingle sa version et vérifie le résultat qu'il produit.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Docker basics : containeriser une app node : dockerfile, compose, multi-stage builds** se rattache à ce cas concret : L'équipe Kintana doit pouvoir diagnostiquer une panne et refaire un build sans dépendre d'une configuration cachée sur le poste d'une seule personne.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Outil reproductible pour l'équipe Kintana

> **Arc Capsule Corp. / DBZ :** le bon outil accélère le diagnostic ; dix outils mal choisis ne font que déplacer le bazar.

**Mission liée à « Docker basics : containeriser une app node : dockerfile, compose, multi-stage builds » :** Automatise une opération récurrente du cycle Kintana (analyse, benchmark, log, build ou debug). Ajoute un mode dry-run si l'action est destructive et une vérification qui empêche l'outil de masquer une erreur.

**Livrable :** outil/script, README d'usage, tests sur succès/échec, version épinglée et comparaison au processus manuel.

**Critères d’acceptation :** les arguments sont validés ; les erreurs ont un code de sortie ; aucune donnée sensible n'est imprimée ; la même commande donne une sortie compréhensible et reproductible.

**Transfert obligatoire :** Exécute l'outil sur une autre machine ou avec une version différente. Documente les prérequis et le mode dégradé.
