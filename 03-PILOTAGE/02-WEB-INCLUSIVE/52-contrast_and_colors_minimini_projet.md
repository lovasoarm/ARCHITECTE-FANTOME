---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Ambiance sombre Netflix = risque de contraste insuffisant, surtout sur le texte gris et le rouge sur noir. La charte doit passer des seuils précis, qui dépendent du type de contenu :

- texte normal : contraste conforme WCAG AA ;
- grand texte : seuil adapté (plus permissif) ;
- composants et éléments graphiques essentiels : contraste suffisant ;
- ne jamais utiliser la couleur comme unique moyen de transmettre une information.

## APPLICATION

- Mesure le contraste de tes trois couleurs de texte sur fond sombre.
- Corrige celles sous 4,5:1 en ajustant les valeurs de ta palette Tailwind, pas en surchargeant les composants.
- Vérifie que le rouge d'accent n'est jamais le seul porteur d'information.

## Critère de réussite

- [ ] Mesure le contraste de tes trois couleurs de texte sur fond sombre.
- [ ] Corrige celles sous 4,5:1 en ajustant les valeurs de ta palette Tailwind, pas en surchargeant les composants.
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

Dans ce scénario, tu as vérifié que : ta palette sombre est lisible dans les cas mesurés.

L'ambiance Netflix est conservée et le texte est lisible. Commit ton fichier de thème.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
