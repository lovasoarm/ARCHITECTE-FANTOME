---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, constraints_injectees]
anti_recipe_key: changement_contexte+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : SEO et rendering : où ton HTML naît vraiment

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un portfolio invisible ne sert à rien. Métadonnées, Open Graph, rendu statique : c'est ce qui décide de l'aperçu quand tu partages ton lien.

## OBJECTIF

Ton lien s'affiche comme une affiche Netflix.

## APPLICATION

- Ajoute l'export `metadata` sur l'accueil et `generateMetadata` sur la route projet (titre unique, description, Open Graph, Twitter card).
- Ajoute une image d'aperçu en URL absolue.
- Vérifie l'aperçu réel du lien avec un validateur de partage.

## Critère de réussite

- [ ] Ajoute l'export `metadata` sur l'accueil et `generateMetadata` sur la route projet (titre unique, description, Open Graph, Twitter card).
- [ ] Ajoute une image d'aperçu en URL absolue.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi la métadonnée de la page projet doit-elle être générée et non écrite en dur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton lien s'affiche comme une affiche Netflix.

Partagé sur LinkedIn, ton portfolio a un titre, une description et une image. Montre l'aperçu à quelqu'un en 2 minutes.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

## Livraison produit obligatoire : Kintana : Parcours client sous réseau instable

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 55-seo_and_rendering_minimini_projet » :** Implémente un morceau du parcours mobile/web de création ou suivi de demande. Ajoute états loading/empty/error, accessibilité clavier et conservation du brouillon quand la connexion disparaît.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Une coupure ne détruit pas la saisie ; une reprise ne crée pas de doublon ; l’état reste compréhensible sur petit écran. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
