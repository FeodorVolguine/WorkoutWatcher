import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, Box, HStack, VStack, Switch, Radio } from 'native-base';

export const SettingsTab = () => {
  const [weightUnit, SetWeightUnit] = useState('lb');

  return (
    <VStack>
      <Text fontSize='lg'>Weight unit</Text>
      <Radio.Group
        name='weightUnitSelection'
        accessibilityLabel='Preferred weight unit'
        value={weightUnit}
        onChange={unit => { SetWeightUnit(unit); }}
      >
        <Radio value='lb'>
          lb
        </Radio>
        <Radio value='kg'>
          kg
        </Radio>
      </Radio.Group>

      <HStack alignItems='center' space={8}>
        <Text fontSize='lg'>Auto-share workout</Text>
        <Switch/>
      </HStack>

      <HStack alignItems='center' space={8}>
        <Text fontSize='lg'>Goal reminders</Text>
        <Switch/>
      </HStack>
    </VStack>
  );
};