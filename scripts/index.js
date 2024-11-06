let currentBackground = -1;
let playerName = "";
let playerHealth = 20;
const MAX_PLAYER_HEALTH = 20;
let playerPokemonList = [];
let playerGotStarter = false;
let playerStarterPokemon = "";
let playerStarterPokemonImage = "";
let musicActive = false;
const redImage = "../images/profoak.png";
const charmanderImage = "../images/charmander.png";
const redPokeball = "../images/red.avif";
let prevDialogDiv = null;

const dialogueObject = [
  {
    name: "Prof. Oak",
    text: () => `Welcome to the great Pangea, your mother told me you would be arriving soon.`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: () => `Let me wish you a warm welcome to the great world of Pokémon! In this world people and Pokémon live side by side.`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: () => `For over a decade we have harnessed the power of Pokémon to accomplish incredible things!`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: () => `And just now it just happens to be your turn to carry on the legacy. I cant wait to see what you will accomplish.`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "Prof. Oak",
    text: () => `But enough about that! I think it's about time for you to pick out your Pokémon, wouldn't you agree?`,
    buttonText: "Continue",
    backgroundImage: redImage,
  },
  {
    name: "You",
    text: () => `Oh boy this is getting exciting... I wonder which pokémon i'll be able to choose from?`,
    buttonText: "Continue",
    action: () => pokemonStarterScene(),
  },
  {
    name: "",
    text: () => `Whew that was a hard choice, but now i finally got my first Pokémon!`,
    buttonText: "Continue",
    backgroundImage: "",
    action: () => playSound('caughtpokemon.mp3')
  },
  {
    name: "",
    text: () => `You received your very first ${playerStarterPokemon}, congratulations!`,
    buttonText: "Continue",
    backgroundImage: redPokeball,
    action: () => pokemonBattleScene(),
  },
  
];

const route1HealthGenerator = (level) => {
  const MAX_HEALTH = 10;
  return Math.floor(Math.random() * MAX_HEALTH) + 1;
};

const levelGenerator = (route) => {

  let randomLevel;

  switch(route) {
    case "route1":
      const MAX_LEVEL = 5;
      randomLevel = Math.floor(Math.random() * MAX_LEVEL) + 1;
      console.log("levelGenerator" + randomLevel);
      return randomLevel;
    break;
  }
}

const route1 = [
  {
    pokemon: "Rattata",
    level: levelGenerator("route1"),
    health: route1HealthGenerator(),
    pokemonSprite: "",
  },
  {
    pokemon: "Pidgey",
    level: levelGenerator("route1"),
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

const pokemonBattleScene = () => {
  const battleScene = document.querySelector(".battle-scene");
  const playerPokemon = document.getElementById("");
  const wildPokemon = document.getElementById("");

  battleScene.style.display = "block";
  console.log("Jag körde pokemonBattleScene funktionen");
};

const pickPokemon = (pokemon) => {
  const pokemonScene = document.querySelector(".select-pokemon-scene");
  if (!playerGotStarter) {
    if (pokemon === "squirtle") {
      console.log("Picked squirtle");
      pokemonScene.style.display = "none";
      playerStarterPokemon = "squirtle";
      playerGotStarter = true;
      playerPokemonList.push(playerStarterPokemon);
      console.log(playerStarterPokemon);

    } else if (pokemon === "bulbasaur") {
      console.log("Picked bulbasaur");
      pokemonScene.style.display = "none";
      playerStarterPokemon = "bulbasaur";
      playerGotStarter = true;
      playerPokemonList.push(playerStarterPokemon);

    } else {
      console.log("Picked charmander");
      pokemonScene.style.display = "none";
      playerStarterPokemon = "charmander";
      playerGotStarter = true;
      playerPokemonList.push(playerStarterPokemon);
    }
  }
  console.log("I now have my first starter, a " + playerPokemonList[0]);
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