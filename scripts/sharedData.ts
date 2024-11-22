
let pokeCurrency = 0;

export const playerPokemonList: any[] = [];

export const purchaseableMoves : any[] = [];


export const getPokeCurrency = () => pokeCurrency;


export const setPokeCurrency = (amount: number) => {
    pokeCurrency = amount
}

export const addPokeCurrency = (amount: number) => {
    pokeCurrency += amount;
}

export const removePokeCurrency = (amount: number) => {
    pokeCurrency -= amount;
}   
