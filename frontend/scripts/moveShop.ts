import { ALL_MOVES } from "./movesModule";
import { updateVisiblePokemonInfo } from "./pokemonUtilsModule";
import { playerPokemonList, getPokeCurrency, purchaseableMoves } from "./sharedData";

let toggleShopInterface = false;
let allowUserMovementInput = true;
let currentUpgradingPokemon = [];



export const selectPokemonForMoveUpgrade = (index: number) => {
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

const setLearnableMoves = () => {
    const moveListContainer = document.getElementById("list-of-moves");
    moveListContainer.innerHTML = ""; // Rensa tidigare tillagda moves

    purchaseableMoves.forEach((moveKey) => {
        // Hämta move-information från ALL_MOVES baserat på nyckeln
        const moveData = ALL_MOVES[moveKey];

        if (!moveData) {
            console.error(`Move ${moveKey} finns inte i ALL_MOVES`);
            return;
        }

        // Skapa nytt div-element för move
        const newDiv = document.createElement("div");
        newDiv.classList.add("move-info-container");

        // Skapa innehåll för move
        const moveName = document.createElement("p");
        moveName.textContent = moveData.name;

        const moveDamage = document.createElement("p");
        moveDamage.textContent = `${moveData.baseDamage} Power`;

        const movePrice = document.createElement("p");
        const price = 10000 + moveData.baseDamage * 100; // Exempel på prisberäkning
        movePrice.textContent = `$${price}`;

        // Lägg till innehåll i div och append till containern
        newDiv.append(moveName, moveDamage, movePrice);
        moveListContainer.append(newDiv);
    });
};



export const openMoveShop = () => {
    const moveShopInterface = document.getElementById("move-shop-interface");
    const playerCurrency = document.getElementById("petshop-currency")
    if (!toggleShopInterface) {
        console.log("Open shop");
        allowUserMovementInput = false;
        setMovePokemonInfo(playerPokemonList);
        setLearnableMoves()
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