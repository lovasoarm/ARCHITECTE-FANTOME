---
perennite: evolutif
stability: evolutif
duree_de_vie_estimee: 3-5 ans
raison: Menaces évoluent, principes (least privilege, defense in depth) éternels.
acte: comprendre
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/04-SECURITY/02-xss_injection.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/04-SECURITY/02-xss_injection.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : input validation (01-CADRAGE/04-ERROR-HANDLING), HTTP (02-CONSTRUCTION/18-WEB-CONCEPTS). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# Pourquoi ce module mérite ton temps : security

Temps de lecture ~6 min

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

Temps de lecture ~8 min

Tu n'as pas besoin d'être attaqué par un hacker en cagoule dans un sous-sol. Il suffit d'un script automatisé qui scanne le web 24/7 à la recherche de failles connues, et qui tombe sur un input non validé ou affiché sans protection adaptée à son contexte. Tu ne te fais pas hacker parce que tu es une cible importante. Tu te fais hacker parce que ton code laissait la porte ouverte.

La sécurité n'est pas une feature qu'on ajoute à la fin. C'est une discipline qu'on applique à chaque ligne qui touche à une donnée venant de l'extérieur.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Chaque point où ton code accepte une donnée externe (input utilisateur, paramètre d'URL, header de requête, fichier uploadé) est une porte d'entrée potentielle pour une attaque. Sans discipline de sécurité, ces portes restent ouvertes : un input non échappé permet d'injecter du JavaScript malveillant dans ta page (XSS : Cross-Site Scripting), une requête SQL construite par concaténation de strings permet d'injecter des commandes SQL arbitraires, un mot de passe stocké en clair devient un cadeau immédiat pour quiconque accède à ta base de données.

