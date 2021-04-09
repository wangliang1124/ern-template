import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Gallery from '~/screens/Gallery';
import Home from '~/screens/Home';
import MobxDemo from '~/screens/MobxDemo';

const Stack = createStackNavigator();
const routes = ['MobxDemo', 'Gallery'];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">{(props) => <Home {...props} routes={routes} />}</Stack.Screen>
        <Stack.Screen name="MobxDemo" component={MobxDemo} />
        <Stack.Screen name="Gallery" component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
