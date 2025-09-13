import { atom } from "jotai";
import type { List } from "../lists/list.entity";

export const listsAtom = atom<List[]>([]);
