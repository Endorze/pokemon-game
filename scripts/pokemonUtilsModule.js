var pokemonUtilsModule = (function () {
  const calculateDamage = (level, baseDamage, attackStat, defenseStat) => {
    return Math.ceil((((2 * level / 5 + 2) * baseDamage * (attackStat/defenseStat)) / 50));
  };
  // Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature

  const createRandomIndividual = (pokemonId, level) => {
    const wildPokemonType = ALL_POKEMON[pokemonId];
    const wildPokemonLevel = level;
    const wildPokemonMoves = pickFourRandomMoves(
      wildPokemonType,
      wildPokemonLevel
    );
  
    const wildPokemonIndividual = createPokemonIndivual(
      wildPokemonType,
      wildPokemonLevel,
      wildPokemonMoves
    );
    return wildPokemonIndividual;
  };

  const calculateStat = (baseStat, level) => {
      return Math.floor(0.01 * (2 * baseStat) * level + 5);
  }
  
  const createPokemonIndivual = (pokemonType, level, moves) => {
    console.log(pokemonType)
    return {
      pokemonType: pokemonType,
      level: level,
      currentHp: pokemonType.health(level),
      currentExp: 0,
      moves: moves,
    };
  };
  
  const calculateExperienceToNextLevel = (level) => {
    return level * 15;
  };
  
  const levelUpPokemon = (pokemonIndividual, experience) => {
    while (experience > 0) {
      const maxExp = calculateExperienceToNextLevel(pokemonIndividual.level);
      const experienceToNextLevel = maxExp - pokemonIndividual.currentExp;
      console.log(experience);
      if (experience >= experienceToNextLevel) {
        pokemonIndividual.level += 1;
        playSound("levelup.mp3");
        console.log(pokemonIndividual.level);
        experience = experience - experienceToNextLevel;
        pokemonIndividual.currentExp = 0;
      } else {
        pokemonIndividual.currentExp += experience;
        experience = 0;
      }
    }
  };

  return {
    calculateDamage,
    createRandomIndividual,
    createPokemonIndivual,
    levelUpPokemon,
    calculateStat,
  };
})();
