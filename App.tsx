import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { NativeBaseProvider, extendTheme } from 'native-base';

import Index from './components/Index';

export default function App() {
  const theme = extendTheme({
    config: {
      //initialColorMode: 'dark'
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Index/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}