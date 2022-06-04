import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { theme, darkTheme, ThemeContext } from './Theme';

import Box from './components/Box';
import Text from './components/Text';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <Box style={styles.container}>
        <Text variant="header" color="primary">Hello</Text>

        <Pressable
          //onPress={onPressHandler}
          style={styles.button}
        >
        </Pressable>

        <StatusBar style="auto"/>
        <Switch value={darkMode} onValueChange={setDarkMode}/>
      </Box>
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