
export const upgradeStat = (pokemonIndividual, amount) => {
    pokemonIndividual.statUpgrades.hp = amount;
    pokemonIndividual.pokemonType.hp += pokemonIndividual.statUpgrades.hp;
}

export const openStatShop = () => {
    console.log("HEJ")
    let shopInterface = document.getElementById("stat-shop-interface")
    shopInterface.style.display = "block";
}
