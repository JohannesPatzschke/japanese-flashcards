import { useState } from 'react';
import { Card, Text } from '@chakra-ui/react';

type FlashcardProps = {
  value: string;
  meaning: string;
  leftNote?: string;
  rightNote?: string;
  onFlipped: (status: boolean) => void;
};

const Flashcard = ({ value, meaning, leftNote, rightNote, onFlipped }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [wasFlipped, setWasFlipped] = useState(false);

  const handleClick = () => {
    onFlipped(!isFlipped);
    setIsFlipped(!isFlipped);
    setWasFlipped(true);
  };

  return (
    <Card align="center" justifyContent="center" onClick={handleClick} height={300}>
      {leftNote && wasFlipped ? (
        <Text fontSize="lg" position="absolute" left={3} top={3}>
          {leftNote}
        </Text>
      ) : null}
      {rightNote && wasFlipped ? (
        <Text fontSize="lg" position="absolute" right={3} top={3}>
          {rightNote}
        </Text>
      ) : null}
      <Text fontSize="9xl">{isFlipped ? meaning : value}</Text>
    </Card>
  );
};

export default Flashcard;
