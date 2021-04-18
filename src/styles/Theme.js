import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const ThemeLight = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors },
};

export const ThemeDark = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors },
};
