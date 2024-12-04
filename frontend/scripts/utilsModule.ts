
  export const sleep = (millis) => new Promise((resolve) => setTimeout(resolve, millis));

  export const levelGenerator = (MAX_LEVEL) => {
    return () => {
      let randomLevel = Math.floor(Math.random() * MAX_LEVEL) + 1;
      console.log("levelGenerator" + randomLevel);
      return randomLevel;
    };
  };
