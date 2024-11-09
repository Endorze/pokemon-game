let currentBackground = -1;
let playerName = "";
let playerHealth = 20;
const MAX_PLAYER_HEALTH = 20;
let playerGotStarter = false;
let playerStarterPokemon = "";
let playerStarterPokemonImage = "";
let musicActive = false;
const forest = "../images/forest.jpg"
const pokemonCity = "../images/pokemoncity.avif"
const profoak1 = "../images/profoak1.jpg";
const profoak2 = "../images/profoak2.avif";
const pikachuElectric = " ../images/pikachuelectricity.gif";
const redImage = "../images/rivalred.png";
const charmanderImage = "../images/charmander.png";
const redPokeball = "../images/red.avif";
const wildrattata = "../images/rattata.gif";
const wildmagnemite = "../images/magnemite.gif";
const wildPidgey = "../images/pidgey.gif"
const squirtle = "../images/squirtle.webp";
const wildsnorlax = "../images/snorlax.gif";
const bulbasaur = "../images/bulbasaur.png";
const charmeleon = "../images/charmeleon.webp";
const wildButterfree = "../images/butterfree.gif";
const wildBeedrill = "../images/beedrill.gif";
const jumpingrope = "../images/pokemonjumpingrope.gif";
const wildSquirtle = "../images/wildsquirtle.gif";
const wildCharmander = "../images/wildcharmander.gif";
const wildBulbasaur = "../images/wildbulbasaur.gif";
let prevDialogDiv = null;

let currentAllyPokemonIndividual = null
let currentOpponentPokemonIndividual = null

const ROUTE1_MAX_LEVEL = 5;


let allowUserAction = false;


const calculateDamage = (baseDamage, attackStat, defenseStat) => {
  return baseDamage * attackStat / defenseStat
}


function simplePhysicalMove(targetPokemonIndividual, userPokemonIndividual) {
  const damageDealt = Math.ceil(calculateDamage(this.baseDamage, userPokemonIndividual.physicalDamageStat, targetPokemonIndividual.physicalDefenceStat))
  targetPokemonIndividual.currentHp = Math.max(targetPokemonIndividual.currentHp - damageDealt, 0)
}

function simpleSpecialMove(targetPokemonIndividual, userPokemonIndividual) {
  const damageDealt = Math.ceil(calculateDamage(this.baseDamage, userPokemonIndividual.specialDamageStat, targetPokemonIndividual.specialDefenceStat))
  targetPokemonIndividual.currentHp = Math.max(targetPokemonIndividual.currentHp - damageDealt, 0)
}

const moves = {
  "tackle": {
    name: "Tackle",
    baseDamage: 20,
    priority: 1,
    performMove: simplePhysicalMove,
    performAllyAnimation: () => {},
    performOpponentAnimation: () => {}
  },
  "heal": {
    name: "Heal",
    baseDamage: 20,
    priority: 1,
    performMove: function(targetPokemonIndividual, userPokemonIndividual) {
      userPokemonIndividual.currentHp = Math.min(userPokemonIndividual.currentHp + this.baseDamage, userPokemonIndividual.pokemonType.health(userPokemonIndividual.level))
    }
  },
  "quick-attack": {
    name: "Quick Attack",
    baseDamage: 40,
    priority: 2,
    performMove: simplePhysicalMove
  }
}

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
    text: () =>
      `"You hear rustling coming from the bush"`,
    buttonText: "Continue",
    backgroundImage: forest,
    action: () => pokemonBattleScene(playerPokemonList[0], route1[randomWildPokemon(route1)]),
  },
];

const healthGenerator = (baseHp) => {
  return (level) => {
    return 10 + level + Math.floor(level * 0.01 * 2 * baseHp)
  }
};

const levelGenerator = (MAX_LEVEL) => {
  return () => {
    let randomLevel = Math.floor(Math.random() * MAX_LEVEL) + 1;
    console.log("levelGenerator" + randomLevel);
    return randomLevel;
  }
};

const pickFourRandomMoves = (pokemonType, level) => {
  // TODO
  return [pokemonType.moves[0]]
}

const loadPokemonIndividualMoves = (pokemonIndividual) => {
  const skill1 = document.getElementById("skill1")
  const skill2 = document.getElementById("skill2")
  const skill3 = document.getElementById("skill3")
  const skill4 = document.getElementById("skill4")


  const move1Id = pokemonIndividual.pokemonType.moves[0]
  const move1 = moves[move1Id]
  skill1.textContent = move1.name
}
document.getElementById("skill1")

