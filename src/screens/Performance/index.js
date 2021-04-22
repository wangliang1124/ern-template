import React, { useState, useEffect } from 'react';
import { View, Button, ActivityIndicator, NativeModules, Text, StyleSheet } from 'react-native';
import NativeEventManager from '~/utils/event';
import { startNativeTimer } from '~/utils/native';

const { ERNNative } = NativeModules;

const loopTimes = 10e9;

function doExpensiveLoopJS() {
  return new Promise((r) => {
    let i = 0;
    while (i < loopTimes) {
      i++;
      console.log('i = ', i);
    }
    r(i);
  });
}

function Performance() {
  const [animating, setAnimating] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const listener = NativeEventManager.addListener('TimerCount', ({ count }) => {
      console.log('------ event TimerCount -----', count);
      setSecondsPassed(count);
    });
    return () => listener.remove();
  });

  const doInbackground = () => {
    setInterval(() => {
      console.log('------ do In background ------');
      setSecondsPassed((prev) => prev + 1);
    }, 1000);
  };

  return (
    <View style={{ padding: 16 }}>
      <View style={styles.btnWrapper}>
        <ActivityIndicator animating={animating} size="large" style={{ marginBottom: 16 }} />
        <Button
          title="Test Expensive Loop JS(Block UI)"
          onPress={() => {
            setAnimating(true);
            doExpensiveLoopJS(loopTimes).then(() => {
              setAnimating(false);
              console.log('--- end js----');
            });
          }}
        />
        <Button
          title="Test Expensive Loop Native"
          onPress={() => {
            setAnimating(true);
            ERNNative.doExpensiveLoop(loopTimes).then(() => {
              setAnimating(false);
              console.log('--- end native----');
            });
          }}
        />
      </View>
      <View style={[styles.btnWrapper, { marginTop: 20 }]}>
        <Text style={{ padding: 8, fontSize: 18, textAlign: 'center' }}>{`Seconds passed: ${secondsPassed}`}</Text>
        <Button onPress={doInbackground} title="Start JS Timer" />
        <Button
          onPress={() => {
            startNativeTimer();
          }}
          title="Start Native Timer"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Performance;
