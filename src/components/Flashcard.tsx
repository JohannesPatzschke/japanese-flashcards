import React, { useState } from 'react';
import { Card, Text } from '@chakra-ui/react';

type FlashcardProps = {
  value: string;
  meaning: string;
  onFlipped: (status: boolean) => void;
};

const Flashcard = ({ value, meaning, onFlipped }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    onFlipped(!isFlipped);
    setIsFlipped(!isFlipped);
  };

  return (
    <Card align="center" justifyContent="center" onClick={handleClick} height={300}>
      <Text fontSize="9xl">{isFlipped ? meaning : value}</Text>
    </Card>
  );
};

export default Flashcard;
