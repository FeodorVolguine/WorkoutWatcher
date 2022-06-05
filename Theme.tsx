import React from "react";

const palette = {
  blue: '#6495ED',
  green: '#0ECD9D',
  red: '#CD0E61',
  black: '#0B0B0B',
  white: '#F0F2F3'
};

export const theme = {
  spacing: {
    s: 8,
    m: 16,
    l: 24
  },

  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.blue,
    success: palette.green,
    failure: palette.red
  },

  textVariants: {
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold'
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 16
    }
  }
}

export const darkTheme = {
  ...theme,

  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white
  }
}

export const ThemeContext = React.createContext(theme);