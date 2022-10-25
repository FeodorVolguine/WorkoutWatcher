import React from 'react';

import { Text, Heading, Box, HStack, VStack, FlatList, Modal, Button, IconButton, Icon, Input, InputGroup, InputRightAddon, FormControl } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, query, doc, setDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useCollection } from '../hooks/database';

import Calculate1RM from '../1RM Function';

interface ExerciseData {
  name: string
  weight: number
  reps: number
}

export const LogTab = () => {
  const [newSet, SetNewSet] = React.useState({
    time: 0,
    name: '',
    weight: 0,
    reps: 0
  });

  //TODO: Use React Navigation modal
  const [modalVisible, SetModalVisible] = React.useState(false);

  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const setsRef = collection(database, 'users', userID, 'sets');
  const sets = useCollection(setsRef);

  const AddSet = async() => {
    await setDoc(doc(setsRef), newSet);
  };

  const RemoveSet = async(index: number) => {
    //TODO: remove from database
    alert('Removing sets from the database is not yet supported...');
  };

  return (
    <Box alignSelf='center'>
      <Modal
        isOpen={modalVisible}
        onClose={() => SetModalVisible(false)}
      >
        <Modal.Content>
          <Modal.CloseButton/>
          <Modal.Header>New set</Modal.Header>

          <Modal.Body>
            <FormControl>
              <FormControl.Label>Exercise</FormControl.Label>
              <Input
                value={newSet.name}
                onChangeText={text => SetNewSet({...newSet, name: text})}
              />
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Weight</FormControl.Label>
              <InputGroup>
                <Input
                  keyboardType='number-pad'
                  value={newSet.weight.toString()}
                  onChangeText={text => SetNewSet({...newSet, weight: +text})}
                />
                <InputRightAddon children={'lb'}/>
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Reps</FormControl.Label>
              <Input
                keyboardType='number-pad'
                value={newSet.reps.toString()}
                onChangeText={text => SetNewSet({...newSet, reps: +text})}
              />
            </FormControl>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant='ghost' colorScheme='blueGray' onPress={() => { SetModalVisible(false); }}>
                Cancel
              </Button>

              <Button onPress={() => {
                AddSet();
                SetModalVisible(false);

                SetNewSet({
                  time: 0,
                  name: '',
                  weight: 0,
                  reps: 0
                });
              }}>
                Add
              </Button>

            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Heading mb='2' size='md'>Today</Heading>
      <FlatList
        data={sets}
        renderItem={({item, index}) =>
          <HStack borderBottomWidth='1' justifyContent='space-between'>
            <VStack space={1}>
              <Text>{item.name}</Text>
              <Text>{item.weight}lb x {item.reps}</Text>
              <Text>Estimated 1RM: {Calculate1RM(item.weight, item.reps).toFixed(1)}lb</Text>
            </VStack>

            <IconButton
              colorScheme='trueGray'
              icon={<Icon as={Ionicons} name='remove-circle-outline' size='lg' color='trueGray.400'/>}
              onPress={() => RemoveSet(index)}
            />
          </HStack>
        }
      />
      
      <Button
        variant='outline'
        onPress={() => SetModalVisible(true)}
      >
        Add
      </Button>
    </Box>
  );
};