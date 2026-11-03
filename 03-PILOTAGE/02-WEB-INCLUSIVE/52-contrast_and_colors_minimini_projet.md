---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Contraste et couleurs : quand le design devient illisible

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Ambiance sombre Netflix = risque de contraste insuffisant, surtout sur le texte gris et le rouge sur noir. La charte doit passer des seuils précis, qui dépendent du type de contenu :

- texte normal : contraste conforme WCAG AA ;
- grand texte (au moins 18 pt sans gras ou 14 pt gras) : seuil adapté (plus permissif) ;
- composants et éléments graphiques essentiels : contraste suffisant ;
- ne jamais utiliser la couleur comme unique moyen de transmettre une information.

## APPLICATION

- Mesure le contraste de tes trois couleurs de texte sur fond sombre.
- Corrige chaque paire selon son usage : au moins 4,5:1 pour le texte normal et 3:1 pour le grand texte (au moins 18 pt sans gras ou 14 pt gras) ; ajuste les tokens de palette à la source plutôt que de surcharger les composants.
- Vérifie que le rouge d'accent n'est jamais le seul porteur d'information.

## Critère de réussite

- [ ] Mesure le contraste de tes trois couleurs de texte sur fond sombre.
- [ ] Corrige chaque paire selon le seuil adapté à son usage : 4,5:1 pour le texte normal, 3:1 pour le grand texte (au moins 18 pt sans gras ou 14 pt gras), en ajustant les tokens de palette à la source.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle information de ton site reposait uniquement sur la couleur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : les paires de couleurs mesurées respectent le seuil adapté à leur usage et que l’information ne repose pas uniquement sur la couleur.

L'ambiance Netflix est conservée et le texte est lisible. Commit ton fichier de thème.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Livraison produit : Kintana : démontrer le contraste de l'interface

> **Fil rouge :** Kintana conserve le même parcours de demande. Cet incrément porte sur la lisibilité des textes, des états et des repères visuels ; il ne transforme pas la couleur en unique canal d'information.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « Contraste et couleurs » :** choisis les couleurs réellement utilisées pour le texte courant, les grands titres, les liens, les messages d'erreur/succès et les composants interactifs du formulaire de demande. Mesure chaque paire premier plan/fond avec un outil de contraste ou un calcul reproductible. Corrige les tokens de palette à la source, puis vérifie que le sens reste compréhensible sans distinguer les couleurs.

**Livrable :** tableau `usage / couleur du texte ou indicateur / fond adjacent / ratio mesuré / seuil appliqué / décision`, référence des tokens avant/après et capture ou vérification des états normal, erreur, succès et focus.

**Gate : la preuve porte sur les ratios et le codage de l'information :**

- le texte normal atteint au moins `4,5:1` et le grand texte au moins `3:1` pour le niveau AA du critère WCAG 2.2 1.4.3 ; les seuils sont évalués sans arrondir un résultat insuffisant ;
- les indicateurs visuels nécessaires pour identifier un contrôle, son état ou un graphique informatif sont examinés séparément selon le critère WCAG 2.2 1.4.11 (seuil `3:1` contre les couleurs adjacentes, sous réserve des exceptions du critère) ;
- les états d'erreur, de succès et de sélection comportent aussi un libellé, une icône ou un autre indice non chromatique ;
- les paires réellement mesurées, les exceptions et les éléments non testés sont consignés ; une couleur hors scope est justifiée, pas passée sous silence ;
- après correction, les mêmes paires sont mesurées à nouveau et le tableau montre le résultat avant/après.

**Contre-épreuve :** désactive mentalement la couleur comme canal (par exemple en lisant uniquement les libellés et formes) et montre qu'une erreur ou un succès reste identifiable. Un ratio conforme ne démontre pas à lui seul toute l'accessibilité visuelle.

Références de seuil : [WCAG 2.2 : Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) et [WCAG 2.2 : Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast). Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu'après déploiement et observation réels.
