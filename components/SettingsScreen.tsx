import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, Box, HStack, VStack, Button } from 'native-base';

export const SettingsScreen = () => {
  return (
    <VStack>
      <Text>Weight unit</Text>
      <Text>Goal reminders</Text>
      <Text>Auto-share workout</Text>
    </VStack>
  );
};