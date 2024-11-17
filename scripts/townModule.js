const townModule = (function (sharedDataModule, pokemonUtilsModule) {

    const { playerPokemonList } = sharedDataModule;
    const { updateVisiblePokemonInfo } = pokemonUtilsModule;

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