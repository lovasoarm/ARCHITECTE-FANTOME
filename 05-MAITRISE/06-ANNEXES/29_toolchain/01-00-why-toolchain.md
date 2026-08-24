## perishability_id: PER-0071

perennite: intemporel
stability: perissable
duree_de_vie_estimee: 1-2 ans
raison: Toolchains JS bougent en permanence.
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, defaut_cache]
anti_recipe_key: decision_organisationnelle+defaut_cache
transfer_distance: high
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> **Statut de pérennité :** intemporel | évolutif | **périssable**
> Statut effectif de ce module : **périssable**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

# Pourquoi ce module mérite ton temps

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.
> Temps de lecture ~9 min

Le camp de Rick a un problème. Pas un zombie. Pas une pénurie. Un problème plus sournois : personne ne sait sur quelle version du plan de défense ils bossent. Glenn a édité le fichier sur son poste, le sniper a une version d'il y a trois jours, et le serveur qui devait tourner le simulateur de menace plante différemment chez chacun. Le code est bon. L'outillage autour est un chaos.

C'est ça, la leçon : un dev qui code bien mais qui maîtrise pas sa toolchain (outillage, ensemble des outils qui entourent le code), c'est un survivant sans radio. Il a les compétences, mais il est coupé du reste du camp.

---

## CE QUE C'EST VRAIMENT

La toolchain c'est tout ce qui entoure ton code et qui le fait exister hors de ta tête :

```text
ton code source --> Git --> package manager --> bundler --> Docker --> CI/CD --> prod
```

Chaque maillon a un job précis :

```text
Git     --> versionner, collaborer, revenir en arrière sans pleurer
VSCode    --> l'environnement où tu passes 8h par jour
npm/pnpm   --> gérer les dépendances (le code des autres que t'utilises)
bundler   --> transformer ton code en quelque chose que le navigateur digère
Docker    --> faire tourner ton code pareil partout, toujours
CI/CD    --> automatiser test + build + déploiement à chaque push
```

Personne te demande d'aimer ça. On te demande de savoir que ça existe, pourquoi ça existe, et ce qui se passe quand tu l'ignores.

---

## CE QUI PREND CHER QUAND ÇA MANQUE

Pas de Git correct :

```text
le sniper écrase le code de Glenn --> personne sait pourquoi le simulateur plante --> 3h perdues à comparer des fichiers à la main
```

Pas de Docker :

```text
"ça marche chez moi" --> ça marche pas sur le serveur --> nuit blanche à débugger une différence de version Node
```

Pas de CI/CD :

```text
chaque déploiement = un humain qui suit une checklist --> un jour il oublie une étape --> prod cassée un samedi soir
```

La toolchain c'est pas du confort. C'est ce qui empêche le camp de se faire bouffer par ses propres erreurs.

---

## OÙ ÇA VIT DANS UN VRAI SYSTÈME

```json
          [TON CERVEAU]
             |
           écrit du code
             |
             v
          [GIT] -- historise, partage
             |
             v
       [PACKAGE MANAGER] -- installe les dépendances
             |
             v
          [BUNDLER] -- assemble, optimise
             |
             v
          [DOCKER] -- isole, reproduit
             |
             v
          [CI/CD] -- teste, build, déploie
             |
             v
           [PROD]
```

Si un seul maillon est faible, toute la chaîne en souffre. Un bundler mal configuré ralentit chaque build. Un Dockerfile mal pensé fait gonfler chaque déploiement. Un pipeline CI absent veut dire que chaque bug arrive en prod avant d'être vu.

---

## QUAND ÇA DEVIENT IMPORTANT, QUAND ÇA DEVIENT INDISPENSABLE

```text
solo, petit script    --> Git suffit, le reste est optionnel
projet perso sérieux    --> Git + package manager + bundler deviennent importants
travail en équipe     --> Git devient non négociable, CI commence à valoir le coup
prod avec utilisateurs réels --> Docker + CI/CD deviennent indispensables
```

Comment tu sais que t'en as besoin : le jour où "ça marchait avant" devient une phrase que tu prononces plus d'une fois par semaine, t'as un problème de toolchain, pas un problème de code.

---

## POURQUOI CETTE APPROCHE PLUTÔT QU'UNE AUTRE

Il existe d'autres écoles : tout faire à la main, scripts maison, zéro automatisation. Ça marche, à très petite échelle, avec une seule personne, sur un projet qui vit pas longtemps.

Le compromis qu'on fait ici :

```text
gain --> reproductibilité, collaboration sans friction, déploiements qui font pas peur
perte --> du temps d'apprentissage au départ, une couche d'outils à maintenir
```

On paie ce prix une fois. On le récupère à chaque déploiement, chaque onboarding, chaque "pourquoi ça marche pas chez toi".

---

## MODERNE, LEGACY, OU INTEMPOREL

