import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Switch } from 'react-native';

import { theme, darkTheme, ThemeContext } from './Theme';

import { ExerciseList } from './components/ExerciseList';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <View style={styles.container}>
        <Text>Today's exercises</Text>

        <ExerciseList/>

        <Pressable
          //onPress={onPressHandler}
          style={styles.button}
        >
        </Pressable>

        <StatusBar style='auto'/>
        <Text>Dark mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode}/>
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    borderRadius: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 6
  }
});