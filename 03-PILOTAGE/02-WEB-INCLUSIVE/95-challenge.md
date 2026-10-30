---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [defaut_cache, changement_contexte]
anti_recipe_key: defaut_cache+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# Challenge : `02-WEB-INCLUSIVE`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [51-a11y-why-it-matters-minimini-projet.md](51-a11y-why-it-matters-minimini-projet.md)
- [50-aria_basics_minimini_projet.md](50-aria_basics_minimini_projet.md)
- [52A-keyboard_navigation_minimini_projet.md](52A-keyboard_navigation_minimini_projet.md)
- [52-contrast_and_colors_minimini_projet.md](52-contrast_and_colors_minimini_projet.md)
- [53-screen_readers_minimini_projet.md](53-screen_readers_minimini_projet.md)
- [54-a11y_audit_minimini_projet.md](54-a11y_audit_minimini_projet.md)
- [50-i18n_basics_minimini_projet.md](08_i18n/50-i18n_basics_minimini_projet.md)
- [51-dates_timezones_minimini_projet.md](08_i18n/51-dates_timezones_minimini_projet.md)
- [i18n : Drill exécutable](08_i18n/07-i18n_drill_exec.md)
- [EXO LECTURE : 15-25 minutes (Web Inclusive (a11y + i18n))](07-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 03-PILOTAGE/02-WEB-INCLUSIVE](97-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.

## Barème autonome sur 20 : accessibilité et internationalisation

| Critère                              | Points | Preuve attendue                                                                      |
| ------------------------------------ | -----: | ------------------------------------------------------------------------------------ |
| Sémantique et structure              |      4 | HTML sémantique, noms accessibles, hiérarchie et formulaire explicités               |
| Clavier et focus                     |      4 | Parcours complet sans souris, ordre, focus visible, pièges et échappement documentés |
| Lecteur d'écran                      |      4 | Résultat attendu des annonces, labels, erreurs et mises à jour dynamiques            |
| Perception visuelle                  |      4 | Contraste mesuré, zoom/reflow, couleur non unique, mouvement et états                |
| Internationalisation et vérification |      4 | Locale, dates/fuseaux, chaînes, pseudo-localisation et tests automatisés + manuels   |

**Seuil : 15/20**, aucun blocage clavier ou contrôle sans nom accessible. Une capture Lighthouse seule ne prouve pas l'accessibilité ; joindre le protocole manuel et le résultat de navigation.
