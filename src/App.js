import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Gallery from './screens/Gallery/Gallery';
import GalleryPhotoDetail from './screens/Gallery/GalleryPhotoDetail';
import Home from './screens/Home';
import MobxDemo from './screens/MobxDemo';
import { navigationRef, onNavigationReady, onNavStateChange } from './utils/router';

const Stack = createStackNavigator();
const routes = ['MobxDemo', 'Gallery'];

function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady} onStateChange={onNavStateChange}>
      <Stack.Navigator>
        <Stack.Screen name="Home">{(props) => <Home {...props} routes={routes} />}</Stack.Screen>
        <Stack.Screen name="MobxDemo" component={MobxDemo} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="GalleryPhotoDetail" component={GalleryPhotoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
