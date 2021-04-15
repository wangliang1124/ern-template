import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import Router from '~/utils/router';

const { ERNModule, CppModule } = NativeModules;
const { multiply, sendTestEvent } = ERNModule;

function NativeModuleDemo() {
  const [result, setResult] = useState(NaN);

  useEffect(() => {
    const subscription = new NativeEventEmitter(ERNModule).addListener('EventReminder', (res) => {
      console.log('----- addListener EventReminder ----', res);
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RN call Native method</Text>
      <Button
        title="Multiply"
        onPress={async () => {
          const res = await multiply(999199129, 9112238888);
          setResult(res);
        }}
      />
      <Button
        title="Multiply CPP"
        onPress={async () => {
          const res = await CppModule.multiply(999199129, 9112238888);
          setResult(res);
        }}
      />
      <Text style={styles.result}>{result}</Text>
      <Button
        title="Test Native Send Event"
        onPress={() => {
          sendTestEvent();
        }}
      />
      <Button
        title="Light Demo"
        onPress={() => {
          Router.push('LightDemo');
        }}
      />
      <Button
        title="Map Demo"
        onPress={() => {
          Router.push('MapDemo');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  result: {
    textAlign: 'center',
    fontSize: 20,
    color: '#999',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default NativeModuleDemo;
