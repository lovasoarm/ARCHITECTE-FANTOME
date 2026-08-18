# GRIMOIRE : DDD ET CONTRATS

Cinq colonnes : le terme, ce qu'il veut dire, le code minimal qui le montre, deux analogies pour l'accrocher en mémoire, et où l'analogie casse. Rappel (modèle `00-SOCLE/04_fundamentals/06_modules/03_modules_grimoire.md`) : une analogie simplifie pour comprendre vite, elle ne définit rien. Quand tu dois décider, retourne au mécanisme réel.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Domaine | Le métier réel que ton logiciel sert. Pas ta base de données, pas ton framework. | `const domaine = "evasion"` | le terrain avant le match / le scénario avant le tournage | un terrain de match ne change pas de règles en cours de partie ; le domaine métier, si (une loi change, le vocabulaire du métier change avec elle). |
| Langage ubiquitaire | Un mot du métier = un mot du code, sans traduction mentale. | `evasion.statut` | le jargon d'un vestiaire / le code radio d'une équipe d'intervention | un jargon de vestiaire tolère l'ambiguïté entre coéquipiers qui se connaissent ; le code ne tolère aucune ambiguïté, un nom mal choisi casse silencieusement à la relecture six mois plus tard. |
| Contexte borné | Zone où un mot a un sens et un seul, avec son propre modèle. | `surveillance/detenu.js` | la salle de l'esprit et du temps / la zone de chaque défenseur sur un corner | la salle de l'esprit et du temps a une frontière physique visible ; un contexte borné n'a souvent aucune frontière visible dans le code si personne ne l'a explicitement tracée, d'où les imports déguisés. |
| Contrat | Les champs exacts qui traversent une frontière, gelés par écrit. | `{ idDetenu, risque }` | un ordre de mission écrit / une passe annoncée avant de la faire | un ordre de mission ne prévoit pas sa propre date d'expiration ; un contrat de service sans date d'extinction se maintient indéfiniment et ne meurt jamais de lui-même. |
| Anti-corruption layer | Traducteur entre ton modèle et un modèle externe imposé. | `toLocal(externe)` | un interprète en négociation / un adaptateur secteur en voyage | un adaptateur secteur convertit une tension sans perte d'information ; un traducteur de modèles perd parfois de l'information (un champ externe sans équivalent local), et ce choix doit être assumé, pas caché. |
| CQRS | Séparer le modèle qui écrit du modèle qui lit. | `commandes` / `lectures` | guichet et écran d'affluence / le buteur et le commentateur | la limite est le retard de synchronisation lecture/écriture : l'écran d'affluence affiche une file qui n'existe déjà plus, parce qu'il rattrape l'écriture avec un lag mesurable (cf. `02`), jamais nul. |
| Cohérence à terme | La lecture rattrape l'écriture avec du retard, assumé. | `cache.incr(...)` | un score affiché avec 2s de délai / une rumeur qui met une heure à circuler | un score de match finit toujours par se corriger tout seul en quelques secondes ; un modèle de lecture peut rester périmé indéfiniment si l'événement qui devait le rafraîchir se perd silencieusement. |
| Événement de domaine | Un fait passé, nommé au passé, que d'autres écoutent. | `emit("PlaceReservee")` | un but sifflé / un avis de recherche diffusé | un but sifflé est vu simultanément par tout le stade ; un événement de domaine est reçu par chaque abonné à un instant différent, et certains peuvent ne jamais le recevoir si le bus tombe (cf. `05`, défaut du bus à nœud unique). |
| Rupture de contrat | Suppression ou renommage d'un champ déjà consommé. | `delete payload.risque` | changer les règles à la mi-temps / débrancher un micro en direct | changer les règles à la mi-temps est immédiatement visible par tous les joueurs ; une rupture de contrat logiciel reste invisible jusqu'au prochain appel du consommateur, parfois des semaines plus tard. |
| Double run | Deux versions servies en parallèle pendant la migration. | `/v1` + `/v2` | deux trains sur la même ligne / doubler une scène avant de couper l'ancienne | deux trains sur la même ligne ont un horaire de retrait annoncé dès le départ ; un double run sans date d'extinction écrite le jour de la publication a tendance à devenir permanent, faute de pression pour le clore. |

## OÙ LES ANALOGIES CASSENT (rappel général)

La colonne ci-dessus donne une limite précise par terme, mais la règle générale reste la
même dans tout le curriculum : une analogie sert à charger un concept en mémoire vite, pas
à trancher une décision d'architecture. Devant un vrai choix (garder un contrat, séparer un
contexte, accepter un lag), reviens toujours au mécanisme décrit dans `01`, `02` ou `03`,
jamais à l'image qui t'a aidé à le retenir.
