import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { LocalStorageKeys } from './constants/LocalStorageKeys';
import StackNavigator from './router';
import LocalStorage from './utils/LocalStorage';
import { navigationRef, onNavigationReady, onNavStateChange } from './utils/router';

const { ERNModule } = NativeModules;

function App() {
  useEffect(() => {
    const subscription = new NativeEventEmitter(ERNModule).addListener('AppOpened', async (res) => {
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
