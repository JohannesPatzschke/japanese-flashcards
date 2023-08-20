import React, { useState, useContext } from 'react';
import Flashcard from '../components/Flashcard';
import FilterDrawer from '../components/FilterDrawer';
import CompletedModal from '../components/CompletedModal';
import {
  Button,
  IconButton,
  Progress,
  useDisclosure,
  Flex,
  Spacer,
  Center,
  Box,
} from '@chakra-ui/react';
import { RepeatIcon, SettingsIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
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
    <Flex p="2" flexDirection="column" h="100%">
      <CompletedModal isOpen={completed} />
      <FilterDrawer isOpen={drawerIsOpen} onClose={closeDrawer} />
      <Box>
        <Flex>
          <Button
            leftIcon={<RepeatIcon />}
            colorScheme="green"
            variant="solid"
            onClick={() => newGame()}
          >
            New
          </Button>

          <Spacer />

          <IconButton aria-label="open-settings" icon={<SettingsIcon />} onClick={openDrawer} />
        </Flex>
      </Box>
      <Spacer />
      <Box>
        <Flashcard
          key={`${startedAt}_${currentCard}`}
          value={card.kana}
          meaning={card.roumaji}
          onFlipped={handleFlip}
        />
        <br />
        <Center>
          <IconButton
            aria-label="wrong-answer"
            colorScheme="red"
            variant="outline"
            size="lg"
            m="2"
            minWidth={150}
            icon={<CloseIcon />}
            isDisabled={!wasFlipped}
            onClick={() => handleNext(true)}
          />
          <IconButton
            aria-label="correct-answer"
            colorScheme="green"
            variant="outline"
            size="lg"
            minWidth={150}
            m="2"
            icon={<CheckIcon />}
            isDisabled={!wasFlipped}
            onClick={() => handleNext(false)}
          />
        </Center>
      </Box>
      <Spacer />
      <Box>
        <Progress size="sm" colorScheme="green" value={(completedCards * 100) / cards.length} />
        <Center>
          <b>
            {completedCards}/{cards.length}
          </b>
        </Center>
      </Box>
    </Flex>
  );
};

export default Flashcards;
