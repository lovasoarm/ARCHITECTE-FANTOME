## perishability_id: PER-0085

stability: perissable
acte: comprendre
review_due: 2027-12-31

---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# NODE_VERSION.md : Politique de version Node (visible apprenant)

Temps de lecture ~2 min

Fichier pedagogique volontairement conserve a la racine.
Le fichier `.nvmrc` est **explicitement visible** dans le repo : c'est un
support d'apprentissage, pas seulement un artefact d'outillage.

## Règle simple

- Cible reproductible du curriculum : **Node 22 LTS (22.23.2 pour la reproductibilité AF)** (`.nvmrc` = `22.23.2`).
- Référence de reproductibilité : **Node 22.23.2** ; les contrôles de compatibilité acceptent le rail Node 22.x.
- Support officiel distinct : à la date du **23 août 2026**, Node 24 LTS et Node 22 LTS (22.23.2 pour la reproductibilité AF) sont maintenus ; Node 20 est EOL. AF ne promet donc aucune compatibilité Node 20.
- Formulation officielle : _« le curriculum est validé sous Node 22 ; une validation sous une autre version LTS est une compatibilité supplémentaire, pas une précondition. »_

La politique de version externe peut évoluer. Cette page doit être relue selon le registre de rigueur et sa date de péremption.

## Pourquoi c'est ecrit ici (et pas seulement dans un README)

Un apprenant qui ouvre `.nvmrc` doit pouvoir comprendre a quoi il sert.
Detail complet : `05-MAITRISE/06-ANNEXES/29_toolchain/08-NODE_VERSIONS.md`.

## Commandes utiles

```bash
nvm install     # installe la version listee dans .nvmrc
nvm use         # bascule sur cette version
node -v         # doit afficher v22.x
```
