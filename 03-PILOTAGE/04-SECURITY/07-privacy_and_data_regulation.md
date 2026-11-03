---
perishability_id: PER-0043

stability: perissable
acte: comprendre
cognitive_level: L6
perturbation_modes: [reglementation, incident, decision_organisationnelle]
anti_recipe_key: regulation+privacy+ai-governance
transfer_distance: high
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_current"
source_type: primary
source_url: https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Règlement (UE) 2024/1689 et amendements applicables repris dans la chronologie officielle de la Commission. Les dates confirmées dans la fiche : application générale 2 août 2026 ; éléments ciblés 2 décembre 2026 ; Annex III 2 décembre 2027 ; Annex I 2 août 2028 ; articles 102 à 110 à partir du 27 juillet 2026. Il s’agit d’un repère pédagogique, pas d’un avis juridique. La page anglaise de chronologie tient explicitement compte du Digital Omnibus ; les traductions/fragments peuvent être moins à jour, l’article 113 consolidé fait foi pour les dates."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_current » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
additional_sources:
  - "https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr"
  - "https://eur-lex.europa.eu/eli/reg/2026/1744/oj?locale=fr"
  - "https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-111"
  - "https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-113"
  - "https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_fr"
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "AI_ACT_ARTICLE_113_AND_ENGLISH_TIMELINE_KEY_DATES_CONFIRMED_2026-11-03"
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

> **SCÈNE CRAZYDEVS : Prison Break :** le but n’est pas de mémoriser des interdictions. Le but est de savoir quelles données existent, pourquoi elles existent, quelle règle les gouverne et quelle décision technique en découle.

# RGPD et AI Act : transformer la contrainte réglementaire en décision technique

Temps de lecture ~14 min

> **Règle de sécurité pédagogique :** une obligation légale, une bonne pratique et une politique interne ne sont pas interchangeables. Quand le texte juridique dépend du contexte, on l’écrit comme tel et on renvoie au texte officiel.

## 1. RGPD : le périmètre n’est pas « toute donnée d’un Européen »

Le RGPD encadre le traitement des données à caractère personnel. Son champ territorial dépend notamment de l’établissement du responsable/sous-traitant et, pour certains acteurs établis hors UE, de l’offre de biens ou services à des personnes dans l’Union ou du suivi de leur comportement dans l’Union.

**À retenir :** ne remplace jamais cette analyse juridique par la règle simpliste « serveur en Europe / utilisateur européen ». Le contexte et l’activité de traitement comptent.

**Source primaire :** Règlement (UE) 2016/679, article 3 (champ territorial).
Vérification : 2 novembre 2026.
https://eur-lex.europa.eu/eli/reg/2016/679/oj

### Principes qui changent ton code

```text
Minimisation       → ne collecter que ce qui est nécessaire à la finalité
Finalité           → ne pas réutiliser une donnée sans base et finalité compatibles
Conservation       → définir une durée/règle de conservation liée au besoin
Exactitude         → permettre correction/rectification quand nécessaire
Sécurité           → réduire les risques de perte, accès ou divulgation non autorisés
Droits des personnes → concevoir les flux pour répondre aux demandes applicables
Privacy by design  → intégrer ces contraintes avant de figer le schéma et les API
```

## 2. Droit à l’effacement : un droit conditionnel, pas « delete everything »

L’article 17 du RGPD prévoit le droit à l’effacement dans certaines situations. Le droit n’est pas absolu : le règlement prévoit aussi des exceptions, notamment lorsque la conservation est nécessaire pour certaines obligations légales ou pour l’établissement, l’exercice ou la défense de droits en justice.

**Source primaire :** RGPD, article 17.
Vérification : 2 novembre 2026.
https://eur-lex.europa.eu/eli/reg/2016/679/oj

### Conséquence d’architecture

Quand une personne demande l’effacement, ne commence pas par coder une fonction `deleteEverything()`. Commence par une cartographie :

```text
identité
→ finalités
→ systèmes
→ copies
→ obligations de conservation
→ exceptions applicables
→ suppression / anonymisation / restriction
→ notification des sous-traitants si nécessaire
→ vérification post-action
```

Exemple de squelette :

```js
async function handleErasureRequest(subjectId, context) {
  const inventory = await dataMap.findSubjectData(subjectId);
  const decisions = await privacyPolicy.decide(inventory, context);

  for (const item of decisions) {
    if (item.action === "erase") await item.store.erase(item.selector);
    if (item.action === "anonymize") await item.store.anonymize(item.selector);
    if (item.action === "retain")
      await item.store.restrictToPurpose(item.selector);
  }

  await verifier.confirm(decisions);
}
```

