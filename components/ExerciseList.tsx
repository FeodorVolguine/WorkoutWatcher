import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, Box, ScrollView, Modal, Button, Input, FormControl } from 'native-base';

import Calculate1RM from '../1RM Function';

interface ListItemProps {
  name: string
  weight: number
  reps: number
}

const ListItem = (props: ListItemProps) => {
  return (
    <Box>
      <Text>{props.name}</Text>
      <Text>{props.weight}lb x {props.reps}</Text> 
      <Text>Estimated 1RM: {Calculate1RM(props.weight, props.reps).toFixed(1)}</Text>
    </Box>
  );
};

export const ExerciseList = () => {
  const [newItemName, SetNewItemName] = useState('');
  const [newItemWeight, SetNewItemWeight] = useState(0);
  const [newItemReps, SetNewItemReps] = useState(0);
  const [items, SetItems] = useState<ListItemProps[]>([]);

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
    <Box>
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

      <ScrollView>
      {
        items.map((item, index) => {
          return (
            <Button key={index} onPress={() => RemoveItem(index)}>
              <ListItem name={item.name} weight={item.weight} reps={item.reps}/>
            </Button>
          );
        })
      }
      </ScrollView>

      <Button onPress={() => SetModalVisible(true)}>
        <Box>
          <Text fontSize='lg'>Add</Text>
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