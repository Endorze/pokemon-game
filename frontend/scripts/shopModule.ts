// Definiera shopModule som tar pokemonModule som parameter och importerar ALL_POKEMON
import { getPokeCurrency, playerPokemonList, removePokeCurrency } from "./sharedData";
import { createPokemonIndivual } from "./pokemonUtilsModule";
import { ALL_POKEMON, POKEMON_FOR_SALE } from "./pokemonModule";
import { updateVisiblePokemonInfo } from "./pokemonUtilsModule";

let currentShopItems = [];
let toggleShopInterface = false;
let allowUserMovementInput = true;

const generateShopSeed = () => {
    const timeInMillis = Date.now();
    const timeInSeconds = Math.floor(timeInMillis / 1000);
    const timeInMinutes = Math.floor(timeInSeconds / 60);
    return Math.floor(timeInMinutes / 30);
};

const selectPokemon = (itemCount, seed) => {
    const pokemonNames = Object.keys(POKEMON_FOR_SALE); // Få alla Pokémon-namn
    const selectedItems = [];

    let randomSeed = seed;
    const pseudoRandom = () => {
        randomSeed = (randomSeed * 9301 + 49297) % 233280;
        return randomSeed / 233280;
    };

    for (let i = 0; i < itemCount && pokemonNames.length > 0; i++) {
        const randomIndex = Math.floor(pseudoRandom() * pokemonNames.length);
        const selectedName = pokemonNames.splice(randomIndex, 1)[0];
        selectedItems.push(POKEMON_FOR_SALE[selectedName]); // Lägg till hela Pokémon-objektet
    }

    return selectedItems;
};

const selectItems = (itemCount, seed) => {
    const pokemonNames = Object.keys(ALL_POKEMON); // Få alla Pokémon-namn
    const selectedItems = [];

    let randomSeed = seed;
    const pseudoRandom = () => {
        randomSeed = (randomSeed * 9301 + 49297) % 233280;
        return randomSeed / 233280;
    };

    for (let i = 0; i < itemCount && pokemonNames.length > 0; i++) {
        const randomIndex = Math.floor(pseudoRandom() * pokemonNames.length);
        const selectedName = pokemonNames.splice(randomIndex, 1)[0];
        selectedItems.push(ALL_POKEMON[selectedName]); // Lägg till hela Pokémon-objektet
    }

    return selectedItems;
};

//Gets the current time that has passed between every half hour, 
const shopInfoText = document.getElementById("petshop-info")
const getShopResetTime = () => {
    let currentTimeMillis = Date.now();
    let timePassed = Math.floor(currentTimeMillis / 1000) % (30 * 60);
    let timeLeft = 30 * 60 - timePassed;
    return timeLeft;
}

const updateCountdown = () => {
    const timeLeft = getShopResetTime();
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // console.log(`Time left until next reset: ${minutes}m ${seconds}s`);
    shopInfoText.textContent = `Time left until next reset: ${minutes}m ${seconds}s`
};
setInterval(updateCountdown, 1000);

const generateShopItems = () => {
    const seed = generateShopSeed();
    currentShopItems = selectPokemon(3, seed);

    currentShopItems.forEach((pokemon, index) => {
        const pokemonImage = document.getElementById(`shop-image-${index + 1}`) as HTMLImageElement;

        if (pokemon && pokemonImage) {
            pokemonImage.src = `pokemon/${pokemon.id}/front.gif`; // Ange rätt sökväg

            const nameElement = document.getElementById(`shop-button-${index + 1}`);
            if (nameElement) {
                nameElement.textContent = `$${pokemon.basePrice}`;
            }
        }
    });
    console.log("Selected products with prices:", currentShopItems);
};

const generateMarketItems = () => {
    const seed = generateShopSeed();
    currentShopItems = selectItems(3, seed);

    currentShopItems.forEach((item, index) => {
        const itemImage = document.getElementById(`shop-image-${index + 1}`) as HTMLImageElement;

        if (item && itemImage) {
            itemImage.src = `pokemon/${item.id}/front.gif`; // Ange rätt sökväg

            const nameElement = document.getElementById(`shop-button-${index + 1}`);
            if (nameElement) {
                nameElement.textContent = `$${item.basePrice}`;
            }
        }
    });
    console.log("Selected products with prices:", currentShopItems);
};


export const buyPokemon = (index) => {
    const selectedPokemon = currentShopItems[index];
    if (!selectedPokemon) {
        console.log("No item found at this index.");
        return;
    }

    if (getPokeCurrency() >= selectedPokemon.basePrice) {
        removePokeCurrency(selectedPokemon.basePrice);
        console.log(`You bought ${selectedPokemon.name} for ${selectedPokemon.basePrice} currency. Remaining currency: ${getPokeCurrency()}`);
        playerPokemonList.push(
            createPokemonIndivual(selectedPokemon, 5)
        );
        const playerCurrency = document.getElementById("petshop-currency")
        playerCurrency.textContent = getPokeCurrency() + "$ Pokédollars"
        updateVisiblePokemonInfo();

    } else {
        console.log("Not enough currency to buy this item.");
    }
};

export const openPetShop = () => {
    const petShopInterface = document.getElementById("pet-shop-interface");
    const playerCurrency = document.getElementById("petshop-currency")
    if (!toggleShopInterface) {
        console.log("Open shop");
        allowUserMovementInput = false;
        petShopInterface.style.display = "block";
        playerCurrency.textContent = getPokeCurrency() + "$ Pokédollars"
        generateShopItems();
        toggleShopInterface = true;
    } else {
        petShopInterface.style.display = "none";
        toggleShopInterface = false;
        updateVisiblePokemonInfo();
        allowUserMovementInput = true;
    }
};

export const openMarket = () => {
    const petShopInterface = document.getElementById("pet-shop-interface");
    const playerCurrency = document.getElementById("petshop-currency")
    if (!toggleShopInterface) {
        console.log("Open shop");
        allowUserMovementInput = false;
        petShopInterface.style.display = "block";
        playerCurrency.textContent = getPokeCurrency() + "$ Pokédollars"
        generateMarketItems();
        toggleShopInterface = true;
    } else {
        petShopInterface.style.display = "none";
        toggleShopInterface = false;
        updateVisiblePokemonInfo();
        allowUserMovementInput = true;
    }
};
