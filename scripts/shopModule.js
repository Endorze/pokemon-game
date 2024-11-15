// Definiera shopModule som tar pokemonModule som parameter och importerar ALL_POKEMON
var shopModule = (function (pokemonModule, pokemonUtilsModule, sharedDataModule) {
    const { removePokeCurrency } = sharedDataModule;
    const { createPokemonIndivual } = pokemonUtilsModule;
    const { ALL_POKEMON } = pokemonModule;

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

    //Gets the current time that has passed between every half hour, 
    const shopInfoText = document.getElementById("petshop-info")
    const getShopResetTime = (time) => {
        let currentTimeMillis = Date.now();
        let timePassed = Math.floor(currentTimeMillis / 1000) % (30 * 60);
        let timeLeft = 30 * 60 - timePassed;
        return timeLeft;
    }

    const updateCountdown = () => {
        const timeLeft = getShopResetTime();
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
    
        console.log(`Time left until next reset: ${minutes}m ${seconds}s`);
        shopInfoText.textContent = `Time left until next reset: ${minutes}m ${seconds}s`
    };
    setInterval(updateCountdown, 1000);

    const generateShopItems = () => {
        const seed = generateShopSeed();
        currentShopItems = selectItems(3, seed);

        currentShopItems.forEach((pokemon, index) => {
            const pokemonImage = document.getElementById(`shop-image-${index + 1}`);

            if (pokemon && pokemonImage) {
                pokemonImage.src = `../pokemon/${pokemon.id}/front.gif`; // Ange rätt sökväg

                const nameElement = document.getElementById(`shop-button-${index + 1}`);
                if (nameElement) {
                    nameElement.textContent = `$${pokemon.basePrice}`;
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

        if (sharedDataModule.getPokeCurrency() >= selectedPokemon.basePrice) {
            removePokeCurrency(selectedPokemon.basePrice);
            console.log(`You bought ${selectedPokemon.name} for ${selectedPokemon.basePrice} currency. Remaining currency: ${pokeCurrency}`);
            playerPokemonList.push(
                createPokemonIndivual(selectedPokemon, 5, [selectedPokemon.moves[0]])
              );
              updateVisiblePokemonInfo();

        } else {
            console.log("Not enough currency to buy this item.");
        }
    };

    const openPetShop = () => {
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
            updateVisiblePokemonInfo(playerPokemonList);
            allowUserMovementInput = true;
        }
    };

    return {
        openPetShop,
        buyItem,
    };
})(pokemonModule, pokemonUtilsModule, sharedDataModule);
