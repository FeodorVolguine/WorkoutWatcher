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
    <Area color='primaryContainer'>
      <Text color='onPrimaryContainer'>{props.name}</Text>
      <Text color='onPrimaryContainer'>{props.weight}lb x {props.reps}</Text> 
      <Text color='onPrimaryContainer'>Estimated 1RM: {Calculate1RM(props.weight, props.reps).toFixed(1)}</Text>
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
          <Area margin='m' color='primary' style={styles.button}>
            <Text color='onPrimary' style={{fontWeight: 'bold'}}>&larr;</Text>
          </Area>
        </TouchableOpacity>

        <Area
          padding='l'
          margin='m'
          color='background'
        >
          <Area color='secondaryContainer' style={styles.areaShadow}>
            <Text color='onSecondaryContainer'>Name</Text>
            <TextInput
              value={newItemName}
              onChangeText={text => SetNewItemName(text)}
            />
          </Area>
          
          <Area color='secondaryContainer' style={styles.areaShadow}>
            <Text color='onSecondaryContainer'>Weight</Text>
            <TextInput
              value={newItemWeight.toString()}
              onChangeText={text => SetNewItemWeight(+text)}
            />
          </Area>
          
          <Area color='secondaryContainer' style={styles.areaShadow}>
            <Text color='onSecondaryContainer'>Reps</Text>
            <TextInput
              keyboardType='number-pad'
              value={newItemReps.toString()}
              onChangeText={text => SetNewItemReps(+text)}
            />
          </Area>
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
          <Area margin='m'>
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

      <TouchableOpacity onPress={() => SetModalVisible(true)} style={styles.button}>
        <Area padding='m'>
          <Text>Add</Text>
        </Area>
      </TouchableOpacity>
    </Area>
  );
};

const styles = {
  areaShadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 32
  }
};