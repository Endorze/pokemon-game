import { playerPokemonList } from "./sharedData";
let shopOpen = false;

export const upgradeStat = (pokemonIndividual, amount) => {
    pokemonIndividual.statUpgrades.hp = amount;
    pokemonIndividual.pokemonType.hp += pokemonIndividual.statUpgrades.hp;
}

const setPokemonInfo = (playerPokemonList) => {
    if (playerPokemonList === null) {
        return;
    }
    for (let i = 0; i < playerPokemonList.length; i++) {
        const pokemonImage = document.getElementById(`stat-shop-pokeimage${i}`) as HTMLImageElement
        pokemonImage.src = "pokemon/" + playerPokemonList[i].pokemonType.id + "/front.gif"
    }
}

export const openStatShop = () => {
    let shopInterface = document.getElementById("stat-shop-interface")
    if (!shopOpen) {
        console.log("Trying to open stat shop")
        shopInterface.style.display = "block";
        setPokemonInfo(playerPokemonList);
        console.log("Stat shop should be open.")
        shopOpen = true;
    }  else {
        shopInterface.style.display = "none";
        console.log("Should close shop.")
        shopOpen = false;
    }
}

const selectPokemonForUpgrade = (index) => {
    
}
