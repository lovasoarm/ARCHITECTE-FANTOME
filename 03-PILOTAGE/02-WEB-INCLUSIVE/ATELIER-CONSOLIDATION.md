# Atelier de consolidation : 02-WEB-INCLUSIVE

> **Statut : complément de remédiation, pas certification.** Leçon source : [02-a11y-why-it-matters.md](02-a11y-why-it-matters.md). Vérifier les faits techniques dans cette leçon ; ne pas considérer ces consignes comme un corrigé de la notion.

## Explication approfondie : hypothèses, mécanisme, frontière

Pour **a11y why it matters**, différencier quatre couches : (1) entrée et préconditions, (2) mécanisme et invariants, (3) observation vérifiable, (4) cas limite qui invalide l'hypothèse. Dans la leçon source, retrouver un exemple concret pour chaque couche et expliquer le lien causal, plutôt que mémoriser une recette. En cas de contradiction, documenter exactement la ligne/section concernée ; aucun résultat n'est supposé vrai sans expérience. Le contexte de ce module inclut « 03 aria basics » : expliciter ce qui change lorsque la contrainte de ce contexte est activée.

## Deux exemples commentés, à compléter par l'observation

**Exemple A : a11y why it matters :** décris un cas d’entrée valide, le mécanisme précis selon `02-a11y-why-it-matters.md`, la sortie attendue et une vérification reproductible. Donne la valeur réelle avant de comparer au résultat.

**Exemple B : contre-exemple 03 aria basics :** modifie une seule hypothèse (entrée absente, ordre inversé, donnée périmée ou conflit de responsabilités). Prédis la défaillance puis mesure ou trace la différence. Une réponse « ça marche » sans trace ne valide pas cet exemple.

## Pratique graduée

**Guidé (niveau 1, 15 minutes).** Ouvrir `02-a11y-why-it-matters.md`. Extraire une règle technique de « a11y why it matters », écrire une entrée contrôlée, noter une prédiction, exécuter une démonstration minimale et consigner _commande ou protocole, résultat réel et explication_. Cocher uniquement après reproduction.

**Semi-guidé (niveau 2, 20 minutes).** Répéter avec une autre entrée, sans copier le résultat du niveau 1. Imposer une contrainte réaliste (latence, erreur de type, utilisation mémoire, sécurité ou personne absente selon la notion). Justifier un arbitrage avec une métrique ou un critère observable.

**Indépendant (niveau 3, 30 minutes).** Écrire sans modèle un scénario nouveau concernant « 03 aria basics » : définition de la preuve, réalisation, deux cas aux limites et décision justifiée. Une production qui ne démontre pas une relation causale ne suffit pas.

## Test de vérification et cas négatif

1. Énoncer l'invariant « a11y why it matters » choisi dans la leçon et l'observation qui le vérifierait.
2. **Cas faux imposé :** retirer volontairement une précondition / introduire une valeur hors domaine. Prévoir _l'échec précis_ (exception, assertion fausse, valeur incorrecte ou rejet documenté) avant l'exécution.
3. Comparer résultat attendu / obtenu, puis expliquer le correctif minimal. **Si l'expérience ne produit pas d'erreur, ne pas affirmer un échec** : documenter pourquoi et choisir une perturbation discriminante.

**Erreur fréquente :** confondre la présence d'une commande exécutée et une preuve de maîtrise. **Remédiation :** réduire à un cas minimal, noter l'entrée exacte, prédire le résultat, refaire avec une entrée contradictoire, puis expliquer les deux résultats.

## Transfert réel

Dans un mini-projet, relier « a11y why it matters » à une décision réelle : critère d'acceptation, test d'échec, coût d'une alternative et rollback. Livrer un changement petit et réversible accompagné de la preuve avant/après, ou un ADR argumenté pour les compétences non codées.

## Remise, feedback et déverrouillage

Produire `preuve.md` (prédiction, procédure, observation, explication, échec, correctif, transfert). Réussite : les trois niveaux réalisés, un cas négatif falsifiable, deux sorties observées, et transfert explicable à froid. Feedback : si la sortie ne correspond pas, identifier d'abord la précondition violée puis refaire le test ; si l'explication reste circulaire, reprendre la section correspondante de la leçon source. **Corrigé distinct** : `corriges/ATELIER-CONSOLIDATION-CORRIGE.md` dans ce module, à consulter uniquement après remise.
