import React from 'react';

import { Text, Button, VStack, HStack } from 'native-base';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface TimerProps
{
  duration: number
  onComplete: (totalElapsedTime: number) => void
}

export const Timer = (props: TimerProps) => {
    const [isPlaying, SetIsPlaying] = React.useState(true);

    return (
      <VStack space={6}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          onComplete={props.onComplete}
          duration={props.duration}
          colors={['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80']}
          colorsTime={[props.duration, props.duration * 0.75, props.duration * 0.5, props.duration * 0.25, 0]}
          trailStrokeWidth={6}
          rotation='counterclockwise'
          //Temporary, for testing
          //onComplete={() => { return { shouldRepeat: true, delay: 1.5 }; }}
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

        <HStack justifyContent='space-evenly'>
          <Button
            rounded='full'
            variant='subtle'
            colorScheme='danger'
            onPress={() => SetIsPlaying(false)}
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
      </VStack>
  );
}