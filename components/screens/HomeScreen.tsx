import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { LogTab } from '../LogTab';
import { AnalyticsTab } from '../AnalyticsTab';
import { SocialTab } from '../SocialTab';
import { SettingsTab } from '../SettingsTab';

const Tab = createBottomTabNavigator();

export function HomeScreen() {
  let socialTabIconBadgeCount = 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch(route.name)
          {
            case 'Log':
              return <Icon as={Ionicons} name='journal-outline' size={size} color={color}/>;
            case 'Analytics':
              return <Icon as={Ionicons} name='analytics' size={size} color={color}/>;
            case 'Social':
              return <Icon as={Ionicons} name='people-outline' size={size} color={color}/>;
            case 'Settings':
              return <Icon as={Ionicons} name='settings-outline' size={size} color={color}/>;
          }
        }
      })}
    >
      <Tab.Screen name='Log' component={LogTab}/>
      <Tab.Screen name='Analytics' component={AnalyticsTab}/>
      <Tab.Screen name='Social' component={SocialTab} options={{ tabBarBadge: socialTabIconBadgeCount }}/>
      <Tab.Screen name='Settings' component={SettingsTab}/>
    </Tab.Navigator>
  );
}