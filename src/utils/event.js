import { NativeModules, NativeEventEmitter } from 'react-native';

const { ERNNativeEventManager } = NativeModules;

const ERNEventManager = new NativeEventEmitter(ERNNativeEventManager);

export default ERNEventManager;
