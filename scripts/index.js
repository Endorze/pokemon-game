const { ALL_POKEMON } = pokemonModule;
const { ROUTE1 } = route1Module;
const { pokemonBattleScene, startBattle } = battleModule;
const { createPokemonIndivual, calculateDamage } = pokemonUtilsModule;
const { startGameMusic, playSound } = audioModule;
const { sleep } = utilsModule;

let pokeCurrency = 500000;
let currentBackground = -1;
let playerName = "";
let playerGotStarter = false;
let playerStarterPokemon = "";
let playerStarterPokemonImage = "";
let musicActive = false;
const forest = "../images/forest.jpg";
const pokemonCity = "../images/pokemoncity.avif";
const profoak1 = "../images/profoak1.jpg";
const profoak2 = "../images/profoak2.avif";
const pikachuElectric = " ../images/pikachuelectricity.gif";
const redImage = "../images/rivalred.png";
const charmanderImage = "../images/charmander.png";
const redPokeball = "../images/red.avif";
const jumpingrope = "../images/pokemonjumpingrope.gif";

let prevDialogDiv = null;
let currentAllyPokemonIndividual = null;
let currentOpponentPokemonIndividual = null;
let allowUserAction = false;
let pokemonFightActive = false;
let loadingScreenActive = true;

// List of pokemonIndividual
const playerPokemonList = [];

const toggleLoadingScreen = async () => {
  const loadingScreen = document.getElementById("loading-screen");

  if (!loadingScreenActive) {
    loadingScreen.style.display = "flex";
    loadingScreenActive = true;
    return;
  }
  if (loadingScreenActive) {
    if (!DEV_MODE) await sleep(5000);
    loadingScreen.style.display = "none";
    loadingScreenActive = false;
    return;
  }
};

toggleLoadingScreen();

function simplePhysicalMove(targetPokemonIndividual, userPokemonIndividual) {
  const damageDealt = Math.ceil(
    calculateDamage(
      this.baseDamage,
      userPokemonIndividual.physicalDamageStat,
      targetPokemonIndividual.physicalDefenceStat
    )
  );
  targetPokemonIndividual.currentHp = Math.max(
    targetPokemonIndividual.currentHp - damageDealt,
    0
  );
}

function simpleSpecialMove(targetPokemonIndividual, userPokemonIndividual) {
  const damageDealt = Math.ceil(
    calculateDamage(
      this.baseDamage,
      userPokemonIndividual.specialDamageStat,
      targetPokemonIndividual.specialDefenceStat
    )
  );
  targetPokemonIndividual.currentHp = Math.max(
    targetPokemonIndividual.currentHp - damageDealt,
    0
  );
}

const moves = {
  tackle: {
    name: "Tackle",
    baseDamage: 20,
    priority: 1,
    numberOfUses: 40,
    performMove: simplePhysicalMove,
  },
  heal: {
    name: "Heal",
    baseDamage: 20,
    priority: 1,
    performMove: function (targetPokemonIndividual, userPokemonIndividual) {
      userPokemonIndividual.currentHp = Math.min(
        userPokemonIndividual.currentHp + this.baseDamage,
        userPokemonIndividual.pokemonType.health(userPokemonIndividual.level)
      );
    },
  },
  "quick-attack": {
    name: "Quick Attack",
    baseDamage: 40,
    priority: 2,
    numberOfUses: 20,
    performMove: simplePhysicalMove,
  },
};

const dialogueObject = [
  {
    name: "Prof. Oak",
    text: () =>
      `Ah, welcome to Pangea! Your mother mentioned you'd be arriving soon. There's much to discover, and you're about to embark on an unforgettable journey.`,
    buttonText: "Continue",
    backgroundImage: profoak1,
  },
  {
    name: "Prof. Oak",
    text: () =>
      `Allow me to extend a heartfelt welcome to the incredible world of Pokémon! Here, humans and Pokémon live in harmony, working together to unlock the mysteries of nature.`,
    buttonText: "Continue",
    backgroundImage: jumpingrope,
  },
  {
    name: "Prof. Oak",
    text: () =>
      `For over a decade, we've harnessed the untapped potential of Pokémon to achieve the unimaginable—our world is forever changed because of them.`,
    buttonText: "Continue",
    backgroundImage: profoak1,
  },
  {
    name: "Prof. Oak",
    text: () =>
      `Take Pikachu, for example. Have you ever wondered why we shifted from nuclear power to safer alternatives? Some Pokémon, like Pikachu, help us harness energy in ways we never thought possible. In return, we provide for their needs, creating a symbiotic relationship where both sides thrive. It's a partnership that benefits us all.`,
    buttonText: "Continue",
    backgroundImage: pikachuElectric,
  },
  {
    name: "Prof. Oak",
    text: () =>
      `But enough of the science talk! The moment you've been waiting for is here—it's time to choose your very own Pokémon partner! Ready?`,
    buttonText: "Continue",
    backgroundImage: profoak2,
    action: () => pokemonStarterScene(),
  },
  {
    name: "IGNORED SCENE",
    text: () => null,
  },
  {
    name: "Prof. Oak",
    text: () =>
      `I'm happy for you and your ${playerStarterPokemon}, i think you'll make an most excellent team! Also before you head out, i heard that Red was looking for you, so i told him to swing by.`,
    buttonText: "Continue",
    backgroundImage: profoak1,
  },
  {
    name: "Prof. Oak",
    text: () =>
      `He's been having quite the rough time since the passing of his Pidgeotto, maybe you could try to cheer him on when you see him? In any case, good luck out there, go explore the Pangea just like your father did! And when you're in the big leagues dont forget about ole Professor Oak!`,
    buttonText: "Continue",
    backgroundImage: profoak2,
    action: () => loadTown(),
  },
];

