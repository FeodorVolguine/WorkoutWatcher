import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../hooks/useAuthentication';

import { HomeScreen } from './screens/HomeScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { PasswordResetScreen } from './screens/PasswordResetScreen';

const Stack = createNativeStackNavigator();

export default function Index() {
  const { user } = useAuthentication();
  
  return (
    <Stack.Navigator>
      { user ? (
          <Stack.Screen name='Home' component={HomeScreen}/>
        ) : (
          <>
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
            <Stack.Screen name='Sign In' component={SignInScreen}/>
            <Stack.Screen name='Sign Up' component={SignUpScreen}/>
            <Stack.Screen name='Password Reset' component={PasswordResetScreen}/>
          </>
        )
      }
    </Stack.Navigator>
  );
}