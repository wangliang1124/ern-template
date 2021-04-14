import React from 'react';
import { View, Button, ActivityIndicator, NativeModules } from 'react-native';

const { ERNModule } = NativeModules;

const loopTimes = 10e8;

function doExpensiveLoopJS() {
  return new Promise((r) => {
    let i = 0;
    while (i < loopTimes) {
      i++;
    }
    r(i);
  });
}

function Performance() {
  const [animating, setAnimating] = React.useState(false);

  return (
    <View style={{ padding: 16 }}>
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
          ERNModule.doExpensiveLoop(loopTimes).then(() => {
            setAnimating(false);
            console.log('--- end native----');
          });
        }}
      />
    </View>
  );
}

export default Performance;
