import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, Switch } from 'react-native';

import { NativeBaseProvider, Box } from 'native-base';

import { ExerciseList } from './components/ExerciseList';

export default function App() {  
  return (
    <NativeBaseProvider>
      <Box>
        <Text>Today's exercises</Text>

        <ExerciseList/>

        <Pressable
          //onPress={onPressHandler}
        >
        </Pressable>

        <StatusBar style='auto'/>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
});