import { atom } from "jotai";
import type { Card } from "../cards/card.entity";

export const cardsAtom = atom<Card[]>([]);
