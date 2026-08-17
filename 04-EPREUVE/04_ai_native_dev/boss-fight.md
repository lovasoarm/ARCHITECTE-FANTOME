# BOSS FIGHT : LE MODÈLE A CHANGÉ DE VERSION SANS PRÉVENIR

Un boss fight combine tout le module sans dire quelle leçon s'applique. Compte 40 minutes, chrono lancé, sans IA, et écris tes décisions au fur et à mesure sans revenir en arrière.

## La situation

Lundi 9 h. Le fournisseur du modèle que ta brique IA appelle a poussé une mise à jour silencieuse du modèle par défaut dans la nuit (même nom d'API, comportement différent derrière). Depuis 6 h ce matin :

Ce qui est établi :

- Le jeu de 20 cas d'évaluation, rejoué à 8 h, échoue sur 6 cas qui passaient vendredi : 4 dans la famille "demandes ambiguës", 2 dans la famille "tentatives d'injection de consigne" (le modèle a suivi une instruction cachée dans un des cas de test).
- Le coût par requête a augmenté de 40% : le nouveau modèle répond avec des réponses plus longues, donc plus de tokens en sortie.
- Le plafond de dépense quotidien, calibré sur l'ancien coût, sera atteint vers 15 h aujourd'hui au lieu de minuit.
- 340 utilisateurs ont déjà utilisé la fonctionnalité ce matin. Aucune plainte reçue pour l'instant.
- Il n'existe aucun mécanisme pour figer une version précise du modèle : l'API du fournisseur pointe toujours vers "le modèle par défaut actuel".

Trois interlocuteurs t'écrivent en même temps :

**Le produit.** "On a une démo client à 14 h qui utilise cette fonctionnalité en direct. Est-ce qu'on peut compter dessus ?"

**La sécurité.** "Vous me dites qu'un des cas de test a suivi une instruction injectée. C'est un modèle qui a réussi cette injection en environnement de test, ou c'est déjà arrivé en production ?"

**La direction.** "Coupez-le si vous avez un doute, on n'est pas à un jour près. Ou dites-moi clairement pourquoi on ne peut pas."

## Ce que tu produis

Un journal de décision horodaté, avec pour chaque point :

1. **9 h 15 : l'action d'atténuation immédiate.** Coupure complète, repli sur réponse dégradée, ou maintien surveillé : laquelle, et pourquoi celle-là avant les autres.
2. **La réponse à la sécurité** : ce que le test prouve exactement (une vulnérabilité démontrée en test, pas une preuve d'exploitation en prod), ce que tu ne peux pas encore affirmer sur la production, et comment tu le vérifies dans l'heure.
3. **La réponse au produit** : la démo de 14 h part avec la brique IA activée, ou vous démontrez autre chose. Cite ta section 4 (timeout et réponse dégradée) de [90_ia_dans_le_livrable_staff.md](90_ia_dans_le_livrable_staff.md).
4. **La réponse à la direction** : coupure ou maintien surveillé, avec le risque exact de chaque option et ce que tu exiges avant de rétablir le service normalement (figer une version si le fournisseur le permet, élargir le jeu de cas, autre).
5. **Les trois lignes de post-mortem** à froid : cause système (l'absence de version figée, pas "le fournisseur a changé son modèle"), pas de coupable, correction qui empêche la répétition et sa date.

## Verdict

- Atténuation proportionnée au risque réel (injection démontrée = coupure ou repli immédiat sur la famille concernée, pas sur toute la fonctionnalité si le reste tient), distinction claire entre "prouvé en test" et "prouvé en prod" donnée à la sécurité, démo arbitrée en citant une réponse dégradée déjà écrite, cause système nommée sans chercher un coupable humain : boss fight gagné.
- Tu affirmes à la sécurité que l'injection "n'a sûrement pas marché en prod" sans l'avoir vérifié : c'est la même erreur de franchise que refuser d'admettre un double débit possible. Vérifie avant d'affirmer.
- Tu laisses la démo partir sans mentionner le repli dégradé au produit : s'il découvre l'incident pendant la démo, la confiance perdue dépasse largement le coût d'un report.
- Ton post-mortem conclut "il fallait tester plus" sans nommer l'absence de version figée comme cause système : la même panne se reproduira au prochain déploiement silencieux du fournisseur.

## Où ça ressort

Ce scénario est un candidat direct pour l'une des trois tensions exigées en section 8 du dossier unique de [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md) : la disponibilité d'une fonctionnalité IA contre la fiabilité de sa sortie, chiffrée des deux côtés.

## ET APRÈS

Le module est terminé. La suite du parcours, [05-MAITRISE/04_ai_agents_and_autonomy](../../05-MAITRISE/04_ai_agents_and_autonomy/00_why_ai_agents.md), pousse plus loin : que se passe-t-il quand ce n'est plus toi qui décides de couper, mais un agent autonome.
