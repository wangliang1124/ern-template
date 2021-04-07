import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '~/screens/Home';
import MobxDemo from '~/screens/MobxDemo';

const Stack = createStackNavigator();
const routes = ['MobxDemo'];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">{(props) => <Home {...props} routes={routes} />}</Stack.Screen>
        <Stack.Screen name="MobxDemo" component={MobxDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
