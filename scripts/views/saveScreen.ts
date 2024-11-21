import { saveGame } from "scripts/saveUtils"

const saveGameButton = document.getElementById("save-game-button")

saveGameButton.onclick = () => {
    saveGame()
}