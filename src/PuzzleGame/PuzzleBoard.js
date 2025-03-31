import React, { useState } from 'react';
import PuzzlePiece from './PuzzlePiece';
import { useNavigate } from 'react-router-dom';


const gridSize = 3;
const tileCount = gridSize * gridSize;



function PuzzleBoard({ imageUrl }) {
  const navigate = useNavigate();
  const [slots, setSlots] = useState(Array(tileCount).fill(null));

  // Shuffle pieces when puzzle loads
  const generateShuffledPieces = () => {
    const pieces = Array(tileCount - 1)
      .fill(null)
      .map((_, i) => i);
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    return pieces;
  };

  const [shuffledPieces, setShuffledPieces] = useState(generateShuffledPieces());

  const handleDrop = (index, piece) => {
    const updated = [...slots];
    const prevIndex = updated.findIndex(p => p === piece);
    if (prevIndex !== -1) updated[prevIndex] = null;
    updated[index] = piece;
    setSlots(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Drag the  pieces to the grid </h2>

      {/* Puzzle Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 100px)`,
          gridTemplateRows: `repeat(${gridSize}, 100px)`,
          gap: '4px',
          marginBottom: '2rem',
        }}
      >
        {Array(tileCount).fill(null).map((_, i) => (
          <div
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const piece = parseInt(e.dataTransfer.getData('piece'));
              handleDrop(i, piece);
            }}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#eee',
              border: '1px solid #ccc',
              position: 'relative',
            }}
          >
            {slots[i] !== null && (
              <PuzzlePiece index={slots[i]} imageUrl={imageUrl} />
            )}
          </div>
        ))}
      </div>

      {/* Piece tray (remaining draggable pieces) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          width: '340px',
          justifyContent: 'center',
        }}
      >
        {shuffledPieces
          .filter(i => !slots.includes(i))
          .map(i => (
            <PuzzlePiece key={i} index={i} imageUrl={imageUrl} />
          ))}
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#eee',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ⬅️ Back to Home
      </button>


      {/* Shuffle again button */}
      <button
        onClick={() => {
          setShuffledPieces(generateShuffledPieces());
          setSlots(Array(tileCount).fill(null));
        }}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        🔀 Shuffle Again
      </button>
    </div>
  );
}

export default PuzzleBoard;
