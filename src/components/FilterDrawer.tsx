import { useContext, useMemo, Fragment } from 'react';
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
  Heading,
} from '@chakra-ui/react';
import { SettingsContext } from '../contexts/Settings';
import alphabets, { Alphabet } from '../utils/alphabets';
import groupBy from '../utils/groupBy';

type FilterBoxProps = {
  isOpen: boolean;
  onClose: () => void;
};

function toCheckboxValue(alphabet: Alphabet['name'], type: string) {
  return `${alphabet}:${type}`;
}

function toFilterValue(value: string) {
  const [alphabet, type] = value.split(':');

  return { alphabet, type };
}

const FilterBox = ({ isOpen, onClose }: FilterBoxProps) => {
  const { filter, setFilter } = useContext(SettingsContext);

  const handleFilterChange = (checkedValues: Array<string>) => {
    const values = checkedValues.map(toFilterValue);

    const alphabets = Object.entries(groupBy(values, 'alphabet')).map(([alphabet, types]) => ({
      alphabet,
      types: types.map(({ type }) => type),
    }));

    setFilter(alphabets);
  };

  const defaultValue = useMemo(() => {
    return filter
      .map(({ alphabet, types }) => types.map((type) => toCheckboxValue(alphabet, type)))
      .flat();
  }, [filter]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Select sets and types</DrawerHeader>

        <DrawerBody>
          <CheckboxGroup
            colorScheme="green"
            defaultValue={defaultValue}
            onChange={handleFilterChange}
          >
            {alphabets.map((alphabet) => (
              <Fragment key={alphabet.name}>
                <Heading as="h4" size="md" mb={3}>
                  {alphabet.name}
                </Heading>
                <Stack direction="column" mb={5} ml={3}>
                  {Object.entries(alphabet.sets).map(([type, cards]) => (
                    <Checkbox
                      key={toCheckboxValue(alphabet.name, type)}
                      value={toCheckboxValue(alphabet.name, type)}
                    >
                      <b>{type}</b> (e.g.{' '}
                      {cards
                        .slice(0, 3)
                        .map((card) => card.kana)
                        .join(', ')}
                      )
                    </Checkbox>
                  ))}
                </Stack>
              </Fragment>
            ))}
          </CheckboxGroup>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterBox;
