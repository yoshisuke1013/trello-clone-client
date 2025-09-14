import { useSetAtom } from "jotai";
import { Draggable } from "@hello-pangea/dnd";
import type { Card } from "../../../modules/cards/card.entity";
import { selectedCardIdAtom } from "../../../modules/cards/card.state";

interface SortableCardProps {
  card: Card;
}

export function SortableCard({ card }: SortableCardProps) {
  const setSelectedCardId = useSetAtom(selectedCardIdAtom);

  return (
    <Draggable draggableId={card.id} index={card.position}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1,
          }}
        >
          <div className={`card`} onClick={() => setSelectedCardId(card.id)}>
            <div className="card-title">
              {card.completed && (
                <span className="card-check">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="#4CAF50"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </span>
              )}
              {card.title}
            </div>
            {card.dueDate != null && (
              <div className="card-badge">🕒 {card.dueDate}</div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