Le code est un exemple de structure de décision. Il ne constitue pas un avis juridique.

## 3. Pseudonymisation ≠ anonymisation

L’EDPB distingue clairement les deux. La pseudonymisation réduit la possibilité de relier directement les données à une personne, mais reste compatible avec une ré-attribution lorsqu’une information supplémentaire existe. L’anonymisation vise au contraire à rendre les données non attribuables à une personne selon les moyens raisonnablement susceptibles d’être utilisés.

**Source officielle :** EDPB, page Anonymisation / pseudonymisation.
Vérification : 2 novembre 2026.
https://www.edpb.europa.eu/topics/ai-and-technology/anonymisation-pseudonymisation_en

### Pourquoi `authorId: null` n’est pas une preuve d’anonymisation

```js
// Ce code supprime un identifiant direct. Il ne prouve pas l'anonymisation.
function removeDirectIdentifier(comment) {
  return { ...comment, authorId: null };
}
```

Il faut ensuite analyser les quasi-identifiants, les liens entre tables, les journaux, les métadonnées et les possibilités raisonnables de ré-identification.

En 2026, l’EDPB a publié la **version 1** de ses _Guidelines 02/2026 on Anonymisation_ pour consultation publique, ouverte du 8 juillet au 30 octobre 2026. La page officielle indique que cette consultation est close. Au 2 novembre 2026, le document doit donc être qualifié de **projet soumis à consultation**, et non de lignes directrices finales adoptées. Il peut éclairer l'analyse, mais ne remplace ni le RGPD, ni une décision juridique applicable au contexte. Avant de s'appuyer sur une version ultérieure, vérifier l'état de publication sur la [page officielle de la consultation EDPB](https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_en) et la [page du document](https://www.edpb.europa.eu/documents/guideline/guidelines-022026-on-anonymisation_en).

## 4. AI Act : séparer statut juridique, transparence et politique interne

L’AI Act applique une approche fondée sur le risque. Les obligations ne sont pas identiques pour tous les systèmes.

État documentaire : vérification ciblée du règlement modificatif le **3 novembre 2026** ; autres points juridiques à confirmer dans leur source primaire. Le règlement (UE) 2024/1689 a été modifié par le règlement (UE) 2026/1744 (Digital Omnibus). Ce règlement modificatif a été adopté le 8 juillet 2026, publié au Journal officiel le 24 juillet et est entré en vigueur le 27 juillet 2026. La page EUR-Lex le classe « en vigueur » ; il ne s’agit plus d’une simple proposition. La date générale d’application reste le 2 août 2026, mais les dates diffèrent selon les dispositions et certaines transitions ont été précisées.

**Repères d’application (lecture simplifiée) :**

- Les chapitres I et II s’appliquent depuis le 2 février 2025. Certaines dispositions ajoutées ou modifiées à l’article 5 (points et paragraphes expressément énumérés à l’article 113) s’appliquent à partir du **2 décembre 2026**.
- Plusieurs dispositions de transparence de l’article 50 s’appliquent depuis le **2 août 2026**. Une transition particulière concerne les fournisseurs de systèmes générant des contenus synthétiques audio, image, vidéo ou texte : y compris les systèmes d’IA à usage général : mis sur le marché avant le 2 août 2026 : ils prennent les mesures nécessaires pour respecter l’article 50, paragraphe 2, au plus tard le **2 décembre 2026**.
- Pour les systèmes classés à haut risque selon l’article 6, paragraphe 2, et l’annexe III, les chapitres III, sections 1 à 3, s’appliquent à partir du **2 décembre 2027**.
- Pour les systèmes classés à haut risque selon l’article 6, paragraphe 1, et l’annexe I (produits réglementés), le calendrier correspondant commence le **2 août 2028**.
- Les systèmes d’IA qui sont des composants de systèmes informatiques à grande échelle visés à l’annexe X et mis sur le marché ou en service avant le 2 août 2027 doivent être mis en conformité au plus tard le **31 décembre 2030**.
- Pour certains systèmes à haut risque déjà mis sur le marché ou en service avant les dates d’application du chapitre III, l’article 111 prévoit une transition : l’application peut dépendre d’une modification importante de conception après la date pertinente. En tout état de cause, les fournisseurs et déployeurs de systèmes à haut risque destinés aux autorités publiques prennent les mesures nécessaires au plus tard le **2 août 2030**.
- Les fournisseurs de modèles d’IA à usage général mis sur le marché avant le 2 août 2025 prennent les mesures nécessaires pour respecter les obligations prévues au plus tard le **2 août 2027**.

