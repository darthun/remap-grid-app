import React from 'react';
import './ResearchItem.css';

function ResearchItem({ item, isDragging }) {
  return (
    <div className={`research-item ${isDragging ? 'is-dragging' : ''}`}>
      {item.image && <img src={item.image} alt={item.name} />}
      <p>{item.name}</p>
    </div>
  );
}

export default ResearchItem;