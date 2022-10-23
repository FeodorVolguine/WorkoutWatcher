import React from 'react';

import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NativeBaseProvider, extendTheme, Icon } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { LogScreen } from './components/LogScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { SocialScreen } from './components/SocialScreen';
import { SettingsScreen } from './components/SettingsScreen';

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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              switch(route.name)
              {
                case 'Log':
                  return <Icon as={Ionicons} name='journal' size={size} color={color}/>;
                case 'Analytics':
                  return <Icon as={Ionicons} name='analytics' size={size} color={color}/>;
                case 'Social':
                  return <Icon as={Ionicons} name='md-people' size={size} color={color}/>;
                case 'Settings':
                  return <Icon as={Ionicons} name='settings' size={size} color={color}/>;
              }
            }
          })}
        >
          <Tab.Screen name='Log' component={LogScreen}/>
          <Tab.Screen name='Analytics' component={AnalyticsScreen}/>
          <Tab.Screen name='Social' component={SocialScreen}/>
          <Tab.Screen name='Settings' component={SettingsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}