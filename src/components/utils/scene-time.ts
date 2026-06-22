let time = 0;

export const sceneTime = {
  get: () => time,
  add: (delta: number) => {
    time += delta;
  },
};
