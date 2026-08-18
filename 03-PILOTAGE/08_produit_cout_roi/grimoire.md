---
stability: perissable_2027
acte: restituer
---

# GRIMOIRE : PRODUIT, COÛT ET DÉCISION

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Hypothèse produit | Une croyance non vérifiée sur laquelle repose une ligne de roadmap. | `assume(usage > 100)` | un pari d'avant-match / une info de source unique | un pari sportif ne se corrige pas en cours de match, une hypothèse produit se révise dès la première mesure. |
| Coût d'opportunité | Ce qu'on renonce à faire en faisant autre chose. | `autres.filter(nonFaits)` | le joueur laissé sur le banc / le samedi utilisé à déménager | le banc de touche a une valeur connue d'avance, le coût d'opportunité technique reste souvent invisible tant qu'on ne l'a pas chiffré. |
| Point mort | Moment où un investissement est remboursé par ce qu'il fait gagner. | `jours / gainMensuel` | le seuil de rentabilité d'un stand / le kilomètre où le raccourci paie | un stand a un coût fixe connu, un chantier technique dérive souvent après l'estimation initiale. |
| Dette technique | Raccourci assumé, avec coût récurrent et date de remboursement. | `{cout: "6h/mois"}` | un prêt bancaire / un joueur prêté avec option | un prêt bancaire a un taux fixe écrit au contrat, une dette technique a un taux qui peut grimper seul si personne ne la surveille. |
| ROI technique | Gain mesurable rapporté au coût du chantier. | `gain / cout` | rendement d'un transfert / retour sur un investissement d'équipement | un transfert sportif se juge sur une saison, un ROI technique continue de courir bien après la mise en production. |
| MVP | Version la plus petite qui vérifie l'hypothèse principale. | `slice(0,1)` | un match amical / une démo avant la tournée | un match amical ne compte pas au classement, un MVP mal cadré peut devenir la version livrée en production par défaut. |
| Valeur métier | Ce que le gain rapporte à ceux qui paient, en unité comptable. | `40000` | la recette d'un match / le chiffre d'affaires d'une boutique | la recette d'un match se compte le soir même, la valeur métier d'une fonctionnalité technique se révèle parfois des mois plus tard. |
| Risque assumé | Multiplicateur écrit qui reflète l'incertitude d'une estimation. | `risque: 1.6` | la météo un jour de finale / une blessure incertaine avant match | la météo se prévoit à quelques jours près, le risque technique d'un chantier neuf peut rester incertain jusqu'à la dernière semaine. |
| Note de décision | Une page qui dit le choix, les options écartées, et pourquoi. | `ADR-004.md` | un compte rendu de conseil / un rapport d'arbitrage | un compte rendu de conseil est relu une fois, une note de décision technique doit rester lisible et utile des années après. |
| Coût cloud unitaire | Ce que coûte un utilisateur actif par mois en infrastructure. | `facture / MAU` | le coût d'un spectateur au stade / le prix de revient d'un couvert | le coût d'un spectateur ne change pas selon ce qu'il fait dans les gradins, le coût cloud unitaire varie fortement selon l'usage réel de chaque utilisateur. |
| Spike borné | Exploration technique avec budget de temps et critère d'arrêt écrits d'avance. | `spike(2j, "latence < 200ms ?")` | une reconnaissance de terrain chronométrée / un tour de repérage avant la course | une reconnaissance militaire s'arrête sur ordre, un spike technique s'arrête seulement si le critère d'arrêt a été écrit avant de commencer. |
| Refus chiffré | Objection qui oppose un chiffre plus précis à un chiffre imposé, jamais une opinion. | `optionA: -12%, SLO: inchangé` | une contre-offre commerciale documentée / un arbitrage vidéo qui montre la preuve | un arbitrage vidéo tranche en quelques minutes, un refus chiffré technique demande parfois de produire la mesure avant de répondre. |

