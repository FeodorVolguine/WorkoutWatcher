import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { Platform } from 'react-native';

import { doc, updateDoc } from 'firebase/firestore';

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
    console.log(token);
    await updateDoc(doc(database, 'users', auth.currentUser?.uid ? auth.currentUser?.uid : ''), { expoPushToken: token });
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