---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: "Le besoin de transférer ses compétences, documenter son travail, défendre ses décisions et préserver une pratique soutenable reste durable ; chaque ressource conserve toutefois son propre statut de pérennité."
cognitive_level: L4
perturbation_modes: [solution_concurrente, changement_contexte]
anti_recipe_key: solution_concurrente+changement_contexte
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, les portes et les équipes ont des responsabilités différentes. Les annexes sont la réserve d'outils du parcours : elles aident à retrouver une méthode quand le problème se présente, sans remplacer l'entraînement principal.

> **Statut de pérennité :** **intemporel** pour la fonction de référence de ce dossier. Les annexes individuelles peuvent être intemporelles, évolutives ou périssables ; consulte leur propre statut et vérifie les éléments datés avant de les réutiliser.

# Pourquoi les annexes existent

Temps de lecture indicatif : 4 min.

Le parcours principal enseigne les mécanismes techniques et leur mise en pratique. Les annexes complètent ce travail : elles aident à transférer une compétence vers un autre contexte, à expliquer un choix, à préparer une revue, à documenter une preuve ou à prendre soin de la qualité du travail dans la durée.

Elles ne constituent pas un second parcours à lire de bout en bout. Ce sont des ressources de référence à ouvrir lorsqu'une étape du parcours les recommande ou lorsqu'une question précise apparaît.

<!-- AF-DIAGRAM:annex-navigation -->

```text
question ou blocage précis
          |
          v
annexe ciblée + prérequis + pérennité
          |
          v
application sur un artefact
          |
          v
résultat + limite + preuve
          |
          v
retour à la route principale
```

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** les annexes évitent de refaire tout un module lorsqu'une question ciblée revient et donnent des formats pour documenter, transférer ou défendre un travail.
- **Quand les utiliser / quand les éviter :** ouvre une annexe lorsque la route la cite ou lorsqu'un problème précis justifie son contenu. N'en fais pas une lecture obligatoire avant la première pratique et ne remplace pas une leçon canonique par un simple index.
- **Limites :** une fiche de référence n'est ni une certification, ni une preuve d'expérience, ni une garantie que son contenu volatile est encore à jour. Vérifie le statut, les prérequis et les sources de chaque ressource.

## Mécanisme : trouver, appliquer, revenir

Formule la question ; sélectionne l'annexe qui la traite ; vérifie son statut de pérennité et ses prérequis ; applique une seule méthode à un artefact ; conserve le résultat et sa limite ; retourne ensuite à l'étape de la Route 58.

## Ce que tu trouveras ici

- **Transférabilité :** [`30_transferability/`](30_transferability/README.md) propose des exercices pour comparer les mécanismes entre JavaScript, Python, Go, Rust et d'autres contextes. Le concept peut se transférer ; la syntaxe, les garanties et les conventions doivent être vérifiées dans le langage cible.
- **Entretiens :** [`19_interview/`](19_interview/README.md) et [`11-interview_arena.md`](11-interview_arena.md) proposent des simulations, des objections et des grilles de préparation. Une simulation prépare à l'échange ; elle ne prédit pas le résultat d'un vrai entretien.
- **Portfolio :** [`14-portfolio_publication.md`](14-portfolio_publication.md) aide à publier des artefacts que tu es autorisé à montrer, avec leur contexte, leur licence et leurs limites.
- **Carrière :** [`06-career_pivot.md`](06-career_pivot.md) et [`16_career/`](16_career/README.md) proposent des outils de réflexion et de planification. Les délais proposés sont des plans de travail, pas des garanties d'emploi ou de maîtrise.
- **Décisions et éthique :** [`05-when_not_to_code.md`](05-when_not_to_code.md), [`08-ethics_and_licenses.md`](08-ethics_and_licenses.md), [`09-legal_employability.md`](09-legal_employability.md) et [`13-trade_off_arena.md`](13-trade_off_arena.md) aident à examiner les conséquences non techniques d'un choix.
- **FinOps et soutenabilité :** [`04-finops_greenops.md`](04-finops_greenops.md) relie les décisions d'ingénierie aux coûts et aux impacts environnementaux, avec des hypothèses à vérifier.
- **Toolchain :** [`29_toolchain/`](29_toolchain/README.md) regroupe des ressources sur Git, les gestionnaires de paquets, les bundlers, Docker et l'intégration continue. Les versions et commandes doivent être vérifiées au moment de l'utilisation.

## Pourquoi elles sont utiles

Une compétence technique devient plus transférable lorsque tu sais expliquer le problème, défendre tes hypothèses, montrer une preuve et reconnaître ce qu'elle ne démontre pas. Les annexes donnent des formats pour pratiquer ces gestes : étude de cas, note de décision, revue, journal de transfert, dossier de portfolio ou plan de carrière.

Elles ne transforment pas automatiquement un apprenant en ingénieur expérimenté. La maîtrise dépend toujours des pratiques réalisées, de la qualité des preuves, de la diversité des contextes et, pour certaines compétences, du retour de personnes qui ont réellement travaillé avec toi.

## Le piège à éviter

Ne traite pas le dépôt comme une liste de lecture obligatoire. Ouvre une annexe pour répondre à une question précise, puis retourne à l'étape principale. Une fiche de référence ne remplace pas la leçon canonique, le challenge du module ou la pratique du parcours.

Les outils, prix, règles juridiques, marchés et offres d'emploi peuvent évoluer. Vérifie leur date et leur source officielle avant de t'appuyer dessus. Une date de révision interne ne garantit pas qu'une source externe ait été reconsultée.

## Ancrage produit / terrain : Kintana

Une tranche de Kintana déjà réalisée peut devenir un dossier de preuve, une étude de cas de portfolio ou le support d'une décision d'architecture. Si Kintana n'est pas encore dans ta route, prends un artefact du Socle ou du Cadrage : cette page ne crée aucun prérequis ni obligation de construire le produit complet. Sépare toujours les résultats `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` et `PRODUCTION`.

## Signal d'utilité et limite

Une annexe est utile si elle permet de résoudre une question ciblée ou de produire un artefact plus clair et vérifiable. Si un exemple manque, note précisément la situation où tu en as besoin ; ne conclus pas qu'une ressource entière est inutile sur ce seul critère.

## À la fin

Les annexes t'aident à préparer la défense de ton travail, à transférer tes compétences et à faire évoluer tes pratiques. Elles ne remplacent ni l'expérience réelle, ni les obligations professionnelles, ni une revue indépendante lorsque celle-ci est nécessaire.

## Mission utile : choisir et appliquer une annexe

Choisis une difficulté réelle de ton parcours : expliquer une décision, transférer un mécanisme, publier un projet ou préparer un entretien. Sélectionne une seule annexe adaptée et applique-la à un artefact déjà produit.

**Livrable :** l'artefact amélioré, la question initiale, la ressource utilisée et une note indiquant ce qui a changé.

**Critères d'acceptation :** la ressource répond à la question choisie ; l'artefact conserve son contexte et ses limites ; toute information volatile est vérifiée ou étiquetée « à confirmer » ; aucune expérience simulée n'est présentée comme réelle.

**Vérification :** demande à une autre personne, ou à toi-même après un délai, d'identifier dans l'artefact le problème de départ, le changement apporté et ce qui reste non démontré. Si ces trois éléments ne sont pas compréhensibles, clarifie le dossier avant de le présenter comme une preuve.

## Transfert

Reprends la même difficulté dans un autre contexte professionnel. Identifie ce qui se transfère, ce qui doit être adapté et quelle source ou personne compétente doit être consultée avant d'appliquer la méthode.
