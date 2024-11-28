import { saveGame } from "../saveUtils"

const saveGameButton = document.getElementById("save-game-button")

saveGameButton.onclick = () => {
    saveGame()
}