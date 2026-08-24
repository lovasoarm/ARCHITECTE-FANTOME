---
stability: intemporel
acte: maitrise
noyau: oui
type: grimoire
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Grimoire : relier les preuves

Temps de lecture ~2 min

À n'ouvrir qu'après le [dossier unique](02-dossier_unique.md) rédigé. Deux
analogies par ligne, jamais plus ; la cinquième colonne dit où l'image ment.

| Terme               | Définition                                                                | Code                               | Analogies                                                                              | Limite                                                    |
| ------------------- | ------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Tension chiffrée    | Contradiction entre deux familles, nombre des deux côtés, perte nommée    | `S1×S3 : +58 €/mois vs RTO 41 min` | un pont avec charge limite / une tente haubanée : ça tient si chaque câble a un newton | Sans perte, ce n'est pas une tension, c'est un malentendu |
| Promesse de service | SLO + budget d'erreur + RTO mesuré, finançable par S1                     | `99,5 % / 30 j ; 1000 req ratées`  | une batterie avec compteur / un horaire de train : la promesse a un coût visible       | Le pourcentage seul ne se défend pas                      |
| Décision refusée    | Option réelle écartée, avec le chiffre du refus et la condition de retour | `ADR refuse région 2 : 696 €/an`   | un procès-verbal / un non avec porte de sortie                                         | Un refus sans seuil se rejoue malhonnêtement              |
| Transfert           | Invariant porté hors langage et hors fournisseur, écart mesuré            | `PORTAGE.md delta €/mois`          | une graine transplantée / une recette dans une autre cuisine                           | Copier la syntaxe n'est pas porter un contrat             |
| Contradiction S5    | Vingt objections, dix lignes, chiffre si coût ou dispo                    | `09-CONTRADICTEUR.md`              | une soutenance / un contre-interrogatoire écrit                                        | Une réponse « ça dépend » sans mesure est irrecevable     |
| Brique IA non CREUX | Coût calculé, plafond, dégradé, SLO séparé, 20 cas                        | `IA-EN-PROD.md`                    | un confort coupé / un phare qui s'éteint : le navire doit encore gouverner             | Un agent qui 500 sans fallback échoue le palier           |

Deux analogies suffisent pour un junior. Aucune ne remplace la trace, le coût ou
le SLO. Le dossier revient toujours à un fichier de `PREUVES/`.
