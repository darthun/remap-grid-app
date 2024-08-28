import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ResearchItem from './ResearchItem';

function ResearchCategory({ category, tier }) {
  const tierItems = category.items.filter(item => item.tier === tier);

  return (
    <>
      {tierItems.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ResearchItem item={item} isDragging={snapshot.isDragging} />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}

export default ResearchCategory;