const ALL_POKEMON = {
  squirtle: {
    id: "0007-squirtle",
    name: "Squirtle",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  bulbasaur: {
    id: "0001-bulbasaur",
    name: "Bulbasaur",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  charmander: {
    id: "0004-charmander",
    name: "Charmander",
    health: healthGenerator(30),
    allySprite: charmeleon,
    opponentSprite: wildCharmander,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  rattata: {
    id: "0019-rattata",
    name: "Rattata",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  magnemite: {
    id: "0081-magnemite",
    name: "Magnemite",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  pidgey: {
    id: "0016-pidgey",
    name: "Pidgey",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  snorlax: {
    id: "0143-snorlax",
    name: "Snorlax",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  butterfree: {
    id: "0012-butterfree",
    name: "Butterfree",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  beedrill: {
    id: "0015-beedrill",
    name: "Beedrill",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  kakuna: {
    id: "0014-kakuna",
    name: "Kakuna",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  weedle: {
    id: "0013-weedle",
    name: "Weedle",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  caterpie: {
    id: "0010-caterpie",
    name: "Caterpie",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
  metapod: {
    id: "0011-metapod",
    name: "Metapod",
    health: healthGenerator(30),
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    baseExp: 100,
  },
};
