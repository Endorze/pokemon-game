import { saveGame } from ".."

const saveGameButton = document.getElementById("save-game-button")

saveGameButton.onclick = () => {
    saveGame()
}