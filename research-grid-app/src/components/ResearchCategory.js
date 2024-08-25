import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ResearchItem from './ResearchItem';

function ResearchCategory({ category, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);

  if (!category) {
    return <div>Loading category...</div>;
  }

  const handleNameChange = () => {
    onNameChange(name);
    setIsEditing(false);
  };

  return (
    <div className="category">
      {isEditing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameChange}
          onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{category.name}</h2>
      )}
      <Droppable droppableId={`category-${category.id}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {category.items && category.items.map((item, index) => (
              <ResearchItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ResearchCategory;