import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ResearchItem from './ResearchItem';

function ResearchCategory({ category, tiers, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const handleNameChange = () => {
    onNameChange(name);
    setIsEditing(false);
  };

  const renderTierItems = (tier) => {
    const tierNumber = tiers.indexOf(tier) + 1;
    const tierItems = category.items.filter(item => item.tier === tierNumber);
    return (
      <Droppable droppableId={`category-${category.id}-tier-${tierNumber}`} key={tier}>
        {(provided) => (
          <div className="tier-column" ref={provided.innerRef} {...provided.droppableProps}>
            {tierItems.map((item, index) => (
              <ResearchItem key={item.id} item={item} index={index} categoryId={category.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <div className="category-row">
      <div className="category-label">
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameChange}
            onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
            autoFocus
          />
        ) : (
          <h3 onClick={() => setIsEditing(true)}>{category.name}</h3>
        )}
      </div>
      {tiers.map(renderTierItems)}
    </div>
  );
}

export default ResearchCategory;