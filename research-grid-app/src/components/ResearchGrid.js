import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ResearchCategory from './ResearchCategory';
import './ResearchGrid.css';

const ResearchGrid = ({ research, setResearch }) => {
  const tiers = ['I', 'II', 'III', 'IV', 'V'];

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: 'New Category', items: [] };
    setResearch([...research, newCategory]);
  };

  const updateCategoryName = (id, newName) => {
    const updatedResearch = research.map(cat =>
      cat.id === id ? { ...cat, name: newName } : cat
    );
    setResearch(updatedResearch);
  };

  return (
    <div className="research-grid-container">
      <div className="research-grid">
        <div className="grid-header">
          <div className="category-header">Categories</div>
          {tiers.map((tier) => (
            <div key={tier} className="tier-header">
              {tier}
            </div>
          ))}
        </div>
        {research.map((category) => (
          <div key={category.id} className="category-row">
            <div className="category-label">
              <h3 onClick={() => {/* Add edit functionality here */}}>{category.name}</h3>
            </div>
            {tiers.map((tier, index) => (
              <Droppable key={`${category.id}-tier-${index + 1}`} droppableId={`category-${category.id}-tier-${index + 1}`}>
                {(provided) => (
                  <div
                    className="tier-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ResearchCategory
                      category={category}
                      tier={index + 1}
                      onNameChange={(newName) => updateCategoryName(category.id, newName)}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        ))}
      </div>
      <button onClick={addCategory} className="add-category-btn">Add Category</button>
    </div>
  );
};

export default ResearchGrid;