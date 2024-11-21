import { pickPokemon, onDialogueAction } from "../dialogue";

const selectSquirtle = document.getElementById("squirtle");
if (!selectSquirtle) {
  console.error("Elementet med ID 'squirtle' hittades inte.");
}

const selectCharmander = document.getElementById("charmander");
if (!selectCharmander) {
  console.error("Elementet med ID 'charmander' hittades inte.");
}

const selectBulbasaur = document.getElementById("bulbasaur");
if (!selectBulbasaur) {
  console.error("Elementet med ID 'bulbasaur' hittades inte.");
}

const dialogueButton = document.getElementById("dialogue-button");
if (!dialogueButton) {
  console.error("Elementet med ID 'dialogue-button' hittades inte.");
}
selectSquirtle.onclick = () => {
    pickPokemon("squirtle")
}

selectCharmander.onclick = () => {
    pickPokemon("charmander")
}

selectBulbasaur.onclick = () => {
    pickPokemon("bulbasaur")
}

dialogueButton.onclick = async () => {
    console.log("Should switch dialogue")
    onDialogueAction()
}