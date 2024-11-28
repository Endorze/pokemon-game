export const animate = (animationFunction: (time: number, deltaSeconds: number) => void, durationSeconds: number, frameRate: number) => {
    return new Promise<void>((resolve) => {
      let time = 0;
      let deltaTime = durationSeconds / frameRate;
      const id = setInterval(() => {
        if (time > durationSeconds) {
          clearInterval(id);
          resolve();
          return;
        }
  
        time += deltaTime;
        animationFunction(time / durationSeconds, deltaTime);
      }, deltaTime * 1000);
    });
  };
  
  