
import { startGameMusic, startBattleMusic, playSound } from "./audioModule";
import { createRandomIndividual, levelUpPokemon, calculateExpGain, updateVisiblePokemonInfo, calculateExperienceToNextLevel, calculateStat } from "./pokemonUtilsModule";
import { sleep } from "./utilsModule";
import { ALL_ROUTES } from "./routes";
import { ALL_POKEMON } from "./pokemonModule"
import { addPokeCurrency, getPokeCurrency, playerPokemonList } from "./sharedData";
import { TRAINERS } from "./trainerModule";
import { ALL_MOVES } from "./movesModule";
import { loadTown } from "./townModule"
import { DEV_MODE } from "./constants";
import { toggleLoadingScreen } from "./dialogue"; 

let currentAllyPokemonIndividual = null;
let currentOpponentPokemonIndividual = null;
let pokemonSlayed = 0;
let instanceCashEarned = 0;
let currentWave = 1;
let pokemonFightActive = false;
let allowUserAction = true;

const loadPokemonIndividualMoves = (pokemonIndividual) => {

  for (let i = 0; i < 4; i++) {
    const element = document.getElementById("skill" + (i + 1));

    const moveId = pokemonIndividual.moves[i];

    if (moveId) {
      const move = ALL_MOVES[moveId];
      element.textContent = move.name;
    } else {
      element.textContent = null;
    }
  }

};

const randomWildPokemon = (wildPokemonList) => {
  let random = Math.floor(Math.random() * wildPokemonList.length);
  console.log(random + " Played randomWildPokemon function");
  return random;
};
//Generates pokecoins per when opponent pokemon faints.
const generatePokeCoins = (wildPokemonlevel) => {
  let totalPokeCoins = 0;
  for (let i = 0; i < wildPokemonlevel; i++) {
    for (let j = 0; j <= 10; j++) {
      totalPokeCoins += Math.floor(Math.random() * wildPokemonlevel + 1);
    }
  }
  const pokedollars = document.getElementById("pokedollars");
  addPokeCurrency(totalPokeCoins);
  pokedollars.textContent = "Pokédollars: " + getPokeCurrency() + "$";
  instanceCashEarned = totalPokeCoins;
};

//Sets up the battle scene, updates ally and opponent pokemon.
export const pokemonBattleScene = (pokemonEncounter) => {
  console.log("pokemonBattleScene", {
    pokemonEncounter,
  });
  if (!pokemonFightActive) {
    startBattleMusic(0);
    pokemonFightActive = true;
  }
  const wildPokemonIndividual = createRandomIndividual(pokemonEncounter.pokemonId, pokemonEncounter.level = currentWave);
  currentOpponentPokemonIndividual = wildPokemonIndividual;

  const wildPokemonCry =
    "pokemon/" +
    currentOpponentPokemonIndividual.pokemonType.id +
    "/cry.mp3";
  console.log(wildPokemonCry);
  playSound(wildPokemonCry);

  updateOpponentPokemon();
  updateAllyPokemon();

  const pokemonDescText = document.getElementById("playerPokemonAction");
  pokemonDescText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;
  const battleScene = document.getElementById("battle-scene");
  battleScene.style.display = "block";

  loadPokemonIndividualMoves(currentAllyPokemonIndividual);
  allowUserAction = true;
};

const trainerBattleScene = (trainer) => {

  if (!pokemonFightActive) {
    startBattleMusic(0);
    pokemonFightActive = true;
  }
  for (let i = 0; i < trainer.pokemonTeam.length; i++) {
    currentOpponentPokemonIndividual = trainer.pokemonTeam[i];
    console.log(currentAllyPokemonIndividual);
  }
  const wildPokemonCry =
    "pokemon/" +
    currentOpponentPokemonIndividual.pokemonType.id +
    "/cry.mp3";
  console.log(wildPokemonCry);
  playSound(wildPokemonCry);

  updateOpponentPokemon();
  updateAllyPokemon();

  const pokemonDescText = document.getElementById("playerPokemonAction");
  pokemonDescText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;
  const battleScene = document.getElementById("battle-scene");
  battleScene.style.display = "block";

  loadPokemonIndividualMoves(currentAllyPokemonIndividual);
  allowUserAction = true;
};