const allyUseMove = (buttonId) => {
  const allyPokemonActionText = document.querySelector(".what-will-pokemon-do")
  if (!allowUserAction) return;
  allowUserAction = false;

  const moveId = currentAllyPokemonIndividual.moves[buttonId]
  const move = moves[moveId]
  console.log(move.name)
  allyPokemonActionText.textContent = `${currentAllyPokemonIndividual.pokemonType.name} used ${move.name}`;

  console.log("Ally used " + moveId, move)

  move.performMove(currentOpponentPokemonIndividual, currentAllyPokemonIndividual)

  updateOpponentPokemon()
  updateAllyPokemon()

  if (currentAllyPokemonIndividual.currentHp == 0) {
    setTimeout(() => pokemonFaintedText(currentAllyPokemonIndividual), 2000)
    console.log("You dead");
    //presentFailScreen();
    return;
  }

  if (currentOpponentPokemonIndividual.currentHp == 0) {
    setTimeout(() => pokemonFaintedText(currentOpponentPokemonIndividual), 2000)
    console.log("You live to tell the tale")
    return;
  }
  setTimeout(doAIMove, 2000)
}

const pokemonFaintedText = (pokemonIndividual) => {
  const allyPokemonActionText = document.querySelector(".what-will-pokemon-do");
  allyPokemonActionText.textContent = `${pokemonIndividual.pokemonType.name} fainted...`;
}

const doAIMove = () => {

  // Randomize opponent action
  const randomMoveIndex = Math.floor(Math.random() * currentOpponentPokemonIndividual.moves.length)
  const moveId = currentOpponentPokemonIndividual.moves[randomMoveIndex];
  const move = moves[moveId];

  console.log("AI used " + moveId, move)

  // Perform move
  move.performMove(currentAllyPokemonIndividual, currentOpponentPokemonIndividual)

  // Update ally 
  updateAllyPokemon();
  // Update opponent
  updateOpponentPokemon();


  allowUserAction = true;
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

  const maxHp = pokemonIndividual.pokemonType.health(pokemonIndividual.level)
  const newHp = pokemonIndividual.currentHp + healAmount
  const actualNewHp = Math.min(maxHp, newHp)

  pokemonIndividual.currentHp = actualNewHp
}

const createRandomIndividual = (pokemonEncounter) => {
  const wildPokemonType = allPokemon[pokemonEncounter.pokemonId]
  const wildPokemonLevel = pokemonEncounter.level()
  const wildPokemonMoves = pickFourRandomMoves(wildPokemonType, wildPokemonLevel)
  
  const wildPokemonIndividual = createPokemonIndivual(wildPokemonType, wildPokemonLevel, wildPokemonMoves)
  return wildPokemonIndividual
}

const createPokemonIndivual = (pokemonType, level, moves) => {
  return ({
    pokemonType: pokemonType,
    level: level,
    specialDefenceStat: 1 + level * pokemonType.specialDefenceGrowth,
    physicalDefenceStat: 1 + level * pokemonType.physicalDefenceGrowth,
    specialDamageStat: 1 + level * pokemonType.specialDamageGrowth,
    physicalDamageStat: 1 + level * pokemonType.physicalDamageGrowth,
    currentHp: pokemonType.health(level),
    moves: moves
  })
}

