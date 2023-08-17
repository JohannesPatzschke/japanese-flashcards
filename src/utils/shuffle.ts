export const shuffleArray = <T>(array: Array<T>): Array<T> =>
  [...array].sort(() => Math.random() - 0.5);
