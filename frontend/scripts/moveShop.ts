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
        const moveData = ALL_MOVES[moveKey];

        if (!moveData) {
            console.error(`Move ${moveKey} finns inte i ALL_MOVES`);
            return;
        }

        const newDiv = document.createElement("div");
        newDiv.classList.add("move-info-container");

        const moveName = document.createElement("p");
        moveName.textContent = moveData.name;

        const moveDamage = document.createElement("p");
        moveDamage.textContent = `${moveData.baseDamage} Power`;

        const movePrice = document.createElement("p");
        const price = 10000 + moveData.baseDamage * 100; // Exempel på prisberäkning
        movePrice.textContent = `$${price}`;

        newDiv.append(moveName, moveDamage, movePrice);

        newDiv.addEventListener("click", () => {
            handleMoveSelection(moveKey, moveData);
        });

        moveListContainer.append(newDiv);
    });
};

const handleMoveSelection = (moveKey, moveData) => {
    if (!currentUpgradingPokemon[0]) {
        return;
    }
    console.log(`Move selected: ${moveData.name}`);
    console.log(`Base Damage: ${moveData.baseDamage}`);
    console.log(`Key: ${moveKey}`);

    alert(`You selected ${moveData.name} with ${moveData.baseDamage} Power!`);
    learnMovePrompt(moveKey, moveData);
};

const learnMovePrompt = (moveKey, moveData) => {
    const textDesc = document.getElementById("select-move-prompt-text")
    textDesc.textContent = `Are you sure you wish to learn ${moveData.name}?`
    console.log("This is gonna display a prompt.")
}


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