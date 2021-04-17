import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { LocalStorageKeys } from './constants/LocalStorageKeys';
import StackNavigator from './router';
import NativeEventManager from './utils/event';
import LocalStorage from './utils/LocalStorage';
import { navigationRef, onNavigationReady, onNavStateChange } from './utils/router';

function App(props) {
  console.log('----- app render ----', props);
  useEffect(() => {
    const subscription = NativeEventManager.addListener('AppOpened', async (res) => {
      console.log('----- addListener AppOpened ----', res);
      let count = (await LocalStorage.get(LocalStorageKeys.AppOpenCount)) || 1;
      count += 1;
      LocalStorage.set(LocalStorageKeys.AppOpenCount, count);
    });
    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady} onStateChange={onNavStateChange}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
