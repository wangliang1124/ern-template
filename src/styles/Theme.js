import { DarkTheme as Dark, DefaultTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import commonStore from '~/stores/commonStore';

const isIos = Platform.OS === 'ios';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#fff',
    textDark: '#222',
    textMedium: '#797D80',
    textLight: '#B6BDC2',
  },
};

export const DarkTheme = {
  ...Dark,
  colors: {
    ...Dark.colors,
    // primary: '',
    // background: '',
    // text: '',
    // border: '',
    card: '#061525',
    textDark: '#F8F8FA',
    textMedium: '#bfbdbe',
    textLight: '#807e80',
  },
};

const Colors = {};

export const useTheme = () => (commonStore.darkMode ? DarkTheme : LightTheme);
