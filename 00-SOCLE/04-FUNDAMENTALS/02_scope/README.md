---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "00-SOCLE/04-FUNDAMENTALS/02_scope/02-scope_basics.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 00-SOCLE/04-FUNDAMENTALS/02_scope/02-scope_basics.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **Repère de navigation :** les leçons portent ici les préfixes `02` à `07`, tandis que `50` à `53` désignent des pratiques associées. Ce ne sont pas des pages 2 à 53 : suis l’ordre de cette liste et la route canonique du module parent.

# SCOPE

> Sommaire de `00-SOCLE/04-FUNDAMENTALS/02_scope`.

## Quand commencer ce dossier

Commence Scope **après Types et les fonctions avancées** (`02-function_basics.md`, puis `03-hof_map_filter.md` dans `03_functions/`). C'est l'étape 7 obligatoire de la route canonique du module parent, même si `noyau: non` classe ce sous-dossier comme une ressource interne de l'arborescence. Les closures étudiées ici servent ensuite au Passage B de Variables et aux Function factories. Ne te fie pas seulement au préfixe `02` du nom de ce dossier pour déterminer sa place.

## Portée des missions Kintana

Les encadrés Kintana répétés dans les leçons de ce dossier renvoient à **un seul handler de notification** à enrichir progressivement. Ils ne demandent pas de reconstruire le même livrable à chaque page. La pratique locale de chaque leçon reste la seule activité de première passe. Les tests automatisés sont repris après le module Testing ; le transfert vers un worker est différé jusqu'à l'étude du runtime correspondant. Ces extensions sont facultatives et ne créent aucune gate supplémentaire.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Scope : où vit ta variable ?](02-scope_basics.md)
- [50-scope_basics_minimini_projet.md](50-scope_basics_minimini_projet.md)
- [01b : Scope lexical, en images](03-b_lexical_scope_visualized.md)
- [51-b_lexical_scope_visualized_minimini_projet.md](51-b_lexical_scope_visualized_minimini_projet.md)
- [Closure trap : la fonction qui n'oublie jamais](04-closure_trap.md)
- [52-closure_trap_minimini_projet.md](52-closure_trap_minimini_projet.md)
- [Scope escape room : la porte est fermée. le code est la clé.](05-scope_escape_room.md)
- [This : un avant-goût avant le vrai cours](06-this_context.md)
- [53-this_context_minimini_projet.md](53-this_context_minimini_projet.md)
- [SCOPE GLOSSARY : Les Mots Que Tu Dois Maîtriser](07-scope_glossary.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
