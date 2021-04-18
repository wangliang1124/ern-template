import React from 'react';
import { View, Image } from 'react-native';

export default function FullPage() {
  return (
    <Image
      style={{ flex: 1 }}
      source={{ uri: 'https://cdn.pixabay.com/photo/2021/03/16/13/47/lake-6099842_1280.jpg' }}
    />
  );
}
