const { ALL_POKEMON } = allPokemonModule;
const { ROUTE1 } = route1Module;
let pokeCurrency = 0;
let currentBackground = -1;
let playerName = "";
let playerHealth = 20;
const MAX_PLAYER_HEALTH = 20;
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
const backgroundMusic = new Audio(`../mp3/pewtercitytheme.mp3`);
backgroundMusic.addEventListener("ended", () => {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
});
const battleMusic = new Audio(`../mp3/wildpokemonencounter.mp3`);
battleMusic.addEventListener("ended", () => {
  battleMusic.currentTime = 0;
  battleMusic.play();
});
let prevDialogDiv = null;
let currentAllyPokemonIndividual = null;
let currentOpponentPokemonIndividual = null;
let allowUserAction = false;
let pokemonFightActive = false;
let loadingScreenActive = true;
const loadingScreen = document.getElementById("loading-screen")

const calculateDamage = (baseDamage, attackStat, defenseStat) => {
  return (baseDamage * attackStat) / defenseStat;
};

const sleep = async (millis) =>
  new Promise((resolve) => setTimeout(resolve, millis));

const toggleLoadingScreen = async () => {
  if (loadingScreenActive) {
    await sleep(5000);
    loadingScreen.style.display = "none";
    loadingScreenActive = false;
    return;
  }

}

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
    performMove: simplePhysicalMove,
    performAllyAnimation: () => {},
    performOpponentAnimation: () => {},
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
  },
  {
    name: "You",
    text: () =>
      `This is it! The excitement is real... What Pokémon will I get to choose? The possibilities are endless!`,
    buttonText: "Continue",
    action: () => pokemonStarterScene(),
  },
  {
    name: "You",
    text: () =>
      `Phew, that was a tough decision! But now, I've got my very first Pokémon! This is just the beginning.`,
    buttonText: "Continue",
    backgroundImage: "",
  },
  {
    name: "",
    text: () =>
      `Congratulations! You've received your very first ${playerStarterPokemon}. This is the start of your incredible adventure!`,
    buttonText: "Continue",
    backgroundImage: redPokeball,
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
  },
  {
    name: "You",
    text: () =>
      `I should probably get going, i've got the entire region of Pangea to explore and all kinds of wonderful Pokémon to see!`,
    buttonText: "Lets explore!",
    backgroundImage: pokemonCity,
  },
  {
    name: "",
    text: () =>
      `Normally i would be scared of going out on my own, but right now i'm not on my own, i got my strong ${playerStarterPokemon}, lets go to Route 1!`,
    buttonText: "Continue",
    backgroundImage: pokemonCity,
  },
  {
    name: "",
    text: () => `"You hear rustling coming from the bush"`,
    buttonText: "Continue",
    backgroundImage: forest,
    action: () => {
      currentAllyPokemonIndividual = playerPokemonList[0]
      pokemonBattleScene(ROUTE1[randomWildPokemon(ROUTE1)])
    },
  },
];





const pickFourRandomMoves = (pokemonType, level) => {
  // TODO
  return [pokemonType.moves[0]];
};

const loadPokemonIndividualMoves = (pokemonIndividual) => {
  const skill1 = document.getElementById("skill1");
  const skill2 = document.getElementById("skill2");
  const skill3 = document.getElementById("skill3");
  const skill4 = document.getElementById("skill4");

  const move1Id = pokemonIndividual.pokemonType.moves[0];
  const move1 = moves[move1Id];

  skill1.textContent = move1.name;
};
document.getElementById("skill1");

const allyUseMove = async (buttonId) => {
  const allyPokemonActionText = document.getElementById("playerPokemonAction");
  if (!allowUserAction) return;
  if (buttonId != 0) {
    return;
  }
  allowUserAction = false;
  const moveId = currentAllyPokemonIndividual.moves[buttonId];
  const move = moves[moveId];

  await sleep(500);

  allyPokemonActionText.textContent = `${currentAllyPokemonIndividual.pokemonType.name} used ${move.name}`;

  move.performMove(
    currentOpponentPokemonIndividual,
    currentAllyPokemonIndividual
  );
  allyAttackAnimation();
  playSound("hit.mp3")
  updateOpponentPokemon();
  updateAllyPokemon();

  if (currentAllyPokemonIndividual.currentHp == 0) {
    await sleep(2000);
    pokemonFaintedText(currentAllyPokemonIndividual);
    console.log("You dead");
    //presentFailScreen();
    return;
  }

  if (currentOpponentPokemonIndividual.currentHp == 0) {
    await sleep(2000);
    pokemonFaintedText(currentOpponentPokemonIndividual);
    generatePokeCoins(currentOpponentPokemonIndividual.level);
    levelUpPokemon(
      currentAllyPokemonIndividual,
      currentOpponentPokemonIndividual.pokemonType.baseExp
    );
    updateAllyPokemon();
    console.log("You live to tell the tale");
    pokemonBattleScene(ROUTE1[randomWildPokemon(ROUTE1)])
    return;
  }

  await sleep(2000);
  doAIMove();

  await sleep(2500);
  allyPokemonActionText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;
};


