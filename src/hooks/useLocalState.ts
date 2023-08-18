import { useState, useEffect } from 'react';

type useLocalStateReturn<T> = [T, (nextState: T) => void];

const KEY_PREFIX = 'useLocalState:';

const useLocalState = <T>(key: string, initialState: T): useLocalStateReturn<T> => {
  const prefixedKey = KEY_PREFIX + key;

  const [state, setState] = useState<T>(
    typeof localStorage.getItem(prefixedKey) === 'string'
      ? JSON.parse(localStorage.getItem(prefixedKey) as string)
      : initialState,
  );

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(state));
  }, [state, prefixedKey]);

  return [state, setState];
};

export default useLocalState;
