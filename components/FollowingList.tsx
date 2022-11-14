import React from 'react';

import { Text, Heading, Box, HStack, VStack, Modal, Button, Input, FormControl } from 'native-base';

import { collection, doc, setDoc, updateDoc, arrayRemove, addDoc } from 'firebase/firestore';

import { database } from '../config/Firebase';

interface FollowingListProps
{
  userID: string,
  userData: any
}

export const FollowingList = (props: FollowingListProps) => {
  const [newFollowingUserID, SetNewFollowingUserID] = React.useState('');

  const [modalVisible, SetModalVisible] = React.useState(false);

  const Follow = async() => {
    //TODO: Check if the user exists first
    await addDoc(collection(database, 'users', newFollowingUserID, 'followRequests'), { userID: props.userID });
  };

  const Unfollow = async(followDocID: string) => { await updateDoc(doc(database, 'users', props.userID), { following: arrayRemove(followDocID) }); };

  return (
    <Box mt={6} p={4}>
      <Modal
        isOpen={modalVisible}
        onClose={() => SetModalVisible(false)}
      >
        <Modal.Content>
          <Modal.CloseButton/>
          <Modal.Header>Request to follow</Modal.Header>

          <Modal.Body>
            <VStack space={6}>
              <Text fontWeight='semibold'>Your user ID: {props.userID}</Text>

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

      <Heading size='md'>Following</Heading>
      <VStack space={4}>
      { props.userData ?
          props.userData.following?.map((item: string) =>
            <HStack borderBottomWidth='1' justifyContent='space-between' alignItems='center' key={item}>
              <Text>{item}</Text>
        
              <Button
                variant='ghost'
                onPress={() => Unfollow(item)}
              >Unfollow</Button>
            </HStack>
          )
        :
          null
      }
      </VStack>
      
      <Button
        mt='4'
        alignSelf='center'
        maxW='16'
        variant='outline'
        onPress={() => SetModalVisible(true)}
      >
        Add
      </Button>
    </Box>
  );
};