---
perishability_id: PER-0085

stability: perissable
acte: comprendre
last_reviewed: 2026-11-03
source_verified_on: "2026-11-03"
freshness_status: "verified_current"
source_url: https://github.com/nodejs/Release
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Calendrier officiel Node.js consulté le 3 novembre 2026 : 22.x Maintenance LTS, 24.x Maintenance LTS, 26.x Active LTS, 27.x Alpha ; dates de fin de vie sous réserve de changement. Ne valide pas l’exécution des projets ni l’installation multi-plateforme."
provenance_note: "V6.4, 2026-11-03 : vérification limitée au périmètre décrit. Aucun contrôle indépendant de l'application ni des snippets locaux n'est impliqué."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "NODE_RELEASE_BRANCH_STATUSES_AND_EOL_DATES_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# NODE_VERSION.md : Politique de version Node (visible apprenant)

Temps de lecture ~2 min

Cette page pédagogique est conservée dans les annexes ; le fichier technique
`.nvmrc` reste à la racine. Il est **explicitement visible** dans le dépôt :
c'est une source de reproductibilité et un support d'apprentissage, pas un artefact caché.

## Règle simple

> Node.js 22.23.4 a été publié le 21 octobre 2026 comme mise à jour de sécurité. AF conserve **22.23.4** comme pin reproductible ; ce choix n’en fait pas la branche LTS la plus récente. Voir les [notes officielles de Node.js 22.23.4](https://nodejs.org/en/blog/release/v22.23.4).

- Cible reproductible du curriculum : **Node 22 LTS (22.23.4 pour la reproductibilité AF)** (`.nvmrc` = `22.23.4`).
- Référence exacte de reproductibilité : **Node 22.23.4** (`.nvmrc`). Une autre version de Node 22.x n’est pas réputée validée pour l’ensemble du corpus sans exécution distincte des tests concernés.
- Support officiel distinct au **3 novembre 2026**, selon le [calendrier du groupe Release Node.js](https://github.com/nodejs/Release#release-schedule) : Node 22.x est en **Maintenance LTS** (fin de support annoncée le 30 avril 2027) ; Node 24.x est en **Maintenance LTS** (fin de support annoncée le 30 avril 2028) ; Node 26.x est en **Active LTS** depuis le 28 octobre 2026 (fin de support annoncée le 30 avril 2029) ; Node 27.x est en phase **Alpha** ; la première publication 27.0.0-alpha.0.0.0 affichée au blog officiel date du 29 octobre 2026. Le calendrier est susceptible d’évoluer. Le pin 22.23.4 reste la référence reproductible d'AF, mais il n'est ni la ligne LTS la plus récente ni une déclaration de compatibilité avec Node 24/26. Les dates du calendrier sont susceptibles d'évoluer.
- Toute migration vers une autre ligne, notamment Node 26 (Active LTS) ou Node 24 (Maintenance LTS), exige une revue de compatibilité et l'exécution des contrôles concernés avant de remplacer le pin.
- Formulation à retenir : _« le curriculum utilise Node 22.23.4 comme référence reproductible ; une autre version exige une vérification de compatibilité distincte. »_

La politique de version externe évolue. La version canonique du curriculum reste volontairement indépendante de la LTS la plus récente tant qu’une bascule n’est pas validée. Cette page doit être relue selon le registre de rigueur et sa date de péremption.

## Matrice de version : état documentaire vérifié le 3 novembre 2026

- **Version épinglée / référence reproductible :** Node.js `22.23.4` ; `.nvmrc` est conservé à cette valeur.
- **Portée de cette page :** elle décrit le choix de version du curriculum et la procédure d'installation. La présence de `22.23.4` dans `.nvmrc` ne prouve pas que les projets ont été exécutés avec ce runtime ; `node --version` vérifie uniquement le runtime actuellement sélectionné.
- **État des branches Node au 3 novembre 2026 :** Node 22.x = Maintenance LTS (fin de support annoncée le 30 avril 2027) ; Node 24.x = Maintenance LTS (fin de support annoncée le 30 avril 2028) ; Node 26.x = Active LTS depuis le 28 octobre 2026 (fin de support annoncée le 30 avril 2029) ; Node 27.x = Alpha (première publication affichée : 29 octobre 2026). Au 3 novembre 2026, les dernières versions affichées sur le blog officiel sont **24.22.2** (28 octobre) et **26.13.0** (28 octobre) ; la publication de sécurité **22.23.4** date du 21 octobre. 26.x est désormais Active LTS ; 24.x et 22.x sont Maintenance LTS. Node 20 est en fin de vie depuis le 30 avril 2026. AF ne déduit aucune compatibilité des projets avec une branche qui n'a pas été testée. [Calendrier officiel du groupe Release](https://github.com/nodejs/Release#release-schedule) ; [historique et notes de version officielles](https://github.com/nodejs/node/releases) ; [notes de release Node 22.23.4](https://nodejs.org/en/blog/release/v22.23.4).
- **Procédure locale :** avec nvm (macOS/Linux), place-toi à la racine du dépôt puis exécute `nvm install` et `nvm use` ; ces commandes lisent `.nvmrc`. Avec nvm-windows, installe et sélectionne explicitement `22.23.4` selon la version de nvm-windows utilisée. `node --version` doit alors afficher `v22.23.4`.
- **Règle de matrice :** la valeur de `.nvmrc` fixe une référence commune ; elle n'est pas une déclaration de compatibilité multi-version, ni une preuve que les activités ont été exécutées. Toute migration de version doit faire l'objet d'une mise à jour coordonnée des consignes et d'une validation adaptée au périmètre visé.

## Pourquoi c'est ecrit ici (et pas seulement dans un README)

Un apprenant qui ouvre `.nvmrc` doit pouvoir comprendre a quoi il sert.
Detail complet : `05-MAITRISE/06-ANNEXES/29_toolchain/08-NODE_VERSIONS.md`.

## Commandes utiles

```bash
# nvm (macOS/Linux), depuis la racine
nvm install
nvm use
node -v         # v22.23.4
```

Avec **nvm-windows**, sélectionne explicitement la version :

```powershell
nvm install 22.23.4
nvm use 22.23.4
node --version  # v22.23.4
```
