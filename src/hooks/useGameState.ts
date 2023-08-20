import React, { useContext, useState, useCallback } from 'react';
import { SettingsContext } from '../contexts/Settings';
import { shuffleArray } from '../utils/shuffle';
import hiragana from '../assets/hiragana.json';

type GameState = {
  startedAt: number;
  currentCard: number;
  completedCards: number;
  faultyCards: Array<number>;
  cards: typeof hiragana;
  completed: boolean;
};

function getFilteredCards(filter: Array<string>) {
  return filter.length === 0 ? hiragana : hiragana.filter((card) => filter.includes(card.type));
}

const useGameState = () => {
  const { filter } = useContext(SettingsContext);
  const [gameState, setGameState] = useState<GameState>({
    startedAt: Date.now(),
    currentCard: 0,
    completedCards: 0,
    faultyCards: [],
    cards: shuffleArray(getFilteredCards(filter)),
    completed: false,
  });

  const next = useCallback(
    (faultyCard = false) => {
      setGameState({
        ...gameState,
        currentCard: (gameState.currentCard + 1) % gameState.cards.length,
        completedCards: gameState.completedCards + 1,
        faultyCards: faultyCard
          ? [...gameState.faultyCards, gameState.currentCard]
          : gameState.faultyCards,
        completed: gameState.currentCard === gameState.cards.length - 1,
      });
    },
    [gameState],
  );

  const newGame = useCallback(
    (cards = getFilteredCards(filter)) => {
      setGameState({
        startedAt: Date.now(),
        currentCard: 0,
        completedCards: 0,
        faultyCards: [],
        cards: shuffleArray(cards),
        completed: false,
      });
    },
    [filter],
  );

  const replayMistakes = useCallback(() => {
    if (gameState.faultyCards.length === 0) return;

    newGame(gameState.faultyCards.map((index) => gameState.cards[index]));
  }, [newGame, gameState]);

  return { gameState, next, newGame, replayMistakes };
};

export default useGameState;
