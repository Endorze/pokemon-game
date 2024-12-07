import { updateVisiblePokemonInfo } from "./pokemonUtilsModule";
import { playerPokemonList, getPokeCurrency } from "./sharedData";

let toggleShopInterface = false;
let allowUserMovementInput = true;
let currentUpgradingPokemon = [];



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
    const pokemon = document.getElementById("move-upgrade-pokemon") as HTMLImageElement;
    pokemon.src = "pokemon/" + selectedPokemon.pokemonType.id + "/front.gif";
    currentUpgradingPokemon[0] = { ...selectedPokemon, index };
};

const setMovePokemonInfo = (playerPokemonList) => {
    if (playerPokemonList === null) {
        return;
    }
    for (let i = 0; i < playerPokemonList.length; i++) {
        const pokemonName = document.getElementById(`move-shop-pokemonname${i}`)
        const pokemonLevel = document.getElementById(`move-shop-pokemonlevel${i}`)
        const pokemonImage = document.getElementById(`move-shop-pokeimage${i}`) as HTMLImageElement
        pokemonImage.src = "pokemon/" + playerPokemonList[i].pokemonType.id + "/front.gif"
        pokemonName.textContent = playerPokemonList[i].pokemonType.name;
        pokemonLevel.textContent = "Level " + playerPokemonList[i].level;
    }
}

export const openMoveShop = () => {
    const moveShopInterface = document.getElementById("move-shop-interface");
    const playerCurrency = document.getElementById("petshop-currency")
    if (!toggleShopInterface) {
        console.log("Open shop");
        allowUserMovementInput = false;
        setMovePokemonInfo(playerPokemonList);
        moveShopInterface.style.display = "block";
        playerCurrency.textContent = getPokeCurrency() + "$ Pokédollars"
        toggleShopInterface = true;
    } else {
        moveShopInterface.style.display = "none";
        toggleShopInterface = false;
        updateVisiblePokemonInfo();
        allowUserMovementInput = true;
    }
};