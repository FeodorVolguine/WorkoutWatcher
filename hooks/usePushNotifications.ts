import { useEffect } from 'react';

import { Platform } from 'react-native';

import { RegisterForPushNotifications } from '../utility/RegisterForPushNotifications';

export function usePushNotifications() {
  if(Platform.OS === 'android' || Platform.OS === 'ios')
    useEffect(() => { RegisterForPushNotifications(); }, []);
}