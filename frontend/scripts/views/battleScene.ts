import { closeRunFromBattlePopup, performAttack, runFromBattle, runFromBattlePopup, showPokemonTeam, switchBattleMenu } from "../battleSceneModule"

const battleMenu = document.getElementById("fight-button")
const pokemonMenu = document.getElementById("pokemon-button")
const runMenu = document.getElementById("run-button")
const cancelPokemonButton = document.getElementById("select-pokemon-cancel-button")
const backButton = document.getElementById("back-button")

const runAwayNo = document.getElementById("run-away-button-no")
const runAwayYes = document.getElementById("run-away-button-yes")

const skillButton1 = document.getElementById("skill1")
const skillButton2 = document.getElementById("skill2")
const skillButton3 = document.getElementById("skill3")
const skillButton4 = document.getElementById("skill4")

battleMenu.onclick = () => {
    switchBattleMenu()
}

backButton.onclick = () => {
    switchBattleMenu()
}


pokemonMenu.onclick = () => {
    showPokemonTeam()
}

runMenu.onclick = () => {
    runFromBattlePopup()
}

runAwayYes.onclick = () => {
    runFromBattle()
}

runAwayNo.onclick = () => {
    closeRunFromBattlePopup()
}

skillButton1.onclick = () => {
    performAttack(0)
}
skillButton2.onclick = () => {
    performAttack(1)
}
skillButton3.onclick = () => {
    performAttack(2)
}
skillButton4.onclick = () => {
    performAttack(3)
}

cancelPokemonButton.onclick = () => {
    showPokemonTeam()
}




