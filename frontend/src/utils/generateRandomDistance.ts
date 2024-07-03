export const generateRandomDistance = ():number => {
  const minDistance = 100;
  const maxDistance = 10000;

  return Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
}