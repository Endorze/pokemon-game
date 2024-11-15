
const healShopModule = (function (battleModule) {

    const healPokemonTeam = (pokemonList) => {
        if (!pokemonList) {
            return;
        }
        for (let i = 0; i < pokemonList.length; i++) {
            pokemonList[i].currentHp = pokemonList[i].pokemonType.health(pokemonList[i].level)
        }
        battleModule.updateAllyPokemon();
    }

    const healPokemon = (pokemonIndividual, healAmount) => {
        const maxHp = pokemonIndividual.pokemonType.health(pokemonIndividual.level);
        const newHp = pokemonIndividual.currentHp + healAmount;
        const actualNewHp = Math.min(maxHp, newHp);

        pokemonIndividual.currentHp = actualNewHp;
    };

    return {
        healPokemon,
        healPokemonTeam,
    }
})(battleModule)