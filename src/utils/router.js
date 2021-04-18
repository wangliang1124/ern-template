import { useRoute } from '@react-navigation/native';
import React from 'react';

export const isReadyRef = React.createRef(false);
export const navStateRef = React.createRef(null);
export const navigationRefStack = [];

export function updateRefs(ref) {
  console.log('-------- update ref --------', ref);
  if (ref) {
    navigationRefStack.push(ref);
  } else {
    navigationRefStack.pop();
  }
}

export function onNavigationReady() {
  isReadyRef.current = true;
}

export function onNavStateChange(newState) {
  navStateRef.current = newState;
}

export function getCurrentOptions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const navigationRef = navigationRefStack[navigationRefStack.length - 1];
      resolve(navigationRef.getCurrentOptions() || {});
    });
  });
}

function navigate(routeName, params) {
  const navigationRef = navigationRefStack[navigationRefStack.length - 1];
  console.log('------- navigation push -------', routeName, params, navigationRef.getRootState());
  if (isReadyRef.current && navigationRef) {
    // Perform navigation if the app has mounted
    let name;
    if (typeof routeName === 'object' && typeof routeName.name === 'string') {
      name = routeName.name;
    } else if (typeof routeName === 'string') {
      name = routeName;
    } else {
      console.warn('routeName must be string or object');
    }
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    console.warn('navigation not ready');
  }
}

function goBack() {
  const navigationRef = navigationRefStack[navigationRefStack.length - 1];
  console.log('------- navigation pop -------', navigationRef.getRootState());

  if (isReadyRef.current && navigationRef) {
    navigationRef.goBack();
  }
}

export function getRouteParams(self) {
  //   console.log('navStateRef.current--', navStateRef.current);
  //   const { index, routes } = navStateRef.current;
  //   return routes[index]?.params;
  //   return self ? self.props.route?.params : useRoute()?.params;
  const navigationRef = navigationRefStack[navigationRefStack.length - 1];
  return navigationRef.getCurrentRoute()?.params;
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
