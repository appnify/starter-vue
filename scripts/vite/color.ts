const unoLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const arcoLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const arcoToUnoColor = (arcoColorName: string): { [id: string]: string } => {
  const colors = {};
  for (let i = 0; i < 10; i++) {
    colors[unoLevels[i]] = `rgba(var(--${arcoColorName}-${arcoLevels[i]}), 1)`;
  }
  return colors;
};
