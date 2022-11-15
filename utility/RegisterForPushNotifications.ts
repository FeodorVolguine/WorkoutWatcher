import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

export const RegisterForPushNotifications = async () => {
  if(Device.isDevice)
  {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if(existingStatus !== 'granted')
    {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if(finalStatus !== 'granted')
    {
      alert('Failed to get push token for push notification');
      return;
    }

    let token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@feodorv/WorkoutWatcher' })).data;

    // Store token in AsyncStorage
    try
    {
      await AsyncStorage.setItem('expoPushToken', token);
    }
    catch (error)
    {
      alert('Failed to store Expo push token in AsyncStorage');
      console.log(error);
      alert('error: ' + error);
      return;
    }

    // Add token to database
    const userID = auth.currentUser?.uid ? auth.currentUser?.uid : '';
    await updateDoc(doc(database, 'users', userID), { expoPushTokens: arrayUnion(token) });
  }
  else
    alert('Must use physical device for push notifications');

  if(Platform.OS === 'android')
  {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};