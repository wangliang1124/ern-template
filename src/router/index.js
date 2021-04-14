import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Gallery from '~/screens/Gallery/Gallery';
import GalleryPhotoDetail from '~/screens/Gallery/GalleryPhotoDetail';
import Home from '~/screens/Home';
import MobxDemo from '~/screens/MobxDemo';
import NativeModuleDemo from '~/screens/NativeModuleDemo';
import Performance from '~/screens/Performance';
import RNFSDemo from '~/screens/RNFS';

/*
说明： 在这个项目中所有的导航配置放在这里统一管理，
但是 donut 项目需要多个导航栈，并且分散在各个地方。
我认为这两种方式都有合理之处。但 donut 不但分散，很多情况下还和业务逻辑耦合在一起，结构层次不过清晰
*/

export const Screens = {
  MobxDemo: {
    name: 'MobxDemo',
    component: MobxDemo,
  },
  Gallery: {
    name: 'Gallery',
    component: Gallery,
  },
  GalleryPhotoDetail: {
    name: 'GalleryPhotoDetail',
    component: GalleryPhotoDetail,
    options: { headerShown: false },
  },
  RNFSDemo: {
    name: 'RNFSDemo',
    component: RNFSDemo,
  },
  Performance: {
    name: 'Performance',
    component: Performance,
  },
  NativeModuleDemo: {
    name: 'NativeModuleDemo',
    component: NativeModuleDemo,
  },
};

const Stack = createStackNavigator();

const routeNames = ['MobxDemo', 'Gallery', 'RNFSDemo', 'Performance', 'NativeModuleDemo'];

export const getRoutes = () =>
  [
    <Stack.Screen name="Home" key="Home">
      {(props) => <Home {...props} routes={routeNames} />}
    </Stack.Screen>,
  ].concat(
    Object.values(Screens).map((screen) => (
      <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={screen.name} />
    )),
  );

const StackNavigator = () => <Stack.Navigator>{getRoutes()}</Stack.Navigator>;
export default StackNavigator;

/* 这种优化目前没有太大的优势 */
/* <Stack.Screen
        name="GalleryPhotoDetail"
        getComponent={() => require('./screens/Gallery/GalleryPhotoDetail').default}
    />
*/
