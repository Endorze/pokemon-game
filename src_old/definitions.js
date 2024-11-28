
const allPokemon = {
    "string": "pokemonType"
}


const pokemonEncounter = {
    pokemonId: "string",
    level: () => 0
}

const pokemonType = {
    name: "string",
    health: (level) => 0,
    pokemonSprite: "string",
    moves: ["string"], // All moves possible to learn
    specialDefenceGrowth: 0.0,
    physicalDefenceGrowth: 0.0,
    specialDamageGrowth: 0.0,
    physicalDamageGrowth: 0.0,
}

const pokemonIndividual = {
    pokemonType: "pokemonType",
    level: 0,
    currentHp: 0, // Maximum type.health(level)
    specialDefenceStat: 0.0,
    physicalDefenceStat: 0.0,
    specialDamageStat: 0.0,
    physicalDamageStat: 0.0,
    moves: ["string"] // Current known moves, max 4
}