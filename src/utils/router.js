import { useRoute } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef(null);
export const isReadyRef = React.createRef(false);
export const navStateRef = React.createRef(null);

export function onNavigationReady() {
  isReadyRef.current = true;
}

export function onNavStateChange(newState) {
  navStateRef.current = newState;
}

function navigate(routeName, params) {
  // console.log('navigationRef.current---', navigationRef.current);
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(routeName, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    console.warn('navigation not ready');
  }
}

function goBack(routeName, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.goBack(routeName, params);
  }
}

export function getRouteParams(self) {
  //   console.log('navStateRef.current--', navStateRef.current);
  //   const { index, routes } = navStateRef.current;
  //   return routes[index]?.params;
  return self ? self.props.route?.params : useRoute()?.params;

  //   try {
  //     if (props) {
  //       return props.route?.params;
  //     }

  //     const route = useRoute();
  //     return route?.params;
  //   } catch (error) {
  //     return error;
  //   }
}

const Router = {
  push: navigate,
  pop: goBack,
};

export default Router;
