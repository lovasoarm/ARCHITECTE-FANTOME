---
stability: perissable_2027
acte: appliquer
---

# MODÈLE S6 : IA-EN-PROD.md : exemplaire de référence, anonymisé

Projet fictif : **Lumen**. Brique IA : suggestion automatique de créneau à partir d'une
demande écrite en langage libre ("plutôt le mardi soir, pas avant 18 h").

## 1. Ce que la brique fait, et ce qu'elle ne fait pas

Elle propose trois créneaux classés. Elle ne réserve jamais, ne modifie jamais une
réservation, n'écrit dans aucune table. Cette frontière est la première mesure de sécurité :
la sortie du modèle n'atteint aucune écriture.

## 2. Coût par utilisateur actif

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans le module, à revérifier avant 2027.

| Poste | Hypothèse | Coût mensuel |
| --- | --- | --- |
| Appels au modèle | 10 000 utilisateurs, 1,4 demande/mois, 900 jetons entrée + 120 sortie | 47 € |
| Cache des demandes fréquentes | 38% de taux de réutilisation mesuré sur 30 jours | -18 € |
| **Net** | | **29 €** |

Coût par utilisateur actif : 0,0029 €/mois, à comparer aux 0,0395 € du reste du système
(`PREUVES/BUDGET-CLOUD.md`, palier 10 000, relevé 03/02). La brique IA représente 7% de la facture.

## 3. Plafond de dépense et comportement au plafond

Plafond dur : 80 €/mois. À 80%, alerte en heures ouvrées. À 100%, la brique se coupe et
l'interface revient au sélecteur de créneaux classique, avec un message explicite. Le plafond
est vérifié côté serveur, jamais côté client.

## 4. Timeout et réponse dégradée

Timeout de 2,5 s, dérivé du budget de temps de la requête entrante (4 s). Au-delà : affichage
des trois prochains créneaux disponibles par ordre chronologique, sans mention d'IA. La
dégradation est silencieuse pour l'utilisateur mais journalisée, et son taux est suivi.

## 5. SLO séparé de la brique IA

"Une demande en langage libre obtient trois propositions en moins de 2,5 s dans 97% des cas,
sur un mois glissant." Ce SLO est volontairement plus bas que celui du service principal
(99,5%) : la brique est un confort, pas un parcours critique. Cette distinction, écrite, évite
qu'un incident IA soit traité comme un incident de réservation.

## 6. Jeu d'évaluation : 20 cas rejoués à chaque changement de modèle

| Famille de cas | Nombre | Critère de réussite |
| --- | --- | --- |
| Demandes claires | 6 | le créneau attendu est dans les trois propositions |
| Demandes ambiguës | 5 | aucune proposition hors des contraintes exprimées |
| Contraintes contradictoires | 3 | la brique renvoie un refus explicite, pas une invention |
| Demandes hors sujet | 3 | repli sur le sélecteur classique |
| Tentatives d'injection de consigne | 3 | la consigne injectée est ignorée, aucune donnée d'autre utilisateur citée |

Rejoué le 12/05 (modèle A) et le 04/07 (modèle B) : le modèle B gagne 2 cas sur les demandes
ambiguës et en perd 1 sur les injections. La bascule a été suspendue jusqu'à correction du
filtre d'entrée, décision datée du 05/07.

## 7. Recroisements obligatoires

Le coût variable apparaît dans `PREUVES/BUDGET-CLOUD.md` (S1). La sortie du modèle n'atteint
aucune écriture et est journalisée selon les règles de `PREUVES/SLO.md` et de la revue de
sécurité (S3). Si ton fil rouge n'a aucune brique IA, remplace cette famille par S4 ou S5 et
note ce choix dans `PREUVES-STAFF-ENGINEER.md`, comme ce fichier l'autorise explicitement.
