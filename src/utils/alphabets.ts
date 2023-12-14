import hiragana from '../assets/hiragana.json';
import katakana from '../assets/katakana.json';
import groupBy from './groupBy';

export type Card = ((typeof hiragana)[0] | (typeof katakana)[0]) & { alphabet: string };

export type Alphabet = {
  name: string;
  sets: {
    [key: string]: Array<Card>;
  };
};

const alphabets: Array<Alphabet> = [
  {
    name: 'Hiragana',
    sets: groupBy(
      hiragana.map((card) => ({ ...card, alphabet: 'Hiragana' })),
      'type',
    ),
  },
  {
    name: 'Katakana',
    sets: groupBy(
      katakana.map((card) => ({ ...card, alphabet: 'Katakana' })),
      'type',
    ),
  },
];

export default alphabets;
