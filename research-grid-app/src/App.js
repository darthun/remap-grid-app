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
  
    if (!destination) {
      return;
    }
  
    const sourceId = source.droppableId;
    const destId = destination.droppableId;
  
    const [sourceCatId, sourceTier] = sourceId.split('-tier-');
    const [destCatId, destTier] = destId.split('-tier-');
  
    const newResearch = [...research];
  
    const sourceCategory = newResearch.find(cat => `category-${cat.id}` === sourceCatId);
    const destCategory = newResearch.find(cat => `category-${cat.id}` === destCatId);
  
    const [movedItem] = sourceCategory.items.splice(source.index, 1);
    
    if (parseInt(sourceTier) !== parseInt(destTier)) {
      movedItem.tier = parseInt(destTier);
    }
  
    if (sourceCategory === destCategory) {
      destCategory.items.splice(destination.index, 0, movedItem);
    } else {
      const insertIndex = destCategory.items.findIndex(item => item.tier > parseInt(destTier));
      const newIndex = insertIndex === -1 ? destCategory.items.length : insertIndex;
      destCategory.items.splice(newIndex, 0, movedItem);
    }
  
    setResearch(newResearch);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!research || research.length === 0) {
    return <div>Loading...</div>;
  }

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