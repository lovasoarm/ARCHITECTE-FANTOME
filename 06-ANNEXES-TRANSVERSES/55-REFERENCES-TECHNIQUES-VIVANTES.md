---
stability: perissable
perishability_id: PER-0118
review_interval: "3 mois"
acte: reference
noyau: non
route: support
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://opentelemetry.io/docs/
source_type: primary
review_due: "2027-02-03"
source_scope: "Documentation officielle OpenTelemetry : architecture générale, concepts et points d’entrée de la documentation. La page racine est une porte d’entrée, pas une spécification exhaustive de chaque signal ou SDK du curriculum."
provenance_note: "V6.5, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OPENTELEMETRY_OFFICIAL_DOCUMENTATION_ENTRYPOINT_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

# 55 : Références techniques vivantes

Pour distinguer les URLs recensées des faits réellement contrôlés, consulte le [registre des statuts de source V6.5](84-REGISTRE-SOURCES-V6.5.md).

> **Périmètre suivi :** le catalogue entier des références, versions, normes, outils et signaux de marché. Le `source_url` du frontmatter est une ancre de référence (OpenTelemetry), pas la preuve de validité de toutes les entrées listées ici ; chaque source doit être relue pour l’affirmation concernée.

> Vérification ciblée de certaines entrées : 3 novembre 2026. Le reste du catalogue n’est pas certifié par cette date. Ce répertoire est une porte d'entrée, pas une certification de conformité. Avant tout travail réel, contrôler la version, le statut, la date et la compatibilité avec le projet.

## Carrière et portée technique

