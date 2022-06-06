import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch } from 'react-native';

import { theme, darkTheme, ThemeContext } from './Theme';

import Area from './components/Area';
import Text from './components/Text';

import { List } from './components/List';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <Area padding='l' color='background' style={styles.container}>
        <Text variant='header' color='secondary'>Today's exercises</Text>

        <List/>

        <Pressable
          //onPress={onPressHandler}
          style={styles.button}
        >
        </Pressable>

        <StatusBar style='auto'/>
        <Text color='onBackground'>Dark mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode}/>
      </Area>
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