import AsyncStorage from '@react-native-async-storage/async-storage';

import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

export const DeregisterFromPushNotifications = async () => {
  // Retrieve token from AsyncStorage
  try
  {
    const expoPushToken = await AsyncStorage.getItem('expoPushToken');
    if(expoPushToken)
    {
      // Remove token from database
      const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
      await updateDoc(doc(database, 'users', userID), { expoPushTokens: arrayRemove(expoPushToken) });
    }
  }
  catch (error)
  {
    alert('Failed to retrieve Expo push token from AsyncStorage');
    console.log(error);
    alert('error: ' + error);
  }
};