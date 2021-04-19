import { Dimensions } from 'react-native';

export function getRandomColor() {
  return `#${`00000${((Math.random() * 0x1000000) << 0).toString(16)}`.substr(-6)}`;
}

// just use for demo
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function formatParams(data) {
  const arr = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  }
  return arr.join('&');
}

export function isLandscape() {
  const { height, width } = Dimensions.get('screen');
  return width >= height;
}
