import React, { useEffect } from 'react';
import { LocalStorageKeys } from './constants/LocalStorageKeys';
import AppNavigation from './router/AppNavigation';
import NativeEventManager from './utils/event';
import LocalStorage from './utils/LocalStorage';

function App(props) {
  console.log('----- app render ----', props);
  useEffect(() => {
    const subscription = NativeEventManager.addListener('AppOpened', async (res) => {
      console.log('----- native event AppOpened ----', res);
      let count = (await LocalStorage.get(LocalStorageKeys.AppOpenCount)) || 1;
      count += 1;
      LocalStorage.set(LocalStorageKeys.AppOpenCount, count);
    });
    return () => subscription.remove();
  }, []);

  return <AppNavigation />;
}

export default App;
