export function generateRandomType(): "high" | "middle" | "low" {
  const priorities: Array<"high" | "middle" | "low"> = ["high", "middle", "low"];
  const randomIndex = Math.floor(Math.random() * priorities.length);

  return priorities[randomIndex];
}
