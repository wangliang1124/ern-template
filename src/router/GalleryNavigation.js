import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { onNavigationReady, onNavStateChange, updateRefs } from '~/utils/router';
import { defaultOptions, GalleryScreenConfigs } from './Screens';

const Stack = createStackNavigator();

const GalleryNavigation = () => (
  <NavigationContainer ref={updateRefs} onReady={onNavigationReady} onStateChange={onNavStateChange}>
    <Stack.Navigator screenOptions={defaultOptions}>
      {Object.values(GalleryScreenConfigs).map((screen) => (
        <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={screen.name} />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);

export default GalleryNavigation;
