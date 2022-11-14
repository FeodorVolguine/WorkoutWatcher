import { DevicePushToken } from 'expo-notifications';

import { doc, updateDoc } from 'firebase/firestore';

import { auth, database } from '../config/Firebase';

export const RegisterDevicePushToken = async (pushToken: DevicePushToken) => {
  await updateDoc(doc(database, 'users', auth.currentUser?.uid ? auth.currentUser?.uid : ''), { expoPushToken: pushToken });
};