//Switches from options menu to battlemenu
export const switchBattleMenu = () => {
  if (!allowUserAction) return;

  const menu = document.getElementById("pokemon-skill-bar");
  const mainMenu = document.getElementById("battle-bar-main-menu");

  if (mainMenu.style.display === "none") {
    mainMenu.style.display = "block";
    menu.style.display = "none";
  } else {
    mainMenu.style.display = "none";
    menu.style.display = "block";
  }
};


//Toggles display on div, shows your pokemonteam.
let listOfPokemon = false;
export const showPokemonTeam = () => {
  const pokemonList = document.getElementById("battle-pokemonlist-menu")
  if (!listOfPokemon) {
    pokemonList.style.display = "block";
    for (let i = 0; i < 6; i++) {
      const buttonElement = document.getElementById(`select-pokemon-${i}`);
      const buttonIcon = document.getElementById(`select-pokemon-${i}-icon`) as HTMLImageElement;
      const buttonName = document.getElementById(`select-pokemon-${i}-name`);
      const buttonLevel = document.getElementById(`select-pokemon-${i}-level`);
      const buttonHpText = document.getElementById(`select-pokemon-${i}-hp-text`);
      const pokemonIndividual = playerPokemonList[i];

      if (pokemonIndividual) {
        console.log(pokemonIndividual);
        buttonElement.style.display = "block";
        buttonIcon.src = "pokemon/" + pokemonIndividual.pokemonType.id + "/front.gif";
        buttonName.textContent = pokemonIndividual.name;
        buttonLevel.textContent = pokemonIndividual.level;
        buttonHpText.textContent = pokemonIndividual.currentHp;
        listOfPokemon = true;
      } else {
        console.log("Hej")
        return;
      }
    }
    console.log("Trying to show pokemon team")
    listOfPokemon = true;
    return;
  } else {
    pokemonList.style.display = "none";
    listOfPokemon = false;
    return;
  }
}

//When you pick pokemon in pokemonmenu you set it to be your fighting pokemon.
export const setCurrentPokemon = async (index) => {
  if (playerPokemonList[index] != null) {
    if (playerPokemonList[index] == currentAllyPokemonIndividual) {
      console.log(currentAllyPokemonIndividual.pokemonType.name + " is already fighting.")
      return;
    } else if (playerPokemonList[index].currentHp > 0) {
      playSound("buttonhover.mp3")
      await sleep(500)
      const pokemonList = document.getElementById("battle-pokemonlist-menu")
      pokemonList.style.display = "none";
      currentAllyPokemonIndividual = playerPokemonList[index];
      listOfPokemon = false;
      updateAllyPokemon();
      loadPokemonIndividualMoves(currentAllyPokemonIndividual);
      console.log("setCurrentPokemon, ", currentAllyPokemonIndividual);
      await sleep(1000)
      doAIMove();
    } else {
      console.log(playerPokemonList[index], "has fainted")
    }
  } else {
    console.log("Thats not a pokemon");
    return;
  }
}

//Updates information on opponent pokemon.
const updateOpponentPokemon = () => {
  const wiPokemon = document.getElementById("wildpokemon");
  const wiLevel = document.getElementById("wildlevel");
  const wiPokemonSprite = document.getElementById("random-wild-pokemon") as HTMLImageElement;

  wiPokemon.textContent = currentOpponentPokemonIndividual.pokemonType.name;
  wiLevel.textContent = "level " + currentOpponentPokemonIndividual.level;
  wiPokemonSprite.src =
    "pokemon/" +
    currentOpponentPokemonIndividual.pokemonType.id +
    "/front.gif";

  updateHealthBar(
    currentOpponentPokemonIndividual,
    "wildHp",
    "opponentHpBar"
  );
};

