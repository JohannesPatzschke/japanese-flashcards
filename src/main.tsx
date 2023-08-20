import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig /*ChakraBaseProvider, extendBaseTheme*/,
} from '@chakra-ui/react';
// import chakraTheme from '@chakra-ui/theme';
import Flashcards from './pages/Flashcards.tsx';
import { SettingsProvider } from './contexts/Settings';
import { GameStateProvider } from './contexts/GameState';
import './main.css';

// const { Button } = chakraTheme.components;

// const theme = extendBaseTheme({
//   config: {
//     initialColorMode: 'dark',
//     useSystemColorMode: false,
//   },
//   components: {
//     Button,
//   },
// });

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ChakraBaseProvider theme={theme}> */}
    <ChakraProvider theme={theme}>
      <SettingsProvider>
        <GameStateProvider>
          <Flashcards />
        </GameStateProvider>
      </SettingsProvider>
    </ChakraProvider>
    {/* </ChakraBaseProvider> */}
  </React.StrictMode>,
);
