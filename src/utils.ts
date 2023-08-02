import { placeholderQA } from "./constants";

export function getRandomCardPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholderQA.length);

  return placeholderQA[randomIndex];
}
