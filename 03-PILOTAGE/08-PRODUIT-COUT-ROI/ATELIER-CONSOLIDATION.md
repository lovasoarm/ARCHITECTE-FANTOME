---
stability: intemporel
acte: pratiquer
assessment_role: instructional_checkpoint
---

# Atelier de consolidation : 08-PRODUIT-COUT-ROI

> **Statut : complément de remédiation, pas certification.** Le corrigé associé contient deux exemples travaillés ; ne l’ouvre qu’après ta tentative. Leçon source : [04-dette_technique_declaree.md](04-dette_technique_declaree.md). Vérifier les faits techniques dans cette leçon ; ne pas considérer ces consignes comme un corrigé de la notion.

## Explication approfondie : hypothèses, mécanisme, frontière

Pour **dette technique declaree**, différencier quatre couches : (1) entrée et préconditions, (2) mécanisme et invariants, (3) observation vérifiable, (4) cas limite qui invalide l'hypothèse. Dans la leçon source, retrouver un exemple concret pour chaque couche et expliquer le lien causal, plutôt que mémoriser une recette. En cas de contradiction, documenter exactement la ligne/section concernée ; aucun résultat n'est supposé vrai sans expérience. Le contexte de ce module inclut « 02 grille cout risque valeur » : expliciter ce qui change lorsque la contrainte de ce contexte est activée.

## Deux situations à traiter avant de consulter le corrigé

**Exemple A : dette technique declaree :** décris un cas d’entrée valide, le mécanisme précis selon `04-dette_technique_declaree.md`, la sortie attendue et une vérification reproductible. Donne la valeur réelle avant de comparer au résultat.

**Exemple B : Dette subie et non gouvernée :** Imagine une règle métier copiée dans quatre services, puis modifiée dans seulement trois. Décris la divergence observable et rédige une fiche de dette avec propriétaire, impact, cible et déclencheur de consolidation. Distingue cette dette cachée d’un compromis volontaire documenté.

## Pratique graduée

**Guidé (niveau 1, 15 minutes).** Ouvrir `04-dette_technique_declaree.md`. Extraire une règle technique de « dette technique declaree », écrire une entrée contrôlée, noter une prédiction, exécuter une démonstration minimale et consigner _commande ou protocole, résultat réel et explication_. Cocher uniquement après reproduction.

**Semi-guidé (niveau 2, 20 minutes).** Répéter avec une autre entrée, sans copier le résultat du niveau 1. Imposer une contrainte réaliste (latence, erreur de type, utilisation mémoire, sécurité ou personne absente selon la notion). Justifier un arbitrage avec une métrique ou un critère observable.

**Indépendant (niveau 3, 30 minutes).** Sans reprendre les exemples précédents, construis un scénario inédit sur « dette technique declaree » : formule une hypothèse, indique une preuve observable, teste deux cas limites et justifie ta décision. Explique le lien causal ; une réponse sans preuve ou sans transfert ne valide pas cet exercice.

## Test de vérification et cas négatif

1. Énoncer l'invariant « dette technique declaree » choisi dans la leçon et l'observation qui le vérifierait.
2. **Cas faux imposé :** retirer volontairement une précondition / introduire une valeur hors domaine. Prévoir _l'échec précis_ (exception, assertion fausse, valeur incorrecte ou rejet documenté) avant l'exécution.
3. Comparer résultat attendu / obtenu, puis expliquer le correctif minimal. **Si l'expérience ne produit pas d'erreur, ne pas affirmer un échec** : documenter pourquoi et choisir une perturbation discriminante.

**Erreur fréquente :** confondre la présence d'une commande exécutée et une preuve de maîtrise. **Remédiation :** réduire à un cas minimal, noter l'entrée exacte, prédire le résultat, refaire avec une entrée contradictoire, puis expliquer les deux résultats.

## Transfert réel

Dans un mini-projet, relier « dette technique declaree » à une décision réelle : critère d'acceptation, test d'échec, coût d'une alternative et rollback. Livrer un changement petit et réversible accompagné de la preuve avant/après, ou un ADR argumenté pour les compétences non codées.

## Remise, feedback et déverrouillage

Produire `preuve.md` (prédiction, procédure, observation, explication, échec, correctif, transfert). Réussite : les trois niveaux réalisés, un cas négatif falsifiable, deux sorties observées, et transfert explicable à froid. Feedback : si la sortie ne correspond pas, identifier d'abord la précondition violée puis refaire le test ; si l'explication reste circulaire, reprendre la section correspondante de la leçon source. **Corrigé distinct** : `corriges/ATELIER-CONSOLIDATION-CORRIGE.md` dans ce module, à consulter uniquement après remise.
