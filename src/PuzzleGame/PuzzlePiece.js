import React from 'react';
import { motion } from 'framer-motion';

const gridSize = 3;
const tileSize = 100;

export default function PuzzlePiece({ index, imageUrl }) {
  const x = (index % gridSize) * tileSize;
  const y = Math.floor(index / gridSize) * tileSize;

  const handleDragStart = (e) => {
    e.dataTransfer.setData('piece', index);
  };

  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
