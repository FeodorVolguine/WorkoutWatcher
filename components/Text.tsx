import React, { useContext } from 'react';
import { Text as RNText, TextStyle } from 'react-native';

import { theme, ThemeContext } from '../Theme';

interface TextProps extends React.ComponentProps<typeof RNText> {
  variant?: keyof typeof theme.textVariants
  color?: keyof typeof theme.colors
}

const Text = ({variant = "body", color = "foreground", style, children}: TextProps) => {
  const theme = useContext(ThemeContext)

  return (
    <RNText
      style={{
        color: theme.colors[color],
        ...theme.textVariants[variant] as TextStyle,
        ...(typeof style === 'object' ? style : {})
      }}
    >
      {children}
    </RNText>
  );
};

export default Text;