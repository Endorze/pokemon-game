import { healPokemonTeam, setActivePokemon } from "../townModule"
import { buyPokemon, openMarket, openPetShop } from "../shopModule"
import { openStatShop, selectPokemonForUpgrade } from "../statUpgradeShop"
import { playerPokemonList } from "../sharedData"
import { setCurrentPokemon } from "../battleSceneModule"

const petShop = document.getElementById("pet-shop")
const petShopButton1 = document.getElementById("shop-button-1")
const petShopButton2 = document.getElementById("shop-button-2")
const petShopButton3 = document.getElementById("shop-button-3")

const statShop = document.getElementById("stat-shop")
const statShopExitButton = document.getElementById("stat-shop-exit-button")
const healShop = document.getElementById("heal-shop")
const marketShop = document.getElementById("market-shop")
const exitShop = document.getElementById("exit-shop-button")

const visiblePokemon1 = document.getElementById("visible-pokemon-0")
const visiblePokemon2 = document.getElementById("visible-pokemon-1")
const visiblePokemon3 = document.getElementById("visible-pokemon-2")
const visiblePokemon4 = document.getElementById("visible-pokemon-3")
const visiblePokemon5 = document.getElementById("visible-pokemon-4")
const visiblePokemon6 = document.getElementById("visible-pokemon-5")

const statPokeImage0 = document.getElementById("stat-shop-pokemon0")
const statPokeImage1 = document.getElementById("stat-shop-pokemon1")
const statPokeImage2 = document.getElementById("stat-shop-pokemon2")
const statPokeImage3 = document.getElementById("stat-shop-pokemon3")
const statPokeImage4 = document.getElementById("stat-shop-pokemon4")
const statPokeImage5 = document.getElementById("stat-shop-pokemon5")
const upgradePokemon = document.getElementById("upgrade-pokemon")




statPokeImage0.onclick = () => {
    selectPokemonForUpgrade(0)
}
statPokeImage1.onclick = () => {
    selectPokemonForUpgrade(1)
}
statPokeImage2.onclick = () => {
    selectPokemonForUpgrade(2)
}
statPokeImage3.onclick = () => {
    selectPokemonForUpgrade(3)
}
statPokeImage4.onclick = () => {
    selectPokemonForUpgrade(4)
}
statPokeImage5.onclick = () => {
    selectPokemonForUpgrade(5)
}


visiblePokemon1.onclick = () => {
    setActivePokemon(0)
}
visiblePokemon2.onclick = () => {
    setActivePokemon(1)
}
visiblePokemon3.onclick = () => {
    setActivePokemon(2)
}
visiblePokemon4.onclick = () => {
    setActivePokemon(3)
}
visiblePokemon5.onclick = () => {
    setActivePokemon(4)
}
visiblePokemon6.onclick = () => {
    setActivePokemon(5)
}


petShop.onclick = () => {
    openPetShop()
}

exitShop.onclick = () => {
    openPetShop()
}

petShopButton1.onclick = () => {
    buyPokemon(0)
}
petShopButton2.onclick = () => {
    buyPokemon(1)
}
petShopButton3.onclick = () => {
    buyPokemon(2)
}

healShop.onclick = () => {
    console.log(playerPokemonList)
    healPokemonTeam()
}


statShop.onclick = () => {
    openStatShop()
}
statShopExitButton.onclick = () => {
    openStatShop()
}

marketShop.onclick = () => {
    openMarket()
}

