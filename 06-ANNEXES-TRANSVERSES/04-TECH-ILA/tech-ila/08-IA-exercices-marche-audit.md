---
companion: ce parcours
stability: stable
acte: pratiquer
---

> **SCÈNE CRAZYDEVS : salle d'audit :** une belle démonstration ne suffit pas. Il faut retrouver les sources, reproduire les décisions et savoir dire ce qui n'a pas été vérifié.

[← Sommaire TECH-ILA](../README.md) · [← Niveau 6 : IA](06-niveau-6-IA.md) · [Cartes du parcours →](08-cartes-parcours-technologies.md)

# Exercices IA, marché et audit

Temps de lecture ~18 min · Activités conceptuelles et documentaires ; aucune plateforme payante n'est nécessaire.

## 1. Audit d'un assistant documentaire

**Situation :** un assistant répond à des questions à partir de procédures internes. Il récupère des passages, les envoie au modèle et affiche une réponse avec des références.

### Travail à produire

1. Dessine le flux complet : identité, filtrage des droits, récupération, réponse, validation et journalisation.
2. Identifie où une fuite inter-tenant pourrait se produire : index, filtres, cache, historique, logs et URL de document.
3. Prépare six cas : source absente, source contradictoire, source obsolète, question hors périmètre, utilisateur sans accès, prompt contenant une instruction hostile.
4. Pour chaque cas, écris le comportement attendu : répondre avec preuve, demander une précision, s'abstenir ou refuser.
5. Définis la preuve qui permettra à un reviewer de vérifier la réponse (identifiant du document, version, extrait et règle d'accès).

**Critères de qualité :** les droits sont appliqués avant que le contexte soit fourni au modèle ; une citation est vérifiée ; les cas inconnus n'obligent pas le système à inventer.

## 2. Matrice d'évaluation d'un agent

Choisis une tâche circonscrite : rechercher une fiche, préparer un brouillon, ou classer une demande. Ne commence pas avec un agent qui peut modifier librement des données.

Remplis cette matrice :

| Cas       | Entrée                                | Outil autorisé             | Action attendue                | Contrôle                    | Résultat acceptable           |
| --------- | ------------------------------------- | -------------------------- | ------------------------------ | --------------------------- | ----------------------------- |
| Nominal   | Information complète                  | Recherche lecture seule    | Préparer le brouillon          | Vérifier les sources        | Brouillon sourcé              |
| Ambigu    | Un champ manque                       | Aucun outil d'écriture     | Poser une question             | Pas de supposition          | Demande de précision          |
| Interdit  | Utilisateur hors tenant               | Aucun accès à la ressource | Refuser                        | Vérification serveur        | Aucun contenu divulgué        |
| Rejeu     | Même demande deux fois                | Action avec idempotence    | Ne produire qu'un effet métier | Clé d'idempotence           | Pas de doublon                |
| Panne     | Outil indisponible                    | Aucun contournement        | Signaler la limite             | Timeout borné               | Pas de faux succès            |
| Injection | Document demande d'ignorer les règles | Outils habituels seulement | Traiter comme donnée           | Instruction non privilégiée | Aucun élargissement de droits |

Ajoute au moins trois cas de bord propres à ton domaine. Une suite utile contient des cas adversariaux, pas seulement des exemples qui confirment le comportement attendu.

## 3. Budget d'une fonctionnalité IA

Établis un budget par tâche réussie :

```text
coût total mesuré
  = appels modèle
  + outils externes
  + recherche / stockage
  + reprises et échecs
  + exploitation et surveillance

coût par tâche réussie
  = coût total mesuré / nombre de tâches validées
```

Note le modèle, sa version, la date, les limites, la taille moyenne du contexte, le nombre d'appels et le taux de reprise. N'extrapole pas un prix observé à une autre version ou à un autre fournisseur sans recalcul.

## 4. Lire un chiffre de marché sans le transformer en promesse

Un chiffre n'est utile que si tu peux répondre à cinq questions :

- **Qui ?** population ou pays étudié.
- **Quoi ?** emploi, annonces, missions, réponses d'enquête, revenus ou investissement.
- **Quand ?** période mesurée et date de publication.
- **Combien ?** dénominateur, taille de l'échantillon et exclusions.
- **Limites ?** biais de plateforme, définition, causalité et transfert à ton contexte.

### Exercice de comparaison

Compare, sans additionner leurs pourcentages :

| Source                                                                                                                                                                              | Objet de la mesure                                          | Limite à noter                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| [BLS : projections 2024–2034](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm)                                          | Projections d'emploi par profession aux États-Unis          | Pas une prévision mondiale ni une garantie individuelle            |
| [Indeed Hiring Lab : annonces](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/)                                                           | Indice d'annonces d'emploi, notamment logiciel              | Annonces ≠ embauches ; corrélation ≠ causalité                     |
| [Stack Overflow Survey 2026](https://survey.stackoverflow.co/2026/technology/data)                                                                                                  | Réponses déclarées de développeurs à des questions précises | Échantillon de répondants et dénominateur propre à chaque question |
| [Upwork : compétences IA 2026](https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work) | Demande observée sur une place de marché freelance          | N'est pas l'ensemble du marché du travail                          |

**À rendre :** une note d'une page qui distingue les faits mesurés, les interprétations possibles et les informations manquantes. Écris au moins une conclusion que les données ne permettent pas de tirer.

## 5. Audit de fraîcheur d'une ressource

Choisis une page technique ou réglementaire et complète :

| Champ                                     | Réponse |
| ----------------------------------------- | ------- |
| Identifiant / chemin                      |         |
| Pourquoi la page peut vieillir            |         |
| Affirmations vérifiables                  |         |
| Source primaire                           |         |
| Date de consultation                      |         |
| Version, pays ou population couverte      |         |
| Liens ou ancres à vérifier                |         |
| Exemples qui peuvent devenir trompeurs    |         |
| Correction nécessaire / aucune correction |         |
| Prochaine date de revue                   |         |

Ne change pas `verified_current` simplement parce qu'une URL répond. Il faut lire la source, comparer chaque affirmation matérielle et noter ce qui reste incertain.

## 6. Mini-grille de revue éditoriale

Avant d'accepter une correction Markdown, vérifie :

- le titre annonce réellement le contenu ;
- les termes techniques sont définis avant de devenir des prérequis ;
- un exemple ne contredit pas l'explication ;
- les chiffres ont une date, un périmètre et un dénominateur ;
- une analogie ne remplace pas la règle technique ;
- les liens locaux et ancres pointent vers la bonne ressource ;
- les tâches différées ou facultatives ne deviennent pas silencieusement obligatoires ;
- une simulation n'est pas présentée comme une preuve de production ;
- un statut de revue interne n'est pas présenté comme une expertise indépendante.

## 7. Sources de référence et limites

Les chiffres de marché et les capacités des modèles vieillissent rapidement : ils décrivent une population et une période, pas l'avenir. Les calendriers réglementaires doivent être relus dans le texte officiel avant toute décision. Une revue éditoriale du curriculum ne vaut pas avis juridique, audit de sécurité d'un produit ni validation opérationnelle d'un système.

[← Niveau 6 : IA](06-niveau-6-IA.md) · [Cartes du parcours →](08-cartes-parcours-technologies.md)
