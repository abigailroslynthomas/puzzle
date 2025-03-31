// PuzzleGame/index.js
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PuzzleBoard from './PuzzleBoard';

export default function PuzzleGame() {
  const [searchParams] = useSearchParams();
  const imageFile = searchParams.get('img') || 'dog.jpg'; // fallback default

  return (
    <DndProvider backend={HTML5Backend}>
      <PuzzleBoard imageUrl={`/${imageFile}`} />
    </DndProvider>
  );
}
