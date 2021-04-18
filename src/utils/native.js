import { NativeModules } from 'react-native';

const { ERNModule } = NativeModules;

export const { gotoNative, popScreen, constantKey, appVersion, environment } = ERNModule;
console.log('----- constants -----', constantKey, appVersion, environment);
