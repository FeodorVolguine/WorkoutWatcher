import React from 'react';

import { Text, Heading, Box, HStack, VStack, FlatList, Modal, Button, IconButton, Icon, Input, InputGroup, InputRightAddon, FormControl } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useCollection } from '../hooks/database';

import Calculate1RM from '../1RM Function';

interface ExerciseData {
  name: string
  weight: number
  reps: number
}

export const SocialTab = () => {
  const [newFriend, SetNewFriend] = React.useState('');

  const [modalVisible, SetModalVisible] = React.useState(false);

  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const friendsRef = collection(database, 'users', userID, 'friends');
  const friends = useCollection(friendsRef);

  const AddFriend = async() => {
    await setDoc(doc(friendsRef), { userID: newFriend });
  };
  const RemoveFriend = async(friendID: string) => { await deleteDoc(doc(database, "users", userID, "friends", friendID)); };

  return (
    <Box alignSelf='center'>
      <Modal
        isOpen={modalVisible}
        onClose={() => SetModalVisible(false)}
      >
        <Modal.Content>
          <Modal.CloseButton/>
          <Modal.Header>Add friend</Modal.Header>

          <Modal.Body>
            <VStack space={4}>
              <Text fontWeight='semibold'>Your user ID: {userID}</Text>

              <FormControl>
                <FormControl.Label>Friend user ID</FormControl.Label>
                <Input
                  value={newFriend}
                  onChangeText={text => SetNewFriend(text)}
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
                AddFriend();
                SetModalVisible(false);
                SetNewFriend('');
              }}>
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Heading mt='8' size='md'>Your friends</Heading>
      <FlatList
        data={friends}
        renderItem={({ item }) =>
          <Text>{item.userID}</Text>
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