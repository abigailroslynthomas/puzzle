// PuzzleGame/PuzzlePiece.js
import React from 'react';

const gridSize = 3;
const tileSize = 100;

export default function PuzzlePiece({ index, imageUrl }) {
  const x = (index % gridSize) * tileSize;
  const y = Math.floor(index / gridSize) * tileSize;

  const handleDragStart = (e) => {
    e.dataTransfer.setData('piece', index);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${gridSize * tileSize}px ${gridSize * tileSize}px`,
        backgroundPosition: `-${x}px -${y}px`,
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'grab',
        boxSizing: 'border-box',
      }}
    />
  );
}
