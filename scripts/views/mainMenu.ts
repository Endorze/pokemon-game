import { startGame } from "../dialogue"
import { loadGame } from "scripts/saveUtils";

const buttonNewGame = document.getElementById("start-screen-button-new-game");
const buttonLoad = document.getElementById("start-screen-button-load");
const buttonQuit = document.getElementById("start-screen-button-quit");


buttonNewGame.onclick = () => {
    startGame()
}

buttonLoad.onclick = () => {
    console.log("Loaded game")
    loadGame()
}
