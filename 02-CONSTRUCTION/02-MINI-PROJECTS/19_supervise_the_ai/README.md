---
stability: intemporel
---

[PORTFOLIO]
[ATELIER]

# 19 : SUPERVISE THE AI

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~10h (reparties sur 3 sessions), 19e mini-projet ajoute suite a la
revue (point 5). Verrouille le passage **Kick-Ass -> Thor** : tu ne
livres **aucune ligne de code applicatif**. Tu es l'architecte-superviseur.

## Pourquoi ce projet existe

Les 18 mini-projets precedents t'ont fait ecrire du code. Celui-ci teste
la **6e pierre** dans le cadre IA/agentique visé par le profil 2035+ : tu diriges une IA qui code un
petit systeme distribue. Ton livrable est **la trace de la supervision**,
pas le code produit.

Si tu es tente d'ecrire une ligne de code applicatif, tu as rate la gate
de ce mini-projet. La seule exception : les scripts de verification
(`tests/`) et les prompts (`prompts/`).

## Cahier des charges du systeme a faire produire

Un **file-drop notifier** minimal :

- 2 processus Node locaux :
  - `watcher/` : surveille un dossier `inbox/`, publie un evenement
    JSON append-only dans `events.log` a chaque nouveau fichier ;
  - `notifier/` : consomme `events.log`, imprime une ligne
    horodatee sur stdout par fichier, **idempotent** face aux replays.
- Contrainte non negociable : `notifier` doit survivre a un `kill -9`
  entre deux fichiers, sans doublonner ni sauter d'evenement au restart.
- Metrique de succes : `tests/scenario.sh` (a ecrire par toi, humain,
  seule exception au no-code) passe sur 3 runs consecutifs.

## Ce que tu livres (rien d'autre)

1. **`ADR/`** : au moins **3 ADR** signes de ta main, qui posent :
   - le choix du format d'evenement (JSON Lines vs JSON array vs
     binaire) et pourquoi ;
   - la strategie d'idempotence (offset persiste vs hash dedup) ;
   - le contrat d'erreur cote `notifier` (crash-loop vs backoff).
2. **`prompts/`** : la sequence integrale des prompts envoyes a l'IA,
   dans l'ordre, un fichier `NN_prompt.md` par etape. Chaque prompt doit
   citer l'ADR qui l'a motive.
3. **`reviews/`** : une revue de code IA par livraison de l'IA.
   Format impose : `NN_review.md` avec sections
   `## Ce que je garde`, `## Ce que je fais reecrire`, `## Pourquoi`.
   Minimum **5 reviews**, dont **au moins 2** avec un rejet total et une
   reformulation de prompt.
4. **`08-POSTMORTEM.md`** : ce que la supervision t'a appris sur la
   difference entre "savoir coder" et "savoir faire coder juste".
5. **`SECURITY_GATE_FILLED.md`** (voir `04-SECURITY-GATE.md`) : rejoue la
   gate OWASP Top 10 **avant** de rediger le POSTMORTEM. La supervision
   n'exempte pas de la gate.

## Regle de blocage (Thor test)

Le mini-projet **n'est pas termine** si :
- il manque un ADR ;
- moins de 5 reviews ;
- aucune review ne contient un rejet total ;
- une seule ligne de code applicatif porte ta signature.

## Rattachement au curriculum

- Prerequis : tous les mini-projets 01 -> 18, en particulier
  `03_walking_dead_protocol`, `14_system_design_lab`,
  `16_distributed_arena`, `03-PILOTAGE/11-LEADERSHIP-MENTORAT/05-standards_pour_agents.md` et `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/06-IA-GOVERNANCE-SECURITY.md`.
- Aucun impact sur les modules 01 -> 29 : greffe pure sur
  `02-CONSTRUCTION/02-MINI-PROJECTS/`.
