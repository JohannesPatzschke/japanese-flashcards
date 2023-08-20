import { useContext } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  CheckboxGroup,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { SettingsContext } from '../contexts/Settings';

type FilterBoxProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FilterBox = ({ isOpen, onClose }: FilterBoxProps) => {
  const { types, filter, setFilter } = useContext(SettingsContext);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Select types</DrawerHeader>

        <DrawerBody>
          <CheckboxGroup colorScheme="green" defaultValue={filter} onChange={setFilter}>
            <Stack direction="column">
              {Object.entries(types).map(([type, cards]) => (
                <Checkbox key={type} value={type}>
                  <b>{type}</b> (e.g.{' '}
                  {cards
                    .slice(0, 3)
                    .map((card) => card.kana)
                    .join(', ')}
                  )
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterBox;
