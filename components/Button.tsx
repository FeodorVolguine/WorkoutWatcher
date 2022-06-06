import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { theme, ThemeContext } from '../Theme';

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  padding?: keyof typeof theme.spacing
  margin?: keyof typeof theme.spacing
  color?: keyof typeof theme.colors
}

const Button = ({padding = 's', margin = 's', color = 'primary', style, children}: ButtonProps) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{
        margin: theme.spacing[margin],
        padding: theme.spacing[padding],
        backgroundColor: theme.colors[color],
        ...(typeof style === 'object' ? style : {})
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;