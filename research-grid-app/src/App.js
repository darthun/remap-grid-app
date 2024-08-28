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
    console.log("Drag ended:", result);
    const { source, destination, draggableId } = result;
  
    if (!destination) {
      console.log("No valid destination, aborting drag operation");
      return;
    }
  
    const sourceId = source.droppableId;
    const destId = destination.droppableId;
  
    const [sourceCatId, sourceTier] = sourceId.split('-tier-');
    const [destCatId, destTier] = destId.split('-tier-');
  
    const newResearch = [...research];
  
    const sourceCategory = newResearch.find(cat => `category-${cat.id}` === sourceCatId);
    const destCategory = newResearch.find(cat => `category-${cat.id}` === destCatId);
  
    const movedItemIndex = sourceCategory.items.findIndex(item => item.id === draggableId);
    const [movedItem] = sourceCategory.items.splice(movedItemIndex, 1);
    
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
  
    console.log("Updated research:", newResearch);
    setResearch(newResearch);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!research || research.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="research-tree">
        <header className="research-header">
          <h1>EMPIRE RESEARCH</h1>
        </header>
        <ResearchGrid research={research} setResearch={setResearch} />
      </div>
    </DragDropContext>
  );
}

export default App;