import api from "../../lib/api";
import { Card } from "../cards/card.entity";

export const cardRepository = {
  async find(boardId: string): Promise<Card[]> {
    const result = await api.get(`/cards/${boardId}`);
    return result.data.map((card: Card) => new Card(card));
  },

  async create(listId: string, title: string): Promise<Card> {
    const result = await api.post("/cards", { listId, title });
    return new Card(result.data);
  },
};
