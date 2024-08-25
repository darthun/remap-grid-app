import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ResearchGrid from './components/ResearchGrid';
import researchData from './data/research.json';
import './App.css';

function App() {
  const [research, setResearch] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log("Loading research data:", researchData);
      setResearch(researchData);
    } catch (err) {
      console.error("Error loading research data:", err);
      setError("Failed to load research data");
    }
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    // Moving within the same category
    if (sourceId === destId) {
      const category = research.find(cat => `category-${cat.id}` === sourceId);
      const newItems = Array.from(category.items);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);

      const newResearch = research.map(cat =>
        cat.id === category.id ? { ...cat, items: newItems } : cat
      );

      setResearch(newResearch);
    } else {
      // Moving between categories
      const sourceCategory = research.find(cat => `category-${cat.id}` === sourceId);
      const destCategory = research.find(cat => `category-${cat.id}` === destId);

      const sourceItems = Array.from(sourceCategory.items);
      const destItems = Array.from(destCategory.items);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      const newResearch = research.map(cat => {
        if (cat.id === sourceCategory.id) {
          return { ...cat, items: sourceItems };
        }
        if (cat.id === destCategory.id) {
          return { ...cat, items: destItems };
        }
        return cat;
      });

      setResearch(newResearch);
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if ( !research || research.length === 0) {
    return <div>Loading...</div>;
  }

  console.log("Current research state:", research);

  return (
    <div className="research-tree">
      <header className="research-header">
        <h1>EMPIRE RESEARCH</h1>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <ResearchGrid research={research} setResearch={setResearch} />
      </DragDropContext>
    </div>
  );
}

export default App;