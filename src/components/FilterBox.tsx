import React, { useState } from 'react';
import hiragana from '../assets/hiragana.json';

const types = hiragana.reduce<Record<string, typeof hiragana>>((acc, card) => {
  if (!acc[card.type]) {
    acc[card.type] = [card];
  } else {
    acc[card.type].push(card);
  }

  return acc;
}, {});

type FilterBoxProps = {
  onFilter: (types: Array<string>) => void;
};

const FilterBox = ({ onFilter }: FilterBoxProps) => {
  const [selectedTypes, setSelectedTypes] = useState<Array<string>>(Object.keys(types));

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = target;

    const nextValues = checked
      ? [...selectedTypes, value]
      : selectedTypes.filter((t) => t !== value);

    setSelectedTypes(nextValues);
    onFilter(nextValues);
  };

  return (
    <div>
      {Object.entries(types).map(([type, cards]) => {
        return (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              defaultChecked={selectedTypes.includes(type)}
              onChange={onChange}
            />
            {type} (e.g.{' '}
            {cards
              .slice(0, 3)
              .map((card) => card.kana)
              .join(', ')}
            )
          </label>
        );
      })}
    </div>
  );
};

export default FilterBox;
