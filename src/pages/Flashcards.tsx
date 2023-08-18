import React, { useState, useEffect, useContext } from 'react';
import Flashcard from '../components/Flashcard';
import FilterDrawer from '../components/FilterDrawer';
import { shuffleArray } from '../utils/shuffle';
import hiragana from '../assets/hiragana.json';
import { Button, IconButton, Progress, useDisclosure } from '@chakra-ui/react';
import { RepeatIcon, SettingsIcon } from '@chakra-ui/icons';
import { SettingsContext } from '../contexts/Settings';

const Flashcards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCard, setCurrentCard] = useState(0);
  const { filter } = useContext(SettingsContext);
  const [cards, setCards] = useState(shuffleArray(hiragana));

  const card = cards[currentCard];

  useEffect(() => {
    setCurrentCard(0);

    const filteredCards =
      filter.length === 0 ? hiragana : hiragana.filter((card) => filter.includes(card.type));

    setCards(shuffleArray(filteredCards));
  }, [filter]);

  const next = () => {
    setCurrentCard((currentCard + 1) % cards.length);
  };

  const newRun = () => {
    setCurrentCard(0);
    setCards(shuffleArray(cards));
  };

  return (
    <div>
      <FilterDrawer isOpen={isOpen} onClose={onClose} />
      <Button leftIcon={<RepeatIcon />} colorScheme="teal" variant="solid" onClick={newRun}>
        New
      </Button>
      <IconButton aria-label="Search database" icon={<SettingsIcon />} onClick={onOpen} />
      <br />
      <br />
      <Flashcard key={currentCard} value={card.kana} meaning={card.roumaji} onComplete={next} />
      <br />
      <br />
      <Progress size="sm" colorScheme="pink" value={(currentCard * 100) / cards.length} />
      <div>
        {currentCard}/{cards.length}
      </div>
    </div>
  );
};

export default Flashcards;
