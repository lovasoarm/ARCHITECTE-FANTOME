---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

<!-- AF-DIAGRAM:transfer -->

```text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Temps de lecture ~2 min

Module : **01-CADRAGE/02-ASYNC** : callbacks, promises, async/await, event loop, backpressure.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : `asyncio` reprend la meme regle (une seule boucle d'evenements, une seule pile logique), meme mot-cle `await` ; mais coexiste avec un vrai multi-threading (limite par le GIL) que JS n'a pas.
- **Go** : rupture complete de modele : pas d'event loop unique, des goroutines legeres planifiees N:M sur les threads OS par le runtime lui-meme ; `channel` remplace promise/callback pour la communication entre unites concurrentes.
- **Rust** : pas d'event loop impose par le langage ; `async`/`await` existe mais necessite un runtime externe (`tokio`, `async-std`) a choisir explicitement, contrairement au moteur unique et implicite de Node.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
