// Definiera shopModule som tar pokemonModule som parameter och importerar ALL_POKEMON
var shopModule = (function (pokemonModule, pokemonUtilsModule) {

    const { createPokemonIndivual } = pokemonUtilsModule;
    const { ALL_POKEMON } = pokemonModule;
    let pokeCurrency = 500000;

    let currentShopItems = [];
    let toggleShopInterface = false;

    const generateShopSeed = () => {
        const timeInMillis = Date.now();
        const timeInSeconds = Math.floor(timeInMillis / 1000);
        const timeInMinutes = Math.floor(timeInSeconds / 60);
        return Math.floor(timeInMinutes / 30);
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

    const generateShopItems = () => {
        const seed = generateShopSeed();
        currentShopItems = selectItems(3, seed);

        currentShopItems.forEach((pokemon, index) => {
            const pokemonImage = document.getElementById(`shop-image-${index + 1}`);
            const pokemonName = document.getElementById(`shop-price-${index + 1}`);
            if (pokemon && pokemonImage) {
                pokemonImage.src = `../pokemon/${pokemon.id}/front.gif`; // Ange rätt sökväg
                pokemonName.alt = pokemon.name;

                const nameElement = document.getElementById(`shop-price-${index + 1}`);
                if (nameElement) {
                    nameElement.textContent = `${pokemon.name} - Price: ${pokemon.basePrice}$`;
                }
            }
        });
        console.log("Selected products with prices:", currentShopItems);
    };


    const buyItem = (index) => {
        const selectedPokemon = currentShopItems[index];
        if (!selectedPokemon) {
            console.log("No item found at this index.");
            return;
        }

        if (pokeCurrency >= selectedPokemon.basePrice) {
            pokeCurrency -= selectedPokemon.basePrice;
            console.log(`You bought ${selectedPokemon.name} for ${selectedPokemon.basePrice} currency. Remaining currency: ${pokeCurrency}`);
            playerPokemonList.push(
                createPokemonIndivual(selectedPokemon, 5, [selectedPokemon.moves[0]])
              );

        } else {
            console.log("Not enough currency to buy this item.");
        }
    };

    const openShop = () => {
        const petShopInterface = document.getElementById("pet-shop-interface");
        if (!toggleShopInterface) {
            console.log("Open shop");
            allowUserMovementInput = false;
            petShopInterface.style.display = "block";
            generateShopItems();
            toggleShopInterface = true;
        } else {
            petShopInterface.style.display = "none";
            toggleShopInterface = false;
            allowUserMovementInput = true;
        }
    };

    

    return {
        openShop,
        buyItem,
    };
})(pokemonModule, pokemonUtilsModule);
