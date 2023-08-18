import React from 'react';
import useLocalState from '../hooks/useLocalState';
import hiragana from '../assets/hiragana.json';

const types = hiragana.reduce<Record<string, typeof hiragana>>((acc, card) => {
  if (!acc[card.type]) {
    acc[card.type] = [card];
  } else {
    acc[card.type].push(card);
  }

  return acc;
}, {});

type SettingsProviderProps = {
  children: React.ReactNode;
};

type Settings = {
  filter: Array<string>;
};

type SettingsContextProps = Settings & {
  types: Record<string, typeof hiragana>;
  setFilter(types: Array<string>): void;
};

const defaultSettings = {
  filter: Object.keys(types),
};

const initialContext = {
  ...defaultSettings,
  types,
  setFilter: () => null,
};

const SettingsContext = React.createContext<SettingsContextProps>(initialContext);

const SettingsProvider = ({ children }: SettingsProviderProps): JSX.Element => {
  const [settings, setSettings] = useLocalState<Settings>('settings', defaultSettings);

  const setFilter = (filter: Array<string>) => {
    setSettings({ ...settings, filter });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        types,
        setFilter,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
