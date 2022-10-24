import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Text, Box, VStack, Button, Icon, Input, FormControl} from 'native-base';

import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../config/Firebase';

export const SignInScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const [value, SetValue] = React.useState({
    email: '',
    password: '',
    error: ''
  });

  //TODO: Write a function to check whether or not credentials are valid
  const [isValid, SetIsValid] = React.useState(true);

  const [showPassword, SetShowPassword] = React.useState(false);

  async function SignIn()
  {
    if(!(value.email && value.password))
    {
      SetValue({ ...value, error: 'Email and password are mandatory.' });
      return;
    }

    try { await signInWithEmailAndPassword(auth, value.email, value.password); }
    catch(error) { SetValue({ ...value, error: error.message }); }
  }

  return (
    <VStack space={2} alignItems='center'>
      { value.error ?
          <Box p='6' rounded='lg' bg='error.50'>
            <Text fontWeight='semibold' color='error.700'>{value.error}</Text>
          </Box>
        : null
      }

      <FormControl isInvalid={ !value.email } w='75%' maxW='300px'>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          variant='underlined'
          placeholder='Enter email'
          value={value.email}
          onChangeText={text => SetValue({ ...value, email: text })}
        />
        { value.email ? null : <FormControl.ErrorMessage>Please enter a valid email.</FormControl.ErrorMessage>}
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
              w='1/5'
              h='full'
              onPress={() => SetShowPassword(!showPassword)}
            >
              { showPassword? 'Hide' : 'Show' }
            </Button>
          }
        />
        { value.password ? null : <FormControl.ErrorMessage>Please enter a valid password.</FormControl.ErrorMessage>}
      </FormControl>

      <Button
        variant='link'
        onPress={() => navigation.navigate('Password Reset')}
        disabled={!isValid}
      >
        Forgot password?
      </Button>

      <Button
        variant='outline'
        onPress={() => SignIn()}
        disabled={!isValid}
      >
        Sign In
      </Button>
    </VStack>
  );
};