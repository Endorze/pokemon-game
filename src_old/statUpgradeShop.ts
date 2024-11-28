import { calculateStat } from "./pokemonUtilsModule";
import { playerPokemonList, pokeCurrency } from "./sharedData";
let shopOpen = false;
let currentUpgradingPokemon = [];

const setPokemonInfo = (playerPokemonList) => {
    if (playerPokemonList === null) {
        return;
    }
    for (let i = 0; i < playerPokemonList.length; i++) {
        const pokemonName = document.getElementById(`stat-shop-pokemonname${i}`)
        const pokemonLevel = document.getElementById(`stat-shop-pokemonlevel${i}`)
        const pokemonImage = document.getElementById(`stat-shop-pokeimage${i}`) as HTMLImageElement
        pokemonImage.src = "pokemon/" + playerPokemonList[i].pokemonType.id + "/front.gif"
        pokemonName.textContent = playerPokemonList[i].pokemonType.name;
        pokemonLevel.textContent = "Level " + playerPokemonList[i].level;
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
    
export const selectPokemonForUpgrade = (index) => {
    const pokemon = document.getElementById("upgrade-pokemon") as HTMLImageElement
    const hpStat = document.getElementById("pokemon-hp") 
    const defStat = document.getElementById("pokemon-def") 
    const spdefStat = document.getElementById("pokemon-spdef") 
    const attackStat = document.getElementById("pokemon-attack")
    const spatkStat = document.getElementById("pokemon-spatk")
    const speedStat = document.getElementById("pokemon-speed") 

    pokemon.src = "pokemon/" + playerPokemonList[index].pokemonType.id + "/front.gif"
    hpStat.textContent = "HP: " + (playerPokemonList[index].pokemonType.health(playerPokemonList[index].level))
    defStat.textContent = "Defense: " + calculateStat(playerPokemonList[index].pokemonType.defense, playerPokemonList[index].level)
    spdefStat.textContent = "Special Defense: " + calculateStat(playerPokemonList[index].pokemonType.spdef, playerPokemonList[index].level)
    attackStat.textContent = "Attack: " + calculateStat(playerPokemonList[index].pokemonType.attack, playerPokemonList[index].level)
    spatkStat.textContent = "Special Attack: " + calculateStat(playerPokemonList[index].pokemonType.spatk, playerPokemonList[index].level)
    speedStat.textContent = "Speed: " + calculateStat(playerPokemonList[index].pokemonType.speed, playerPokemonList[index].level)
    currentUpgradingPokemon = playerPokemonList[index];
}

export const upgradeStat = (stat, amount: number) => {
    currentUpgradingPokemon[0].statUpgrades.stat += amount;
    currentUpgradingPokemon[0].pokemonType.stat += currentUpgradingPokemon[0].statUpgrades.stat;
}