- [GitLab : Staff/Principal/Distinguished career and job descriptions](https://handbook.gitlab.com/job-description-library/engineering/development/management/): responsabilités actuelles décrites par une entreprise ; à comparer à d'autres grilles et offres, pas à considérer comme standard universel.
- [GitLab : Principal Engineer](https://handbook.gitlab.com/job-description-library/engineering/development/management/principal-engineer/): influence transverse, stratégie, mentorat et impact mesurable.
- [GitLab : Distinguished Engineer](https://handbook.gitlab.com/job-description-library/engineering/development/management/distinguished/): expertise multi-domaines, influence large, architecture et décisions importantes.

## IA et systèmes agentiques

- [NIST AI RMF : AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): cadre volontaire pour identifier et gérer les risques associés à l'IA ; vérifier les mises à jour puisque le cadre est en évolution.
- [NIST : Generative AI Profile, AI 600-1](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence): profil de risques et actions pour les systèmes génératifs.
- [OWASP GenAI : annonce du Top 10 LLM 2026 et de l’Agent Control Standard](https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/): annonce publiée le 2 septembre 2026. Consulter l’édition 2026 avant d’utiliser des catégories historiques ; la présence de cette référence ne certifie pas qu’un système est conforme.
- [MCP : release de spécification du 28 juillet 2026](https://blog.modelcontextprotocol.io/posts/2026-07-28/): point de référence daté pour le protocole ; les SDK évoluent également. Ne pas figer des exercices sur une API non maintenue.
- [Ragas : métriques d'évaluation](https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/): exemples de métriques RAG et agentiques ; les métriques doivent être calibrées pour le cas d'usage, elles ne sont pas des vérités universelles.

## Sécurité logicielle et chaîne d'approvisionnement

- [NIST SP 800-218 : Secure Software Development Framework 1.1](https://csrc.nist.gov/pubs/sp/800/218/final): pratiques de développement sécurisé intégrables au cycle logiciel.
- [NIST SP 800-218 Rev. 1 : initial public draft 1.2](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd): reste identifié comme brouillon public initial (IPD) lors de la consultation du 2 novembre 2026 ; ne pas le citer comme norme finale. La version finale SP 800-218 v1.1 reste la référence finalisée ci-dessus.
- [SLSA : Build track 1.2](https://slsa.dev/spec/v1.2/build-track-basics): niveaux de provenance et durcissement de build ; choisir un niveau démontrable plutôt que déclaratif.

## Observabilité et architectures

- [OpenTelemetry documentation](https://opentelemetry.io/docs/): framework ouvert et neutre vis-à-vis des fournisseurs pour instrumenter, générer, collecter et exporter traces, métriques et logs. Les API, SDK et conventions sémantiques peuvent évoluer : relever les versions dans chaque projet.
- [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/): grille utile de fiabilité, sécurité, coût, opérations et performance ; ses exemples de services sont Azure-spécifiques.
- [PostgreSQL documentation](https://www.postgresql.org/docs/current/) et [archive des releases](https://www.postgresql.org/docs/release/): au 3 novembre 2026, PostgreSQL 18.6 figure parmi les releases stables ; PostgreSQL 19 est en RC1, avec GA planifiée au 19 novembre 2026 dans l’annonce du projet. Une date planifiée peut encore changer. Le moteur maison CrazyDB doit rester pédagogique.
- [Raft : papier et ressources](https://raft.github.io/): point de départ pour les invariants du consensus et les tests de sûreté.
- [Local-first software : Kleppmann et al., Onward! 2019](https://martin.kleppmann.com/2019/10/23/local-first-at-onward.html): propriété des données, hors ligne et systèmes de synchronisation.

## Repères vérifiés avec portée limitée au 3 novembre 2026

- [Node.js Release schedule](https://github.com/nodejs/Release#release-schedule) et [blog des releases](https://nodejs.org/en/blog/release) : au 3 novembre 2026, Node 22 et 24 sont en Maintenance LTS, Node 26 en Active LTS, Node 27 en Alpha ; les dernières releases affichées sont 22.23.4 (21 octobre), 24.22.2 et 26.13.0 (28 octobre). Le pin AF 22.23.4 est conservé pour la reproductibilité ; ce n’est pas la branche LTS la plus récente.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) : référence officielle du langage. [TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/) a été annoncée le 20 octobre 2026 ; elle reste une bêta, pas une version stable à imposer aux apprenants.
- [Playwright : installation et exigences](https://playwright.dev/docs/intro) : vérifier la version Playwright et les versions Node compatibles au moment de l’installation.
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/) : édition générale actuelle retenue pour les risques d’applications web ; elle n’est ni une checklist exhaustive ni une certification.

## Marché du travail et contexte régional : sources consultées le 2 novembre 2026

- [BLS : projections 2024–2034, professions liées à l’IA et aux technologies](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm) et [vue d’ensemble des projections](https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm) : données nationales américaines, projections et non embauches garanties.
- [Indeed Hiring Lab : annonces de développement logiciel et IA, 8 juillet 2026](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/) : annonces américaines, pas un recensement des recrutements.
- [Stack Overflow Developer Survey 2026 : langages](https://survey.stackoverflow.co/2026/technology/data/languages), [données IA](https://survey.stackoverflow.co/2026/ai/data) et [publication des résultats, 6 octobre 2026](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/) : réponses déclaratives des participants, avec dénominateur propre à chaque question.
- [Stanford AI Index 2026 : économie](https://hai.stanford.edu/ai-index/2026-ai-index-report/economy) : adoption organisationnelle mesurée par enquête ; les résultats sur les agents restent distincts de l’adoption globale de l’IA.
- [Anthropic : Agentic coding and persistent returns to expertise, 16 juin 2026](https://www.anthropic.com/research/claude-code-expertise) : analyse d’environ 400 000 sessions Claude Code, pas de tous les développeurs ni de tous les assistants.
- [Upwork : In-Demand Skills 2026](https://www.upwork.com/research/in-demand-skills-2026) et [travail de révision des productions IA, 20 août 2026](https://www.upwork.com/research/ai-generated-work-is-creating-more-work-for-humans) : données propres à la place de marché Upwork.
- [WEF : Future of Jobs Report 2025, Skills Outlook](https://www.weforum.org/publications/the-future-of-jobs-report-2025/3-skills-outlook) : attentes déclarées par des employeurs interrogés, non prédiction certaine.
- [World Bank : Madagascar Economic Update](https://www.worldbank.org/en/country/madagascar/publication/madagascar-economic-update-bridging-the-productivity-divide) et [Education Working Paper No. 21, novembre 2025](https://documents1.worldbank.org/curated/en/099746512082541920/pdf/IDU-dcae1207-ed6e-4383-9c7f-1f2b2dbae522.pdf) : ce dernier cite explicitement une projection IFC de 2019 ; il analyse aussi des annonces 2020–2024 de quatre pays africains, pas de Madagascar.
- [GSMA : The Mobile Economy Africa 2026](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/Africa/) : contribution économique du secteur mobile en Afrique, pas mesure du marché de l’emploi logiciel malgache.
- [Asako : offres à Madagascar](https://www.asako.mg/emploi) et [Recruteo : offres IT](https://recruteo.mg/offres?secteur=Informatique) : tableaux d’offres de plateformes, à consulter à nouveau au moment d’une recherche ; les compteurs et annonces changent.

## Mises à jour officielles ciblées : 3 novembre 2026

Les faits ci-dessous ont été rapprochés des sources primaires à cette date. La vérification porte uniquement sur les éléments décrits dans chaque ligne, pas sur tout le contenu des pages liées ni sur les exercices qui les utilisent.

| Sujet                | Fait vérifié                                                                                                                                                                                                                                                                                                                                                                         | Source primaire                                                                                                                                                                                    | Limite d'interprétation                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Node.js              | 22.x et 24.x : Maintenance LTS ; 26.x : Active LTS ; 27.x : Alpha. Node 22.23.4 (21 oct.), 24.22.2 et 26.13.0 (28 oct.) figurent dans les releases récentes.                                                                                                                                                                                                                         | [Calendrier](https://github.com/nodejs/Release#release-schedule), [releases](https://nodejs.org/en/blog/release)                                                                                   | Aucun test de compatibilité AF sous 24/26 n'est revendiqué.                                          |
| TypeScript           | 7.1 Beta annoncée le 20 octobre 2026.                                                                                                                                                                                                                                                                                                                                                | [Annonce officielle](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/)                                                                                                    | Une bêta ne doit pas être présentée comme stable.                                                    |
| MCP                  | La spécification `2026-07-28` est annoncée comme publiée le 28 juillet 2026.                                                                                                                                                                                                                                                                                                         | [Annonce des mainteneurs](https://blog.modelcontextprotocol.io/posts/2026-07-28/)                                                                                                                  | Les SDK et intégrations évoluent indépendamment ; vérifier leur version.                             |
| OWASP GenAI          | Le projet OWASP GenAI a annoncé le Top 10 LLM 2026 et un Agent Control Standard le 2 septembre 2026.                                                                                                                                                                                                                                                                                 | [Annonce OWASP](https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/) | L'annonce ne valide pas l'implémentation d'un contrôle ni la conformité d'un système.                |
| AI Act UE            | Le règlement (UE) 2026/1744 a été adopté le 8 juillet, publié le 24 juillet et est entré en vigueur le 27 juillet 2026. Les dispositions modifiées conservent des échéances différenciées ; notamment 2 déc. 2026 pour certaines obligations de transparence des systèmes déjà mis sur le marché avant le 2 août 2026, 2 déc. 2027 pour l'Annexe III et 2 août 2028 pour l'Annexe I. | [EUR-Lex FR](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=OJ%3AL_202601744), [FAQ Commission](https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/when-does-enforcement-start)           | Le texte juridique prévaut ; l'applicabilité dépend du rôle, du système et des dispositions exactes. |
| PostgreSQL           | 18.6 est listé dans les releases ; 19 RC1 est annoncé le 15 octobre, avec GA planifiée le 19 novembre 2026.                                                                                                                                                                                                                                                                          | [Release notes](https://www.postgresql.org/docs/release/), [annonce RC1](https://www.postgresql.org/about/news/postgresql-19-rc-1-released-3409/)                                                  | Une release candidate et une date prévue ne sont pas une version GA.                                 |
| Emploi US            | BLS projette +33,5 % pour les data scientists et +15,8 % pour les software developers entre 2024 et 2034.                                                                                                                                                                                                                                                                            | [BLS, 16 juillet 2026](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm)                                                                | Projections nationales américaines, pas prévisions pour Madagascar ni garantie d'embauche.           |
| Enquête développeurs | Stack Overflow indique 30 903 réponses valides de 169 pays ; collecte du 23 juin au 5 août 2026.                                                                                                                                                                                                                                                                                     | [Méthodologie 2026](https://survey.stackoverflow.co/2026/methodology)                                                                                                                              | Enquête auto-déclarée ; les dénominateurs varient selon les questions.                               |

## Règle de renouvellement

Pour chaque dépendance ou protocole touchant sécurité, IA, builds, cryptographie ou agentique, noter : version testée, version consultée, date, changement attendu, risque de migration, stratégie de retour arrière. Les URLs `latest`, `current`, `main` et les pages de blogs sont des points d'entrée mouvants : enregistrer une release/tag ou un commit quand une preuve doit être reproductible.

> **Dernière vérification ciblée : 3 novembre 2026.** Les liens vers les docs d’outils et de normes sont des points de départ ; avant une décision de sécurité, de conformité ou de version, relis la source primaire correspondant à la version réellement utilisée. Une page de référence n’atteste pas qu’un exemple du curriculum a été exécuté.
