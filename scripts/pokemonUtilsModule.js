var pokemonUtilsModule = (function (sharedDataModule) {

  const { playerPokemonList } = sharedDataModule;

  const calculateDamage = (level, baseDamage, attackStat, defenseStat) => {
    return Math.ceil((((2 * level / 5 + 2) * baseDamage * (attackStat / defenseStat)) / 50));
  };
  // Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature

  const updateVisiblePokemonInfo = () => {
    if (!playerPokemonList) {
      console.log("Could not do updateVisiblePokemonInfo")
      return;
    }
    for (let i = 0; i < playerPokemonList.length; i++) {
      const pokemon = playerPokemonList[i];
      updateHealthBar(playerPokemonList[i], `pokemon-health${i}`, `visible-pokemon-healthbaroverlay${i}`)
      const healthBar = document.getElementById(`visible-pokemon-healthbar${i}`)
      const pokemonImage = document.getElementById(`visible-pokemon-image${i}`)
      const pokemonName = document.getElementById(`visible-pokemon-name${i}`)
      const pokemonLevel = document.getElementById(`visible-pokemon-level${i}`)
      if (pokemonImage) {
        pokemonImage.src = `../pokemon/${pokemon.pokemonType.id}/front.gif`
        pokemonImage.style.display = "block";
      }
      if (pokemonName) {
        pokemonName.textContent = playerPokemonList[i].pokemonType.name;
        pokemonName.style.display = "block";
      }
      if (pokemonLevel) {
        pokemonLevel.textContent = playerPokemonList[i].level;
        pokemonLevel.style.display = "block";
        pokemonLevel.textContent = "Level " + playerPokemonList[i].level;
      }
      if (healthBar) {
        healthBar.style.display = "block";
      }
    }
  }

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

  const calculateExpGain = (baseExp, level, pokemonQuantity) => {
    return Math.floor(((baseExp * level) / 7) * (1 / pokemonQuantity))
  }

  const baseExp = 60;
  const faintedPokemonLevel = 20;
  const numParticipants = 1;

  const expGained = calculateExpGain(baseExp, faintedPokemonLevel, numParticipants);

  const calculateExperienceToNextLevel = (level) => {
    return Math.pow(level, 3);
  };

  const levelUpPokemon = (pokemonIndividual, experience) => {
    console.log("Exp gained: ", experience);
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
    calculateExpGain,
    updateVisiblePokemonInfo,
    calculateExperienceToNextLevel,
  };
})(sharedDataModule);
