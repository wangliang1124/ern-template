import React from 'react';
import { Text } from 'react-native';
import { getState } from './CounterStore';

function CounterNumber() {
  const state = getState();
  console.log('CounterNumber udpate');

  return <Text style={{ textAlign: 'center', fontSize: 32 }}>{state.count}</Text>;
}

export default CounterNumber;