Ce module étudie plusieurs familles de risques et leurs défenses : XSS et injection SQL, CSRF et CORS (deux mécanismes liés à l'origine des requêtes, souvent confondus), les problèmes de pollution de prototype lorsque des clés contrôlées par un attaquant atteignent une fusion récursive ou un setter dangereux, les modèles d'authentification (OAuth, sessions, JWT) et le stockage sûr des mots de passe. Pour un nouveau système, privilégie Argon2id selon les recommandations OWASP ; scrypt est une alternative et bcrypt sert surtout aux contraintes de compatibilité avec l'héritage.

Le Top 10 OWASP (Open Worldwide Application Security Project) est un document de sensibilisation qui regroupe des catégories de risques web. Son édition publiée la plus récente au 2 novembre 2026 est le Top 10:2025. Ce classement n'est ni une liste exhaustive de toutes les failles, ni une preuve statistique que ces catégories causent à elles seules la majorité des incidents. Le curriculum l'utilise comme repère, pas comme substitut à une analyse de menace propre au système.

---

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le dev qui construit ses requêtes SQL en concaténant des valeurs non fiables ouvre la porte à une injection SQL. Selon les droits du compte DB et les protections du système, un attaquant peut lire ou modifier des données, voire supprimer des objets accessibles à ce compte. Les paramètres liés séparent les valeurs du code SQL ; les identifiants dynamiques doivent, eux, provenir d'une allowlist constante côté serveur.

Le dev qui affiche du contenu non fiable sans protection adaptée au contexte ouvre la porte à des attaques XSS : un script peut alors s'exécuter dans le navigateur d'une autre personne et agir avec les privilèges de sa session. La protection principale se fait au rendu (API texte sûres ou encodage contextuel ; DOMPurify uniquement si le produit autorise volontairement du HTML riche), pas avec un nettoyage universel des entrées.

L'entreprise entière souffre quand une fuite de données survient : au-delà des dommages techniques, c'est la confiance des utilisateurs, la réputation de la marque, et potentiellement des conséquences légales et financières lourdes, surtout si des données sensibles (mots de passe, informations personnelles) étaient stockées sans protection adéquate.

---

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```text
champ de texte affiché sans échappement         --> XSS        --> script malveillant exécuté chez la victime
requête SQL construite par concaténation         --> injection SQL   --> accès non autorisé à la DB
mot de passe stocké directement              --> pas de hashing   --> fuite catastrophique en cas de breach
requête cross-origin mal configurée             --> CORS       --> accès non désiré ou bloqué à tort
objet construit par fusion récursive non sûre --> pollution de prototype possible --> propriétés héritées inattendues, selon le chemin de mutation
```

La sécurité n'est jamais isolée dans un coin du système : elle traverse chaque frontière où une donnée externe entre dans ton application, ce qui veut dire qu'elle concerne potentiellement chaque fichier qui traite une requête utilisateur.

---

## 4) MODERNE, LEGACY, OU INTEMPOREL ?

Les principes fondamentaux (ne jamais faire confiance à une donnée externe, valider les règles métier, protéger chaque sortie selon son contexte et ne jamais stocker un secret en clair) sont intemporels. Ce qui évolue, c'est la sophistication des attaques et la liste précise des vulnérabilités les plus exploitées, d'où l'importance de suivre une référence vivante comme l'OWASP plutôt qu'une liste figée apprise une seule fois.

---

## 5) CE QUI A CHANGÉ AU FIL DES ANNÉES

Avant, beaucoup de frameworks laissaient les devs gérer eux-mêmes l'échappement des inputs, ce qui menait à des oublis fréquents et des XSS répandus. Les frameworks modernes (React, par exemple) échappent automatiquement le contenu par défaut, ce qui réduit drastiquement la surface d'attaque XSS, sauf quand un dev contourne volontairement cette protection (avec `dangerouslySetInnerHTML` par exemple, dont le nom même est un avertissement explicite).

Le stockage des mots de passe a évolué : MD5, SHA-1 ou SHA-256 utilisés seuls sont trop rapides et ne conviennent pas au stockage de mots de passe. OWASP recommande Argon2id pour les nouveaux systèmes ; scrypt constitue une alternative, tandis que bcrypt reste utile pour des systèmes hérités ou des contraintes de compatibilité (avec sa limite habituelle de 72 octets à prendre en compte). Le paramétrage doit être calibré et mesuré sur la machine cible.

---

## 6) NOYAU DUR DU MÉTIER ?

Prérequis direct et explicite : `03-PILOTAGE/04-SECURITY`, prérequis `02-CONSTRUCTION/19-API-CRAFT` + `02-CONSTRUCTION/18-WEB-CONCEPTS`. Impossible de sécuriser une API sans déjà savoir la construire correctement et comprendre les mécanismes du web sous-jacents (CORS, headers, authentification). C'est aussi un module central du mini-projet `05_prison_break_api`, où la sécurité n'est pas un bonus mais une condition de survie du système face à des tentatives d'intrusion simulées.

---

## 7) POURQUOI ÇA MÉRITE ENCORE TON TEMPS DANS 5 ANS

Les attaques évoluent, mais le besoin de penser sécurité à chaque frontière de donnée externe ne disparaîtra jamais : c'est même de plus en plus critique à mesure que les systèmes se connectent entre eux et exposent plus de surface d'attaque. Un dev qui pense sécurité par défaut, plutôt qu'en réaction à un incident, reste une ressource rare et précieuse dans n'importe quelle équipe, peu importe la stack technique du moment.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

Chaque donnée externe que ton code accepte est une porte d'entrée potentielle, et la sécurité n'est jamais un détail qu'on rajoute après coup. Ça casse de quatre façons sans cette discipline : XSS, injection SQL, mots de passe en clair, pollution de prototype. Ces principes ne se démodent jamais, même si les attaques précises évoluent.

Maintenant, ouvre `02-xss_injection.md`. Et arrête de faire confiance à n'importe quelle donnée qui vient de l'extérieur.

> Ce module réutilise : l'API craft du `02-CONSTRUCTION/19-API-CRAFT`, la gestion d'erreurs du `01-CADRAGE/04-ERROR-HANDLING`.

---

## AILLEURS QUE JS

Ce que tu apprends ici n'est pas JS-spécifique :

- **Python / Java / Go / Rust** partagent 90 % de ces mécanismes (allocation
  heap vs stack, contention, backpressure, isolation runtime).
- Le vocabulaire change (`GIL` en Python, `goroutine` en Go, `borrow checker`
  en Rust), le mécanisme sous-jacent reste. Si tu comprends ici, tu portes
  ailleurs en 2 semaines de lecture ciblée.
- Test : explique à quelqu'un qui code Python ce que tu viens d'apprendre.
  Si tu peux, c'est acquis. Sinon, relis.

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : security** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « Pourquoi ce module mérite ton temps : security » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.
