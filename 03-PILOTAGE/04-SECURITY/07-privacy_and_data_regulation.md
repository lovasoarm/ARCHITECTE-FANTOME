## perishability_id: PER-0043

stability: perissable
acte: comprendre
cognitive_level: L6
perturbation_modes: [reglementation, incident, decision_organisationnelle]
anti_recipe_key: regulation+privacy+ai-governance
transfer_distance: high
assessment_role: diagnostic_mastery
review_due: 2027-08-23

---

> **SCÈNE CRAZYDEVS : Prison Break :** le but n’est pas de mémoriser des interdictions. Le but est de savoir quelles données existent, pourquoi elles existent, quelle règle les gouverne et quelle décision technique en découle.

# RGPD et AI Act : transformer la contrainte réglementaire en décision technique

Temps de lecture ~14 min

> **Règle de sécurité pédagogique :** une obligation légale, une bonne pratique et une politique interne ne sont pas interchangeables. Quand le texte juridique dépend du contexte, on l’écrit comme tel et on renvoie au texte officiel.

## 1. RGPD : le périmètre n’est pas « toute donnée d’un Européen »

Le RGPD encadre le traitement des données à caractère personnel. Son champ territorial dépend notamment de l’établissement du responsable/sous-traitant et, pour certains acteurs établis hors UE, de l’offre de biens ou services à des personnes dans l’Union ou du suivi de leur comportement dans l’Union.

**À retenir :** ne remplace jamais cette analyse juridique par la règle simpliste « serveur en Europe / utilisateur européen ». Le contexte et l’activité de traitement comptent.

**Source primaire :** Règlement (UE) 2016/679, article 3 (champ territorial).
Vérification : 23 août 2026.
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
Vérification : 23 août 2026.
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
Vérification : 23 août 2026.
https://www.edpb.europa.eu/topics/ai-and-technology/anonymisation-pseudonymisation_en

### Pourquoi `authorId: null` n’est pas une preuve d’anonymisation

```js
// Ce code supprime un identifiant direct. Il ne prouve pas l'anonymisation.
function removeDirectIdentifier(comment) {
  return { ...comment, authorId: null };
}
```

Il faut ensuite analyser les quasi-identifiants, les liens entre tables, les journaux, les métadonnées et les possibilités raisonnables de ré-identification.

L’EDPB a publié en 2026 des lignes directrices sur l’anonymisation et rappelle que l’anonymisation et la pseudonymisation sont des sujets distincts ; les méthodes doivent être évaluées au regard du risque de ré-identification.

## 4. AI Act : séparer statut juridique, transparence et politique interne

L’AI Act applique une approche fondée sur le risque. Les obligations ne sont pas identiques pour tous les systèmes.

Au **23 août 2026** :

- les obligations de transparence de l’article 50 sont applicables depuis le 2 août 2026 ;
- certaines obligations concernant les systèmes à haut risque de l’annexe III sont reportées au 2 décembre 2027 ;
- les règles relatives aux systèmes d’IA intégrés dans des produits réglementés de l’annexe I ont un calendrier distinct allant jusqu’au 2 août 2028.

**Sources officielles :** Commission européenne, AI Act et calendrier d’application.
Vérification : 23 août 2026.
https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act

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
