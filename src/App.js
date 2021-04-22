import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LocalStorageKeys } from './constants/LocalStorageKeys';
import AppNavigation from './router/AppNavigation';
import commonStore from './stores/commonStore';
import { DarkTheme, LightTheme, useTheme } from './styles/Theme';
import ERNEventManager from './utils/event';
import LocalStorage from './utils/LocalStorage';

function App(props) {
  console.log('----- app render ----', props);

  useEffect(() => {
    const subscription = ERNEventManager.addListener('AppOpened', async (res) => {
      console.log('----- native event AppOpened ----', res);
      let count = (await LocalStorage.get(LocalStorageKeys.AppOpenCount)) || 1;
      count += 1;
      LocalStorage.set(LocalStorageKeys.AppOpenCount, count);
    });
    return () => subscription.remove();
  }, []);

  const darkMode = useColorScheme() === 'dark';
  useEffect(() => {
    commonStore.changeTheme(darkMode);
  }, [darkMode]);

  return <AppNavigation theme={darkMode ? DarkTheme : LightTheme} />;
}

export default App;
