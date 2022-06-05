import React, { useContext } from 'react';
import { View } from 'react-native';

import { theme, ThemeContext } from '../Theme';

interface AreaProps extends React.ComponentProps<typeof View> {
  padding?: keyof typeof theme.spacing
  margin?: keyof typeof theme.spacing
  backgroundColor?: keyof typeof theme.colors
}

const Area = ({padding = 's', margin = 's', backgroundColor = 'background', style, children}: AreaProps) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        margin: theme.spacing[margin],
        padding: theme.spacing[padding],
        backgroundColor: theme.colors[backgroundColor],
        ...(typeof style === 'object' ? style : {})
      }}
    >
      {children}
    </View>
  );
};

export default Area;