const pokemonFaintedText = (pokemonIndividual) => {
  const allyPokemonActionText = document.getElementById("playerPokemonAction");
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

const generatePokeCoins = (wildPokemonlevel) => {

  for (let i = 0; i < wildPokemonlevel; i++) {
    for(let j = 0; j <= 10; j++) {
      pokeCurrency += Math.floor(Math.random(5) * wildPokemonlevel + 1);
    }
  }

  const pokedollars = document.getElementById("pokedollars")
  pokedollars.textContent = "Pokédollars: " + pokeCurrency + "$";

}

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

const setInfoBoxText = (text) => {
  const allyPokemonActionText = document.getElementById("playerPokemonAction");
  allyPokemonActionText.textContent = text;
} 

const endBattle = () => {};

const doAIMove = () => {
  const allyPokemonActionText = document.getElementById("playerPokemonAction");

  // Randomize opponent action
  const randomMoveIndex = Math.floor(
    Math.random() * currentOpponentPokemonIndividual.moves.length
  );
  const moveId = currentOpponentPokemonIndividual.moves[randomMoveIndex];
  const move = moves[moveId];
  allyPokemonActionText.textContent = `${currentOpponentPokemonIndividual.pokemonType.name} used ${move.name}`;
  console.log("AI used " + moveId, move);

  // Perform move
  opponentAttackAnimation();
  move.performMove(
    currentAllyPokemonIndividual,
    currentOpponentPokemonIndividual
  );
  playSound("hit.mp3")
  // Update ally
  updateAllyPokemon();
  // Update opponent
  updateOpponentPokemon();
  if (currentAllyPokemonIndividual.currentHp == 0) {
    setTimeout(() => pokemonFaintedText(currentAllyPokemonIndividual), 2000);
    console.log("You dead");
    //presentFailScreen();
    return;
  }
  if (currentOpponentPokemonIndividual.currentHp == 0) {
    setTimeout(
      () => pokemonFaintedText(currentOpponentPokemonIndividual),
      2000
    );
    return;
  }
  allowUserAction = true;
};

const runFromBattle = () => {
  const battleScene = document.querySelector(".battle-scene")
  let answer = prompt("Are you sure you want to run from the battle? Yes or No?")
  if (answer.toLowerCase() === "yes") {
    battleScene.style.display = "none";
    startGameMusic();
    return;
  } else if (answer.toLowerCase() === "no") {
    return;
  } else {
    alert("Please enter 'yes' or 'no'");
  }
  
}
// List of pokemonIndividual
const playerPokemonList = [
  // {
  //   type: {
  //     name: "Rattata",
  //     level: levelGenerator(ROUTE1_MAX_LEVEL),
  //     health: healthGenerator(30),
  //     pokemonSprite: wildrattata,
  //     damage: 2,
  //     moves: ["tackle"]
  //   },
  //   level: 5,
  //   currentHp: 23,
  //   moves: ["tackle"]
  // }
];

// 10 / 40  heal: 20

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

// List of pokemonType


// List of pokemonEncounter


//Starts game music when the game starts.
const startGameMusic = (duration) => {
  battleMusic.pause();
  backgroundMusic.volume = 0;
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();

  backgroundMusic.addEventListener("ended", () => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  });
  let fadeInterval = setInterval(() => {
    if (backgroundMusic.volume < 0.1) {
      backgroundMusic.volume = Math.min(backgroundMusic.volume + 0.05, 0.1);
    } else {
      clearInterval(fadeInterval);
    }
  }, duration / 20);
};

const startBattleMusic = (duration) => {
  backgroundMusic.pause();
  battleMusic.volume = 0;
  battleMusic.currentTime = 0;
  battleMusic.play();

 
  let fadeInterval = setInterval(() => {
    if (battleMusic.volume < 0.1) {
      battleMusic.volume = Math.min(battleMusic.volume + 0.05, 0.1);
    } else {
      clearInterval(fadeInterval);
    }
  }, duration / 20);
};

//Used to play a sound, for example while hovering/clicking a button.
const playSound = (sound) => {
  let audio = new Audio(`../mp3/${sound}`);
  audio.play();
};

//Turns off startscreen, starts the game.
const switchBackground = () => {
  const startScreen = document.querySelector(".start-screen");
  if (!musicActive) {
    startGameMusic("pewtercitytheme.mp3", 10000);
    musicActive = true;
  }
  startScreen.style.display = "none";
  currentBackground = (currentBackground + 1) % dialogueObject.length;

  dialogue(dialogueObject[currentBackground]);
};

