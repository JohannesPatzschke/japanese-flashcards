import { useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react';
import { TimeIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { GameStateContext } from '../contexts/GameState';

type FilterBoxProps = {
  isOpen: boolean;
};

function timeSince(date: number) {
  const seconds = Math.floor((Date.now() - date) / 1000);
  const minutes = Math.floor(seconds / 60);

  return `${minutes}:${seconds % 60}`;
}

const CompletedModal = ({ isOpen }: FilterBoxProps) => {
  const { gameState, newGame, replayMistakes } = useContext(GameStateContext);
  const { startedAt, completedCards, faultyCards, cards } = gameState;

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Completed</ModalHeader>

        <ModalBody pb={6}>
          Congratulation! You completed {cards.length} cards.
          <br />
          <br />
          <HStack spacing={4}>
            <Tag size="lg" variant="subtle" colorScheme="blue">
              <TagLeftIcon boxSize="12px" as={TimeIcon} />
              <TagLabel>{timeSince(startedAt)}</TagLabel>
            </Tag>
            <Tag size="lg" variant="subtle" colorScheme="red">
              <TagLeftIcon boxSize="12px" as={CloseIcon} />
              <TagLabel>{faultyCards.length}</TagLabel>
            </Tag>
            <Tag size="lg" variant="subtle" colorScheme="green">
              <TagLeftIcon boxSize="12px" as={CheckIcon} />
              <TagLabel>
                {Math.round(((completedCards - faultyCards.length) * 100) / completedCards)} %
              </TagLabel>
            </Tag>
          </HStack>
          <br />
          Do you want to start a <b>new game</b> or <b>replay your mistakes?</b>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={faultyCards.length === 0}
            mr={3}
            colorScheme="blue"
            onClick={replayMistakes}
          >
            Replay
          </Button>
          <Button colorScheme="blue" onClick={() => newGame()}>
            New
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CompletedModal;
