import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import StackNavigator from './router';
import { navigationRef, onNavigationReady, onNavStateChange } from './utils/router';

const { ERNModule } = NativeModules;

function App() {
  useEffect(() => {
    const subscription = new NativeEventEmitter(ERNModule).addListener('AppOpened', (res) => {
      console.log('----- addListener AppOpened ----', res);
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