//Sets the dialogue text, uses switchBackground to switch out background image and text.
const dialogue = (dialogueData) => {
  const gamingWindow = document.querySelector(".gaming-window");
  gamingWindow.style.backgroundImage = `url('${dialogueData.backgroundImage}')`;

  const dialogueDiv = document.createElement("div");
  dialogueDiv.classList.add("dialogue-box");

  const dialogueName = document.createElement("h2");
  dialogueName.textContent = dialogueData.name;

  const dialogueText = document.createElement("p");
  dialogueText.classList.add("animated-text");
  dialogueText.textContent = dialogueData.text();

  const button = document.createElement("button");
  button.classList.add("animated-button");
  button.textContent = dialogueData.buttonText;
  button.addEventListener("click", () => {
    if (button.textContent) {
      setTimeout(switchBackground, 200);
      playSound("hover.mp3");

      if (dialogueData.action) {
        dialogueData.action();
      }
    }
  });

  dialogueDiv.appendChild(dialogueName);
  dialogueDiv.appendChild(dialogueText);
  dialogueDiv.appendChild(button);

  if (prevDialogDiv) gamingWindow.removeChild(prevDialogDiv);
  gamingWindow.appendChild(dialogueDiv);
  prevDialogDiv = dialogueDiv;
};

//Starts the scene where the player gets to pick starter pokemon.
const pokemonStarterScene = () => {
  const pokemonScene = document.querySelector(".select-pokemon-scene");
  pokemonScene.style.display = "block";
  console.log("Jag körde pickpokemon funktionen");
};

const pokemonBattleScene = (pokemonEncounter) => {
  console.log("pokemonBattleScene", {
    pokemonEncounter,
  });

  if (!pokemonFightActive) {
    startBattleMusic(0)
    pokemonFightActive = true;
  }

  const wildPokemonIndividual = createRandomIndividual(pokemonEncounter);

  currentOpponentPokemonIndividual = wildPokemonIndividual;

  updateOpponentPokemon();
  updateAllyPokemon();

  const pokemonDescText = document.getElementById("playerPokemonAction");
  pokemonDescText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;

  const battleScene = document.querySelector(".battle-scene");
  battleScene.style.display = "block";

  loadPokemonIndividualMoves(currentAllyPokemonIndividual);

  allowUserAction = true;
};

const updateOpponentPokemon = () => {
  const wiPokemon = document.getElementById("wildpokemon");
  const wiLevel = document.getElementById("wildlevel");
  const wiPokemonSprite = document.getElementById("random-wild-pokemon");

  wiPokemon.textContent = currentOpponentPokemonIndividual.pokemonType.name;
  wiLevel.textContent = "level " + currentOpponentPokemonIndividual.level;
  wiPokemonSprite.src = "../pokemon/" + currentOpponentPokemonIndividual.pokemonType.id + "/front.gif"

  updateHealthBar(currentOpponentPokemonIndividual, "wildHp", "opponentHpBar");
};

const updateAllyPokemon = () => {
  const plPokemon = document.getElementById("playerpokemon");
  const plLevel = document.getElementById("playerlevel");
  const plPokemonSprite = document.getElementById("player-pokemon-image");

  plPokemon.textContent = currentAllyPokemonIndividual.pokemonType.name;
  plLevel.textContent = "level " + currentAllyPokemonIndividual.level;
  plPokemonSprite.src = "../pokemon/" + currentAllyPokemonIndividual.pokemonType.id + "/back.gif";

  updateHealthBar(currentAllyPokemonIndividual, "playerHp", "allyHpBar");
};

const updateHealthBar = (pokemonIndividual, hpBarTextId, hpBarOverlayId) => {
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

const pickPokemon = (pokemonId) => {
  console.log(ALL_POKEMON)
  const pokemonScene = document.querySelector(".select-pokemon-scene");
  if (!playerGotStarter) {
    const pokemonType = ALL_POKEMON[pokemonId];
    playerPokemonList.push(
      createPokemonIndivual(pokemonType, 5, [pokemonType.moves[0]])
    );
    playerGotStarter = true;
    pokemonScene.style.display = "none";
    playerStarterPokemon = pokemonId;
    playSound("caughtpokemon.mp3");
  }
};

const randomWildPokemon = (wildPokemonList) => {
  let random = Math.floor(Math.random() * wildPokemonList.length);
  console.log(random + " Played randomWildPokemon function");
  return random;
};

const switchBattleMenu = () => {
  if (!allowUserAction) return;

  const menu = document.querySelector(".pokemon-skill-bar");
  const mainMenu = document.querySelector(".battle-bar-main-menu");

  if (mainMenu.style.display === "none") {
    mainMenu.style.display = "block";
    menu.style.display = "none";
  } else {
    mainMenu.style.display = "none";
    menu.style.display = "block";
  }
};
