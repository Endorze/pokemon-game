import { healPokemonTeam, setActivePokemon } from "../townModule"
import { buyPokemon, openMarket, openPetShop } from "../shopModule"
import { currentUpgradingPokemon, openStatShop, selectPokemonForUpgrade, upgradeStat } from "../statUpgradeShop"
import { getPokeCurrency, playerPokemonList, pokeCurrency } from "../sharedData"
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

const upgradeHp = document.getElementById("upgrade-hp")
const upgradeDef = document.getElementById("upgrade-def")
const upgradeSpDef = document.getElementById("upgrade-spdef")
const upgradeAtk = document.getElementById("upgrade-atk")
const upgradeSpAtk = document.getElementById("upgrade-spatk")
const upgradeSpeed = document.getElementById("upgrade-speed")
const currency = document.getElementById("stat-shop-currency");

upgradeHp .textContent = "HP $5000"
upgradeDef.textContent = "Def $5000"
upgradeSpDef.textContent = "SpDef $5000" 
upgradeAtk .textContent = "Atk $5000"
upgradeSpAtk.textContent = "SpAtk $5000" 
upgradeSpeed.textContent = "Speed $5000" 

for (let i = 0; i < 6; i++) {
    document.getElementById(`visible-pokemon-${i}`).onclick = () => setActivePokemon(i);
}

for (let i = 0; i < 6; i++) {
    document.getElementById(`stat-shop-pokemon${i}`).onclick = () => selectPokemonForUpgrade(i);
}


upgradeHp.onclick = () => {
    upgradeStat("hp", 5)
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
}
upgradeDef.onclick = () => {
    upgradeStat("defense", 5)
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
}
upgradeSpDef.onclick = () => {
    upgradeStat("spdefense", 5)
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
}
upgradeAtk.onclick = () => {
    upgradeStat("attack", 5)
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
}
upgradeSpAtk.onclick = () => {
    upgradeStat("spatk", 5)
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
}
upgradeSpeed.onclick = () => {
    upgradeStat("speed", 5)
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
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
    currency.textContent = `${getPokeCurrency()}$ Pokedollars`
    console.log(currentUpgradingPokemon[0])
}
statShopExitButton.onclick = () => {
    openStatShop()
}

marketShop.onclick = () => {
    openMarket()
}

