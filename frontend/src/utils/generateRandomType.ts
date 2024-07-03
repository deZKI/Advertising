export function generateRandomType(): string {
  const priorities = ["high", "middle", "low"];
  const randomIndex = Math.floor(Math.random() * priorities.length);
  
  return priorities[randomIndex];
}
