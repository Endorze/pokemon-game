var pokemonUtilsModule = (function () {
  const calculateDamage = (baseDamage, attackStat, defenseStat) => {
    return (baseDamage * attackStat) / defenseStat;
  };

  const healPokemon = (pokemonIndividual, healAmount) => {
    const maxHp = pokemonIndividual.pokemonType.health(pokemonIndividual.level);
    const newHp = pokemonIndividual.currentHp + healAmount;
    const actualNewHp = Math.min(maxHp, newHp);
  
    pokemonIndividual.currentHp = actualNewHp;
  };
  
  const createRandomIndividual = (pokemonEncounter) => {
    const wildPokemonType = ALL_POKEMON[pokemonEncounter.pokemonId];
    const wildPokemonLevel = pokemonEncounter.level();
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
  
  const createPokemonIndivual = (pokemonType, level, moves) => {
    return {
      pokemonType: pokemonType,
      level: level,
      specialDefenceStat: 1 + level * pokemonType.specialDefenceGrowth,
      physicalDefenceStat: 1 + level * pokemonType.physicalDefenceGrowth,
      specialDamageStat: 1 + level * pokemonType.specialDamageGrowth,
      physicalDamageStat: 1 + level * pokemonType.physicalDamageGrowth,
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
        pokemonIndividual.currentHp = pokemonIndividual.pokemonType.health(
          pokemonIndividual.level
        );
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
    levelUpPokemon
  };
})();
