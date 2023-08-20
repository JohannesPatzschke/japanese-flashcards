import React, { useState, useContext } from 'react';
import Flashcard from '../components/Flashcard';
import FilterDrawer from '../components/FilterDrawer';
import CompletedModal from '../components/CompletedModal';
import { Button, IconButton, Progress, useDisclosure } from '@chakra-ui/react';
import { RepeatIcon, SettingsIcon } from '@chakra-ui/icons';
import { GameStateContext } from '../contexts/GameState';

const Flashcards = () => {
  const { isOpen: drawerIsOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const { gameState, next, newGame } = useContext(GameStateContext);
  const { startedAt, currentCard, completedCards, cards, completed } = gameState;

  const [wasFlipped, setWasFlipped] = useState(false);

  const handleNext = (faultyCard: boolean) => {
    next(faultyCard);
    setWasFlipped(false);
  };

  const handleFlip = () => {
    if (!wasFlipped) {
      setWasFlipped(true);
    }
  };

  const card = cards[currentCard];

  return (
    <div>
      <CompletedModal isOpen={completed} />
      <FilterDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />
      <Button
        leftIcon={<RepeatIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={() => newGame()}
      >
        New
      </Button>
      <IconButton aria-label="Search database" icon={<SettingsIcon />} onClick={openDrawer} />
      <br />
      <br />
      <Flashcard key={startedAt} value={card.kana} meaning={card.roumaji} onFlipped={handleFlip} />
      <br />
      <Button
        colorScheme="red"
        variant="solid"
        isDisabled={!wasFlipped}
        onClick={() => handleNext(true)}
      >
        + 0
      </Button>
      <Button
        colorScheme="green"
        variant="solid"
        isDisabled={!wasFlipped}
        onClick={() => handleNext(false)}
      >
        + 1
      </Button>
      <br />
      <br />
      <Progress size="sm" colorScheme="pink" value={(completedCards * 100) / cards.length} />
      <div>
        {completedCards}/{cards.length}
      </div>
    </div>
  );
};

export default Flashcards;
