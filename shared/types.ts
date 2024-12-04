export type Move = [string, number];

export type PokemonType = {
    id: string;
    name: string;
    health: (level: number) => number;
    moves: Move[];
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