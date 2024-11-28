import profoak1 from "../resources/images/profoak1.jpg";
import profoak2 from "../resources/images/profoak2.avif";
import pikachuElectric  from "../resources/images/pikachuelectricity.gif";
import jumpingrope  from "../resources/images/pokemonjumpingrope.gif";
import { loadTown } from "./townModule";
import { playSound, startGameMusic } from "./audioModule";
import { DEV_MODE } from "./constants";
import { ALL_POKEMON } from "./pokemonModule";
import { createPokemonIndivual } from "./pokemonUtilsModule";
import { playerPokemonList } from "./sharedData";
import { sleep } from "./utilsModule";

let currentBackground = -1;
let playerGotStarter = false;
let playerStarterPokemon = "";
let musicActive = false;


let prevDialogDiv = null;
let allowUserAction = false;
let loadingScreenActive = true;

// List of pokemonIndividual

export const toggleLoadingScreen = async () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (!loadingScreen) return;

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


export const startGame = async () => {
  playSound("start-game.mp3");
  if (!DEV_MODE) await sleep(1500);
  goToNextDialogue();
  console.log("attempting to start game, startGame()");
};

export const onDialogueAction = async () => {
  playSound("hover.mp3");


  const currentDialogue = dialogueObject[currentBackground];
  if (currentDialogue.action) currentDialogue.action();

  if (!DEV_MODE) await sleep(1000);
  goToNextDialogue();
};

//Turns off startscreen, starts the game.
export const goToNextDialogue = () => {
  const startScreen = document.getElementById("start-screen");
  if (!startScreen) return;

  if (!musicActive) {
    startGameMusic();
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
  const dialogueName = document.getElementById("dialogue-name");
  const dialogueText = document.getElementById("dialogue-text");
  
  if (!gamingWindow || !dialogueName || !dialogueText) return;

  gamingWindow.style.backgroundImage = `url("${dialogueData.backgroundImage}")`;
  gamingWindow.style.display = "block";

  dialogueName.textContent = dialogueData.name;

  dialogueText.textContent = dialogueData.text();
};

//Starts the scene where the player gets to pick starter pokemon.
const pokemonStarterScene = () => {
  const pokemonScene = document.getElementById("select-pokemon-scene");
  if (!pokemonScene) return;

  pokemonScene.style.display = "block";
  console.log("Jag körde pickpokemon funktionen");
};

export const pickPokemon = (pokemonId: string) => {
  console.log(ALL_POKEMON);
  const pokemonScene = document.getElementById("select-pokemon-scene");
  if (!pokemonScene) return;

  if (!playerGotStarter) {
    const pokemonType = ALL_POKEMON[pokemonId];
    playerPokemonList.push(
      createPokemonIndivual(pokemonType, 5)
    );

    playerGotStarter = true;
    pokemonScene.style.display = "none";
    playerStarterPokemon = pokemonId;
  }
  goToNextDialogue();
};