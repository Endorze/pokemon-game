
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
    damage: 0,
    moves: ["string"] // All moves possible to learn
}

const pokemonIndividual = {
    pokemonType: "pokemonType",
    level: 0,
    currentHp: 0, // Maximum type.health(level)
    moves: ["string"] // Current known moves, max 4
}