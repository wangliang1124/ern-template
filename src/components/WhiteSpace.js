import React from 'react';
import { View } from 'react-native';

const sizeMap = {
  s: 12,
  l: 16,
};

export default function WhiteSpace(props) {
  const { size = 'l', style } = props;
  let height = 16;
  if (size || size === 0) {
    const typeSize = typeof size;
    if (typeSize === 'string') {
      height = sizeMap[size] || 16;
    } else if (typeSize === 'number') {
      height = size;
    } else {
      height = 16;
    }
  } else {
    height = 16;
  }
  return <View style={[{ height }, style]} />;
}
