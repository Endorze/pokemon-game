export type StatUpgrades = {
    hp: number,
    attack: number,
    spatk: number,
    defense: number,
    spdefense: number,
    speed: number,
}

export type ItemId = string;

export type MoveId = string;

export type LearnMove = [string, number];

export type PokemonType = {
    id: string;
    name: string;
    health: (level: number) => number;
    moves: LearnMove[];
    hp: number;
    attack: number;
    defense: number;
    spatk: number;
    spdef: number;
    speed: number;
    baseExp: number;
    basePrice: number;
    targetEvolution?: string;
    evolveLevel?: number;
}

export type PokemonIndividual = {
    pokemonType: PokemonType,
    level: number,
    currentHp: number,
    currentExp: number,
    moves: MoveId[],
    heldItem: ItemId,
    statUpgrades: StatUpgrades,
}