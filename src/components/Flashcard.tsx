import React, { useState } from 'react';
import { Card, CardBody, Text } from '@chakra-ui/react';

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

  return (
    <Card align="center" onClick={handleClick}>
      <CardBody>
        <Text fontSize="6xl">{isFlipped ? meaning : value}</Text>
      </CardBody>
    </Card>
  );
};

export default Flashcard;
