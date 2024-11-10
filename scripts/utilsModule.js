var utilsModule = (function () {
  
  const sleep = async (millis) =>
    new Promise((resolve) => setTimeout(resolve, millis));

  const levelGenerator = (MAX_LEVEL) => {
    return () => {
      let randomLevel = Math.floor(Math.random() * MAX_LEVEL) + 1;
      console.log("levelGenerator" + randomLevel);
      return randomLevel;
    };
  };
  return {
    levelGenerator,
    sleep
  };
})();
