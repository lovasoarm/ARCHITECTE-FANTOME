# INCIDENT-INJECTS : Kintana T0

> Toutes les données et heures sont synthétiques. Le candidat traite chaque étape dans l'ordre ; il ne réécrit pas la chronologie après avoir vu la suite.

## Règle de simulation

Pour chaque inject : note l'heure de réception, les faits observés, les hypothèses, l'action, le propriétaire et le signal qui confirmerait ou invaliderait la décision. N'invente aucun résultat d'exécution. Les métriques restent des échantillons synthétiques, pas des mesures de production.

## Round 1 : release dégradée

1. **Pré-release : 08:55Z.** Lis `SERVICE.md`, `RELEASE-MANIFEST.md` et le premier point de `METRICS.csv`. Décide si la release peut être autorisée. Écris les conditions de blocage et de rollback avant de lire la suite.
2. **Signal : 09:03Z.** Lis les événements jusqu'à `payment.timeout_rate_increased`. Décris l'impact utilisateur connu et ce qui reste hypothétique.
3. **Dégradation : 09:10Z.** Lis la ligne `degraded` et les logs jusqu'à 09:11Z. Compare p95, p99, taux d'erreur, profondeur et âge de file. Distingue symptômes, causes plausibles et preuves discriminantes.
4. **Worsening : 09:16Z.** Lis les événements suivants. Propose confinement, communication et ownership. Évalue retry amplification, limite de concurrence et dépendance paiement.
5. **Mitigation : 09:20Z.** Considère que les mesures indiquées dans le log ont été appliquées dans la simulation. Analyse le point 09:25Z puis 09:40Z. Décide si un rollback applicatif est encore préférable au roll-forward. N'effectue pas de rollback DB destructif par réflexe : la migration est additive et le manifeste signale l'absence de preuve de compatibilité pour une restauration DB.
6. **Récupération.** Utilise `BACKUP-MANIFEST.csv` et `RESTORE-FIXTURE.csv`. Recalcule le SHA-256 du fichier avec un outil local disponible ; rapproche-le du manifeste. Vérifie les cinq enregistrements, l'unicité des clés par tenant, la présence d'un paiement pour chaque ligne `CONFIRMED` et le traitement des réservations `PENDING_PAYMENT`. Ce fixture de cinq lignes est un exemple représentatif, pas une base réelle complète.
7. **Postmortem.** Produis déclencheur, facteurs latents, impact estimé à partir des échantillons, détection, confinement, récupération, limites, actions préventives, propriétaires et critères de fermeture.

## Round 2 : variation indépendante : prestataire indisponible

À 10:00Z, le Payment Provider est indisponible. Les métriques du round 2 montrent que les erreurs augmentent tandis que la file vieillit. Le débit de l'API peut rester acceptable, mais les paiements ne sont pas confirmés.

Décide comment préserver l'expérience utilisateur et l'intégrité : maintenir les réservations en attente, désactiver les retries agressifs, borner la file, communiquer le délai, puis reprendre avec idempotence lorsque le prestataire revient. Décris le signal qui autorise la reprise et les contrôles de doublons à réaliser. Ne transforme jamais `PENDING_PAYMENT` en `CONFIRMED` sans confirmation vérifiable.

## Questions de clôture

- Quelle décision de release aurais-tu prise à 08:55Z et sur quelles preuves ?
- Quel signal déclenche le stop/rollback ? Le seuil est-il justifié par le SLO local ?
- Quelle hypothèse as-tu falsifiée, et comment ?
- Pourquoi une baisse de profondeur de file ne suffit-elle pas à prouver l'intégrité ?
- Quelle partie de la simulation ne prouve rien sur un système réel ?
