import Gallery from '~/screens/Gallery/Gallery';
import GalleryPhotoDetail from '~/screens/Gallery/GalleryPhotoDetail';
import LocalStorageDemo from '~/screens/LocalStorageDemo';
import MobxDemo from '~/screens/MobxDemo';
import NativeModuleDemo from '~/screens/NativeModuleDemo';
import LightDemo from '~/screens/NativeModuleDemo/LightDemo';
import MapDemo from '~/screens/NativeModuleDemo/MapDemo';
import Performance from '~/screens/Performance';
import RNFSDemo from '~/screens/RNFS';

/*
说明： 在这个项目中所有的导航配置放在这里统一管理，
但是 donut 项目需要多个导航栈，并且分散在各个地方。
我认为这两种方式都有合理之处。但 donut 不但分散，很多情况下还和业务逻辑耦合在一起，结构层次不过清晰
*/
export const defaultOptions = {
  headerShown: true,
};

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
  LightDemo: {
    name: 'LightDemo',
    component: LightDemo,
  },
  MapDemo: {
    name: 'MapDemo',
    component: MapDemo,
  },
  LocalStorageDemo: {
    name: 'LocalStorageDemo',
    component: LocalStorageDemo,
  },
};

export const GalleryScreenConfigs = {
  Gallery: {
    name: 'Gallery',
    component: Gallery,
    options: { headerShown: false },
  },
  GalleryPhotoDetail: {
    name: 'GalleryPhotoDetail',
    component: GalleryPhotoDetail,
    options: { headerShown: false },
  },
};
