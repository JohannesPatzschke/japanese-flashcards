import React from 'react';
import ReactDOM from 'react-dom/client';
import Flashcards from './pages/Flashcards.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Flashcards />
  </React.StrictMode>,
);
