import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ResearchItem.css';

function ResearchItem({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="research-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.image && <img src={item.image} alt={item.name} />}
          <p>{item.name}</p>
        </div>
      )}
    </Draggable>
  );
}

export default ResearchItem;