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

  const deleteList = async (listId: string) => {
    const confirmMessage =
      "リストを削除しますか？このリスト内のカードもすべて削除されます。";
    try {
      if (window.confirm(confirmMessage)) {
        await listRepository.delete(listId);
        setLists((prevLists) => prevLists.filter((list) => list.id != listId));
      }
    } catch (error) {
      console.error("リストの削除に失敗しました", error);
    }
  };

  return (
    <div className="board-container">
      <div style={{ display: "flex", gap: "12px" }}>
        {sortedLists.map((list) => (
          <SortableList list={list} onDelete={deleteList} key={list.id} />
        ))}
      </div>
      <AddList onCreate={createList} />
    </div>
  );
}
