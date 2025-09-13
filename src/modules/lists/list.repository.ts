import api from "../../lib/api";
import { List } from "../lists/list.entity";

export const listRepository = {
  async create(boardId: string, title: string): Promise<List> {
    const result = await api.post("/lists", { boardId, title });
    return new List(result.data);
  },
};
