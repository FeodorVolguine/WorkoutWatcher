import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Calculate1RM from '../1RM Function';

interface ListItemProps {
  name: string
  weight: number
  reps: number
}

const ListItem = (props: ListItemProps) => {
  return (
    <View >
      <Text>{props.name}</Text>
      <Text>{props.weight}lb x {props.reps}</Text> 
      <Text>Estimated 1RM: {Calculate1RM(props.weight, props.reps).toFixed(1)}</Text>
    </View>
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
    <View>
      <Modal
        visible={modalVisible}
      >
        <TouchableOpacity onPress={() => SetModalVisible(false)}>
          <View>
            <Text style={{fontWeight: 'bold'}}>&larr;</Text>
          </View>
        </TouchableOpacity>

        <View>
          <View style={styles.areaShadow}>
            <Text>Name</Text>
            <TextInput
              value={newItemName}
              onChangeText={text => SetNewItemName(text)}
            />
          </View>
          
          <View style={styles.areaShadow}>
            <Text>Weight</Text>
            <TextInput
              value={newItemWeight.toString()}
              onChangeText={text => SetNewItemWeight(+text)}
            />
          </View>
          
          <View style={styles.areaShadow}>
            <Text>Reps</Text>
            <TextInput
              keyboardType='number-pad'
              value={newItemReps.toString()}
              onChangeText={text => SetNewItemReps(+text)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            AddItem();
            SetModalVisible(false);
            SetNewItemName('');
            SetNewItemWeight(0);
            SetNewItemReps(0);
          }}
        >
          <View>
            <Text>+</Text>
          </View>
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
        <View>
          <Text>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
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