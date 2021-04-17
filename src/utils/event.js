import { NativeModules, NativeEventEmitter } from 'react-native';

const { EventManager } = NativeModules;

const NativeEventManager = new NativeEventEmitter(EventManager);

export default NativeEventManager;
