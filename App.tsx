import 'expo-dev-client';

import * as Notifications from 'expo-notifications';

import React, { ReactNode, useEffect } from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import { NativeBaseProvider, extendTheme, useTheme, useColorMode } from 'native-base';

import Index from './components/Index';

import { RegisterForPushNotifications } from './utility/RegisterForPushNotifications';
import { RegisterDevicePushToken } from './utility/RegisterDevicePushToken';

const ReactNavigationContainer = (props: { children: ReactNode }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const navigationLightTheme = {
    ...DefaultTheme,
    dark: colorMode === 'dark',
    colors: {
      primary: colors['primary'][500],
      background: colors['light'][100],
      card: colors['white'],
      text: colors['darkText'],
      border: colors['muted'][100],
      notification: colors['red'][500]
    }
  };

  const navigationDarkTheme = {
    ...DarkTheme
  }

  return (
    <NavigationContainer theme={colorMode === 'dark' ? navigationDarkTheme : navigationLightTheme}>
      {props.children}
    </NavigationContainer>
  );
};

const nativeBaseTheme = extendTheme({
  config: {
    //initialColorMode: 'dark'
  }
});

export default function App()
{
  useEffect(() => { RegisterForPushNotifications(); }, []);

  React.useEffect(() => {
    const subscription = Notifications.addPushTokenListener(RegisterDevicePushToken);
    return () => subscription.remove();
  }, []);

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <ReactNavigationContainer>
        <Index/>
      </ReactNavigationContainer>
    </NativeBaseProvider>
  );
}