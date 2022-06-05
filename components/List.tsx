import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Area from './Area';
import Text from './Text';

import Calculate1RM from '../1RM Function';

interface ListItemProps {
  name: string
  weight: number
  reps: number
}

const ListItem = (props: ListItemProps) => {
  return (
    <Area backgroundColor='success'>
      <Text>{props.name}</Text>
      <Text>{props.weight}lb x {props.reps}</Text> 
      <Text>Estimated 1RM: {Calculate1RM(props.weight, props.reps)}</Text>
    </Area>
  );
};

export const List = () => {
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
    <Area>
      <Modal
        visible={modalVisible}
      >
        <TouchableOpacity onPress={() => SetModalVisible(false)}>
          <Area margin='m' >
            <Text>&larr;</Text>
          </Area>
        </TouchableOpacity>

        <Area margin='m'>
          <Text>Name</Text>
          <TextInput
            value={newItemName}
            onChangeText={text => SetNewItemName(text)}
          />
          <Text>Weight</Text>
          <TextInput
            value={newItemWeight.toString()}
            onChangeText={text => SetNewItemWeight(+text)}
          />
          <Text>Reps</Text>
          <TextInput
            keyboardType='number-pad'
            value={newItemReps.toString()}
            onChangeText={text => SetNewItemReps(+text)}
          />
        </Area>

        <TouchableOpacity
          onPress={() => {
            AddItem();
            SetModalVisible(false);
            SetNewItemName('');
            SetNewItemWeight(0);
            SetNewItemReps(0);
          }}
        >
          <Area margin='m' backgroundColor='success'>
            <Text>+</Text>
          </Area>
        </TouchableOpacity>
      </Modal>

      <ScrollView>
      {
        items.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => RemoveItem(index)}>
              <ListItem name={item.name} weight={item.weight} reps={item.reps}/>
            </TouchableOpacity>
          );
        })
      }
      </ScrollView>

      <TouchableOpacity onPress={() => SetModalVisible(true)}>
        <Area backgroundColor='primary'>
          <Text>Add exercise</Text>
        </Area>
      </TouchableOpacity>
    </Area>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 50,
    fontSize: 32,
    borderRadius: 40
  }
});