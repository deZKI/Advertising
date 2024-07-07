import {TCoordinate} from "../types/coordinate.type";

export const generateRandomCoordinates = (): TCoordinate => {
  const latitude = 55.55 + Math.random() * (55.92 - 55.55);
  const longitude = 37.36 + Math.random() * (37.84 - 37.36);

  return {latitude, longitude };
}