// List of pokemonType
const allPokemon = {
  "squirtle": {
    name: "Squirtle",
    health: healthGenerator(30),
    allySprite: squirtle,
    opponentSprite: wildSquirtle,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "bulbasaur": {
    name: "Bulbasaur",
    health: healthGenerator(30),
    allySprite: bulbasaur,
    opponentSprite: wildBulbasaur,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
    
  },
  "charmander": {
    name: "Charmander",
    health: healthGenerator(30),
    allySprite: charmeleon,
    opponentSprite: wildCharmander,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "rattata": {
    name: "Rattata",
    health: healthGenerator(30),
    allySprite: "",
    opponentSprite: wildrattata,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "magnemite": {
    name: "Magnemite",
    health: healthGenerator(30),
    allySprite: "",
    opponentSprite: wildmagnemite,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "pidgey": {
    name: "Pidgey",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    allySprite: "",
    opponentSprite: wildPidgey,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "snorlax": {
    name: "Snorlax",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    allySprite: "",
    opponentSprite: wildsnorlax,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "butterfree": {
    name: "Butterfree",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    allySprite: "",
    opponentSprite: wildButterfree,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  },
  "beedrill": {
    name: "Beedrill",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    allySprite: "",
    opponentSprite: wildBeedrill,
    moves: ["tackle"],
    specialDefenceGrowth: 2,
    physicalDefenceGrowth: 3,
    specialDamageGrowth: 3,
    physicalDamageGrowth: 1,
  }
}

// List of pokemonEncounter
const route1 = [
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
];

//Starts game music when the game starts.
const startGameMusic = (music, duration) => {
  let audio = new Audio(`../mp3/${music}`);
  audio.volume = 0;
  audio.play();

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play();
  });

  let fadeInterval = setInterval(() => {
    if (audio.volume < 0.1) {
      audio.volume = Math.min(audio.volume + 0.05, 0.1);
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
      switchBackground();
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

const pokemonBattleScene = (playerPokemonIndividual, pokemonEncounter) => {
  console.log("pokemonBattleScene", {playerPokemonIndividual, pokemonEncounter})
  
  const wildPokemonIndividual = createRandomIndividual(pokemonEncounter)
  
  currentAllyPokemonIndividual = playerPokemonIndividual
  currentOpponentPokemonIndividual = wildPokemonIndividual

  updateOpponentPokemon()
  updateAllyPokemon()

  const pokemonDescText = document.getElementById("playerPokemonAction")
  pokemonDescText.textContent = `What will ${playerStarterPokemon} do?`
  
  const battleScene = document.querySelector(".battle-scene");
  battleScene.style.display = "block";

  loadPokemonIndividualMoves(playerPokemonIndividual);

  allowUserAction = true;

};



const updateOpponentPokemon = () => {
  const wiPokemon = document.getElementById("wildpokemon");
  const wiLevel = document.getElementById("wildlevel");
  const wiPokemonSprite = document.getElementById("random-wild-pokemon");

  wiPokemon.textContent = currentOpponentPokemonIndividual.pokemonType.name;
  wiLevel.textContent = "level " + currentOpponentPokemonIndividual.level;
  wiPokemonSprite.src = currentOpponentPokemonIndividual.pokemonType.opponentSprite;

  updateHealthBar(currentOpponentPokemonIndividual, "wildHp", "opponentHpBar")
}

const updateAllyPokemon = () => {
  
  const plPokemon = document.getElementById("playerpokemon");
  const plLevel = document.getElementById("playerlevel");
  const plPokemonSprite = document.getElementById("player-pokemon-image");

  plPokemon.textContent = currentAllyPokemonIndividual.pokemonType.name;
  plLevel.textContent = "level " + currentAllyPokemonIndividual.level;
  plPokemonSprite.src = currentAllyPokemonIndividual.pokemonType.allySprite;

  updateHealthBar(currentAllyPokemonIndividual, "playerHp", "allyHpBar")
}

const updateHealthBar = (pokemonIndividual, hpBarTextId, hpBarOverlayId) => {
  const hpTextElement = document.getElementById(hpBarTextId);
  const hpOverlayElement = document.getElementById(hpBarOverlayId);

  hpTextElement.textContent = pokemonIndividual.currentHp + " HP";

  const hpPercentage = pokemonIndividual.currentHp / pokemonIndividual.pokemonType.health(pokemonIndividual.level)
  hpOverlayElement.style.width = `${hpPercentage * 100}%`

  if (hpPercentage < 0.2) {
    hpOverlayElement.style.backgroundColor = `var(--low-hp)`
    return;
  }
  if (hpPercentage < .5) {
    hpOverlayElement.style.backgroundColor = `var(--half-hp)`
    return;
  }

  hpOverlayElement.style.backgroundColor = `var(--full-hp)`
}

const pickPokemon = (pokemonId) => {
  const pokemonScene = document.querySelector(".select-pokemon-scene");
  if (!playerGotStarter) {
    const pokemonType = allPokemon[pokemonId]
    playerPokemonList.push(createPokemonIndivual(pokemonType, 5, [pokemonType.moves[0]]))
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
}

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

