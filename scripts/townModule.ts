    import { playerPokemonList } from "./sharedData";
    import { updateVisiblePokemonInfo, setHeldItem } from "./pokemonUtilsModule";
    import { ALL_ITEMS } from "./heldItemsModule";
    import { returnFromWilderness } from "./index";

    export const setActivePokemon = async (index) => {
        if (playerPokemonList == null) {
          return;
        }
        if (playerPokemonList[index] == null) {
          return;
        }
        let tempPokemon = playerPokemonList[index];
        playerPokemonList[index] = playerPokemonList[0];
        playerPokemonList[0] = tempPokemon;

        updateVisiblePokemonInfo();
    }

    export const loadTown = async () => {
      const town = document.getElementById("town");
      town.style.display = "block";
      console.log(playerPokemonList[0])
      updateVisiblePokemonInfo();
      returnFromWilderness();
    };

    