import React, { useState, useEffect } from 'react';
import ResearchCategory from './ResearchCategory';
import './ResearchGrid.css';

const ResearchGrid = ({ research, setResearch }) => {
  const [categories, setCategories] = useState([]);
  const tiers = ['I', 'II', 'III', 'IV', 'V'];

  useEffect(() => {
    if (research && research.length > 0) {
      setCategories(research);
    }
  }, [research]);

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: 'New Category', items: [] };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setResearch(updatedCategories);
  };

  const updateCategoryName = (id, newName) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, name: newName } : cat
    );
    setCategories(updatedCategories);
    setResearch(updatedCategories);
  };

  if (!categories || categories.length === 0) {
    return <div>Loading research data...</div>;
  }

  return (
    <div className="research-grid">
      <div className="research-tiers">
        {tiers.map((tier) => (
          <div key={tier} className="research-tier">
            <h2>{tier}</h2>
            <div className="tier-columns">
              <div className="tier-column"></div>
              <div className="tier-column"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="research-categories">
        {categories.map((category) => (
          <ResearchCategory
            key={category.id}
            category={category}
            onNameChange={(newName) => updateCategoryName(category.id, newName)}
          />
        ))}
      </div>
      <button onClick={addCategory} className="add-category-btn">Add Category</button>
    </div>
  );
};

export default ResearchGrid;