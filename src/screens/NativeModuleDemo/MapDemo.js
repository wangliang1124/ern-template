import React from 'react';
import MapView from './MapView';

export default function MapDemo() {
  const region = {
    latitude: 37.48,
    longitude: -122.16,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  return <MapView region={region} zoomEnabled={false} style={{ flex: 1 }} />;
}
