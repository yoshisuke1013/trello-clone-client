import api from "../../lib/api";
import { List } from "../lists/list.entity";

export const listRepository = {
  async find(boardId: string): Promise<List[]> {
    const result = await api.get(`/lists/${boardId}`);
    return result.data.map((list: List) => new List(list));
  },

  async create(boardId: string, title: string): Promise<List> {
    const result = await api.post("/lists", { boardId, title });
    return new List(result.data);
  },

  async update(lists: List[]): Promise<List[]> {
    const result = await api.put("/lists", { lists });
    return result.data.map((list: List) => new List(list));
  },

  async delete(id: string): Promise<boolean> {
    await api.delete(`/lists/${id}`);
    return true;
  },
};
