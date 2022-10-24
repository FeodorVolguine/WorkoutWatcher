import React from 'react';

import { Text, Heading, Box, HStack, VStack, FlatList, Modal, Button, IconButton, Icon, Input, InputGroup, InputRightAddon, FormControl } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import Calculate1RM from '../1RM Function';

interface ExerciseData {
  name: string
  weight: number
  reps: number
}

export const LogTab = () => {
  const [newItem, SetNewItem] = React.useState({
    name: '',
    weight: 0,
    reps: 0
  });

  const [items, SetItems] = React.useState<ExerciseData[]>([]);

  const [modalVisible, SetModalVisible] = React.useState(false);

  const AddItem = () => {
    SetItems([...items, newItem]);
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
                value={newItem.name}
                onChangeText={text => SetNewItem({...newItem, name: text})}
              />
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Weight</FormControl.Label>
              <InputGroup>
                <Input
                  keyboardType='number-pad'
                  value={newItem.weight.toString()}
                  onChangeText={text => SetNewItem({...newItem, weight: +text})}
                />
                <InputRightAddon children={'lb'}/>
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Reps</FormControl.Label>
              <Input
                keyboardType='number-pad'
                value={newItem.reps.toString()}
                onChangeText={text => SetNewItem({...newItem, reps: +text})}
              />
            </FormControl>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant='ghost' colorScheme='blueGray' onPress={() => { SetModalVisible(false); }}>
                Cancel
              </Button>

              <Button onPress={() => {
                AddItem();
                SetModalVisible(false);

                SetNewItem({
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
        data={items}
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
              onPress={() => RemoveItem(index)}
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