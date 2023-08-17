import React, { useState } from 'react';
import Flashcard from '../components/Flashcard';
import FilterBox from '../components/FilterBox';
import { shuffleArray } from '../utils/shuffle';
import hiragana from '../assets/hiragana.json';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState(shuffleArray(hiragana));

  const card = cards[currentCard];

  const handleFilter = (types: Array<string>) => {
    setCurrentCard(0);

    const filteredCards =
      types.length === 0 ? hiragana : hiragana.filter((card) => types.includes(card.type));

    setCards(shuffleArray(filteredCards));
  };

  const next = () => {
    setCurrentCard((currentCard + 1) % cards.length);
  };

  const newRun = () => {
    setCurrentCard(0);
    setCards(shuffleArray(cards));
  };

  return (
    <div>
      <h1>Flashcards</h1>
      <Flashcard key={currentCard} value={card.kana} meaning={card.roumaji} onComplete={next} />
      <br />
      <div>
        completed {currentCard}/{cards.length}
      </div>
      <FilterBox onFilter={handleFilter} />
      <br />
      <button onClick={newRun}>New</button>
    </div>
  );
};

export default Flashcards;