const pickFourRandomMoves = (pokemonType, level) => {
  // TODO
  return [pokemonType.moves[0]];
};

const loadTown = async () => {
  const town = document.getElementById("town");
  town.style.display = "block";
  console.log(playerPokemonList[0])
  returnFromWilderness();
};

const startGame = async () => {
  playSound("start-game.mp3");
  if (!DEV_MODE) await sleep(1500);
  goToNextDialogue();
  console.log("attempting to start game, startGame()");
};

const onDialogueAction = async () => {
  if (!allowUserAction) return;

  playSound("hover.mp3");
  allowUserAction = false;

  const currentDialogue = dialogueObject[currentBackground];
  if (currentDialogue.action) currentDialogue.action();

  if (!DEV_MODE) await sleep(1000);
  goToNextDialogue();
};

//Turns off startscreen, starts the game.
const goToNextDialogue = () => {
  const startScreen = document.getElementById("start-screen");
  if (!musicActive) {
    startGameMusic("littleroot.mp3", 10000);
    musicActive = true;
  }
  startScreen.style.display = "none";
  currentBackground = (currentBackground + 1) % dialogueObject.length;
  displayDialogue(dialogueObject[currentBackground]);
};

// Sets the dialogue text
const displayDialogue = (dialogueData) => {
  allowUserAction = true;
  const gamingWindow = document.getElementById("dialogue-scene");
  gamingWindow.style.backgroundImage = `url("${dialogueData.backgroundImage}")`;
  gamingWindow.style.display = "block";

  const dialogueName = document.getElementById("dialogue-name");
  dialogueName.textContent = dialogueData.name;

  const dialogueText = document.getElementById("dialogue-text");
  dialogueText.textContent = dialogueData.text();
};

//Starts the scene where the player gets to pick starter pokemon.
const pokemonStarterScene = () => {
  const pokemonScene = document.getElementById("select-pokemon-scene");
  pokemonScene.style.display = "block";
  console.log("Jag körde pickpokemon funktionen");
};

const pickPokemon = (pokemonId) => {
  console.log(ALL_POKEMON);
  const pokemonScene = document.getElementById("select-pokemon-scene");
  if (!playerGotStarter) {
    const pokemonType = ALL_POKEMON[pokemonId];
    playerPokemonList.push(
      createPokemonIndivual(pokemonType, 5, [pokemonType.moves[0]])
    );
    playerGotStarter = true;
    pokemonScene.style.display = "none";
    playerStarterPokemon = pokemonId;
  }
  goToNextDialogue();
};

const randomWildPokemon = (wildPokemonList) => {
  let random = Math.floor(Math.random() * wildPokemonList.length);
  console.log(random + " Played randomWildPokemon function");
  return random;
};

let allowUserMovementInput = true;
const playerStartX = 50;

const playerMaxX = 90;
const playerMinX = -190;

const cameraMaxX = 50;
const cameraMinX = -150;

let keyADown = false;
let keyDDown = false;

let cameraLagSpeed = 0.05;
let playerLagSpeed = 0.4;

let cameraX = playerStartX;
let cameraTargetX = playerStartX;

let playerX = playerStartX;
let playerTargetX = playerStartX;

let playerSpeed = 25;
let enteringWilderness = false;

const setCameraAndPlayerProperties = () => {
  const town = document.getElementById("town");
  town.style.setProperty("--cameraX", `${cameraX}%`);
  town.style.setProperty("--playerX", `${playerX}%`);
};

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyA") {
    keyADown = true;
  } else if (e.code === "KeyD") {
    keyDDown = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyA") {
    keyADown = false;
  } else if (e.code === "KeyD") {
    keyDDown = false;
  }
});

const deltaTimeSeconds = 1 / 60;

console.log(deltaTimeSeconds);

let playerDirection = "left";
let playerRunning = false;