export const performAttack = async (moveIndex) => {
  if (!allowUserAction) return;
  if (currentAllyPokemonIndividual.moves[moveIndex] == null) {
    return;
  }
  allowUserAction = false;

  const allySpeed = calculateStat(currentAllyPokemonIndividual.pokemonType.speed, currentAllyPokemonIndividual.statUpgrades.speed, currentAllyPokemonIndividual.level)
  const opponentSpeed = calculateStat(currentOpponentPokemonIndividual.pokemonType.speed, currentOpponentPokemonIndividual.statUpgrades.speed, currentOpponentPokemonIndividual.level)

  console.log("Ally Speed ", allySpeed, "Opponent Speed ", opponentSpeed)
  if (opponentSpeed > allySpeed) {
    await sleep(500);
    await doAIMove();
    await displayFaintMessages()
    if (currentAllyPokemonIndividual.currentHp > 0) {
      await sleep(1000);
      await allyUseMove(moveIndex);
      await displayFaintMessages();
    }
  } else {
    await allyUseMove(moveIndex);
    await displayFaintMessages();
    if (currentOpponentPokemonIndividual.currentHp > 0) {
      await sleep(1000)
      await doAIMove();
      await displayFaintMessages();
    }
  }
  if (currentOpponentPokemonIndividual.currentHp == 0) {
    await opponentPokemonFainted();
    return;
  }
  if (currentAllyPokemonIndividual.currentHp == 0) {
    await userPokemonFainted();
  }
  allowUserAction = true;
  const allyPokemonActionText = document.getElementById("playerPokemonAction");
  allyPokemonActionText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;
}

const userPokemonFainted = async () => {
  const hasAlivePokemon = playerPokemonList.some(pokemon => pokemon.currentHp > 0);
  if (hasAlivePokemon) {
    await sleep(2000);
    showPokemonTeam();
    pokemonFaintedText(currentAllyPokemonIndividual);
    return;
  } else {
    await sleep(2000);
    gameOver();
    console.log("Game over")
  }
}

const gameOver = async () => {
  const battleScene = document.getElementById("battle-scene")
  await sleep(2000);
  currentWave = 1;
  battleScene.style.display = "none";
  startGameMusic();
  loadTown();
}

const displayFaintMessages = async () => {
  if (currentAllyPokemonIndividual.currentHp == 0) {
    await sleep(2000);
    pokemonFaintedText(currentAllyPokemonIndividual);
    return;
  }
  if (currentOpponentPokemonIndividual.currentHp == 0) {
    await sleep(2000);
    pokemonFaintedText(currentOpponentPokemonIndividual);
  }
}

const opponentPokemonFainted = async () => {
  const killCounter = document.getElementById("kill-counter-text");
  pokemonSlayed += 1;
  currentWave += 1;
  let route = fetchRoute(currentWave);
  pokemonFaintedText(currentOpponentPokemonIndividual);
  generatePokeCoins(currentOpponentPokemonIndividual.level);
  updateExpBar(currentAllyPokemonIndividual, "experience");
  levelUpPokemon(
    currentAllyPokemonIndividual,
    calculateExpGain(currentOpponentPokemonIndividual.pokemonType.baseExp, currentOpponentPokemonIndividual.level, 1)
  );
  updateAllyPokemon();
  killCounter.textContent = `Pokemon slain: ${pokemonSlayed}`;
  pokemonBattleScene(route[randomWildPokemon(route)]);
  return;
}


