import type { List } from "../../../modules/lists/list.entity";
import { SortableCard } from "./SortableCard";
import { AddCard } from "./AddCard";

interface SortableListProps {
  list: List;
  onDelete: (id: string) => void;
}

export function SortableList({ list, onDelete }: SortableListProps) {
  return (
    <div>
      <div className={`list`}>
        <div
          className="list-header"
          style={{
            cursor: "grab",
          }}
        >
          <h3 className="list-title">{list.title}</h3>
          <button className="list-options" onClick={() => onDelete(list.id)}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
        <div
          style={{
            minHeight: "1px",
          }}
        >
          <SortableCard />
        </div>
        <AddCard />
      </div>
    </div>
  );
}
