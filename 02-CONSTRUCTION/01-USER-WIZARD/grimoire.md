# Grimoire : Niveau 04, User Wizard

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Mémo à ouvrir avant de coder un écran ou un formulaire critique. Sert à vérifier que chaque
état est géré et que rien ne ment à l'utilisateur, pas à réviser la théorie du DOM.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| États obligatoires | Les six situations qu'un affichage de données doit gérer explicitement (idle, loading, empty, ready, partial, overload, error). | `const ETATS = ["idle", "loading", "empty", "ready", "partial", "overload", "error"] as const;` | tableau de service listant tous les cas possibles avant le coup de feu / check-list de départ qui nomme chaque situation avant la course | « tableau de service listant tous les cas possibles avant le coup de feu » se rejoue à l'identique, le code non ; sur États obligatoires, l'état du DOM ne suit pas l'état de ton application tant que le rendu n'a pas eu lieu. Regarde le DOM effectivement rendu, pas ton état interne. |
| État partiel | Succès incomplet, à ne jamais afficher comme un succès plein ni comme une erreur totale. | `if (recu < attendu) return { statut: "partial", recu, attendu };` | service à moitié terminé annoncé comme tel en salle / ravitaillement incomplet signalé avant le sommet | « service à moitié terminé annoncé comme tel en salle » tient tant que rien ne tombe en route ; sur État partiel, le réseau mobile réel a une latence et des pertes que le développement local n'a jamais. Regarde le DOM effectivement rendu, pas ton état interne. |
| Overload | Volume trop grand pour l'UI, il faut forcer un filtre plutôt que tout rendre. | `if (items.length > SEUIL) return renderFiltreObligatoire();` | trop de commandes en cuisine pour tout servir d'un coup, on priorise / trop de bagages pour une seule cordée, on répartit | « trop de commandes en cuisine pour tout servir d'un coup, on priorise » se corrige toute seule quand elle dérape ; sur Overload, la mesure côté serveur ignore le temps passé chez l'utilisateur. Vérifie l'en-tête de cache avant d'accuser ton code. |
| Machine à états d'un formulaire | Modélisation explicite des transitions (IDLE, DIRTY, ENVOI, CONFIRME, INCERTAIN), y compris le timeout. | `const suivant = { IDLE: "DIRTY", DIRTY: "ENVOI", ENVOI: "CONFIRME" }[etat];` | commande transmise en cuisine puis confirmée en salle, jamais l'inverse / manœuvre annoncée puis exécutée en mer, jamais l'inverse | « commande transmise en cuisine puis confirmée en salle, jamais... » se rejoue à l'identique, le code non ; sur Machine à états d'un formulaire, l'état du DOM ne suit pas l'état de ton application tant que le rendu n'a pas eu lieu. Regarde le DOM effectivement rendu, pas ton état interne. |
| Idempotence | Une opération répétée produit le même effet qu'exécutée une seule fois. | `await creerReservation({ idempotencyKey: cleUnique });` | un bénévole qui ne ressert pas deux fois le même plat sur un même bon / une même manœuvre rejouée qui ne double pas le nœud | « un bénévole qui ne ressert pas deux fois le même plat sur un même bon » s'arrête à la première surprise ; sur Idempotence, une même page se comporte différemment selon le moteur du navigateur. Mesure côté utilisateur, pas seulement côté serveur. |
| Race condition | Deux actions concurrentes dont le résultat dépend de l'ordre d'arrivée. | `if (version !== versionAttendue) throw new ConflitEcriture();` | deux commis qui modifient le même plat en même temps sans se parler / deux cordées qui tirent la même corde sans coordination | « deux commis qui modifient le même plat en même temps sans se parler » suppose que quelqu'un surveille ; sur Race condition, le rendu, le style et le script se disputent le même fil d'exécution. Teste sur un vrai appareil avec le réseau bridé. |
| UI optimiste | Appliquer un changement à l'écran avant confirmation serveur. | `setEtatLocal(nouvelEtat); api.confirmer().catch(() => rollback());` | annoncer un plat prêt avant la validation du chef, avec rattrapage si refusé / annoncer un créneau libre avant confirmation du refuge, avec rattrapage si complet | « annoncer un plat prêt avant la validation du chef, avec rattrapage... » raconte le cas nominal ; sur UI optimiste, les extensions et les bloqueurs modifient la page avant ton code. Vérifie l'en-tête de cache avant d'accuser ton code. |
| Formulaire qui ne ment pas | Validation identique côté client et serveur, erreurs nommées par champ et par règle. | `const erreur = schema.safeParse(payload).error?.formErrors.fieldErrors;` | ticket de commande relu en cuisine avant préparation, pas seulement pris en salle / plan de route revérifié au refuge avant de partir, pas seulement au départ | « ticket de commande relu en cuisine avant préparation, pas... » s'arrête à la première surprise ; sur Formulaire qui ne ment pas, la mesure côté serveur ignore le temps passé chez l'utilisateur. Mesure côté utilisateur, pas seulement côté serveur. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Les cinq états obligatoires (+ 1) de tout affichage de données

