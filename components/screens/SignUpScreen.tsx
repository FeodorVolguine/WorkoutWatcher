import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Text, Box, VStack, Button, Icon, Input, FormControl} from 'native-base';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../config/Firebase';

export const SignUpScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const [value, SetValue] = React.useState({
    email: '',
    password: '',
    error: ''
  });

  //TODO: Write a function to check whether or not credentials are valid
  const [isValid, SetIsValid] = React.useState(true);

  const [showPassword, SetShowPassword] = React.useState(false);

  async function SignUp() {
    if(!(value.email && value.password))
    {
      SetValue({ ...value, error: 'Email and password are mandatory.' });
      return;
    }

    try
    {
      await createUserWithEmailAndPassword(auth, value.email, value.password);

      navigation.navigate('Sign In');
    }
    catch(error) { SetValue({ ...value, error: error.message }); }
  }

  return (
    <VStack space={2} alignItems='center'>
      { value.error &&
        <Box p='6' rounded='lg' bg='error.50'>
          <Text fontWeight='semibold' color='error.700'>{value.error}</Text>
        </Box>
      }

      <FormControl isInvalid={ !value.email } w='75%' maxW='300px'>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          variant='underlined'
          placeholder='Enter email'
          value={value.email}
          onChangeText={text => SetValue({ ...value, email: text })}
        />
        { !value.email && <FormControl.ErrorMessage>Please enter a valid email.</FormControl.ErrorMessage>}
      </FormControl>
      
      <FormControl isInvalid={ !value.password } w='75%' maxW='300px'>
        <FormControl.Label>Password</FormControl.Label>
        <Input
          type={ showPassword ? 'text' : 'password' }
          variant='underlined'
          placeholder='Enter password'
          value={value.password}
          onChangeText={text => SetValue({ ...value, password: text })}
          InputRightElement= {
            <Button
              size='xs'
              variant='outline'
              w='1/6'
              h='full'
              onPress={() => SetShowPassword(!showPassword)}
            >
              { showPassword? 'Hide' : 'Show' }
            </Button>
          }
        />
        { !value.password && <FormControl.ErrorMessage>Please enter a valid password.</FormControl.ErrorMessage>}
      </FormControl>

      <Button
        variant='outline'
        onPress={() => SignUp()}
        disabled={!isValid}
      >
        Sign Up
      </Button>
    </VStack>
  );
};