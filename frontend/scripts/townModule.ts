import { playerPokemonList } from "./sharedData";
import { updateVisiblePokemonInfo, setHeldItem } from "./pokemonUtilsModule";
import { ALL_ITEMS } from "./heldItemsModule";
import { playSound } from "./audioModule";
import { sleep } from "./utilsModule";
import { startBattle } from "./battleSceneModule";
import $ from "jquery";


let allowUserAction = true;
let allowUserMovementInput = true;

export const setActivePokemon = async (index) => {
  if (playerPokemonList == null) {
    return;
  }
  if (playerPokemonList[index] == null) {
    return;
  }
  let tempPokemon = playerPokemonList[index];
  playerPokemonList[index] = playerPokemonList[0];
  playerPokemonList[0] = tempPokemon;
  console.log("setActivePokemon", tempPokemon);
  updateVisiblePokemonInfo();
}

// const activePokemonSprite = document.getElementById("player-sprite") as HTMLImageElement;

export const loadTown = async () => {
  // activePokemonSprite.src = `pokemon/${playerPokemonList[0].pokemonType.id}/front.gif` 
  const town = document.getElementById("town");
  town.style.display = "block";
  console.log("playerPokemonList[0]", playerPokemonList[0])
  updateVisiblePokemonInfo();
  returnFromWilderness();
};

let isHealing = false;


export const healPokemonTeam = async () => {
  if (isHealing) {
    console.log("Healing is already in progress.");
    return;
  }

  isHealing = true;

  playSound("pokemonshopheal.mp3");

  if (!playerPokemonList) {
    isHealing = false;
    return;
  }

  for (let i = 0; i < playerPokemonList.length; i++) {
    playerPokemonList[i].currentHp = playerPokemonList[i].pokemonType.health(playerPokemonList[i].level, playerPokemonList[i].statUpgrades.hp);
    console.log(playerPokemonList[i].currentHp);
  }

  updateVisiblePokemonInfo();

  allowUserAction = false;
  allowUserMovementInput = false;

  await sleep(3000);

  allowUserMovementInput = true;
  allowUserAction = true;

  isHealing = false;
};

const playerStartX = 50;

const playerMaxX = 90;
const playerMinX = -290;

const cameraMaxX = 50;
const cameraMinX = -250;

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

let buttonLeft = false;
let buttonRight = false;

const $leftButton = $("#button-move-left");
const $rightButton = $("#button-move-right");

$leftButton.on("mousedown touchstart", (e) => {
  buttonLeft = true;
  $leftButton.css("opacity", "0.5");
  e.preventDefault()
});

$leftButton.on("mouseup mouseleave touchend", (e) => {
  buttonLeft = false;
  $leftButton.css("opacity", "1");
  e.preventDefault()
});

$rightButton.on("mousedown touchstart", (e) => {
  buttonRight = true;
  $rightButton.css("opacity", "0.5");
  e.preventDefault()
});

$rightButton.on("mouseup mouseleave touchend", (e) => {
  buttonRight = false;
  $rightButton.css("opacity", "1");
  e.preventDefault()
});

// $leftButton.on("contextmenu", (e) => e.preventDefault());
// $rightButton.on("contextmenu", (e) => e.preventDefault());

const deltaTimeSeconds = 1 / 60;

console.log(deltaTimeSeconds);

let playerDirection = "left";
let playerRunning = false;

const [enableTownClock, disableTownClock] = (function () {
  let intervalId = null;

  const enableTownClock = () => {
    intervalId = setInterval(async () => {
      if (allowUserMovementInput) {
        if (keyADown || buttonLeft) {
          playerTargetX -= playerSpeed * deltaTimeSeconds;
          playerRunning = true;
          playerDirection = "left";
        } else if (keyDDown || buttonRight) {
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
        cameraTargetX = playerTargetX; // Follow the players character ⭐
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
  const allySprite = document.getElementById("player-character") as HTMLImageElement;
  const spriteSource = "/resources/images/character.gif";
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
        allySprite.src = `/resources/images/character.gif`;
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
  if (playerPokemonList[0].currentHp == 0) {
    return;
  }

  allowUserMovementInput = false;

  await animate(
    (time, deltaTime) => {
      playerTargetX += playerSpeed * deltaTime;
    },
    2,
    30
  );
  startBattle();
  disableTownClock();

};

export const returnFromWilderness = async () => {
  enableTownClock();

  playerSpeed = 25
  playerLagSpeed = 0.4;
  cameraLagSpeed = 0.05;
  playerDirection = "left";
  playerRunning = true;

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
  updateVisiblePokemonInfo();
  enteringWilderness = false;
  allowUserMovementInput = true;
};

const animate = (animationFunction, durationSeconds, frameRate) => {
  return new Promise<void>((resolve) => {
    let time = 0;
    let deltaTime = durationSeconds / frameRate;
    const id = setInterval(() => {
      if (time > durationSeconds) {
        clearInterval(id);
        resolve();
        return;
      }

      time += deltaTime;
      animationFunction(time / durationSeconds, deltaTime);
    }, deltaTime * 1000);
  });
};


