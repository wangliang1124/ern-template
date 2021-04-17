import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from '~/App';
import { GalleryNavigation } from '~/router';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('Gallery', () => GalleryNavigation);

console.log('--------  registerComponent --------');
