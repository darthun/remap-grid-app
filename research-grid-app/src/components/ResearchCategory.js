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
      <div className="tier-column" key={tier}>
        {[1, 2].map(subcolumn => (
          <Droppable droppableId={`category-${category.id}-tier-${tier}-subcolumn-${subcolumn}`} key={subcolumn}>
            {(provided) => (
              <div className="subcolumn" ref={provided.innerRef} {...provided.droppableProps}>
                {tierItems
                  .filter(item => item.subcolumn === subcolumn)
                  .map((item, index) => (
                    <ResearchItem key={item.id} item={item} index={index} />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
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