import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NativeBaseProvider, extendTheme } from 'native-base';

import { SettingsScreen } from './components/SettingsScreen';
import { ExerciseList } from './components/ExerciseList';

const Tab = createBottomTabNavigator();

export default function App() {
  const theme = extendTheme({
    config: {
      //initialColorMode: 'dark'
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Log" component={ExerciseList}/>
          <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}