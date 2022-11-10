import React from 'react';

import { Text, Heading, Box, HStack, IconButton, Icon, Button, VStack } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, doc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useCollection } from '../hooks/database';

export const FollowRequests = () => {
  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';

  const followRequestsRef = collection(database, 'users', userID, 'followRequests');
  const followRequests = useCollection(followRequestsRef);

  const Accept = async(requesterUserID: string) => {
    //await setDoc(doc(collection(database, 'users', requesterUserID, 'following')), { userID: userID });
    await updateDoc(doc(database, 'users', requesterUserID), { following: arrayUnion(userID) });
  };

  const Decline = async(requesterDocID: string) => { await deleteDoc(doc(database, 'users', userID, 'followRequests', requesterDocID)); };

  return (
    <Box mt='6' p={4}>
      <Heading size='md'>Follow requests</Heading>
      <VStack space={4}>
      {
        followRequests?.map((request) =>
          <HStack borderBottomWidth='1' justifyContent='space-between' key={request.id}>
            <Text>{request.userID}</Text>

            <Button.Group isAttached={true} size='lg'>
              <IconButton
                colorScheme='green'
                icon={<Icon as={Ionicons} name='checkmark' color='green.500'/>}
                onPress={() => Accept(request.userID)}
              />

              <IconButton
                colorScheme='red'
                icon={<Icon as={Ionicons} name='remove' color='red.500'/>}
                onPress={() => Decline(request.id)}
              />
            </Button.Group>
          </HStack>
        )
      }
      </VStack>
    </Box>
  );
};