import React, { useState } from 'react';

type FlashcardProps = {
  value: string;
  meaning: string;
  onComplete: () => void;
};

const Flashcard = ({ value, meaning, onComplete }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (isFlipped) {
      setIsFlipped(false);
      onComplete();
    } else {
      setIsFlipped(true);
    }
  };

  return <button onClick={handleClick}>{isFlipped ? meaning : value}</button>;
};

export default Flashcard;
