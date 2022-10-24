import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, Box, VStack, Button } from 'native-base';

import { signOut } from 'firebase/auth';

import { auth } from '../config/Firebase';

import { useAuthentication } from '../hooks/useAuthentication';

export const SettingsTab = () => {
  const { user } = useAuthentication();

  return (
    <VStack space={4} alignItems='center'>
      <Box>
        <Text>Profile {user?.email}</Text>
        <Button size='md' onPress={() => signOut(auth)}>Sign Out</Button>
      </Box>
    </VStack>
  );
};