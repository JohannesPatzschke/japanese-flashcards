import React, { useState } from 'react';
import hiragana from '../assets/hiragana.json';

const types = [...new Set(hiragana.map((card) => card.type))];

type FilterBoxProps = {
  onFilter: (types: Array<string>) => void;
};

const FilterBox = ({ onFilter }: FilterBoxProps) => {
  const [selectedTypes, setSelectedTypes] = useState<Array<string>>(types);

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
      {types.map((type) => {
        return (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              defaultChecked={selectedTypes.includes(type)}
              onChange={onChange}
            />
            {type}
          </label>
        );
      })}
    </div>
  );
};

export default FilterBox;
