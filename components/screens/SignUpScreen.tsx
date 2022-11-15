import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Text, Box, VStack, Button, Icon, Input, FormControl} from 'native-base';

import { doc, setDoc } from 'firebase/firestore';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, database } from '../../config/Firebase';

export const SignUpScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const [value, SetValue] = React.useState({
    email: '',

    password: '',
    showPassword: false,

    confirmPassword: '',
    showConfirmPassword: false,

    error: ''
  });

  //TODO: Write a function to check whether or not credentials are valid
  const [isValid, SetIsValid] = React.useState(true);

  async function SignUp() {
    if(!(value.email && value.password))
    {
      SetValue({ ...value, error: 'Email and password are mandatory.' });
      return;
    }

    try
    {
      await createUserWithEmailAndPassword(auth, value.email, value.password);

      const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
      await setDoc(doc(database, 'users', userID), {
        expoPushTokens: [],
        following: [],
        oneRepMax: {}
      });
    }
    catch(error)
    {
      //TODO: switch statement on errorCode
      /*
      switch(error.message)
      {
        case('auth/weak-password')
        {

        }
      }
      */
      SetValue({ ...value, error: error.message });
    }
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
          type={ value.showPassword ? 'text' : 'password' }
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
              onPress={() => SetValue({...value, showPassword: !value.showPassword})}
            >
              { value.showPassword ? 'Hide' : 'Show' }
            </Button>
          }
        />
        { value.password ? null : <FormControl.ErrorMessage>Please enter a valid password.</FormControl.ErrorMessage>}
      </FormControl>

      <FormControl isInvalid={ value.password !== value.confirmPassword } w='75%' maxW='300px'>
        <FormControl.Label>Confirm password</FormControl.Label>
        <Input
          type={ value.showConfirmPassword ? 'text' : 'password' }
          variant='underlined'
          placeholder='Confirm password'
          value={value.confirmPassword}
          onChangeText={text => SetValue({ ...value, confirmPassword: text })}
          InputRightElement= {
            <Button
              size='xs'
              variant='outline'
              w='1/5'
              h='full'
              onPress={() => SetValue({...value, showConfirmPassword: !value.showConfirmPassword})}
            >
              { value.showConfirmPassword ? 'Hide' : 'Show' }
            </Button>
          }
        />
        { value.password === value.confirmPassword ? null : <FormControl.ErrorMessage>Passwords must match.</FormControl.ErrorMessage>}
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