import { useAtom, useAtomValue } from "jotai";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { listsAtom } from "../../../modules/lists/list.state";
import { listRepository } from "../../../modules/lists/list.repository";
import { cardRepository } from "../../../modules/cards/card.repository";
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

  const createCard = async (listId: string, title: string) => {
    const newCard = await cardRepository.create(listId, title);
    console.log(newCard);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (destination == null) return;

    const [reorderedList] = sortedLists.splice(source.index, 1);
    sortedLists.splice(destination.index, 0, reorderedList);

    const updatedLists = sortedLists.map((list, index) => ({
      ...list,
      position: index,
    }));

    const originalLists = [...lists];
    setLists(updatedLists);

    try {
      await listRepository.update(updatedLists);
    } catch (error) {
      console.error("リストの移動に失敗しました", error);
      setLists(originalLists);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-container">
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              style={{ display: "flex", gap: "12px" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sortedLists.map((list) => (
                <SortableList
                  list={list}
                  onDelete={deleteList}
                  onCreateCard={createCard}
                  key={list.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AddList onCreate={createList} />
      </div>
    </DragDropContext>
  );
}
