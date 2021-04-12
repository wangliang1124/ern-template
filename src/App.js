import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './router';
import { navigationRef, onNavigationReady, onNavStateChange } from './utils/router';

function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady} onStateChange={onNavStateChange}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
