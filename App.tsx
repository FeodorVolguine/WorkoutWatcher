import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch } from 'react-native';

import { NativeBaseProvider, extendTheme, Text, Box } from 'native-base';

import { ExerciseList } from './components/ExerciseList';

export default function App() {
  const theme = extendTheme({
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box alignSelf='center' w='sm' rounded='xl' safeArea bg='primary.500'>
        <Text fontSize='xl'>Today's exercises</Text>

        <ExerciseList/>
        
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
});