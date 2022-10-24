import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Text, VStack, Button } from 'native-base';

export const WelcomeScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  return (
    <VStack space={2} alignItems='center'>
      <Text fontSize='lg'>Welcome!</Text>
      <Button onPress={() => navigation.navigate('Sign In')}>Sign In</Button>
      <Button variant='outline' onPress={() => navigation.navigate('Sign Up')}>Sign Up</Button>
    </VStack>
  );
};