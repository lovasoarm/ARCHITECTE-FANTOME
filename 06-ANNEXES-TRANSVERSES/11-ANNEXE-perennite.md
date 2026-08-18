# ANNEXE : pérennité : pourquoi ce curriculum ne périme pas

Les outils changent tous les trois ans. Les modes d'échec des projets, non. Ce curriculum est
construit sur les seconds.

## Ce qui périme et ce qui reste

```text
PERIME VITE                          RESTE 20 ANS
-------------------------------      ---------------------------------
la syntaxe d'un framework            le couplage et la cohésion
l'ORM du moment                      le coût d'un changement de schéma
le format de config du CI            l'idée de garde-fou automatique
le fournisseur de cloud              la latence, la panne partielle, le coût
la mode micro-services               le critère de découpage d'un système
l'outil de ticket                    le fait qu'un travail non visible n'est pas suivi
```

Chaque leçon est écrite pour que l'exemple soit remplaçable et le mécanisme, non.

## Pérennité niveau par niveau

```text
05 DATA-SPELLS
  intemporel : normalisation, invariants métier, migration expand/contract
  périssable : la version exacte de Postgres citée en exemple (16) ; revoir si elle
               atteint sa fin de support

07 API-DOJO
  intemporel : idempotence, contrats, versionnage, politique d'erreurs
  périssable : la mécanique HTTP précise si un nouveau standard venait remplacer REST
               comme norme dominante

09 QUALITY-SHIELD
  intemporel : stratégie de tests par coût, observabilité comme signal avant l'utilisateur
  périssable : les formats de logs et de traces cités en exemple

11 BIG-APP-SNOOP
  intemporel : la méthode de cartographie en cinq phases
  périssable : les trois dépôts réels cités (plausible/analytics, go-gitea/gitea,
               calcom/cal.com), leur taille exacte et leur structure interne, qui évoluent
               à chaque release

00 PROLOGUE
  intemporel : la regle du livrable, le contrat d'apprentissage, l'auto-test d'entree
  perissable : rien, ce niveau ne cite aucun outil

01 MINDSET
  intemporel : cout d'une decision, raisonnement sous incertitude, ecrire pour penser
  perissable : les ordres de grandeur de cout cites en euros, qui suivent l'inflation
               et les tarifs cloud ; revoir tous les trois ans

02 PROBLEM-HUNT
  intemporel : demande contre besoin, non-objectifs, metriques de succes datees
  perissable : rien de technique ; seuls les exemples de domaine vieillissent

03 MVP-SPLIT
  intemporel : tranche verticale, ligne de coupe, estimation honnete
  perissable : les references implicites aux rituels agiles du moment

04 USER-WIZARD
  intemporel : flux avant ecrans, etats obligatoires, formulaires qui ne mentent pas
  perissable : les criteres d'accessibilite chiffres (WCAG) et les budgets de performance,
               indexes sur le materiel et la norme en vigueur

06 ARCHI-LAB
  intemporel : couplage, cohesion, frontieres, ADR
  perissable : la mode d'architecture citee en contre-exemple (micro-services), a remplacer
               par la mode dominante du moment sans toucher au critere de decoupage

08 ROADMAP-RUN
  intemporel : planifier par le risque, jalons, suivi de la realite
  perissable : les formats d'outil de suivi cites en exemple

10 TEAM-QUEST
  intemporel : accords d'equipe, revue, communication sous pression
  perissable : le flux Git decrit precisement, si la plateforme d'hebergement change de modele
               de branche ou de revue

12 CAPSTONE-ARENA
  intemporel : conduire un projet complet depuis un brief ambigu, tenir un jalon, encaisser
               un spec drift
  perissable : la stack imposee dans les livrables et les seuils de la grille d'evaluation,
               a recalibrer si le volume attendu d'un projet junior change

13 DAY-TO-LEGEND
  intemporel : boucles d'apprentissage, entretien de la competence, preuve de transfert
  perissable : les plateformes de lecture de code et les canaux de veille cites

15 BONUS-VAULT
  intemporel : securite par le modele de menace, cout comme contrainte de conception,
               minimisation des donnees personnelles
  perissable : les references reglementaires nommees et les tarifs, les plus volatils du depot ;
               revoir chaque annee

14 TOOL-CAVE
  intemporel : la méthode de reproduction déterministe, le format HYPOTHESES.md
  périssable : 04-ai-as-a-tool.md dans son intégralité, à revoir à chaque saut de
               génération de modèle d'IA
```

## Couverture de cette annexe

Les six paliers sont couverts nommément ci-dessus. Une ligne intemporel / périssable manquante est
un défaut de cette annexe : ajoute-la, ne la déduis pas.

## Comment maintenir ce dépôt

1. **Les leçons ne citent un outil que comme illustration.** Si une leçon devient fausse parce
   qu'un outil a changé de version, c'est un défaut de la leçon : réécris l'exemple, pas le principe.
2. **Chaque exemple de code doit tenir sans dépendance exotique.** TypeScript et SQL standard.
3. **Règle des cinq ans.** Avant d'ajouter un contenu, demande : sera-t-il encore vrai dans cinq
   ans ? Si non, il va dans `15-BONUS-VAULT/` avec une date de péremption écrite en tête de fichier.
4. **Revue annuelle.** Une fois par an, relis les études de cas du niveau 11 : ce sont elles qui
   vieillissent le plus vite, car elles décrivent des contextes techniques.

## Ce qui doit être révisé quand l'écosystème bouge

- Les exemples d'observabilité (formats de logs, conventions de traces).
- La leçon sur l'IA comme outil (`14-TOOL-CAVE/04-ai-as-a-tool.md`) : c'est la plus volatile.
- Les seuils de performance cités : ils suivent le matériel.

## Marqueur de version

Chaque exemple de code volatil (version d'outil, seuil de performance) porte, dans le
commentaire du bloc de code lui-même, la mention :

```text
# verifie le AAAA-MM-JJ
```

au format déjà en usage dans `05-DATA-SPELLS/grimoire.md` et `09-QUALITY-SHIELD/grimoire.md`.
Un exemple de code sans cette mention est réputé stable. Si tu en trouves un qui vieillit,
ajoute la mention au lieu de supprimer le contenu.
