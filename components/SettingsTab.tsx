import React from 'react';

import { useColorMode, Text, Heading, Box, HStack, VStack, Divider, Button, Switch } from 'native-base';

import { signOut } from 'firebase/auth';

import { auth } from '../config/Firebase';

import { useAuthentication } from '../hooks/useAuthentication';

const SwitchOption = () => {
  return (
    <HStack space={4}>
      <Text>Allow followers to view your stats</Text>
      <Switch size='md'/>
    </HStack>
  );
};

export const SettingsTab = () => {
  const { user } = useAuthentication();

  const { toggleColorMode } = useColorMode();

  return (
    <VStack maxW='2xl' alignSelf='center' alignItems='flex-start' space={4}>
      <Box>
        <Heading>Profile</Heading>
        <Text>Logged in as {user?.email}</Text>
        <Button size='md' onPress={() => signOut(auth)}>Sign Out</Button>
      </Box>
      <Divider/>
      <Box>
        <Heading>Appearance</Heading>
        <HStack space={4}>
          <Text>Dark mode</Text>
          <Switch size='md' defaultIsChecked={true} onToggle={toggleColorMode}/>
        </HStack>
      </Box>
      <Divider/>
      <Box>
        <Heading>Privacy</Heading>
        <HStack space={4}>
          <Text>Follow requests must be approved</Text>
          <Switch size='md'/>
        </HStack>
        <HStack space={4}>
          <Text>Allow followers to view your progress</Text>
          <Switch size='md'/>
        </HStack>
      </Box>
    </VStack>
  );
};