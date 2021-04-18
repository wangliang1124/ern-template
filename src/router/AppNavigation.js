import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import Home from '~/screens/Home';
import { ThemeDark, ThemeLight } from '~/styles/Theme';
import { onNavigationReady, onNavStateChange, updateRefs } from '~/utils/router';
import { defaultOptions, Screens } from './Screens';

const Stack = createStackNavigator();

const routeNames = [
  'MobxDemo',
  'Gallery',
  'RNFSDemo',
  'Performance',
  'NativeModuleDemo',
  'LocalStorageDemo',
  'SafeAreaDemo',
];

const StackNavigator = () => (
  <Stack.Navigator screenOptions={defaultOptions}>
    <Stack.Screen name="Home" key="Home" options={{ headerShown: false }}>
      {(props) => <Home {...props} routes={routeNames} />}
    </Stack.Screen>

    {Object.values(Screens).map((screen) => (
      <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={screen.name} />
    ))}
  </Stack.Navigator>
);

const AppNavigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      theme={scheme === 'dark' ? ThemeDark : ThemeLight}
      ref={updateRefs}
      onReady={onNavigationReady}
      onStateChange={onNavStateChange}
    >
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;

/* 这种优化目前没有太大的优势 */
/* <Stack.Screen
        name="GalleryPhotoDetail"
        getComponent={() => require('./screens/Gallery/GalleryPhotoDetail').default}
    />
*/
