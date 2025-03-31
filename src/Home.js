// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
  { name: 'Puppy', file: 'dog.jpg' },
  { name: 'City', file: 'city.jpg' },
  { name: 'Strawberries', file: 'strawberries.jpg' }
];

export default function Home() {
  const navigate = useNavigate();

  const handleImageClick = (file) => {
    navigate(`/puzzle?img=${file}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🧩 Choose a Puzzle</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {images.map((img) => (
          <div
            key={img.file}
            style={{
              cursor: 'pointer',
              border: '2px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              width: '150px',
              height: '150px',
              backgroundImage: `url(/${img.file})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => handleImageClick(img.file)}
            title={img.name}
          />
        ))}
      </div>
    </div>
  );
}
