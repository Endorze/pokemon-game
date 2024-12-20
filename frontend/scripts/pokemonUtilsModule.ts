
import { ALL_POKEMON, ALL_POKEMON_ARRAY } from "./pokemonModule";
import { PokemonIndividual, PokemonType } from "./../../shared/types"
import { playerPokemonList, purchaseableMoves } from "./sharedData";
import { ALL_ITEMS } from "./heldItemsModule";
import { updateHealthBar } from "./battleSceneModule";
import { playSound } from "./audioModule"




export const calculateDamage = (level, baseDamage, attackStat, defenseStat) => {
  return Math.ceil((((2 * level / 5 + 2) * baseDamage * (attackStat / defenseStat )) / 50));
};
// Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature

export const updateVisiblePokemonInfo = () => {
  if (!playerPokemonList) {
    console.log("Could not do updateVisiblePokemonInfo")
    return;
  } 
  for (let i = 0; i < playerPokemonList.length; i++) {
    const pokemon = playerPokemonList[i];
    updateHealthBar(playerPokemonList[i], `pokemon-health${i}`, `visible-pokemon-healthbaroverlay${i}`)
    const healthBar = document.getElementById(`visible-pokemon-healthbar${i}`)
    const pokemonImage = document.getElementById(`visible-pokemon-image${i}`) as HTMLImageElement;
    const pokemonName = document.getElementById(`visible-pokemon-name${i}`)
    const pokemonLevel = document.getElementById(`visible-pokemon-level${i}`)
    if (pokemonImage) {
      pokemonImage.src = `pokemon/${pokemon.pokemonType.id}/front.gif`
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

export const createRandomIndividual = (pokemonId, level: number) => {
  const wildPokemonType = ALL_POKEMON[pokemonId];
  const wildPokemonLevel = level;

  const wildPokemonIndividual = createPokemonIndivual(
    wildPokemonType,
    wildPokemonLevel
  );
  return wildPokemonIndividual;
};

export const calculateStat = (baseStat, statUpgrade, level) => {
  return Math.floor(0.01 * (2 * baseStat + statUpgrade) * level + 5);
}

export const createPokemonIndivual = (pokemonType: PokemonType, level: number): PokemonIndividual => {
  // pokemonType.moves: [["tackle", 1], ["quick-attack", 5]]
  console.log(pokemonType.moves)
  return {
    pokemonType: pokemonType,
    level: level,
    //I hope it didnt break with the 0 in currentHp.
    currentHp: pokemonType.health(level, 0),
    currentExp: 0,
    moves: pickSuitableMoves(pokemonType, level),
    heldItem: "",
    statUpgrades: {
      hp: 0,
      attack: 0,
      spatk: 0,
      defense: 0,
      spdefense: 0,
      speed: 0,
    }
  };
};

const addPokemonToTeam = (id) => {
  const pokemonType = ALL_POKEMON[id];
  playerPokemonList.push(
    createPokemonIndivual(pokemonType, 5)
  );
}

export const pickSuitableMoves = (pokemonType: PokemonType, level: number) => {
  // Pick up to 4 moves from learnable moves, and return a list of only their ids

  const learnableMoves = [...pokemonType.moves];

  const availableMoves = learnableMoves.filter(move => move[1] <= level);

  console.log("Learnable moves: ", [...availableMoves])
  // const evolveMoves = pokemonType.evolveMoves ?? [];

  availableMoves.sort((move1, move2) => move2[1] - move1[1])

  console.log("Sorted: ", availableMoves)

  const result = availableMoves.slice(0, 4).map(move => move[0]);
  console.log("Move IDS: ", result);
  return result;
}

export const calculateExpGain = (
  baseExp: number, 
  opponentLevel: number, 
  allyLevel: number, 
  pokemonQuantity: number
) => {
  return Math.floor(
    (
      (2.5 * ((baseExp * opponentLevel) / 5)) * 
      Math.pow(
        ((allyLevel * 2) + 10) / (opponentLevel + allyLevel + 10), 
        2.5
      )
    ) / pokemonQuantity
  );
};


export const learnMove = (pokemonIndividual) => {
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

      } else {
        console.log(`${pokemonIndividual.pokemonType.name} already knows 4 moves. Replace a move?`);
      }
    }
  }
};

export const addMoveToPurchaseList = (pokemonIndividual) => {
  // Validera input
  if (!pokemonIndividual || !pokemonIndividual.pokemonType || !pokemonIndividual.pokemonType.moves) {
    console.error("Invalid Pokémon individual or Pokémon type.");
    return;
  }

  // Iterera genom Pokémonens möjliga moves
  for (let i = 0; i < pokemonIndividual.pokemonType.moves.length; i++) {
    const move = pokemonIndividual.pokemonType.moves[i]; // Exempel: ["Thunderbolt", 15]

    // Kontrollera om Pokémonen kan lära sig movet på sin nivå
    if (pokemonIndividual.level === move[1]) {
      console.log(`Pokémon can learn ${move[0]} at level ${move[1]}`);

      // Lägg till i purchaseableMoves om det inte redan finns
      if (!purchaseableMoves.includes(move[0])) {
        purchaseableMoves.push(move[0]);
        console.log(`${move[0]} added to purchaseableMoves.`);
      } else {
        console.log(`${move[0]} is already in purchaseableMoves.`);
      }
    }
  }
};


export const setHeldItem = (pokemonIndividual, item) => {
  if (pokemonIndividual == null) {
    return;
  }
  if (item == null) {
    return;
  }
  pokemonIndividual.heldItem = item
}

export const evolvePokemon = (pokemonIndividual) => {
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
  if (pokemonIndividual.level === pokemonIndividual.pokemonType.evolveLevel) {
    pokemonIndividual.pokemonType = newPokemonType;
  }
};

const transferUpgradedStats = () => {
  
}


const baseExp = 60;
const faintedPokemonLevel = 20;
const numParticipants = 1;

export const calculateExperienceToNextLevel = (level) => {
  return Math.pow(level, 3);
};

export const levelUpPokemon = (pokemonIndividual, experience) => {
  console.log("Exp gained: ", experience);
  while (experience > 0) {
    const maxExp = calculateExperienceToNextLevel(pokemonIndividual.level);
    const experienceToNextLevel = maxExp - pokemonIndividual.currentExp;
    console.log(experience);
    if (experience >= experienceToNextLevel) {
      pokemonIndividual.level += 1;
      playSound("levelup.mp3");
      addMoveToPurchaseList(pokemonIndividual);
      // learnMove(pokemonIndividual);
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