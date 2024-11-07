let currentBackground = -1;
let playerName = "";
let playerHealth = 20;
const MAX_PLAYER_HEALTH = 20;
let playerGotStarter = false;
let playerStarterPokemon = "";
let playerStarterPokemonImage = "";
let musicActive = false;
const profoak1 = "../images/profoak1.jpg"
const profoak2 = "../images/profoak2.avif";
const pikachuElectric = " ../images/pikachuelectricity.gif";
const redImage = "../images/profoak.png";
const charmanderImage = "../images/charmander.png";
const redPokeball = "../images/red.avif";
const rattata = "../images/rattata.webp";
const magnemite = "../images/magnemite.gif";
const squirtle = "../images/squirtle.webp";
const snorlax = "../images/snorlax.gif";
const bulbasaur = "../images/bulbasaur.png";
const charmeleon = "../images/charmeleon.webp"
const jumpingrope = "../images/pokemonjumpingrope.gif"
let prevDialogDiv = null;

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
    action: () => pokemonBattleScene(playerPokemonList[0], route1[3]),
  },
];

const route1HealthGenerator = (level) => {
  const MAX_HEALTH = 10;
  return Math.floor(Math.random() * MAX_HEALTH) + 1;
};

const levelGenerator = (route) => {
  let randomLevel;

  switch (route) {
    case "route1":
      const MAX_LEVEL = 5;
      randomLevel = Math.floor(Math.random() * MAX_LEVEL) + 1;
      console.log("levelGenerator" + randomLevel);
      return randomLevel;
      break;
  }
};

let playerPokemonList = [];

const route1 = [
  {
    pokemon: "Rattata",
    level: levelGenerator("route1"),
    health: route1HealthGenerator(),
    pokemonSprite: rattata,
    damage: 2,
  },
  {
    pokemon: "Magnemite",
    level: levelGenerator("route1"),
    health: route1HealthGenerator(),
    pokemonSprite: magnemite,
    damage: 2,
  },
  {
    pokemon: "Pidgey",
    level: levelGenerator("route1"),
    health: route1HealthGenerator(2),
    damage: 2,
    pokemonSprite: "",
  },
  {
    pokemon: "Snorlax",
    level: levelGenerator("route1"),
    health: route1HealthGenerator(2),
    damage: 2,
    pokemonSprite: snorlax,
  },
];

const startGameMusic = (music, duration) => {
  let audio = new Audio(`../mp3/${music}`);
  audio.volume = 0;
  audio.play();

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play();
  });

  let fadeInterval = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + 0.05, 1);
    } else {
      clearInterval(fadeInterval);
    }
  }, duration / 20);
};

const playSound = (sound) => {
  let audio = new Audio(`../mp3/${sound}`);
  audio.play();
};

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

const pokemonStarterScene = () => {
  const pokemonScene = document.querySelector(".select-pokemon-scene");
  pokemonScene.style.display = "block";
  console.log("Jag körde pickpokemon funktionen");
};

const pokemonBattleScene = (playerPokemon, wildPokemon) => {
  const battleScene = document.querySelector(".battle-scene");
  let plPokemon = document.getElementById("playerpokemon");
  let plLevel = document.getElementById("playerlevel");
  let plHp = document.getElementById("playerHp");
  let plPokemonSprite = document.getElementById("player-pokemon-image");

  let wiPokemon = document.getElementById("wildpokemon");
  let wiLevel = document.getElementById("wildlevel");
  let wiHp = document.getElementById("wildHp");
  let wiPokemonSprite = document.getElementById("random-wild-pokemon");

  wiPokemon.textContent = wildPokemon.pokemon;
  wiLevel.textContent = "level " + wildPokemon.level;
  wiHp.textContent = wildPokemon.health + " HP";
  wiPokemonSprite.src = wildPokemon.pokemonSprite;

  plPokemon.textContent = playerPokemon.pokemon;
  plLevel.textContent = playerPokemon.level;
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

const startBattle = (wildPokemon) => {
  const pokemonName = wildPokemon.pokemon;
  const pokemonLevel = wildPokemon.level;
  let pokemonHealth = route1HealthGenerator(pokemonLevel);
  console.log(
    `A wild ${pokemonName} (Level: ${pokemonLevel}) appears with ${pokemonHealth} HP!`
  );
};

startBattle(route1[0]);
startBattle(route1[1]);
levelGenerator("route1");
