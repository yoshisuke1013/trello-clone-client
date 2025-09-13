import { useAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { listsAtom } from "../../../modules/lists/list.state";
import { listRepository } from "../../../modules/lists/list.repository";
import { SortableList } from "./SortableList";
import { AddList } from "./AddList";

export default function SortableBoard() {
  const currentUser = useAtomValue(currentUserAtom);
  const [lists, setLists] = useAtom(listsAtom);
  const sortedLists = [...lists].sort((a, b) => a.position - b.position);

  const createList = async (title: string) => {
    const newList = await listRepository.create(currentUser!.boardId, title);
    setLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <div className="board-container">
      <div style={{ display: "flex", gap: "12px" }}>
        {sortedLists.map((list) => (
          <SortableList list={list} key={list.id} />
        ))}
      </div>
      <AddList onCreate={createList} />
    </div>
  );
}
