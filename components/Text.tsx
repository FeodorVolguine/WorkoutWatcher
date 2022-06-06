import React, { useContext } from 'react';
import { Text as CoreText, TextStyle } from 'react-native';

import { theme, ThemeContext } from '../Theme';

interface TextProps extends React.ComponentProps<typeof CoreText> {
  variant?: keyof typeof theme.textVariants
  color?: keyof typeof theme.colors
}

const Text = ({variant = 'body', color = 'onPrimary', style, children}: TextProps) => {
  const theme = useContext(ThemeContext)

  return (
    <CoreText
      style={{
        color: theme.colors[color],
        ...theme.textVariants[variant] as TextStyle,
        ...(typeof style === 'object' ? style : {})
      }}
    >
      {children}
    </CoreText>
  );
};

export default Text;