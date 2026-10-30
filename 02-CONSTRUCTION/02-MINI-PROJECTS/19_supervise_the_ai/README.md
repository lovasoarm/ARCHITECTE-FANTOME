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

## Gate de supervision : vérifier avant d'accepter

La séquence de prompts et les reviews ne valent que si elles montrent une décision réelle et une vérification indépendante de la sortie générée.

1. Écris un contrat de sortie et trois propriétés d'acceptation avant le premier prompt.
2. Demande une unité de travail petite, traçable et testable ; lie chaque étape aux ADR pertinents.
3. Examine le changement et les tests ; ne te contente pas du résumé de l'IA.
4. Rejette au moins une proposition pour une raison technique vérifiable, puis reformule la demande.
5. Injecte un cas absent du prompt initial et montre que le test ou la revue le détecte.
6. Documente les limites restantes, les dépendances supposées et les opérations que l'agent n'a pas prouvées.

**Gate :** une exécution qui passe trois fois n'est pas une preuve suffisante si les tests n'observent pas l'invariant ciblé. Une review doit citer le risque, la preuve et la décision (garder, modifier ou rejeter). Complète avec [60 : Service IA/RAG](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md), [66 : Sécurité/architecture](../../../06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md) et [67 : Gate de maîtrise](../../../06-ANNEXES-TRANSVERSES/67-GATE-MAITRISE-ET-CAPSTONE.md).

---

## État des tests et point de départ (référence AF)

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État des tests à la réception

- **Tests de référence verts dès le départ :** aucun test d'application n'est fourni.
- **Scénario volontairement incomplet :** `tests/scenario.sh` est explicitement un squelette `TODO` qui termine par `exit 1`. Son échec initial est attendu ; il ne prouve pas que le système de supervision est cassé.
- **Tests à créer :** implémenter le scénario de reprise, interruption après le deuxième fichier, reprise sans doublon ni saut, rejeu déterministe, validation des événements et tests de sécurité du protocole.
- **Validation finale :** compléter le script, rendre son exécution sûre et isolée, puis rejouer trois fois depuis un état propre. Documenter le résultat et les journaux.

Le dossier `src/` contient un README, pas une implémentation. Le système supervisé est le livrable de l'apprenant.

### Détails d’implémentation et de validation à la réception

- **Code fourni :** aucun système d'agent, watcher ou notifier dans `src/`. `prompts/README.md` et `reviews/README.md` décrivent les artefacts à produire.
- **Tests de référence verts :** aucun.
- **Scénario volontairement incomplet :** `tests/scenario.sh` contient un `TODO` puis `exit 1`. `bash tests/scenario.sh` échoue donc explicitement par conception à la réception ; ce n'est pas un runner de production.
- **Prérequis :** Bash et les outils réellement choisis par l'apprenant. Toute dépendance réseau/IA doit avoir un mode simulé ; les secrets doivent rester hors des prompts et des journaux.
- **Tests à créer :** arrêt forcé après le deuxième fichier, reprise sans doublon ni omission, rejeu déterministe, ordre et intégrité des événements, permissions, prompt injection, sortie non fiable et échec du modèle.
- **Validation finale :** isoler un dossier temporaire, implémenter scénario et services, rejouer trois fois depuis un état propre et conserver journaux/états. La gate d'au moins cinq reviews et un rejet total reste une preuve humaine à documenter, pas un test automatique.
- **Preuve :** chaque décision d'acceptation/rejet cite changement, risque, test indépendant et résultat observé.