//Updates information on ally pokemon.
export const updateAllyPokemon = () => {
  const plPokemon = document.getElementById("playerpokemon");
  const plLevel = document.getElementById("playerlevel");
  const plPokemonSprite = document.getElementById("player-pokemon-image") as HTMLImageElement;

  console.log(currentAllyPokemonIndividual)

  plPokemon.textContent = currentAllyPokemonIndividual.pokemonType.name;
  plLevel.textContent = "level " + currentAllyPokemonIndividual.level;
  plPokemonSprite.src =
    "pokemon/" + currentAllyPokemonIndividual.pokemonType.id + "/back.gif";
  plPokemonSprite.style.height = (currentAllyPokemonIndividual.pokemonType.height || 25) + "%";
  loadPokemonIndividualMoves(currentAllyPokemonIndividual);
  updateExpBar(currentAllyPokemonIndividual, "experience")
  updateHealthBar(currentAllyPokemonIndividual, "playerHp", "allyHpBar");
};

//Updates healthbar visuals based on current% health.
export const updateHealthBar = (pokemonIndividual, hpBarTextId, hpBarOverlayId) => {
  const hpTextElement = document.getElementById(hpBarTextId);
  const hpOverlayElement = document.getElementById(hpBarOverlayId);

  hpTextElement.textContent = pokemonIndividual.currentHp + " HP";

  const hpPercentage =
    pokemonIndividual.currentHp /
    pokemonIndividual.pokemonType.health(pokemonIndividual.level);
  hpOverlayElement.style.width = `${hpPercentage * 100}%`;

  if (hpPercentage < 0.2) {
    hpOverlayElement.style.backgroundColor = `var(--low-hp)`;
    return;
  }
  if (hpPercentage < 0.5) {
    hpOverlayElement.style.backgroundColor = `var(--half-hp)`;
    return;
  }
  hpOverlayElement.style.backgroundColor = `var(--full-hp)`;
};

const updateExpBar = (pokemonIndividual, expBarOverlayId) => {
  const expOverlayElement = document.getElementById(expBarOverlayId);

  // expTextElement.textContent = `${pokemonIndividual.currentExp} / ${calculateExperienceToNextLevel(pokemonIndividual.level)} EXP`;
  const expNeeded = calculateExperienceToNextLevel(pokemonIndividual.level)
  const expPercentage = pokemonIndividual.currentExp / expNeeded;
  expOverlayElement.style.width = `${expPercentage * 100}%`;
};


//Executes ally fightingmove, updates information about ally and opponent pokemon, starts fight again if opponent faints.
export const allyUseMove = async (buttonId) => {
  const allyPokemonActionText = document.getElementById(
    "playerPokemonAction"
  );

  const moveId = currentAllyPokemonIndividual.moves[buttonId];
  const move = ALL_MOVES[moveId];
  await sleep(500);
  allyPokemonActionText.textContent = `${currentAllyPokemonIndividual.pokemonType.name} used ${move.name}`;

  move.performMove(
    currentOpponentPokemonIndividual,
    currentAllyPokemonIndividual
  );
  allyAttackAnimation();
  playSound("hit.mp3");
  updateOpponentPokemon();
  updateAllyPokemon();
};

const fetchRoute = (currentWave) => {
  const routeText = document.getElementById("current-route-text")
  const wave_number = currentWave;
  const num_routes = ALL_ROUTES.length;
  const encounters_per_route = 4;
  const route_index = Math.floor(wave_number / encounters_per_route) % num_routes;
  const route_number = Math.floor(wave_number / encounters_per_route) + 1;
  routeText.textContent = "Route " + route_number;
  return ALL_ROUTES[route_index];
}

const pokemonFaintedText = (pokemonIndividual) => {
  const allyPokemonActionText = document.getElementById(
    "playerPokemonAction"
  );
  allyPokemonActionText.textContent = `${pokemonIndividual.pokemonType.name} fainted...`;

  setTimeout(() => {
    allyPokemonActionText.textContent = `${pokemonIndividual.pokemonType.name} fainted...`;
  }, 1000);
};

