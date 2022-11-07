import React from 'react';

import { Platform, Vibration } from 'react-native';

import { Text, Button, VStack } from 'native-base';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface TimerProps
{
  duration: number
  onComplete: () => void
}

export const Timer = (props: TimerProps) => {
    const [isDone, SetIsDone] = React.useState(false);

    return (
      <VStack space={6}>
        <CountdownCircleTimer
          isPlaying={true}
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
            variant='subtle'
            onPress={() => props.onComplete()}
          >
            Close
          </Button>
          :
          <Button
            variant='subtle'
            colorScheme='danger'
            onPress={() => props.onComplete()}
          >
            Cancel
          </Button>
        }
      </VStack>
  );
};