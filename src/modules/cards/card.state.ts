import { atom } from "jotai";
import type { Card } from "../cards/card.entity";

export const cardsAtom = atom<Card[]>([]);

export const selectedCardIdAtom = atom<string | null>(null);

export const selectedCardAtom = atom((get) => {
  const selectedCardId = get(selectedCardIdAtom);
  const cards = get(cardsAtom);
  return selectedCardId
    ? cards.find((card) => card.id == selectedCardId)
    : null;
});
