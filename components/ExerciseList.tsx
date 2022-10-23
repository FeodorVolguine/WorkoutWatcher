import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, Heading, Box, HStack, VStack, FlatList, Modal, Button, Input, FormControl } from 'native-base';

import Calculate1RM from '../1RM Function';

interface ExerciseData {
  name: string
  weight: number
  reps: number
}

export const ExerciseList = () => {
  const [newItemName, SetNewItemName] = useState('');
  const [newItemWeight, SetNewItemWeight] = useState(0);
  const [newItemReps, SetNewItemReps] = useState(0);
  const [items, SetItems] = useState<ExerciseData[]>([]);

  const [modalVisible, SetModalVisible] = useState(false);

  const AddItem = () => {
    SetItems([...items, {name: newItemName, weight: newItemWeight, reps: newItemReps}]);
  };

  const RemoveItem = (index: number) => {
    let newItems = [...items];
    newItems.splice(index, 1)
    SetItems(newItems);
  }

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
                value={newItemName}
                onChangeText={text => SetNewItemName(text)}
              />
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Weight</FormControl.Label>
              <Input
                keyboardType='number-pad'
                value={newItemWeight.toString()}
                onChangeText={text => SetNewItemWeight(+text)}
              />
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Reps</FormControl.Label>
              <Input
                keyboardType='number-pad'
                value={newItemReps.toString()}
                onChangeText={text => SetNewItemReps(+text)}
              />
            </FormControl>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => { SetModalVisible(false); }}>
                Cancel
              </Button>

              <Button onPress={() => {
                AddItem();
                SetModalVisible(false);
                SetNewItemName('');
                SetNewItemWeight(0);
                SetNewItemReps(0);
              }}>
                Add
              </Button>

            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Heading>Today</Heading>
      <FlatList
        data={items}
        renderItem={({item, index}) =>
          <HStack>
            <VStack>
              <Text>{item.name}</Text>
              <Text>{item.weight}lb x {item.reps}</Text>
              <Text>Estimated 1RM: {Calculate1RM(item.weight, item.reps).toFixed(1)}lb</Text>
            </VStack>

            <Button onPress={() => RemoveItem(index)}>Remove</Button>
          </HStack>
        }
      />
      
      <Button onPress={() => SetModalVisible(true)}>
        <Box>
          <Text fontSize='md'>Add</Text>
        </Box>
      </Button>
    </Box>
  );
};

const styles = {
  button: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
};