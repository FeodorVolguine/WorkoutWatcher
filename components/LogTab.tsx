import React from 'react';

import { Text, Heading, Box, HStack, VStack, FlatList, Modal, Button, IconButton, Icon, Input, InputGroup, InputRightAddon, FormControl } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, query, doc, setDoc, deleteDoc } from 'firebase/firestore';

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

  const [modalVisible, SetModalVisible] = React.useState(false);

  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const setsRef = collection(database, 'users', userID, 'sets');
  //TODO: const sets = useCollection(query(setsRef, 'ORDER BY time'));
  const sets = useCollection(setsRef);

  const AddSet = async() => { await setDoc(doc(setsRef), newSet); };
  const RemoveSet = async(setDocID: string) => { await deleteDoc(doc(database, "users", userID, "sets", setDocID)); };

  return (
    <Box alignSelf='center' maxH='md'>
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

      <Heading mt='8' size='md'>Today</Heading>
      <VStack space={4}>
      {
        sets?.map((set) =>
          <HStack mt='6' borderBottomWidth='1' justifyContent='space-between'>
            <VStack space={1}>
              <Text bold>{set.name}</Text>
              <Text>{set.weight}lb x {set.reps}</Text>
              <Text>Estimated 1RM: {Calculate1RM(set.weight, set.reps).toFixed(1)}lb</Text>
            </VStack>

            <IconButton
              colorScheme='trueGray'
              icon={<Icon as={Ionicons} name='remove' size='md' color='trueGray.400'/>}
              onPress={() => RemoveSet(set.id)}
            />
          </HStack>
        )
      }
      </VStack>
      
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