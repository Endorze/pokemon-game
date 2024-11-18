const townModule = (function (sharedDataModule, pokemonUtilsModule, heldItemsModule) {

    const { playerPokemonList } = sharedDataModule;
    const { updateVisiblePokemonInfo, setHeldItem } = pokemonUtilsModule;
    const { ALL_ITEMS } = heldItemsModule;

    


    const setActivePokemon = async (index) => {
        if (playerPokemonList == null) {
          return;
        }
        if (playerPokemonList[index] == null) {
          return;
        }
        let tempPokemon = playerPokemonList[index];
        playerPokemonList[index] = playerPokemonList[0];
        playerPokemonList[0] = tempPokemon;

        updateVisiblePokemonInfo();
    }

    return {
      setActivePokemon,
    }
})(sharedDataModule, pokemonUtilsModule)