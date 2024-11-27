import { calculateStat } from "./pokemonUtilsModule";
import { playerPokemonList, pokeCurrency } from "./sharedData";
let shopOpen = false;
export let currentUpgradingPokemon = [];

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
    } else {
        shopInterface.style.display = "none";
        console.log("Should close shop.")
        shopOpen = false;
    }
}

export const selectPokemonForUpgrade = (index) => {
    if (!playerPokemonList || !playerPokemonList[index]) {
        console.error("Pokémon-listan är tom eller indexet är ogiltigt.");
        return;
    }
    const selectedPokemon = playerPokemonList[index];
    if (!selectedPokemon.pokemonType) {
        console.error("pokemonType saknas i den valda Pokémon.");
        return;
    }

    const pokemon = document.getElementById("upgrade-pokemon") as HTMLImageElement;
    const hpStat = document.getElementById("pokemon-hp");
    const defStat = document.getElementById("pokemon-def");
    const spdefStat = document.getElementById("pokemon-spdef");
    const attackStat = document.getElementById("pokemon-attack");
    const spatkStat = document.getElementById("pokemon-spatk");
    const speedStat = document.getElementById("pokemon-speed");

    pokemon.src = "pokemon/" + selectedPokemon.pokemonType.id + "/front.gif";
    hpStat.textContent = "HP: " + selectedPokemon.pokemonType.health(selectedPokemon.level);
    defStat.textContent = "Defense: " + calculateStat(selectedPokemon.pokemonType.defense, selectedPokemon.level);
    spdefStat.textContent = "Special Defense: " + calculateStat(selectedPokemon.pokemonType.spdef, selectedPokemon.level);
    attackStat.textContent = "Attack: " + calculateStat(selectedPokemon.pokemonType.attack, selectedPokemon.level);
    spatkStat.textContent = "Special Attack: " + calculateStat(selectedPokemon.pokemonType.spatk, selectedPokemon.level);
    speedStat.textContent = "Speed: " + calculateStat(selectedPokemon.pokemonType.speed, selectedPokemon.level);

    currentUpgradingPokemon[0] = { ...selectedPokemon, index };
};

export const upgradeStat = (stat, amount: number) => {
    if (!currentUpgradingPokemon[0]) {
        console.log("Your upgrade pokemon is null.")
        return;
    }
    currentUpgradingPokemon[0].statUpgrades[stat] += amount;
    currentUpgradingPokemon[0].pokemonType[stat] += amount;
    selectPokemonForUpgrade(currentUpgradingPokemon[0].index);
}


