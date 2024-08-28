import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ResearchItem.css';

function ResearchItem({ item, index, categoryId }) {
  return (
    <Draggable draggableId={`${categoryId}-${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`research-item ${snapshot.isDragging ? 'is-dragging' : ''}`}
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