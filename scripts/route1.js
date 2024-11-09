var route1Module = (function (utilsModule) {
  const { levelGenerator } = utilsModule;

  const ROUTE1_MAX_LEVEL = 5;

  const ROUTE1 = [
    {
      pokemonId: "rattata",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "magnemite",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "pidgey",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "snorlax",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "butterfree",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "beedrill",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "charmander",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "squirtle",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "bulbasaur",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "weedle",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "kakuna",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "metapod",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
    {
      pokemonId: "caterpie",
      level: levelGenerator(ROUTE1_MAX_LEVEL),
    },
  ];
  return {
    ROUTE1
  }
})(utilsModule);
