let currentBackground = -1;
let playerName = "";
let playerHealth = 20;
const MAX_PLAYER_HEALTH = 20;
let playerStarterPokemon = "";
let playerStarterPokemonImage = "";
let musicActive = false;
const redImage = "../images/profoak.png";
const charmanderImage = "../images/charmander.png";
let prevDialogDiv = null;

const dialogueObject = [
  {
    name: "Prof. Oak",
    text: `Welcome to the great Pangea, your mother told me you would be arriving soon.`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: `Let me wish you a warm welcome to the great world of Pokémon! In this world people and Pokémon live side by side.`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: `For over a decade we have harnessed the power of Pokémon to accomplish incredible things!`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: `And just now it just happens to be your turn to carry on the legacy. I cant wait to see what you will accomplish.`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: `But enough about that! I think it's about time for you to pick out your Pokémon, wouldn't you agree?`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "You",
    text: `Oh boy this is getting exciting... I wonder which pokémon i'll be able to choose from?`,
    buttonText: "Continue",
    action: () => pokemonStarterScene(),
  },
  {
    name: "",
    text: `You recieved your very first Starter!`,
    buttonText: "Continue",
    backgroundImage: charmanderImage,
  },
];

const route1HealthGenerator = (level) => {
  const MAX_HEALTH = Math.min(20, level, 4);
  return Math.floor(Math.random() * MAX_HEALTH + 1);
};

const route1 = [
  {
    pokemon: "Rattata",
    level: 3,
    health: route1HealthGenerator(3),
    pokemonSprite: "",
  },
  {
    pokemon: "Pidgey",
    level: 2,
    health: route1HealthGenerator(2),
    pokemonSprite: "",
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
  dialogueText.textContent = dialogueData.text;

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

const pickPokemon = (pokemon) => {
  const pokemonScene = document.querySelector(".select-pokemon-scene");

  if (pokemon === "squirtle") {
    console.log("Picked squirtle");
    pokemonScene.style.display = "none";
    playerStarterPokemon = "squirtle";
    console.log(playerStarterPokemon);
  } else if (pokemon === "bulbasaur") {
    console.log("Picked bulbasaur");
    pokemonScene.style.display = "none";
    playerStarterPokemon = "bulbasaur";
  } else {
    console.log("Picked charmander");
    pokemonScene.style.display = "none";
    playerStarterPokemon = "charmander";
  }
};

const pokemonBattleScene = () => {};

const startBattle = (wildPokemon) => {
  const pokemonName = wildPokemon.pokemon;
  const pokemonLevel = wildPokemon.level;
  let pokemonHealth = route1HealthGenerator(pokemonLevel);
  console.log(
    `A wild ${pokemonName} (Level: ${pokemonLevel}) appears with ${pokemonHealth} HP!`
  );
};

startBattle(route1[1]);
