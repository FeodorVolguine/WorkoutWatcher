import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Text, Box, VStack, Button, Icon, Input, FormControl, Alert } from 'native-base';

import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../config/Firebase';

export const PasswordResetScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const [value, SetValue] = React.useState({
    email: '',
    error: ''
  });

   //TODO: Write a function to check whether or not email is valid
   const [isValid, SetIsValid] = React.useState(true);

  const ResetPassword = () => {
    sendPasswordResetEmail(auth, value.email)
      .then(() => {
        <Alert status='success'>
          <Text color='success.900'>Password reset email has been sent! Please check your inbox.</Text>
        </Alert>

        navigation.navigate('Sign In');
      })
      .catch((error) => {
        SetValue({...value, error: error.message});
      });
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

      <Button
        variant='outline'
        onPress={() => ResetPassword()}
        disabled={!isValid}
      >
        Reset password
      </Button>
    </VStack>
  );
};