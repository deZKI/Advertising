import {generateRandomString} from "./generateRandomString";
import {TPoints} from "../types/points.type";

export const generateRandomPoints = (): TPoints => {
  const latitude = 55.55 + Math.random() * (55.92 - 55.55);
  const longitude = 37.36 + Math.random() * (37.84 - 37.36);

  return {
    id: generateRandomString(),
    lat: latitude,
    lon: longitude,
    azimuth: Math.random(),
  };
}
