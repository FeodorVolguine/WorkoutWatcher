import Task from './components/Task';
import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

function Calculate1rm(weight: number, reps: number) {
  let oneRepMax = weight * (1 + (reps/ 30));
  return oneRepMax;
};


export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  setTask(null);
}

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
  }
  let userWeight = 123332;
  let userReps = 111111;
  let result = Calculate1rm(userWeight, userReps);
  return (
    <View style={styles.container2}>
      {/* Title */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Workouts </Text>
          
          
         {/* Workout Tasks */}
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )

            })
          }
          <Task text={'Workout 1'} />
          <Task text={'Schlurpout 2'} />
        </View> 

      </View>

      {/* Create A Tasks */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write Here!'} value={task} onChangeText={text => setTask(text)} />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View> style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      

    </View>
  );


const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  }, 
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
 },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundcolor: '',
    borderradius: 60,
    justifycontent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
  addText: {}
});

