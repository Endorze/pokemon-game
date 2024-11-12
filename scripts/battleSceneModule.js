var battleModule = (function (audioModule, pokemonUtilsModule) {
  const { startGameMusic, startBattleMusic, playSound } = audioModule;
  const { createRandomIndividual, levelUpPokemon } = pokemonUtilsModule;
  const { sleep } = utilsModule;

  let pokemonSlayed = 0;
  const loadPokemonIndividualMoves = (pokemonIndividual) => {
    const skill1 = document.getElementById("skill1");
    const skill2 = document.getElementById("skill2");
    const skill3 = document.getElementById("skill3");
    const skill4 = document.getElementById("skill4");

    const move1Id = pokemonIndividual.pokemonType.moves[0];
    const move1 = moves[move1Id];

    skill1.textContent = move1.name;
  };

  const generatePokeCoins = (wildPokemonlevel) => {
    for (let i = 0; i < wildPokemonlevel; i++) {
      for (let j = 0; j <= 10; j++) {
        pokeCurrency += Math.floor(Math.random(5) * wildPokemonlevel + 1);
      }
    }

    const pokedollars = document.getElementById("pokedollars");
    pokedollars.textContent = "Pokédollars: " + pokeCurrency + "$";
  };

  const pokemonBattleScene = (pokemonEncounter) => {
    console.log("pokemonBattleScene", {
      pokemonEncounter,
    });
    if (!pokemonFightActive) {
      startBattleMusic(0);
      pokemonFightActive = true;
    }
    const wildPokemonIndividual = createRandomIndividual(pokemonEncounter);
    currentOpponentPokemonIndividual = wildPokemonIndividual;

    const wildPokemonCry =
      "../pokemon/" +
      currentOpponentPokemonIndividual.pokemonType.id +
      "/cry.mp3";
    console.log(wildPokemonCry);
    playSound(wildPokemonCry);

    updateOpponentPokemon();
    updateAllyPokemon();

    const pokemonDescText = document.getElementById("playerPokemonAction");
    pokemonDescText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;

    const battleScene = document.getElementById("battle-scene");
    battleScene.style.display = "block";

    loadPokemonIndividualMoves(currentAllyPokemonIndividual);

    allowUserAction = true;
  };


  const switchBattleMenu = () => {
    if (!allowUserAction) return;

    const menu = document.querySelector(".pokemon-skill-bar");
    const mainMenu = document.querySelector(".battle-bar-main-menu");

    if (mainMenu.style.display === "none") {
      mainMenu.style.display = "block";
      menu.style.display = "none";
    } else {
      mainMenu.style.display = "none";
      menu.style.display = "block";
    }
  };

  let listOfPokemon = false;
  const showPokemonTeam = () => {
    const pokemonList = document.getElementById("battle-pokemonlist-menu")
    if (!listOfPokemon) {
      pokemonList.style.display = "block";
      for (let i = 0; i < 6; i++) {
        const buttonElement = document.getElementById(`select-pokemon-${i}`);
        const buttonIcon = document.getElementById(`select-pokemon-${i}-icon`);
        const buttonName = document.getElementById(`select-pokemon-${i}-name`);
        const buttonLevel = document.getElementById(`select-pokemon-${i}-level`);
        const buttonHpText = document.getElementById(`select-pokemon-${i}-hp-text`);
        const pokemonIndividual = playerPokemonList[i];

        if (pokemonIndividual) {
          console.log(pokemonIndividual);
          buttonElement.style.display = "block";
          buttonIcon.src = "../pokemon/" + pokemonIndividual.pokemonType.id + "/front.gif";
          buttonName.textContent = pokemonIndividual.name;
          buttonLevel.textContent = pokemonIndividual.level;
          buttonHpText.textContent = pokemonIndividual.currentHp;
          listOfPokemon = true;
        } else {
          console.log("Hej")
          return;
        }
      }
      console.log("Trying to show pokemon team")
      listOfPokemon = true;
      return;
    } else {
      pokemonList.style.display = "none";
      listOfPokemon = false;
      return;
    }
  }

  const setCurrentPokemon = async (index) => {
    if (playerPokemonList[index] != null) {
      if (playerPokemonList[index] == currentAllyPokemonIndividual) {
        console.log(currentAllyPokemonIndividual.pokemonType.name + " is already fighting.")
        return;
      }
      playSound("buttonhover.mp3")
      await sleep(500)
      const pokemonList = document.getElementById("battle-pokemonlist-menu")
      pokemonList.style.display = "none";
      currentAllyPokemonIndividual = playerPokemonList[index];
      updateAllyPokemon();
      console.log("setCurrentPokemon, ", currentAllyPokemonIndividual);
      await sleep(1000)
      doAIMove();
    } else {
      console.log("Thats not a pokemon");
      return;
    }
  }

  const updateOpponentPokemon = () => {
    const wiPokemon = document.getElementById("wildpokemon");
    const wiLevel = document.getElementById("wildlevel");
    const wiPokemonSprite = document.getElementById("random-wild-pokemon");

    wiPokemon.textContent = currentOpponentPokemonIndividual.pokemonType.name;
    wiLevel.textContent = "level " + currentOpponentPokemonIndividual.level;
    wiPokemonSprite.src =
      "../pokemon/" +
      currentOpponentPokemonIndividual.pokemonType.id +
      "/front.gif";

    updateHealthBar(
      currentOpponentPokemonIndividual,
      "wildHp",
      "opponentHpBar"
    );
  };

  const updateAllyPokemon = () => {
    const plPokemon = document.getElementById("playerpokemon");
    const plLevel = document.getElementById("playerlevel");
    const plPokemonSprite = document.getElementById("player-pokemon-image");

    plPokemon.textContent = currentAllyPokemonIndividual.pokemonType.name;
    plLevel.textContent = "level " + currentAllyPokemonIndividual.level;
    plPokemonSprite.src =
      "../pokemon/" + currentAllyPokemonIndividual.pokemonType.id + "/back.gif";
    plPokemonSprite.style.height = (currentAllyPokemonIndividual.pokemonType.height || 25) + "%";

    updateHealthBar(currentAllyPokemonIndividual, "playerHp", "allyHpBar");
  };

  const updateHealthBar = (pokemonIndividual, hpBarTextId, hpBarOverlayId) => {
    const hpTextElement = document.getElementById(hpBarTextId);
    const hpOverlayElement = document.getElementById(hpBarOverlayId);

    hpTextElement.textContent = pokemonIndividual.currentHp + " HP";

    const hpPercentage =
      pokemonIndividual.currentHp /
      pokemonIndividual.pokemonType.health(pokemonIndividual.level);
    hpOverlayElement.style.width = `${hpPercentage * 100}%`;

    if (hpPercentage < 0.2) {
      hpOverlayElement.style.backgroundColor = `var(--low-hp)`;
      return;
    }
    if (hpPercentage < 0.5) {
      hpOverlayElement.style.backgroundColor = `var(--half-hp)`;
      return;
    }

    hpOverlayElement.style.backgroundColor = `var(--full-hp)`;
  };

  const allyUseMove = async (buttonId) => {
    const allyPokemonActionText = document.getElementById(
      "playerPokemonAction"
    );
    const killCounter = document.getElementById("kill-counter-text");

    if (!allowUserAction) return;
    if (buttonId != 0) {
      return;
    }
    allowUserAction = false;
    const moveId = currentAllyPokemonIndividual.moves[buttonId];
    const move = moves[moveId];
    console.log(move.numberOfUses);

    await sleep(500);

    allyPokemonActionText.textContent = `${currentAllyPokemonIndividual.pokemonType.name} used ${move.name}`;

    move.performMove(
      currentOpponentPokemonIndividual,
      currentAllyPokemonIndividual
    );
    allyAttackAnimation();
    playSound("hit.mp3");
    updateOpponentPokemon();
    updateAllyPokemon();

    if (currentAllyPokemonIndividual.currentHp == 0) {
      await sleep(2000);
      pokemonFaintedText(currentAllyPokemonIndividual);
      console.log("You dead");
      //presentFailScreen();
      return;
    }

    if (currentOpponentPokemonIndividual.currentHp == 0) {
      pokemonSlayed += 1;
      await sleep(2000);
      pokemonFaintedText(currentOpponentPokemonIndividual);
      generatePokeCoins(currentOpponentPokemonIndividual.level);
      levelUpPokemon(
        currentAllyPokemonIndividual,
        currentOpponentPokemonIndividual.pokemonType.baseExp
      );
      updateAllyPokemon();
      killCounter.textContent = `Pokemon slain: ${pokemonSlayed}`;
      console.log("You live to tell the tale");
      pokemonBattleScene(ROUTE1[randomWildPokemon(ROUTE1)]);
      return;
    }

    await sleep(2000);
    doAIMove();

    await sleep(2500);
    allyPokemonActionText.textContent = `What will ${currentAllyPokemonIndividual.pokemonType.name} do?`;
  };

  const pokemonFaintedText = (pokemonIndividual) => {
    const allyPokemonActionText = document.getElementById(
      "playerPokemonAction"
    );
    allyPokemonActionText.textContent = `${pokemonIndividual.pokemonType.name} fainted...`;

    setTimeout(() => {
      allyPokemonActionText.textContent = `${pokemonIndividual.pokemonType.name} fainted...`;
    }, 1000);
  };

  const allyAttackAnimation = () => {
    const allySprite = document.getElementById("player-pokemon-image");
    const opponentSprite = document.getElementById("random-wild-pokemon");

    if (!allySprite || !opponentSprite) {
      console.error("Ett eller båda av elementen saknas i DOM");
      return;
    }

    const allySpriteRect = allySprite.getBoundingClientRect();
    const opponentSpriteRect = opponentSprite.getBoundingClientRect();

    const deltaX = opponentSpriteRect.left - allySpriteRect.left;
    const deltaY = opponentSpriteRect.top - allySpriteRect.top;

    allySprite.style.setProperty(
      "--translate-values",
      `translate(${deltaX}px, ${deltaY}px)`
    );

    allySprite.classList.add("attack-move");
    console.log("allyAttackAnimation");

    allySprite.addEventListener(
      "animationend",
      () => {
        allySprite.classList.remove("attack-move");
      },
      { once: true }
    );
  };

  const setInfoBoxText = (text) => {
    const allyPokemonActionText = document.getElementById(
      "playerPokemonAction"
    );
    allyPokemonActionText.textContent = text;
  };

  const doAIMove = async () => {
    const allyPokemonActionText = document.getElementById(
      "playerPokemonAction"
    );

    // Randomize opponent action
    const randomMoveIndex = Math.floor(
      Math.random() * currentOpponentPokemonIndividual.moves.length
    );
    const moveId = currentOpponentPokemonIndividual.moves[randomMoveIndex];
    const move = moves[moveId];
    allyPokemonActionText.textContent = `${currentOpponentPokemonIndividual.pokemonType.name} used ${move.name}`;
    console.log("AI used " + moveId, move);

    // Perform move
    opponentAttackAnimation();
    move.performMove(
      currentAllyPokemonIndividual,
      currentOpponentPokemonIndividual
    );
    playSound("hit.mp3");
    // Update ally
    updateAllyPokemon();
    // Update opponent
    updateOpponentPokemon();
    if (currentAllyPokemonIndividual.currentHp == 0) {
      if (!DEV_MOVE) await sleep(2000);
      pokemonFaintedText(currentAllyPokemonIndividual);
      console.log("You dead");
      //presentFailScreen();
      return;
    }
    if (currentOpponentPokemonIndividual.currentHp == 0) {
      if (!DEV_MODE) await sleep(2000);
      pokemonFaintedText(currentOpponentPokemonIndividual);
      return;
    }
    allowUserAction = true;
  };

  const opponentAttackAnimation = () => {
    const allySprite = document.getElementById("player-pokemon-image");
    const opponentSprite = document.getElementById("random-wild-pokemon");

    if (!allySprite || !opponentSprite) {
      console.error("Ett eller båda av elementen saknas i DOM");
      return;
    }

    const allySpriteRect = allySprite.getBoundingClientRect();
    const opponentSpriteRect = opponentSprite.getBoundingClientRect();

    const deltaX = opponentSpriteRect.left - allySpriteRect.left;
    const deltaY = opponentSpriteRect.top - allySpriteRect.top;

    opponentSprite.style.setProperty(
      "--translate-values",
      `translate(${-deltaX}px, ${-deltaY}px)`
    );

    opponentSprite.classList.add("attack-move");
    console.log("allyAttackAnimation");

    opponentSprite.addEventListener(
      "animationend",
      () => {
        opponentSprite.classList.remove("attack-move");
      },
      { once: true }
    );
  };

  const runFromBattlePopup = () => {
    const runAwayPopup = document.getElementById("run-away-popup");
    runAwayPopup.style.display = "block";
  };

  const runFromBattle = async () => {
    const battleScene = document.getElementById("battle-scene");
    const runAwayPopup = document.getElementById("run-away-popup");
    runAwayPopup.style.display = "none";
    toggleLoadingScreen();
    if (!DEV_MODE) await sleep(2000);
    battleScene.style.display = "none";
    loadTown();
    startGameMusic();
  };

  const closeRunFromBattlePopup = () => {
    const runAwayPopup = document.getElementById("run-away-popup");
    runAwayPopup.style.display = "none";
  };

  const startBattle = () => {
    const battleScene = document.getElementById("battle-scene");
    battleScene.style.display = "block";
    currentAllyPokemonIndividual = playerPokemonList[0];
    pokemonBattleScene(ROUTE1[randomWildPokemon(ROUTE1)]);
    startBattleMusic();
  };

  return {
    switchBattleMenu,
    pokemonBattleScene,
    allyUseMove,
    runFromBattlePopup,
    runFromBattle,
    closeRunFromBattlePopup,
    startBattle,
    showPokemonTeam,
    setCurrentPokemon,
  };
})(audioModule, pokemonUtilsModule);
