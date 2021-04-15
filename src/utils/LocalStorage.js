import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorageKeysSet } from '~/constants/LocalStorageKeys';
import { name as appName } from '../../app.json';

const prefix = `${appName}::`;

function setItem(key, value) {
  let json;
  try {
    json = JSON.stringify(value);
  } catch (error) {
    console.error(error);
  }
  return AsyncStorage.setItem(key, json);
}

function getItem(key) {
  return AsyncStorage.getItem(key).then((value) => value && JSON.parse(value));
}

function genKey(key) {
  return `${prefix}${key}`;
}

const LocalStorage = {
  get(key) {
    if (!key || !LocalStorageKeysSet.has(key)) {
      return Promise.reject(new Error('you must provide a valid key in LocalStorageKeys'));
    }
    const uniqueKey = genKey(key);
    return getItem(uniqueKey);
  },
  set(key, value) {
    if (!key || !LocalStorageKeysSet.has(key)) {
      return Promise.reject(new Error('you must provide a valid key in LocalStorageKeys'));
    }
    if (typeof value === 'undefined') {
      return Promise.reject(new Error('you must provide a valid value to AsyncStorage'));
    }
    const uniqueKey = genKey(key);
    return setItem(uniqueKey, value);
  },
  remove(key) {
    if (!key || (typeof key !== 'string' && !Array.isArray(key))) {
      return Promise.reject(new Error('you must provide a valid key AsyncStorage'));
    }
    const keys = Array.isArray(key) ? key : [key];
    const uniqueKeys = keys.map((k) => genKey(k));

    return AsyncStorage.multiRemove(uniqueKeys);
  },
  async clear() {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error(e);
    }
    keys = keys.filter((key) => key.startsWith(prefix));

    return AsyncStorage.multiRemove(keys);
  },
  async getAll() {
    const keys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiGet(keys);
  },
};

export default LocalStorage;
