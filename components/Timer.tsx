import React from 'react';

import { Platform, Vibration } from 'react-native';

import { Text, Button, VStack, HStack } from 'native-base';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import notifee from '@notifee/react-native';

interface TimerProps
{
  duration: number
  onComplete: () => void
}

export const Timer = (props: TimerProps) => {
    const [isPlaying, SetIsPlaying] = React.useState(true);
    const [isDone, SetIsDone] = React.useState(false);

    let channelId: string;

    const InitializeNotification = async() => {
      await notifee.requestPermission();

      channelId = await notifee.createChannel({ id: 'default', name: 'Default Channel' });

      await notifee.displayNotification({
        id: 'Rest Timer',
        title: 'Rest Timer',
        body: props.duration.toString(),
        android: {
          channelId,
          //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: { id: 'default' }
        }
      });
    };

    const UpdateNotification = async(bodyContent: string) => {
      await notifee.displayNotification({
        id: 'Rest Timer',
        title: 'Rest Timer',
        body: bodyContent,
        android: {
          channelId
        }
      });
    };

    //InitializeNotification();

    return (
      <VStack space={6}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          onUpdate={(remainingTime) => UpdateNotification(remainingTime.toString())}
          onComplete={() => {
            SetIsDone(true);
            if(Platform.OS === 'android')
              Vibration.vibrate([1100, 0, 1100, 700, 1100, 700]);
            else if(Platform.OS === 'ios')
              Vibration.vibrate([0, 500, 500, 500]);
          }}
          duration={props.duration}
          colors={['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80']}
          colorsTime={[props.duration, props.duration * 0.75, props.duration * 0.5, props.duration * 0.25, 0]}
          trailStrokeWidth={6}
          rotation='counterclockwise'
        >
          {({ remainingTime, color }) =>
            <Text
              fontSize='3xl'
              color={color}
            >
              {Math.floor(remainingTime / 60)}:{remainingTime % 60}
            </Text>
          }
        </CountdownCircleTimer>

        { isDone ?
          <Button
            rounded='full'
            variant='subtle'
            onPress={() => {
              Vibration.cancel();
              props.onComplete();
            }}
          >
            Close
          </Button>
          :
          <HStack justifyContent='space-evenly'>
            <Button
              rounded='full'
              variant='subtle'
              colorScheme='danger'
              onPress={() => props.onComplete()}
            >
              Cancel
            </Button>

            <Button
              rounded='full'
              variant='subtle'
              onPress={() => SetIsPlaying(!isPlaying)}
            >
              { isPlaying ? 'Pause' : 'Resume' }
            </Button>
          </HStack>
        }
      </VStack>
  );
};