---
perishability_id: PER-0085

stability: perissable
acte: comprendre
last_reviewed: 2026-10-30
freshness_registry_id: PER-0085
freshness_audit_date: 2026-10-30
freshness_status: source_officielle_verifiee_2026-10-30_execution_pin_non_faite
review_due: 2027-01-28
review_status: source_officielle_verifiee_2026-10-30_execution_pin_non_faite
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# NODE_VERSION.md : Politique de version Node (visible apprenant)

Temps de lecture ~2 min

Cette page pédagogique est conservée dans les annexes ; le fichier technique
`.nvmrc` reste à la racine. Il est **explicitement visible** dans le dépôt :
c'est une source de reproductibilité et un support d'apprentissage, pas un artefact caché.

## Règle simple

> Node.js 22.23.4 a été publié le 21 octobre 2026 en tant que mise à jour de sécurité. AF utilise **22.23.4** comme référence canonique de cette édition. Voir les [notes officielles de Node.js 22.23.4](https://nodejs.org/en/blog/release/v22.23.4).

- Cible reproductible du curriculum : **Node 22 LTS (22.23.4 pour la reproductibilité AF)** (`.nvmrc` = `22.23.4`).
- Référence exacte de reproductibilité : **Node 22.23.4** (`.nvmrc`). Une autre version de Node 22.x n’est pas réputée validée pour l’ensemble du corpus sans exécution distincte des tests concernés.
- Support officiel distinct au **30 octobre 2026** : les branches Node 22, 24 et 26 sont toutes indiquées LTS par le calendrier officiel consulté ; Node 27 est en Alpha depuis le 29 octobre 2026. Le pin 22.23.4 reste la référence reproductible d'AF, mais n'est ni la LTS majeure la plus récente ni une déclaration de compatibilité avec Node 24/26. Voir le [calendrier officiel des versions Node.js](https://nodejs.org/en/about/previous-releases) et le [journal des releases](https://nodejs.org/en/blog/release).
- Toute migration vers une autre ligne, notamment Node 24, exige une revue de compatibilité et l'exécution des contrôles concernés avant de remplacer le pin.
- Formulation à retenir : _« le curriculum utilise Node 22.23.4 comme référence reproductible ; une autre version exige une vérification de compatibilité distincte. »_

La politique de version externe évolue. La version canonique du curriculum reste volontairement indépendante de la LTS la plus récente tant qu’une bascule n’est pas validée. Cette page doit être relue selon le registre de rigueur et sa date de péremption.

## Matrice de compatibilité AF : état vérifié le 30 octobre 2026

- **Version épinglée / référence reproductible :** Node.js `22.23.4` ; `.nvmrc` est conservé à cette valeur.
- **Runtime utilisé pour les contrôles de cette édition :** Node.js `22.16.0`. Cette version ne correspond pas au pin : les tests exécutés sous ce runtime ne prouvent donc pas la compatibilité exacte avec `22.23.4`.
- **Compatibilité testée :** le seul runtime que l'environnement d'audit a permis d'exécuter ici est `22.16.0`. La version épinglée doit encore être testée dans CI ou sur une machine équipée de `22.23.4` avant publication d'une attestation de reproductibilité complète.
- **État des branches Node au 30 octobre 2026 :** la page officielle Node.js liste 22.x, 24.x et 26.x comme LTS, avec les releases 22.23.4 (21 octobre), 24.22.2 (28 octobre) et 26.13.0 (28 octobre). Node 27 est en Alpha. Les pages publiques consultées ne sont pas parfaitement alignées sur le sous-statut Active/Maintenance de certaines branches ; AF ne déduit donc pas ce sous-statut pour ses propres garanties. Pour la politique opérationnelle, recontrôler le calendrier officiel et les notes de release au moment de l’installation. [Table officielle Node.js](https://nodejs.org/en/about/previous-releases) ; [journal des releases](https://nodejs.org/en/blog/release) ; [groupe Release](https://github.com/nodejs/Release).
- **Procédure locale :** `nvm install 22.23.4`, `nvm use 22.23.4`, `node --version`, puis exécuter les commandes du README racine et les tests de référence. Le résultat doit afficher exactement `v22.23.4` avant validation de l'environnement.
- **Règle de matrice :** la valeur de `.nvmrc` n'est pas une déclaration de compatibilité multi-version. Une future version supportée exige des jobs de CI dédiés, la suite de référence complète, les ateliers concernés et un rapport de résultats daté.

## Pourquoi c'est ecrit ici (et pas seulement dans un README)

Un apprenant qui ouvre `.nvmrc` doit pouvoir comprendre a quoi il sert.
Detail complet : `05-MAITRISE/06-ANNEXES/29_toolchain/08-NODE_VERSIONS.md`.

## Commandes utiles

```bash
nvm install     # installe la version listée dans .nvmrc
nvm use         # bascule sur cette version
node -v         # doit afficher v22.23.4
```
