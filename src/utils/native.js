import { NativeModules } from 'react-native';

const { ERNModule } = NativeModules;

export const { gotoNative, popScreen } = ERNModule;
