import { calculateDamage, calculateStat } from "./pokemonUtilsModule";


function simplePhysicalMove(targetPokemonIndividual, userPokemonIndividual) {
  const damageDealt = Math.ceil(
    calculateDamage(
      userPokemonIndividual.level,
      this.baseDamage,
      calculateStat(userPokemonIndividual.pokemonType.attack, userPokemonIndividual.statUpgrades.attack, userPokemonIndividual.level),
      calculateStat(targetPokemonIndividual.pokemonType.defense, targetPokemonIndividual.statUpgrades.defense, targetPokemonIndividual.level)
    )
  );
  console.log(damageDealt)
  console.log("Target defense, level.", targetPokemonIndividual.pokemonType.defense)
  targetPokemonIndividual.currentHp = Math.max(
    targetPokemonIndividual.currentHp - damageDealt,
    0
  );
}

function simpleSpecialMove(targetPokemonIndividual, userPokemonIndividual) {
  const damageDealt = Math.ceil(
    calculateDamage(
      userPokemonIndividual.level,
      this.baseDamage,
      calculateStat(userPokemonIndividual.pokemonType.spatk, userPokemonIndividual.statUpgrades.spatk, userPokemonIndividual.level),
      calculateStat(targetPokemonIndividual.pokemonType.spdef, targetPokemonIndividual.statUpgrades.spdefense, targetPokemonIndividual.level)
    )
  );
  targetPokemonIndividual.currentHp = Math.max(
    targetPokemonIndividual.currentHp - damageDealt,
    0
  );
}

export const ALL_MOVES = {
  tackle: {
    name: "Tackle",
    baseDamage: 40,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  scratch: {
    name: "Scratch",
    baseDamage: 40,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  "quick-attack": {
    name: "Quick Attack",
    baseDamage: 40,
    priority: 2,
    numberOfUses: 20,
    performMove: simplePhysicalMove,
  },
  vinewhip: {
    name: "Vine Whip",
    baseDamage: 45,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  razorleaf: {
    name: "Razor Leaf",
    baseDamage: 55,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  bite: {
    name: "Bite",
    baseDamage: 60,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  seedbomb: {
    name: "Seed Bomb",
    baseDamage: 80,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  takedown: {
    name: "Take Down",
    baseDamage: 90,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  aquatail: {
    name: "Aqua Tail",
    baseDamage: 24,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  firefang: {
    name: "Fire Fang",
    baseDamage: 65,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  slash: {
    name: "Slash",
    baseDamage: 70,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  wavecrash: {
    name: "Wave Crash",
    baseDamage: 120,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  powerwhip: {
    name: "Power Whip",
    baseDamage: 120,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  flareblitz: {
    name: "Flare Blitz",
    baseDamage: 120,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  watergun: {
    name: "Water Gun",
    baseDamage: 40,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  ember: {
    name: "Ember",
    baseDamage: 40,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  dragonbreath: {
    name: "Dragon Breath",
    baseDamage: 60,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  flamethrower: {
    name: "Flamethrower",
    baseDamage: 90,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  inferno: {
    name: "Inferno",
    baseDamage: 100,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  waterpulse: {
    name: "Water Pulse",
    baseDamage: 60,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  hydropump: {
    name: "Hydro Pump",
    baseDamage: 110,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },
  solarbeam: {
    name: "Solar Beam",
    baseDamage: 120,
    priority: 1,
    numberOfUses: 40,
    performMove: simpleSpecialMove,
  },


  heal: {
    name: "Heal",
    baseDamage: 20,
    priority: 1,
    performMove: function (targetPokemonIndividual, userPokemonIndividual) {
      userPokemonIndividual.currentHp = Math.min(
        userPokemonIndividual.currentHp + this.baseDamage,
        userPokemonIndividual.pokemonType.health(userPokemonIndividual.level)
      );
    },
  },
};
