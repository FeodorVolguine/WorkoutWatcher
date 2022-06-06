import React from 'react';

const palette = {
  primaryLight: '#006D3C',
  onPrimaryLight: '#Ffffff',
  primaryContainerLight: '#98F7B6',
  onPrimaryContainerLight: '#00210E',
  secondaryLight: '#4F6353',
  onSecondaryLight: '#Ffffff',
  secondaryContainerLight: '#D2E8D4',
  onSecondaryContainerLight: '#0D1F13',
  tertiaryLight: '#3A646F',
  onTertiaryLight: '#Ffffff',
  tertiaryContainerLight: '#Beeaf7',
  onTertiaryContainerLight: '#001F26',
  errorLight: '#Ba1A1A',
  onErrorLight: '#Ffffff',
  errorContainerLight: '#Ffdad6',
  onErrorContainerLight: '#410002',
  outlineLight: '#717971',
  backgroundLight: '#Fbfdf8',
  onBackgroundLight: '#191C19',
  surfaceLight: '#Fbfdf8',
  onSurfaceLight: '#191C19',
  surfaceVariantLight: '#Dde5Db',
  onSurfaceVariantLight: '#414942',
  inverseSurfaceLight: '#2E312E',
  inverseOnSurfaceLight: '#F0F1Ec',
  primaryDark: '#7Cda9C',
  onPrimaryDark: '#00391D',
  primaryContainerDark: '#00522C',
  onPrimaryContainerDark: '#98F7B6',
  secondaryDark: '#B6Ccb9',
  onSecondaryDark: '#223527',
  secondaryContainerDark: '#384B3C',
  onSecondaryContainerDark: '#D2E8D4',
  tertiaryDark: '#A2Cdda',
  onTertiaryDark: '#023640',
  tertiaryContainerDark: '#214C57',
  onTertiaryContainerDark: '#Beeaf7',
  errorDark: '#Ffb4Ab',
  onErrorDark: '#690005',
  errorContainerDark: '#93000A',
  onErrorContainerDark: '#Ffdad6',
  outlineDark: '#8B938A',
  backgroundDark: '#191C19',
  onBackgroundDark: '#E1E3De',
  surfaceDark: '#191C19',
  onSurfaceDark: '#E1E3De',
  surfaceVariantDark: '#414942',
  onSurfaceVariantDark: '#C0C9Bf',
  inverseSurfaceDark: '#E1E3De',
  inverseOnSurfaceDark: '#191C19'
};

export const theme = {
  spacing: {
    s: 8,
    m: 16,
    l: 24
  },

  colors: {
    primary: palette.primaryLight,
    onPrimary: palette.onPrimaryLight,
    primaryContainer: palette.primaryContainerLight,
    onPrimaryContainer: palette.onPrimaryContainerLight,
    secondary: palette.secondaryLight,
    onSecondary: palette.onSecondaryLight,
    secondaryContainer: palette.secondaryContainerLight,
    onSecondaryContainer: palette.onSecondaryContainerLight,
    tertiary: palette.tertiaryLight,
    onTertiary: palette.onTertiaryLight,
    tertiaryContainer: palette.tertiaryContainerLight,
    onTertiaryContainer: palette.onTertiaryContainerLight,
    error: palette.errorLight,
    onError: palette.onErrorLight,
    errorContainer: palette.errorContainerLight,
    onErrorContainer: palette.onErrorContainerLight,
    outline: palette.outlineLight,
    background: palette.backgroundLight,
    onBackground: palette.onBackgroundLight,
    surface: palette.surfaceLight,
    onSurface: palette.onSurfaceLight,
    surfaceVariant: palette.surfaceVariantLight,
    onSurfaceVariant: palette.onSurfaceVariantLight,
    inverseSurface: palette.inverseSurfaceLight,
    inverseOnSurface: palette.inverseOnSurfaceLight
  },

  textVariants: {
    header: {
      textAlign: 'center',
      fontSize: 36,
      fontWeight: 'bold',
      //fontFamily: 'Raleway'
    },
    body: {
      fontSize: 16,
      //fontFamily: 'Merriweather'
    }
  }
};

export const darkTheme = {
  ...theme,

  colors: {
    primary: palette.primaryDark,
    onPrimary: palette.onPrimaryDark,
    primaryContainer: palette.primaryContainerDark,
    onPrimaryContainer: palette.onPrimaryContainerDark,
    secondary: palette.secondaryDark,
    onSecondary: palette.onSecondaryDark,
    secondaryContainer: palette.secondaryContainerDark,
    onSecondaryContainer: palette.onSecondaryContainerDark,
    tertiary: palette.tertiaryDark,
    onTertiary: palette.onTertiaryDark,
    tertiaryContainer: palette.tertiaryContainerDark,
    onTertiaryContainer: palette.onTertiaryContainerDark,
    error: palette.errorDark,
    onError: palette.onErrorDark,
    errorContainer: palette.errorContainerDark,
    onErrorContainer: palette.onErrorContainerDark,
    outline: palette.outlineDark,
    background: palette.backgroundDark,
    onBackground: palette.onBackgroundDark,
    surface: palette.surfaceDark,
    onSurface: palette.onSurfaceDark,
    surfaceVariant: palette.surfaceVariantDark,
    onSurfaceVariant: palette.onSurfaceVariantDark,
    inverseSurface: palette.inverseSurfaceDark,
    inverseOnSurface: palette.inverseOnSurfaceDark
  }
};

export const ThemeContext = React.createContext(theme);