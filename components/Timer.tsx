import React from 'react';

import { Text } from 'native-base';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface TimerProps
{
  duration: number
  onComplete: (totalElapsedTime: number) => void
}

export const Timer = (props: TimerProps) => {
    return (
      <CountdownCircleTimer
        isPlaying
        onComplete={props.onComplete}
        duration={props.duration}
        colors={['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80']}
        colorsTime={[props.duration, props.duration * 0.75, props.duration * 0.5, props.duration * 0.25, 0]}
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
  );
}