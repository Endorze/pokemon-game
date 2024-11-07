let currentBackground = -1;
let playerName = "";
let playerHealth = 20;
const MAX_PLAYER_HEALTH = 20;
let playerGotStarter = false;
let playerStarterPokemon = "";
let playerStarterPokemonImage = "";
let musicActive = false;
const profoak1 = "../images/profoak1.jpg";
const profoak2 = "../images/profoak2.avif";
const pikachuElectric = " ../images/pikachuelectricity.gif";
const redImage = "../images/profoak.png";
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
let prevDialogDiv = null;

const ROUTE1_MAX_LEVEL = 5;

const moves = {
  "tackle": {
    name: "Tackle",
    baseDamage: 20,
    priority: 1
  },
  "quick-attack": {
    name: "Quick Attack",
    baseDamage: 40,
    priority: 2
  }
}


const moveId = "tackle"
const move = moves["tackle"]

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
    name: "",
    text: () =>
      `Phew, that was a tough decision! But now, I've got my very first Pokémon! This is just the beginning.`,
    buttonText: "Continue",
    backgroundImage: "",
    action: () => playSound("caughtpokemon.mp3"),
  },
  {
    name: "",
    text: () =>
      `Congratulations! You've received your very first Pokémon: ${playerStarterPokemon}. This is the start of your incredible adventure!`,
    buttonText: "Continue",
    backgroundImage: redPokeball,
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

let playerPokemonList = [];

const route1 = [
  {
    name: "Rattata",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    pokemonSprite: wildrattata,
    damage: 2,
    moves: ["tackle"]
  },
  {
    name: "Magnemite",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    pokemonSprite: wildmagnemite,
    damage: 2,
    moves: ["tackle"]
  },
  {
    name: "Pidgey",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    damage: 2,
    pokemonSprite: wildPidgey,
  },
  {
    name: "Snorlax",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    damage: 2,
    pokemonSprite: wildsnorlax,
  },
  {
    name: "Butterfree",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    damage: 2,
    pokemonSprite: wildButterfree,
  },
  {
    name: "Beedrill",
    level: levelGenerator(ROUTE1_MAX_LEVEL),
    health: healthGenerator(30),
    damage: 2,
    pokemonSprite: wildBeedrill,
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
    if (button.textContent === "Continue") {
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

const pokemonBattleScene = (playerPokemon, wildPokemon) => {
  const battleScene = document.querySelector(".battle-scene");
  const plPokemon = document.getElementById("playerpokemon");
  const plLevel = document.getElementById("playerlevel");
  const plHp = document.getElementById("playerHp");
  const plPokemonSprite = document.getElementById("player-pokemon-image");

  const wiPokemon = document.getElementById("wildpokemon");
  const wiLevel = document.getElementById("wildlevel");
  const wiHp = document.getElementById("wildHp");
  const wiPokemonSprite = document.getElementById("random-wild-pokemon");

  const wildPokemonLevel = wildPokemon.level()
  const wildPokemonHp = wildPokemon.health(wildPokemonLevel)

  wiPokemon.textContent = wildPokemon.name;
  wiLevel.textContent = "level " + wildPokemonLevel;
  wiHp.textContent = wildPokemonHp + " HP";
  wiPokemonSprite.src = wildPokemon.pokemonSprite;

  plPokemon.textContent = playerPokemon.name;
  plLevel.textContent = "level " + playerPokemon.level;
  plHp.textContent = playerPokemon.health + " HP";
  plPokemonSprite.src = playerPokemon.pokemonSprite;

  battleScene.style.display = "block";
  console.log("Jag körde pokemonBattleScene funktionen");
};

const pickPokemon = (pokemon) => {
  const pokemonScene = document.querySelector(".select-pokemon-scene");
  if (!playerGotStarter) {
    switch (pokemon) {
      case "squirtle":
        addPokemonToPlayerList("Squirtle", squirtle, 5, 20, 5);
        break;

      case "bulbasaur":
        addPokemonToPlayerList("Bulbasaur", bulbasaur, 5, 20, 5);
        break;

      case "charmander":
        addPokemonToPlayerList("Charmander", charmeleon, 5, 20, 5);
        break;
    }
    playerGotStarter = true;
    pokemonScene.style.display = "none";
    playerStarterPokemon = pokemon;
  }
};

const randomWildPokemon = (wildPokemonList) => {
  let random = Math.floor(Math.random() * wildPokemonList.length);
  console.log(random + " Played randomWildPokemon function");
  return random;
}

const addPokemonToPlayerList = (
  pokemonName,
  pokemonSprite,
  level,
  health,
  damage
) => {
  playerPokemonList.push({
    pokemon: pokemonName,
    pokemonSprite: pokemonSprite,
    level: level,
    health: health,
    damage: damage,
  });
};

const switchBattleMenu = () => {
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

const dealDamage = (move, pokemon1, pokemon2) => {

  pokemon1Health = pokemon1.health;
  pokemon2Health = pokemon2.health;

  while(pokemon1Health > 0 || pokemon2Health > 0) {

  }
};

const startBattle = (wildPokemon) => {
  const pokemonName = wildPokemon.name;
  const pokemonLevel = wildPokemon.level;
  console.log(
    `A wild ${pokemonName} (Level: ${pokemonLevel}) appears with ${pokemonHealth} HP!`
  );
};

