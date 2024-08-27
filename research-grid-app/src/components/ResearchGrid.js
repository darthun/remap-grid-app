import React from 'react';
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
          <ResearchCategory
            key={category.id}
            category={category}
            tiers={tiers}
            onNameChange={(newName) => updateCategoryName(category.id, newName)}
          />
        ))}
      </div>
      <button onClick={addCategory} className="add-category-btn">Add Category</button>
    </div>
  );
};

export default ResearchGrid;