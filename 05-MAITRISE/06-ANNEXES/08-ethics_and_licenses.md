---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Éthique & Licences (annexe indispensable)

Temps de lecture ~6 min

> **PÉRISSABLE / À VÉRIFIER** : le droit et les licences changent moins vite que les frameworks, mais les conditions applicables peuvent évoluer. Vérifie les textes primaires avant toute décision de production.

## 1. Licences OSS de base

| Licence    | Peux-tu vendre ? | Dois-tu ouvrir tes modifs ?                                                                                                                                                 | Attribution ? |
| ---------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| MIT        | Oui              | Non                                                                                                                                                                         | Oui (notice)  |
| Apache 2.0 | Oui              | Non                                                                                                                                                                         | Oui + brevets |
| BSD-3      | Oui              | Non                                                                                                                                                                         | Oui           |
| GPL v3     | Oui              | Copyleft sur les œuvres dérivées/distribuées dans le champ de la licence ; le périmètre exact dépend de la combinaison et de la distribution.                               | Oui           |
| LGPL       | Oui              | Règles spécifiques selon les modifications et la manière dont la bibliothèque est liée/redistribuée.                                                                        | Oui           |
| AGPL       | Oui              | Le copyleft s'applique aux œuvres couvertes ; des obligations supplémentaires existent lors de l'interaction à distance avec le logiciel dans les conditions de la licence. | Oui           |
| Unlicense  | Oui              | Non                                                                                                                                                                         | Non           |
| Proprio    | Selon contrat    | -                                                                                                                                                                           | -             |

### Piège classique

Mixer un composant **GPL** avec un autre composant ne signifie pas automatiquement que « tout le dépôt devient GPL ». Le résultat dépend de la nature de la combinaison, de la création éventuelle d'une œuvre dérivée et de la manière dont le logiciel est distribué. Toujours vérifier le texte de la licence, les notices et les conditions de combinaison avant de distribuer.

### Discipline de preuve juridique

Ce document enseigne un raisonnement, pas un avis juridique. Toute affirmation de type « obligatoire », « interdit » ou « applicable » doit préciser : le texte concerné, le périmètre, la juridiction, la date de vérification et les exceptions pertinentes. En cas de combinaison de licences ou de sortie IA litigieuse, escalader vers le texte de licence ou le conseil juridique compétent.

## 2. Code généré par IA : statut juridique

État en 2026 (à re-vérifier tous les 6 mois : **PÉRISSABLE**) :

- **USA** : le Copyright Office indique que la protection peut porter sur des éléments où un humain a déterminé suffisamment d'expression ; un prompt seul n'établit pas automatiquement une paternité humaine suffisante.
- **EU (AI Act)** : certaines obligations de transparence et d'information s'appliquent selon le type de système et l'usage ; d'autres obligations concernent les systèmes à haut risque ou les modèles GPAI. Ne transpose pas une obligation de transparence ou de documentation à une catégorie qui n'y est pas juridiquement soumise.
- **Reproduction littérale d'un training set** : plusieurs procès en cours
  (assistant de code, Stability). Tant que non tranchés, **assume que la sortie IA
  peut contenir du code sous licence**.

### Règles Thor

1. Ne demande **jamais** à l'IA de "reproduire l'algorithme de X". Demande
   un algorithme, décris-le fonctionnellement.
2. Passe toute sortie IA dans un scanner de licence (ex: `licensee`, `scancode`).
3. Documente dans `AI_USAGE.md` : quand tu as utilisé l'IA, sur quel code,
   quelle validation.
4. Pour du code destiné à un client / employeur : vérifie leur politique
   IA **avant** de coller quoi que ce soit.

## 3. Éthique : au-delà du légal

- **Consentement** : si tu scrapes, respecte robots.txt, rate-limit, ToS.
- **Vie privée** : minimise les données collectées (GDPR "minimisation").
- **Biais** : si tu entraînes un modèle, mesure les biais sur les groupes
  protégés. Documente les limites dans un "model card".
- **Dark patterns** : refuse d'implémenter des interfaces qui trompent
  le shinobi (opt-out caché, faux boutons, honte du décochage).
- **Impact énergétique** : voir `05-MAITRISE/06-ANNEXES/04-finops_greenops.md`.

## 4. Checklist avant de publier

- [ ] `LICENSE` clair à la racine.
- [ ] `NOTICE` si Apache ou dépendances avec attributions.
- [ ] `AI_USAGE.md` transparence sur le code assisté.
- [ ] Audit `npm audit` + `licensee` en CI.
- [ ] `PRIVACY.md` si tu collectes de la donnée shinobi.

## (attention) Ce que l'analogie "c'est juste du code" cache

Le code est un **produit juridique**. Ce que tu écris (ou colles) crée des
obligations pour toi, ton employeur, tes shinobis. L'ignorance ne
protège pas.

## Le piège du code GPL craché par assistant de code

Une sortie d'IA peut présenter un risque de licence, d'incompatibilité ou de provenance. Ne présume pas une violation automatique : identifie la provenance lorsque c'est possible, vérifie la licence applicable et la politique de l'organisation, puis fais valider les cas ambigus.

**Protocole minimum :**

1. Tout snippet > 20 lignes venant d'une IA : grep sur GitHub, vérifie l'absence de match exact.
2. Doute ? Réécris-le. Zéro copier-coller aveugle.
3. En entreprise : politique claire écrite. En perso : mentionne "IA-assisted" dans le README si tu diffuses.

Voir aussi : SPDX license identifiers, `license-checker` npm package.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Sources primaires

- GNU GPL FAQ : https://www.gnu.org/licenses/gpl-faq.html
- U.S. Copyright Office : AI copyrightability : https://www.copyright.gov/newsnet/2025/1060.html
- U.S. Copyright Office : AI registration guidance : https://www.copyright.gov/ai/ai_policy_guidance.pdf
- AI Act (EUR-Lex) : https://eur-lex.europa.eu/eli/reg/2024/1689/oj

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Un projet propriétaire souhaite intégrer une bibliothèque publiée sous licence copyleft forte. L'équipe ne conclut pas que « open source = libre d'usage sans condition » : elle lit le texte de licence, vérifie le mode d'intégration et les obligations de redistribution, compare une alternative permissive et documente sa décision avec le responsable juridique si l'impact contractuel est important. **Décision :** ne pas publier l'artefact avant d'avoir compris les obligations applicables. Ce scénario est pédagogique et ne remplace pas un avis juridique.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Éthique & Licences (annexe indispensable) » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:security -->

## Repère visuel utile : Contrôle d'accès multi-rôle et multi-tenant

```text
requête + identité authentifiée
             |
             v
      autorisation ressource/action
        |               |
        v               v
      autorisé         refus
        |               |
        v               v
règle métier + audit   réponse neutre + audit
```

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Éthique & Licences (annexe indispensable)** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « Éthique & Licences (annexe indispensable) » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.
