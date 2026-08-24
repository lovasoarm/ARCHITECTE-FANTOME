## perishability_id: PER-0007

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# \_EXEMPLE_HYPOTHESES.md (cas reel)

Temps de lecture ~2 min

## Contexte

- symptome : la RAM du process node passe de 80 Mo a 900 Mo en 20 min sous charge.
- environnement : Node 22.23.2, prod-like, 100 req/s.
- reproductible : oui, `autocannon -c 50 -d 300` reproduit a 100 %.

## Hypothese 1 : fuite via listener non retire

- enonce : chaque req attache un listener a un EventEmitter global jamais retire.
- test : `emitter.listenerCount('req')` apres 1000 req.
- resultat : 1000 listeners.
- verdict : VRAIE.

## Hypothese 2 : cache LRU sans borne

- enonce : le cache `Map` interne n'a pas de limite.
- test : `cache.size` apres 5 min.
- resultat : 42 entrees stables.
- verdict : FAUSSE.

## Cause racine confirmee

- preuve : heap snapshot montre les 1000 closures referencees par l'emitter.
- correctif : `emitter.once` ou `off()` en fin de req.
- non-regression : test unitaire `assert(emitter.listenerCount('req') === 0)` apres 100 req simulees.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
