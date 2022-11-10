import React from 'react';

import { Text, Divider, Heading, Box, HStack, VStack, Modal, Button, IconButton, Icon, Input, InputGroup, InputRightAddon, FormControl } from 'native-base';

import Ionicons from '@expo/vector-icons/Ionicons';

import { collection, query, where, orderBy, doc, deleteDoc, addDoc, updateDoc, getDocs } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

import { useDocument, useCollection } from '../hooks/database';

import { Timer } from './Timer';

import GroupBy from '../utility/GroupBy';
import OneRepMax from '../utility/OneRepMax';

interface SetData
{
  date: number,
  time: number,
  name: string,
  weight: number,
  reps: number
}

export const LogTab = () => {
  const [newSet, SetNewSet] = React.useState({
    name: '',
    weight: 0,
    reps: 0
  });

  const [modalVisible, SetModalVisible] = React.useState(false);

  const [countdownVisible, SetCountdownVisible] = React.useState(false);

  const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const userData = useDocument(doc(database, 'users', userID));

  const date = new Date();
  const dayNumber = (date.getUTCFullYear() * 10000) + (date.getUTCMonth() * 100 + 100) + (date.getUTCDate());

  const setsRef = query(collection(database, 'users', userID, 'sets'), where('date', '==', dayNumber), orderBy('time', 'desc'));
  const sets = useCollection(setsRef) as SetData[];

  const exercises = sets ? GroupBy<SetData>(sets, 'name') : {};

  const AddSet = async () => {
    let currentDate = new Date();
    let timeNumber = currentDate.getUTCHours() * 10000000;
    timeNumber += currentDate.getUTCMinutes() * 100000;
    timeNumber += currentDate.getUTCSeconds() * 1000;
    timeNumber += currentDate.getUTCMilliseconds();

    await addDoc(collection(database, 'users', userID, 'sets'), {
      date: dayNumber,
      time: timeNumber,
      name: newSet.name,
      weight: newSet.weight,
      reps: newSet.reps
    });

    let currentOneRepMax = OneRepMax(newSet.weight, newSet.reps);

    //Update user document if the new set is a 1 rep max
    if('oneRepMax' in userData && newSet.name in userData.oneRepMax)
    {
      if(currentOneRepMax > userData.oneRepMax[newSet.name])
      {
        alert('You beat your previous 1RM!');
        await updateDoc(doc(database, 'users', userID), { [`oneRepMax.${newSet.name}`]: currentOneRepMax });
      }
    }
    else
    {
      await updateDoc(doc(database, 'users', userID), { [`oneRepMax.${newSet.name}`]: currentOneRepMax });
    }
  };

  const RemoveSet = async (setDocID: string) => { await deleteDoc(doc(database, "users", userID, "sets", setDocID)); };

  return (
    <Box alignSelf='center' mt={6} p={4}>
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
                  name: '',
                  weight: 0,
                  reps: 0
                });

                SetCountdownVisible(true);
              }}>
                Add
              </Button>

            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      { countdownVisible ?
          <Box m='8'>
            <Timer duration={90} onComplete={() => SetCountdownVisible(false)}/>
          </Box>
        :
          null
      }

      <Heading size='lg'>Today</Heading>
      <VStack space={4}>
        { Object.keys(exercises).map((exercise: string) =>
            <VStack mt={4} space={2} key={exercise}>
              <Text bold>{exercise}</Text>
              { exercises[exercise].map((set) =>
                  <VStack space={2} key={set.id}>
                    <HStack justifyContent='space-between'>
                      <VStack space={1}>
                        <Text>{set.weight}lb x {set.reps} reps</Text>
                        <Text>Predicted 1RM: {OneRepMax(set.weight, set.reps).toFixed(1)}lb</Text>
                      </VStack>

                      <IconButton
                        colorScheme='trueGray'
                        icon={<Icon as={Ionicons} name='remove' size='md' color='trueGray.400'/>}
                        onPress={() => RemoveSet(set.id)}
                      />
                    </HStack>

                    <Divider w="100%"/>
                  </VStack>
                )
              }
            </VStack>
          )
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