```text
Git       --> intemporel. Ça bougera plus, c'est le standard depuis 15+ ans.
VSCode      --> moderne. L'éditeur dominant aujourd'hui, mais les concepts (LSP, extensions) survivront à l'outil.
npm/pnpm/yarn  --> moderne mais volatile. Les noms changent, le concept (gérer des dépendances) reste.
bundlers     --> très volatile. Webpack a dominé, Vite a pris le relais, ça bougera encore.
Docker      --> intemporel pour l'instant. La containerisation comme concept est là pour rester, même si l'outil change.
CI/CD      --> intemporel comme pratique. GitHub Actions aujourd'hui, autre chose demain, mais l'idée d'automatiser reste.
```

Ce qui compte : tu retiens pas "comment configurer Vite en 2026". Tu retiens "pourquoi un bundler existe et quel problème il résout". Le jour où Vite est remplacé par autre chose, tu t'adaptes en une heure parce que t'as compris le concept, pas juste la commande.

---

## NOYAU DUR OU PÉRIPHÉRIQUE

```text
Git         --> noyau dur. Non négociable, point final.
package manager   --> noyau dur. Tu peux pas livrer du JS moderne sans.
bundler       --> noyau dur pour le frontend, périphérique pour du pur backend Node.
Docker        --> noyau dur en équipe et en prod. Périphérique en solo sur un script perso.
CI/CD        --> noyau dur dès que t'as un déploiement régulier.
```

---

## QUAND L'APPRENDRE DANS TA PROGRESSION

```text
Git      --> dès le jour 1, en parallèle de tout le reste
VSCode setup --> dès le jour 1, c'est ton terrain de jeu quotidien
package manager --> dès que tu installes ta première dépendance
bundlers   --> après avoir compris modules ESM/CJS (module 06_modules)
Docker    --> après avoir compris runtime Node (module 02-CONSTRUCTION/13-RUNTIME-ENV)
CI/CD     --> après avoir des tests à automatiser (module 02-CONSTRUCTION/03-TESTING)
```

Prérequis avant d'attaquer ce module :

```text
00-SOCLE/04-FUNDAMENTALS    --> tu dois savoir lire du JS sans effort
06_modules      --> import/export, ESM vs CJS : indispensable pour comprendre les bundlers
02-CONSTRUCTION/13-RUNTIME-ENV    --> Node, process, filesystem : indispensable pour Docker et les scripts CI
02-CONSTRUCTION/03-TESTING      --> sans tests, CI/CD c'est juste un déploiement automatisé aveugle
```

Ce qui devient plus simple après ce module :

```text
02-CONSTRUCTION/02-MINI-PROJECTS    --> tu containerises et tu déploies tes projets sans bloquer dessus
toute collaboration future --> Git devient un réflexe, pas un obstacle
03-PILOTAGE/04-SECURITY      --> tu comprends déjà ce qu'est une image Docker, donc les surfaces d'attaque liées
```

---

## ERREURS CLASSIQUES DE DÉBUTANT

```text
- commit "fix" x50 sans message clair --> historique Git illisible
- jamais de .gitignore --> node_modules committé, repo qui pèse 400 Mo
- copier-coller une config Webpack trouvée sur Stack Overflow sans comprendre une ligne
- Dockerfile qui réinstalle toutes les dépendances à chaque build --> 10 minutes par build au lieu de 30 secondes
- CI qui run les tests mais que personne regarde jamais --> pipeline vert, code cassé quand même
```

## IDÉES REÇUES

```text
"Git c'est juste pour sauvegarder mon code"
--> faux. Git c'est pour collaborer et revenir en arrière. Le cloud backup est un effet de bord, pas le but.

"Docker c'est compliqué, c'est pour les grosses boîtes"
--> faux. Un Dockerfile basique tient en 10 lignes. La complexité vient des cas avancés, pas du concept de base.

"CI/CD c'est du travail en plus"
--> faux. C'est du travail en moins, juste décalé dans le temps. Tu le paies une fois en config, tu le récupères à chaque push.
```

---

## POURQUOI ÇA TIENDRA ENCORE DANS 5 ANS

Les outils précis vont changer. Vite remplacera peut-être Webpack pour de bon, un autre gestionnaire de paquets émergera, GitHub Actions aura un concurrent plus malin. Mais les problèmes que ces outils résolvent sont structurels : versionner du code en équipe, isoler un environnement d'exécution, automatiser la vérification avant mise en prod. Ces problèmes existeront tant qu'il y aura du code écrit par plusieurs personnes et déployé sur des machines qu'on contrôle pas totalement.

Ce qui risque de bouger : la syntaxe des configs, le nom des outils dominants, les commandes exactes.
Ce qui bougera pas : pourquoi Git existe, pourquoi isoler un environnement, pourquoi automatiser un pipeline.

Le camp de Rick a pas besoin du meilleur outil. Il a besoin de comprendre pourquoi chaque outil est là. Le reste, ça s'adapte.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
