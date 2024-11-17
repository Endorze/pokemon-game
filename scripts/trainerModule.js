const trainerModule = (function (pokemonModule) {

    const { ALL_POKEMON } = pokemonModule;

    const TRAINERS = {
        Anna: {
            name: "Anna",
            pokemonTeam: [
                ALL_POKEMON.pidgey,
                ALL_POKEMON.rattata,
                ALL_POKEMON.mankey,
                ALL_POKEMON.jigglypuff,
                ALL_POKEMON.machop,
                ALL_POKEMON.charmander,
            ]
        }
    }
    return {
        TRAINERS,
    }
})(pokemonModule)