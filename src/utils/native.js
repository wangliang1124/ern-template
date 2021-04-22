import { NativeModules } from 'react-native';

const { ERNNative } = NativeModules;

export const { gotoNative, popScreen, startNativeTimer } = ERNNative;

export const { constantKey, appVersion, environment } = ERNNative;

// console.log('----- constants -----', constantKey, appVersion, environment);
