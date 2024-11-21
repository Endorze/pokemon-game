let shopOpen = false;

export const upgradeStat = (pokemonIndividual, amount) => {
    pokemonIndividual.statUpgrades.hp = amount;
    pokemonIndividual.pokemonType.hp += pokemonIndividual.statUpgrades.hp;
}

export const openStatShop = () => {
    let shopInterface = document.getElementById("stat-shop-interface")
    if (!shopOpen) {
        console.log("Trying to open stat shop")
        shopInterface.style.display = "block";
        console.log("Stat shop should be open.")
        shopOpen = true;
    }  else {
        shopInterface.style.display = "none";
        console.log("Should close shop.")
        shopOpen = false;
    }
}
