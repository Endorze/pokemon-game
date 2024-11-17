var pokemonUtilsModule = (function (sharedDataModule, pokemonModule) {

  const { playerPokemonList } = sharedDataModule;
  const { ALL_POKEMON, ALL_POKEMON_ARRAY } = pokemonModule;

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

  const createPokemonIndivual = (pokemonType, level) => {
    // pokemonType.moves: [["tackle", 1], ["quick-attack", 5]]
    console.log(pokemonType.moves)
    return {
      pokemonType: pokemonType,
      level: level,
      currentHp: pokemonType.health(level),
      currentExp: 0,
      moves: pickSuitableMoves(pokemonType, level),
    };
  };

  const pickSuitableMoves = (pokemonType, level) => {
    // Pick up to 4 moves from learnable moves, and return a list of only their ids

    const learnableMoves = [...pokemonType.moves] ?? [];
    
    const availableMoves = learnableMoves.filter(move => move[1] <= level);

    console.log("Learnable moves: ", [...availableMoves])
    // const evolveMoves = pokemonType.evolveMoves ?? [];

    availableMoves.sort((move1, move2) => move2[1] - move1[1])

    console.log("Sorted: ", availableMoves)

    const result = availableMoves.slice(0, 4).map(move => move[0]);
    console.log("Move IDS: ", result);
    return result;
  }

  const calculateExpGain = (baseExp, level, pokemonQuantity) => {
    return Math.floor(((baseExp * level) / 7) * (1 / pokemonQuantity) * 2)
  }

  const learnMove = (pokemonIndividual) => {
    if (!pokemonIndividual || !pokemonIndividual.pokemonType || !pokemonIndividual.pokemonType.moves) {
      console.error("Invalid Pokémon individual or Pokémon type.");
      return;
    }
  
    for (let i = 0; i < pokemonIndividual.pokemonType.moves.length; i++) {
      const move = pokemonIndividual.pokemonType.moves[i];
  
      if (pokemonIndividual.level === move[1]) {
        console.log(`Pokémon can learn ${move[0]} at level ${move[1]}`);

        if (pokemonIndividual.moves.length < 4) {
          pokemonIndividual.moves.push(move[0]);
          console.log(`${pokemonIndividual.pokemonType.name} learned ${move[0]}!`);
        } else {
          console.log(`${pokemonIndividual.pokemonType.name} already knows 4 moves. Replace a move?`);

        }
      }
    }
  };
  
  const evolvePokemon = (pokemonIndividual) => {
    if (pokemonIndividual.pokemonType.targetEvolution == null) {
      console.log(pokemonIndividual.pokemonType.targetEvolution, "Could not find targetevolution.")
      return;
    }
  
    const newPokemonType = ALL_POKEMON_ARRAY.find(
      (pokemon) => pokemon.name === pokemonIndividual.pokemonType.targetEvolution
    );
  
    if (!newPokemonType) {
      console.error(
        `Ingen Pokémon med namnet ${pokemonIndividual.pokemonType.targetEvolution} hittades.`
      );
      return;
    }
  
    console.log(
      `${pokemonIndividual.pokemonType.name} har evolverat till ${newPokemonType.name}!`
    );
    pokemonIndividual.pokemonType = newPokemonType;
  };
  

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
        learnMove(pokemonIndividual);
        evolvePokemon(pokemonIndividual)
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
    learnMove,
    evolvePokemon,
  };
})(sharedDataModule, pokemonModule);