const allyAttackAnimation = () => {
  const allySprite = document.getElementById("player-pokemon-image");
  const opponentSprite = document.getElementById("random-wild-pokemon");

  if (!allySprite || !opponentSprite) {
    console.error("Ett eller båda av elementen saknas i DOM");
    return;
  }

  const allySpriteRect = allySprite.getBoundingClientRect();
  const opponentSpriteRect = opponentSprite.getBoundingClientRect();

  const deltaX = opponentSpriteRect.left - allySpriteRect.left;
  const deltaY = opponentSpriteRect.top - allySpriteRect.top;

  allySprite.style.setProperty(
    "--translate-values",
    `translate(${deltaX}px, ${deltaY}px)`
  );

  allySprite.classList.add("attack-move");
  console.log("allyAttackAnimation");

  allySprite.addEventListener(
    "animationend",
    () => {
      allySprite.classList.remove("attack-move");
    },
    { once: true }
  );
};


const doAIMove = async () => {
  const allyPokemonActionText = document.getElementById(
    "playerPokemonAction"
  );

  if (currentOpponentPokemonIndividual.currentHp == 0) {
    return;
  }

  // Randomize opponent action
  const randomMoveIndex = Math.floor(
    Math.random() * currentOpponentPokemonIndividual.moves.length
  );
  const moveId = currentOpponentPokemonIndividual.moves[randomMoveIndex];
  const move = ALL_MOVES[moveId];
  allyPokemonActionText.textContent = `${currentOpponentPokemonIndividual.pokemonType.name} used ${move.name}`;
  console.log("AI used " + moveId, move);

  // Perform move
  opponentAttackAnimation();
  move.performMove(
    currentAllyPokemonIndividual,
    currentOpponentPokemonIndividual
  );
  playSound("hit.mp3");
  // Update ally
  updateAllyPokemon();
  // Update opponent
  updateOpponentPokemon();

};


const opponentAttackAnimation = () => {
  const allySprite = document.getElementById("player-pokemon-image");
  const opponentSprite = document.getElementById("random-wild-pokemon");

  if (!allySprite || !opponentSprite) {
    console.error("Ett eller båda av elementen saknas i DOM");
    return;
  }

  const allySpriteRect = allySprite.getBoundingClientRect();
  const opponentSpriteRect = opponentSprite.getBoundingClientRect();

  const deltaX = opponentSpriteRect.left - allySpriteRect.left;
  const deltaY = opponentSpriteRect.top - allySpriteRect.top;

  opponentSprite.style.setProperty(
    "--translate-values",
    `translate(${-deltaX}px, ${-deltaY}px)`
  );

  opponentSprite.classList.add("attack-move");
  console.log("allyAttackAnimation");

  opponentSprite.addEventListener(
    "animationend",
    () => {
      opponentSprite.classList.remove("attack-move");
    },
    { once: true }
  );
};

export const runFromBattlePopup = () => {
  const runAwayPopup = document.getElementById("run-away-popup");
  const runAwayText = document.getElementById("run-away-currency");
  runAwayPopup.style.display = "block";
  runAwayText.textContent = `If you run now you've made $${instanceCashEarned} Pokédollars`
};

export const runFromBattle = async () => {
  const battleScene = document.getElementById("battle-scene");
  const runAwayPopup = document.getElementById("run-away-popup");
  runAwayPopup.style.display = "none";
  toggleLoadingScreen();
  if (!DEV_MODE) await sleep(2000);
  battleScene.style.display = "none";
  currentWave = 1;
  instanceCashEarned = 0;
  loadTown();
  startGameMusic();
};

export const closeRunFromBattlePopup = () => {
  const runAwayPopup = document.getElementById("run-away-popup");
  runAwayPopup.style.display = "none";
};

export const startBattle = () => {
  let route = fetchRoute(currentWave)
  console.log(route);
  const battleScene = document.getElementById("battle-scene");
  battleScene.style.display = "block";
  currentAllyPokemonIndividual = playerPokemonList[0];
  // trainerBattleScene(TRAINERS);
  pokemonBattleScene(route[randomWildPokemon(route)]);
  startBattleMusic();
};