```text
idle --> loading --> { empty | ready | partial | overload | error }
```

- **idle** : rien n'a encore été demandé.
- **loading** : requête en cours, afficher un squelette de la forme du contenu, pas un spinner nu.
- **empty** : succès, zéro résultat : dire si c'est normal et proposer une action.
- **ready** : succès, volume raisonnable.
- **partial** : succès incomplet : ne jamais l'afficher comme un succès plein ni une erreur totale.
- **overload** : volume trop grand pour l'UI : forcer un filtre plutôt que tout rendre.
- **error** : échec : nommer la cause si possible, proposer une action de récupération.

## Machine à états d'un formulaire critique

```text
IDLE -> DIRTY -> ENVOI -> CONFIRME
                  ^  |
                  +--+ erreur récupérable (validation, conflit)
                  |
                  v
              INCERTAIN (timeout) -> vérifier l'état réel avant de renvoyer
```

## Checklist formulaire qui ne ment pas

- [ ] Schéma de validation identique (idéalement littéralement le même fichier) client et serveur.
- [ ] Chaque erreur nomme le champ et la règle violée, jamais "erreur de validation" seul.
- [ ] Le serveur rejette tout payload invalide, même envoyé hors de l'UI (testable au curl).
- [ ] Une clé d'idempotence unique par tentative de soumission d'un même formulaire ouvert.
- [ ] Le serveur stocke la réponse associée à la clé et la rejoue, il ne recrée jamais la ressource.
- [ ] Le bouton de soumission se désactive pendant l'envoi (confort, pas garantie).

## Optimisme UI : grille de décision rapide

```text
Action réversible + faible enjeu de conflit  -> optimiste OK (archiver, marquer lu, aimer)
Action irréversible OU forte concurrence     -> pessimiste (réserver, payer, envoyer définitif)
```

Toujours prévoir : rollback visible + message explicite en cas d'échec. Jamais de revert silencieux.

## Accessibilité : le minimum qui a le plus d'impact

- Utiliser les vrais éléments (`button`, `label`, `input`) plutôt que des `div` stylées.
- Tout ce qui est cliquable doit être atteignable et activable au clavier (Tab, Entrée, Espace).
- Focus envoyé dans une modale à l'ouverture, rendu à l'origine à la fermeture.
- Erreurs de champ reliées via `aria-describedby` + `aria-invalid`, annoncées via `role="alert"`.

## Perception de vitesse : leviers qui ne changent pas le temps réel serveur

- Squelette de la forme exacte du contenu, affiché en moins de 100ms.
- Feedback de clic instantané avant la fin de la requête réseau.
- Chargement progressif plutôt qu'attente du tout-ou-rien.
- Annoncer une attente longue plutôt que laisser un spinner muet indéfiniment.

## Si tu rates le boss-fight

Relis d'abord le critère qui a plafonné ta note : compréhension du risque, qualité de
l'alternative, ou honnêteté sur les limites. Reprends la scène et liste séparément les états
gérés et ceux oubliés avant de répondre à nouveau. Relis la machine à états ci-dessus. Attends
48 h avant de retenter le boss-fight pour juger la scène à froid. Si l'échec se reproduit sur
le même critère, redescends au niveau 03 relire "invariant d'une feature" : un état mal géré
est souvent un invariant que tu n'as pas nommé.
