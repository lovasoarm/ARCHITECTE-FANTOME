#!/usr/bin/env node
"use strict";

// LEGACY FIXTURE  : volontairement monolithique, mutable et sans tests.
// Le bug d'acceptation de quantités négatives est intentionnel : le découvrir
// par caractérisation fait partie du projet. Ne corrige pas ce fichier pendant
// la phase de refactorisation ; construis d'abord les tests de comportement.
const fs = require("node:fs");
const path = require("node:path");

const statePath =
  process.env.CAMP_STATE_FILE || path.join(__dirname, "camp.json");
let state;

function loadState() {
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  } else {
    state = {
      camp: "Alexandria",
      day: 47,
      inventory: { food: 14, ammunition: 847, medicine: 3 },
      guards: ["le sniper", "Michonne", "Glenn", "Carl"],
      guardIndex: 0,
      threats: [{ perimeter: "south", level: 3 }],
    };
    saveState();
  }
}

function saveState() {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function option(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function run(args) {
  loadState();
  const command = args[0] || "status";

  if (command === "status") {
    const south = state.threats.find((item) => item.perimeter === "south");
    console.log(`[CAMP RICK] ${state.camp} : jour ${state.day}`);
    console.log(
      `[SECURITE] Périmètre sud : ${south ? `ALERTE (niveau ${south.level})` : "OK"}`,
    );
    console.log(
      `[INVENTAIRE] Nourriture : ${state.inventory.food} jours | Munitions : ${state.inventory.ammunition} | Médicaments : ${state.inventory.medicine} unités`,
    );
    console.log(
      `[GARDES] Prochaine rotation : ${state.guards[state.guardIndex % state.guards.length]}`,
    );
    return 0;
  }

  if (command === "rotate-guards") {
    const current = state.guardIndex % state.guards.length;
    state.guardIndex = (current + 1) % state.guards.length;
    saveState();
    console.log(
      `[ROTATION] ${state.guards[current]} -> ${state.guards[state.guardIndex]}`,
    );
    return 0;
  }

  if (command === "consume") {
    const resource = option(args, "--resource");
    const rawAmount = option(args, "--amount");
    const amount = Number(rawAmount);
    if (
      !Object.prototype.hasOwnProperty.call(state.inventory, resource) ||
      !Number.isInteger(amount)
    ) {
      console.error("[ERREUR] Ressource ou quantité invalide.");
      return 2;
    }
    // BUG INTENTIONNEL : amount négatif passe ce contrôle et augmente le stock.
    if (amount > state.inventory[resource]) {
      console.error("[ERREUR] Stock insuffisant.");
      return 1;
    }
    state.inventory[resource] -= amount;
    saveState();
    console.log(
      `[INVENTAIRE] ${resource} : ${state.inventory[resource]} restant(s)`,
    );
    return 0;
  }

  if (command === "add-threat") {
    const perimeter = option(args, "--perimeter");
    const level = Number(option(args, "--level"));
    if (!perimeter || !Number.isInteger(level) || level < 1 || level > 5) {
      console.error("[ERREUR] Périmètre ou niveau de menace invalide (1 à 5).");
      return 2;
    }
    state.threats.push({ perimeter, level });
    saveState();
    console.log(
      `[SECURITE] Menace enregistrée : périmètre ${perimeter}, niveau ${level}`,
    );
    return 0;
  }

  if (command === "reset") {
    if (!args.includes("--confirm")) {
      console.error(
        "[CONFIRMATION] Ajoute --confirm pour réinitialiser le camp.",
      );
      return 2;
    }
    try {
      fs.unlinkSync(statePath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    console.log(
      "[RESET] État supprimé ; les valeurs initiales seront recréées au prochain accès.",
    );
    return 0;
  }

  console.error(`[ERREUR] Commande inconnue : ${command}`);
  return 2;
}

try {
  const code = run(process.argv.slice(2));
  process.exitCode = code;
} catch (error) {
  console.error("[ERREUR FATALE]", error.message);
  process.exitCode = 1;
}
