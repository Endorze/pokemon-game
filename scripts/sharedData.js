const sharedDataModule = (function() {

    let pokeCurrency = 0;

    const playerPokemonList = [];
    
    const getPokeCurrency = () => pokeCurrency;

    const setPokeCurrency = (amount) => {
        pokeCurrency = amount
    }

    const addPokeCurrency = (amount) => {
        pokeCurrency += amount;
    }

    const removePokeCurrency = (amount) => {
        pokeCurrency -= amount;
    }   

    return {
        setPokeCurrency,
        addPokeCurrency,
        removePokeCurrency,
        getPokeCurrency,
        playerPokemonList,
    }
})()