import React, { useState } from 'react';
import { Card, CardBody, Text } from '@chakra-ui/react';

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
    <Card align="center" onClick={handleClick}>
      <CardBody>
        <Text fontSize="6xl">{isFlipped ? meaning : value}</Text>
      </CardBody>
    </Card>
  );
};

export default Flashcard;
