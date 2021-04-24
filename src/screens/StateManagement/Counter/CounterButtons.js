import React from 'react';
import { Button } from 'react-native';
import { getDispatch } from './CounterStore';

function CounterButtons() {
  const dispatch = getDispatch();
  console.log('CounterButtons udpate');

  return (
    <>
      <Button title="Decrement" onPress={() => dispatch({ type: 'decrement' })} color="red" />
      <Button title="Increment" onPress={() => dispatch({ type: 'increment' })} />
    </>
  );
}

export default CounterButtons;
