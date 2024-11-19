import { healPokemonTeam } from "../healShop"
import { buyPokemon, openMarket, openPetShop } from "../shopModule"
import { openStatShop } from "../statUpgradeShop"
import { playerPokemonList } from "../sharedData"
import { setCurrentPokemon } from "../battleSceneModule"

const petShop = document.getElementById("pet-shop")
const petShopButton1 = document.getElementById("shop-button-1")
const petShopButton2 = document.getElementById("shop-button-2")
const petShopButton3 = document.getElementById("shop-button-3")

const statShop = document.getElementById("stat-shop")
const healShop = document.getElementById("heal-shop")
const marketShop = document.getElementById("market-shop")
const exitShop = document.getElementById("exit-shop-button")

const visiblePokemon1 = document.getElementById("select-pokemon-0")
const visiblePokemon2 = document.getElementById("select-pokemon-1")
const visiblePokemon3 = document.getElementById("select-pokemon-2")
const visiblePokemon4 = document.getElementById("select-pokemon-3")
const visiblePokemon5 = document.getElementById("select-pokemon-4")
const visiblePokemon6 = document.getElementById("select-pokemon-5")

visiblePokemon1.onclick = () => {
    setCurrentPokemon(0)
}
visiblePokemon2.onclick = () => {
    setCurrentPokemon(1)
}
visiblePokemon3.onclick = () => {
    setCurrentPokemon(2)
}
visiblePokemon4.onclick = () => {
    setCurrentPokemon(3)
}
visiblePokemon5.onclick = () => {
    setCurrentPokemon(4)
}
visiblePokemon6.onclick = () => {
    setCurrentPokemon(5)
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
    healPokemonTeam(playerPokemonList)
}


statShop.onclick = () => {
    openStatShop()
}

marketShop.onclick = () => {
    openMarket()
}