Ces dates ne signifient pas que toutes les obligations s’appliquent à tous les systèmes. La qualification dépend du rôle de l’acteur, du type de système, de sa destination, de sa date de mise sur le marché ou de mise en service et des dispositions exactes applicables.

**Sources juridiques officielles :** [texte du règlement modificatif (UE) 2026/1744 sur EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=OJ%3AL_202601744), [identifiant ELI du règlement](https://eur-lex.europa.eu/eli/reg/2026/1744/oj?locale=fr), [chronologie officielle d’application de l’AI Act, tenant compte du Digital Omnibus](https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline), [AI Act : article 111 : systèmes déjà mis sur le marché](https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-111), [AI Act : article 113 : entrée en vigueur et application](https://ai-act-service-desk.ec.europa.eu/fr/ai-act/article-113), [texte consolidé de l’AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=fr).

Cette page est une synthèse pédagogique des textes cités, revue sur les sources officielles le 2 novembre 2026. Elle ne constitue ni un avis juridique, ni une revue DPO, ni une évaluation de conformité d’un produit ou d’un traitement. Une décision concrète doit être prise à partir du texte applicable et du contexte avec les personnes qualifiées compétentes.

### Ce qu’un chatbot doit enseigner

La transparence dépend du champ d’application concret de l’article 50 et du type de système. Une interface ne doit pas créer une fausse impression de certitude réglementaire.

```js
function renderChatMessage(text, { generatedByAI, transparencyRequired }) {
  const badge =
    generatedByAI && transparencyRequired
      ? '<span class="ai-badge">Réponse générée par IA</span>'
      : "";

  return `<div class="message">${badge}${escapeHtml(text)}</div>`;
}
```

**Important :** `transparencyRequired` est une décision de classification/implémentation déterminée par le champ d’application applicable ; ce n’est pas une constante universelle « tout LLM = badge ».

### Système à haut risque : ne pas inventer un seuil universel

Un exemple de système interne peut choisir un seuil de confiance, mais un seuil comme `0.8` n’est pas une exigence universelle de l’AI Act.

```js
const HUMAN_REVIEW_THRESHOLD = policy.aiHumanReviewThreshold;

async function scoreApplication(application) {
  const result = await aiModel.predict(application);

  await auditLog.record({
    modelVersion: aiModel.version,
    relevantInputs: application.relevantFields,
    output: result.score,
    confidence: result.confidence,
    timestamp: new Date().toISOString(),
    requiresHumanReview: result.confidence < HUMAN_REVIEW_THRESHOLD,
  });

  return result;
}
```

La politique de seuil doit être justifiée par le contexte, validée, testée et révisée ; ne pas la présenter comme une obligation réglementaire générique.

## 5. Logging : politique de minimisation et preuve de besoin

```text
JAMAIS sans justification et contrôle → mot de passe, token, secret, CVV, code 2FA
À minimiser                          → email complet, nom complet, adresse IP, contenu utilisateur
Pouvant être utile                  → identifiant technique, action, horodatage, résultat
Préférer                            → métriques agrégées et journaux structurés minimisés
```

Le point important n’est pas « cette donnée est toujours interdite » mais :

```text
but
→ nécessité
→ base / politique applicable
→ minimisation
→ accès
→ durée de conservation
→ suppression / rotation
```

## 6. EXERCICES

### EXO 1 : AUDIT DE FOX RIVER

Le système logue actuellement `req.body`. Identifier les champs sensibles, définir une politique `sanitizeForLog(payload)` et justifier chaque champ conservé.

### EXO 2 : DEMANDE D’EFFACEMENT

Un supporter demande la suppression de ses données. Construire un inventaire des systèmes, classer chaque copie en `erase / anonymize / retain / restrict`, puis écrire le workflow technique qui exécute les décisions.

### EXO 3 : BADGE DE TRANSPARENCE IA

Déterminer si l’interface relève des obligations de transparence applicables, documenter l’hypothèse, puis implémenter le mécanisme d’affichage et la preuve de décision.

### EXO 4 : ANONYMISATION OU PSEUDONYMISATION ?

Pour trois datasets, démontrer pourquoi une opération proposée réduit ou ne réduit pas suffisamment la ré-identification. Demander explicitement quel adversaire et quelles informations auxiliaires sont considérés.

## CHECKPOINT DE PROFONDEUR

Sans relire : cite une règle juridique, une bonne pratique et une décision interne qui pourraient sembler similaires mais qui doivent rester séparées. Pour chacune, donne une observation qui te ferait revoir ton choix.

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **RGPD et AI Act : transformer la contrainte réglementaire en décision technique** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « RGPD et AI Act : transformer la contrainte réglementaire en décision technique » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.