const [enableTownClock, disableTownClock] = (function () {
  let intervalId = null;

  const enableTownClock = () => {
    intervalId = setInterval(async () => {
      if (allowUserMovementInput) {
        if (keyADown) {
          playerTargetX -= playerSpeed * deltaTimeSeconds;
          playerRunning = true;
          playerDirection = "left";
        } else if (keyDDown) {
          playerTargetX += playerSpeed * deltaTimeSeconds;
          playerRunning = true;
          playerDirection = "right";
        } else {
          playerRunning = false;
        }

        playerTargetX = Math.min(
          playerMaxX,
          Math.max(playerMinX, playerTargetX)
        );
        cameraTargetX = playerTargetX; // Follow player
        cameraTargetX = Math.min(
          cameraMaxX,
          Math.max(cameraMinX, cameraTargetX)
        );

        if (playerTargetX + 2 > playerMaxX) {
          if (!enteringWilderness) {
            enterWilderness();
            console.log("Attempting to enter wilderness.");
            enteringWilderness = true;
            return;
          }
        }
      }

      updatePlayerSprite();

      cameraX = cameraX + (cameraTargetX - cameraX) * cameraLagSpeed;
      playerX = playerX + (playerTargetX - playerX) * playerLagSpeed;

      setCameraAndPlayerProperties();
    }, deltaTimeSeconds * 1000);
  };

  const disableTownClock = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  return [enableTownClock, disableTownClock];
})();

let spriteState = "";

const updatePlayerSprite = () => {
  const allySprite = document.getElementById("player-character");
  const spriteSource = "../images/character.gif";
  const newSpriteState = playerRunning + playerDirection;
  const shouldUpdateSprite = spriteState != newSpriteState;
  spriteState = newSpriteState;

  if (playerRunning) {
    if (playerDirection == "left") {
      if (shouldUpdateSprite) {
        allySprite.src = spriteSource;
        allySprite.style.transform = "scaleX(1)";
        console.log(allySprite.src);
        // Set image to running left
      }
    } else {
      if (shouldUpdateSprite) {
        allySprite.src = `../images/character.gif`;
        allySprite.style.transform = "scaleX(-1)";
        // Set image to running right
      }
    }
  } else {
    if (playerDirection == "left") {
      // Set image to idle left
    } else {
      // Set image to idle right
    }
  }
};

const enterWilderness = async () => {
  allowUserMovementInput = false;

  await animate(
    (time, deltaTime) => {
      playerTargetX += playerSpeed * deltaTime;
    },
    2,
    30
  );

  console.log("Animation done");
  startBattle();
  disableTownClock();
};

const returnFromWilderness = async () => {
  enableTownClock();

  allowUserMovementInput = false;
  playerX = playerMaxX + 15;
  playerTargetX = playerX;

  await sleep(2000);

  await animate(
    (time, deltaTime) => {
      playerTargetX -= playerSpeed * deltaTime;
    },
    1.5,
    30
  );

  enteringWilderness = false;
  allowUserMovementInput = true;
};

const animate = (animationFunction, durationSeconds, frameRate) => {
  return new Promise((res) => {
    let time = 0;
    let deltaTime = durationSeconds / frameRate;
    const id = setInterval(() => {
      if (time > durationSeconds) {
        clearInterval(id);
        res();
        return;
      }

      time += deltaTime;
      animationFunction(time / durationSeconds, deltaTime);
    }, deltaTime * 1000);
  });
};

const fetchData = () => {
  return {
    user: {
      userPokemon: playerPokemonList.map(pokemonIndividual => ({
        ...pokemonIndividual,
        pokemonType: pokemonIndividual.pokemonType.id
      })),
      userMoney: pokeCurrency,
    },
  };
};

const checkForLocalData = () => {
  const loadbutton = document.getElementById("load-button");
  if (localStorage.getItem("saveGame") === null) {
    return;
  } else {
    loadbutton.style.display = "block";
  }
}

checkForLocalData();

const saveGame = () => {
  const data = fetchData();
  localStorage.setItem("saveGame", JSON.stringify(data));
  console.log("Saved game");
  console.log(data);
};

const loadGame = () => {
  const savedData = localStorage.getItem("saveGame");
  if (savedData) {
    const data = JSON.parse(savedData);

    playerPokemonList.push(...data.user.userPokemon.map(pokemonSave => ({
      ...pokemonSave,
      pokemonType: Object.values(ALL_POKEMON).find(pokemonType => pokemonType.id === pokemonSave.pokemonType)
    })).filter(individual => individual.pokemonType != null));
    pokeCurrency = data.user.userMoney;
    console.log(pokeCurrency)
    loadTown();
    startGameMusic();
  }
};

let menuOpen = false;
const openMenu = (e) => {
  const menu = document.getElementById("main-menu")
  if (e.key == "Escape") {
    if (!menuOpen) {
      console.log("Open menu")
      menu.style.display = "block";
      menuOpen = true;
    } else {
      menu.style.display = "none";
      menuOpen = false;
    }
  }
}

document.addEventListener("keydown", openMenu);

const addPokemonToTeam = (id) => {
  const pokemonType = ALL_POKEMON[id];
  playerPokemonList.push(
    createPokemonIndivual(pokemonType, 5, [pokemonType.moves[0]])
  );
}

// addPokemonToTeam("charmander");
// addPokemonToTeam("bulbasaur");
// addPokemonToTeam("squirtle");
// addPokemonToTeam("pidgeott");
// addPokemonToTeam("butterfree");
// addPokemonToTeam("beedrill");

console.log(playerPokemonList);