import { startGameMusic } from "./audioModule";
import { ALL_POKEMON } from "./pokemonModule";
import { updateVisiblePokemonInfo } from "./pokemonUtilsModule";
import { playerPokemonList, getPokeCurrency, setPokeCurrency, purchaseableMoves } from "./sharedData";
import { loadTown } from "./townModule";

const fetchData = () => {
    return {
      user: {
        userPokemon: playerPokemonList.map(pokemonIndividual => ({
          ...pokemonIndividual,
          pokemonType: pokemonIndividual.pokemonType.id
        })),
        userMoney: getPokeCurrency() || 0,
        unlockedMoves: purchaseableMoves,
      },
    };
  };
  
  const checkForLocalData = () => {
    const loadbutton = document.getElementById("start-screen-button-load");
    if (!loadbutton) return;
  
    if (localStorage.getItem("saveGame") === null) {
      loadbutton.style.display = "none";
      return;
    } else {
      loadbutton.style.display = "block";
    }
  }
  
  checkForLocalData();
  
  
  export const saveGame = () => {
    const data = fetchData();
    localStorage.setItem("saveGame", JSON.stringify(data));
    console.log("Saved game");
    console.log(data);
  };
  
  export const loadGame = () => {
    const savedData = localStorage.getItem("saveGame");
    if (savedData) {
      const data = JSON.parse(savedData);
  
      playerPokemonList.push(...data.user.userPokemon.map(pokemonSave => ({
        ...pokemonSave,
        pokemonType: Object.values(ALL_POKEMON).find(pokemonType => pokemonType.id === pokemonSave.pokemonType)
      })).filter(individual => individual.pokemonType != null));
  
      setPokeCurrency(data.user.userMoney);

      if (data.user.unlockedMoves && Array.isArray(data.user.unlockedMoves)) {
        purchaseableMoves.length = 0;
        purchaseableMoves.push(...data.user.unlockedMoves);
        console.log(...data.user.unlockedMoves);
      }
      
      console.log(getPokeCurrency())
      loadTown();
      updateVisiblePokemonInfo();
      startGameMusic();
    }
  };
  
  let menuOpen = false;
  export const openMenu = (e: KeyboardEvent): void => {
    const menu = document.getElementById("main-menu");
    if (!menu) return;

    if (e.key === "Escape") {
      if (!menuOpen) {
        console.log("Open menu")
        menu.style.display = "block";
        menuOpen = true;
      } else {
        menu.style.display = "none";
        menuOpen = false;
      }
    }
  }
  
  console.log("Hej")
  document.addEventListener("keydown", openMenu);
  