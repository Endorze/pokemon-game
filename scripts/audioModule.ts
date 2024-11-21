
const backgroundMusic = new Audio(`mp3/littleroot.mp3`);
backgroundMusic.addEventListener("ended", () => {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
});
const battleMusic = new Audio(`mp3/wildpokemonencounter.mp3`);
battleMusic.addEventListener("ended", () => {
  battleMusic.currentTime = 0;
  battleMusic.play();
});

//Starts game music when the game starts.
export const startGameMusic = (duration: number = 5000) => {
  battleMusic.pause();
  backgroundMusic.volume = 0;
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();

  backgroundMusic.addEventListener("ended", () => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  });
  let fadeInterval = setInterval(() => {
    if (backgroundMusic.volume < 0.1) {
      backgroundMusic.volume = Math.min(backgroundMusic.volume + 0.05, 0.1);
    } else {
      clearInterval(fadeInterval);
    }
  }, duration / 20);
};

export const startBattleMusic = (duration: number = 2000) => {
  backgroundMusic.pause();
  battleMusic.volume = 0;
  battleMusic.currentTime = 0;
  battleMusic.play();

  let fadeInterval = setInterval(() => {
    if (battleMusic.volume < 0.1) {
      battleMusic.volume = Math.min(battleMusic.volume + 0.05, 0.1);
    } else {
      clearInterval(fadeInterval);
    }
  }, duration / 20);
};

//Used to play a sound, for example while hovering/clicking a button.
export const playSound = (sound) => {
  let audio = new Audio(`mp3/${sound}`);
  audio.play();
};
