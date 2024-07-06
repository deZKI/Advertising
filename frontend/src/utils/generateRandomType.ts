import {TCoverageTypes} from "../types/coverageTypes";

export const generateRandomType = (): TCoverageTypes => {
  const priorities: Array<TCoverageTypes> = ["high", "middle", "low"];
  const randomIndex = Math.floor(Math.random() * priorities.length);
  
  return priorities[randomIndex];
}
