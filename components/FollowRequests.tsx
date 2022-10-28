import React from 'react';

import { Text, Heading, Box, HStack, FlatList, IconButton, Icon, Button } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useCollection } from '../hooks/database';

export const FollowRequests = () => {
  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';

  const followRequestsRef = collection(database, 'users', userID, 'followRequests');
  const followRequests = useCollection(followRequestsRef);

  const Accept = async(requesterDocID: string, requesterUserID: string) => {
    await setDoc(doc(collection(database, 'users', requesterUserID, 'following')), { userID: userID });
  };

  const Decline = async(requesterDocID: string) => { await deleteDoc(doc(database, 'users', userID, 'followRequests', requesterDocID)); };

  return (
    <Box alignSelf='center'>
      <Heading mt='4' size='md'>Follow requests</Heading>
      <FlatList
        data={followRequests}
        renderItem={({ item }) =>
        <HStack borderBottomWidth='1' justifyContent='space-between' alignItems='center'>
          <Text>{item.userID}</Text>

          <Button.Group isAttached={true} size='lg'>
            <IconButton
              colorScheme='green'
              icon={<Icon as={Ionicons} name='checkmark' color='green.500'/>}
              onPress={() => Accept(item.id, item.userID)}
            />

            <IconButton
              colorScheme='red'
              icon={<Icon as={Ionicons} name='remove' color='red.500'/>}
              onPress={() => Decline(item.id)}
            />
          </Button.Group>
        </HStack>
        }
      />
    </Box>
  );
};