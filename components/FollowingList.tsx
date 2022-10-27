import React from 'react';

import { Text, Heading, Box, HStack, VStack, FlatList, Modal, Button, Input, FormControl } from 'native-base';

import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useCollection } from '../hooks/database';

export const FollowingList = () => {
  const [newFollowingUserID, SetNewFollowingUserID] = React.useState('');

  const [modalVisible, SetModalVisible] = React.useState(false);

  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';

  const followingRef = collection(database, 'users', userID, 'following');
  const following = useCollection(followingRef);

  const Follow = async() => {
    //TODO: Check if the user exists
    await setDoc(doc(collection(database, 'users', newFollowingUserID, 'followRequests')), { userID:  userID });
  };

  const Unfollow = async(friendDocID: string) => { await deleteDoc(doc(database, 'users', userID, 'following', friendDocID)); };

  return (
    <Box alignSelf='center'>
      <Modal
        isOpen={modalVisible}
        onClose={() => SetModalVisible(false)}
      >
        <Modal.Content>
          <Modal.CloseButton/>
          <Modal.Header>Request to follow</Modal.Header>

          <Modal.Body>
            <VStack space={6}>
              <Text fontWeight='semibold'>Your user ID: {userID}</Text>

              <FormControl>
                <FormControl.Label>Friend user ID</FormControl.Label>
                <Input
                  value={newFollowingUserID}
                  onChangeText={text => SetNewFollowingUserID(text)}
                />
              </FormControl>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant='ghost' colorScheme='blueGray' onPress={() => { SetModalVisible(false); }}>
                Cancel
              </Button>

              <Button onPress={() => {
                Follow();
                SetModalVisible(false);
                SetNewFollowingUserID('');
              }}>
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Heading mt='8' size='md'>Following</Heading>
      <FlatList
        data={following}
        renderItem={({ item }) =>
        <HStack mt='6' borderBottomWidth='1' justifyContent='space-between' alignItems='center'>
          <Text>{item.userID}</Text>

          <Button
            variant='ghost'
            onPress={() => Unfollow(item.id)}
          >Unfollow</Button>
        </HStack>
        }
      />
      
      <Button
        mt='8'
        variant='outline'
        onPress={() => SetModalVisible(true)}
      >
        Add
      </Button>
    </Box>
  );
};