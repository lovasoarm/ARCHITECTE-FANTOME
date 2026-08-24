---
stability: evolutif
acte: pilotage
noyau: oui
type: grimoire
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Grimoire : cloud foundations

Temps de lecture ~2 min

Cinq colonnes comme partout : Terme, Définition, Code, Analogies, Limite. Deux analogies au
maximum par ligne ; la dernière colonne dit où l'image ment.

| Terme                 | Définition                                                                            | Code                                  | Analogies                                                      | Limite                                                                        |
| --------------------- | ------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Unité facturée        | Le poste de facture se lit par son unité avant son prix unitaire.                     | `seconde-Go`, `Go-mois`, `Go sortant` | le prix au kilo / le compteur d'eau                            | Une unité connue sans volume estimé ne donne encore aucun montant.            |
| Egress                | La sortie réseau se paie, l'entrée est généralement gratuite.                         | `Go sortant × €/Go`                   | un parking d'aéroport / une consigne de gare                   | Le tarif varie par région et par destination : un seul chiffre global trompe. |
| Prédiction de facture | Une facture se chiffre avant d'être reçue, sinon elle n'est pas pilotée.              | `volume × unité × 30 j`               | une facture d'électricité / un forfait de téléphone            | Une prédiction sans palier haut casse dès le premier pic.                     |
| Rétention             | La durée de conservation multiplie chaque coût quotidien de stockage ou de journal.   | `Go/j × jours conservés`              | un grenier qu'on ne vide jamais / un abonnement oublié         | Réduire la rétention peut coûter en conformité : l'arbitrage se déclare.      |
| Coût de sortie        | Le prix pour quitter un fournisseur se calcule avant d'y entrer.                      | `egress total + réécriture`           | un bail avec préavis / un billet aller-retour                  | Le chiffrage ignore le temps humain de migration, souvent dominant.           |
| Trois paliers         | Tout chiffrage s'énonce sur trois volumes de trafic : bas, nominal, pic.              | `x1 / x10 / x100`                     | trois tailles de vêtement / trois maquettes d'échelle          | Trois paliers linéaires masquent les seuils de tarification par tranche.      |
| Environnement dormant | Une ressource allumée sans trafic paie le tarif plein.                                | `cron: stop 20h → start 8h`           | une lumière laissée allumée / un moteur au ralenti             | Éteindre casse les tests nocturnes : la fenêtre se négocie.                   |
| Cache au bord         | Le cache en périphérie coupe le poste de facture dominant quand c'est l'egress.       | `Cache-Control: max-age=86400`        | une gourde plutôt qu'un aller-retour / un stock de proximité   | Le cache ne sert à rien si le contenu est personnalisé à chaque requête.      |
| Prix daté             | Un prix sans date ni source n'est pas un prix mais un souvenir.                       | `relevé 2026-07, fournisseur nommé`   | un menu sans année / une photo sans légende                    | Une grille datée vieillit : le relevé se refait, il ne se recopie pas.        |
| Portage               | Porter un service chez un second fournisseur prouve ce que tu as compris de son coût. | `budget porté = calcul + egress`      | traduire un texte / rejouer un morceau sur un autre instrument | Un portage sur papier ne révèle pas les dépendances managées cachées.         |
