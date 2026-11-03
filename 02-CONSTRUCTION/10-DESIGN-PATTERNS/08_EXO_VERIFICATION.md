---
stability: stable
acte: verification
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : atelier de Konoha :** chaque équipe fabrique son outil sans obliger tout le village à partager une seule instance.

# EXO : choisir une Factory sans fabriquer un Singleton

Temps indicatif : 15 min.

Une application doit créer différents moyens de notification : `EmailNotifier`, `SmsNotifier` et `ConsoleNotifier`. Le contrôleur ne doit pas connaître les classes concrètes.

**Mission**

1. Écris une fonction `createNotifier(channel, config)` qui retourne l’implémentation correspondant à `channel`.
2. Refuse un canal inconnu avec une erreur explicite.
3. Ajoute un test par canal et un test pour le canal invalide.
4. Explique pourquoi une Factory centralise la création mais ne garantit pas que l’objet créé soit unique.
5. Compare cette solution à un Singleton : création encapsulée contre instance partagée.

**Critère** : le contrôleur dépend d’une interface commune (`send(message)`), et deux appels à la Factory peuvent produire deux objets distincts si le contrat le demande.
