# 03 : IDENTITÉ, DROITS ET SECRETS, LES DEUX FAILLES QUI NE SONT PAS DU CODE

Temps de lecture ~11 min

Les deux incidents cloud les plus fréquents ne viennent d'aucune ligne de code applicatif : un espace de stockage laissé ouvert, et un rôle qui pouvait tout faire. Cette leçon apprend à écrire des droits qu'on peut défendre en audit.

## 1. LE MOINDRE PRIVILÈGE, ÉCRIT COMME UNE PHRASE

Un droit se formule toujours ainsi : **qui** peut faire **quelle action** sur **quelle ressource**, sous **quelle condition**.

```js
// qui casse : le rôle fourre-tout, créé "en attendant"
{ effet: "autoriser", actions: ["*"], ressources: ["*"] }
```

```js
// réaliste : une phrase défendable en audit
{
  effet: "autoriser",
  actions: ["stockage:LireObjet"],
  ressources: ["arn:stockage:factures/*"],
  condition: { source: "vpc-interne" },
}
```

Trois principes qui suffisent :

- **Séparer les identités par usage** : l'API, la tâche planifiée et le poste de développement n'ont pas les mêmes droits.
- **Refuser par défaut** : ce qui n'est pas explicitement autorisé est interdit, y compris pour toi.
- **Donner du temporaire** : un droit élargi pour une intervention est un droit qui expire à une date, écrite dans la demande.

Intuition : dans une banque, personne n'a une clé qui ouvre tout. Le directeur d'agence lui-même n'ouvre pas le coffre seul, et personne ne trouve cela vexant.

## 2. LES SECRETS : L'HISTORIQUE N'OUBLIE JAMAIS

Un secret commité reste dans l'historique du dépôt même après suppression du fichier. Le seul traitement correct est la **rotation** : considérer le secret comme brûlé et le remplacer.

| Pratique | Verdict |
| --- | --- |
| Secret dans un fichier `.env` commité | brûlé, rotation immédiate |
| Secret en variable d'environnement du service, injectée au démarrage | acceptable |
| Secret dans un gestionnaire de secrets, avec rotation planifiée | correct |
| Secret dans un ticket ou une conversation d'équipe | brûlé, et souvent oublié |

```js
// réaliste : on lit le secret au moment de s'en servir, jamais au chargement du module
const url = await secrets.get("base_url_prod");
```

Deux garde-fous automatiques valent mieux qu'une consigne : un contrôle de secrets en intégration continue, et une alerte de rotation à date fixe.

## 3. LES QUATRE FRONTIÈRES À TRACER AVANT DE DÉPLOYER

1. **Public / privé** : quelles ressources sont joignables depuis Internet. La réponse par défaut est "aucune, sauf la façade".
2. **Environnements** : la production ne partage ni compte, ni réseau, ni secrets avec le test. Un accident de test ne doit jamais atteindre un client.
3. **Humains / machines** : une identité de service n'est pas une identité de personne. On ne partage pas un compte technique.
4. **Journalisation des accès** : qui a lu quoi, conservé assez longtemps pour répondre à une question posée trois mois plus tard.

## 4. CE QUE TU DOIS POUVOIR RÉPONDRE EN AUDIT

- Qui peut supprimer la base de production, et comment cette liste est vérifiée.
- Depuis quand chaque secret n'a pas tourné.
- Ce qui se passe si un poste de développement est compromis ce soir.
- Où sont les journaux d'accès, et combien de temps ils sont gardés.

Risque réel : ces quatre questions ne sont jamais posées avant l'incident. Après, elles sont posées par écrit, avec un délai de réponse.

## 5. EXERCICES

**Exercice 1 : le procès du rôle admin (20 min).** Liste chaque composant de ton projet qui accède à une ressource. Écris pour chacun la permission minimale exacte, au format de la section 1. Chaque "toutes les opérations" doit être justifié en une phrase ou réduit.

**Exercice 2 : la chasse aux secrets (15 min).** Cherche dans l'historique de ton dépôt les chaînes qui ressemblent à des clés. Pour chaque trouvaille, écris la date de rotation, pas une intention.

**Exercice 3 : les quatre réponses (15 min).** Réponds par écrit aux quatre questions d'audit de la section 4, pour ton projet, aujourd'hui. Les trous sont ton plan de travail.

## RÉSUMÉ

Un droit se formule en qui, quelle action, quelle ressource, quelle condition, et se refuse par défaut. Un secret commité est brûlé : la seule réponse est la rotation. Quatre frontières se tracent avant le déploiement, dont la séparation stricte des environnements. Et quatre questions d'audit doivent avoir une réponse écrite avant qu'on te les pose.

## ET APRÈS

Reste à décider ce qui tombe quand une zone tombe : [04_rayon_impact_zones.md](04_rayon_impact_zones.md).
