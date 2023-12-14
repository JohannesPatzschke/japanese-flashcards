import React from 'react';
import useLocalState from '../hooks/useLocalState';
import alphabets, { Card } from '../utils/alphabets';

type Filter = {
  alphabet: string;
  types: Array<Card['type']>;
};

type SettingsProviderProps = {
  children: React.ReactNode;
};

export type Settings = {
  filter: Array<Filter>;
};

type SettingsContextProps = Settings & {
  setFilter(types: Array<Filter>): void;
};

const defaultSettings = {
  filter: alphabets.map((alphabet) => ({
    alphabet: alphabet.name,
    types: Object.keys(alphabet.sets),
  })),
};

const initialContext = {
  ...defaultSettings,
  setFilter: () => null,
};

const SettingsContext = React.createContext<SettingsContextProps>(initialContext);

const SettingsProvider = ({ children }: SettingsProviderProps): JSX.Element => {
  const [settings, setSettings] = useLocalState<Settings>('settings', defaultSettings);

  const setFilter = (filter: Array<Filter>) => {
    setSettings({ ...settings, filter: filter.length === 0 ? defaultSettings.filter : filter });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setFilter,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
