import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import Flashcards from './pages/Flashcards.tsx';
import { SettingsProvider } from './contexts/Settings';

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Button,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ChakraBaseProvider theme={theme}> */}
    <ChakraProvider>
      <SettingsProvider>
        <Flashcards />
      </SettingsProvider>
    </ChakraProvider>
    {/* </ChakraBaseProvider> */}
  </React.StrictMode>,
);
