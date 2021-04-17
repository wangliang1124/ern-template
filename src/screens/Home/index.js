import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gotoNative } from '~/utils/native';

export default function Home({ routes, navigation: { navigate } }) {
  return (
    <SafeAreaView style={styles.container}>
      {routes.map((routeName) => (
        <Button
          onPress={() => {
            navigate(routeName);
          }}
          title={routeName}
          key={routeName}
        />
      ))}
      <Button
        title="Go to Native Screen"
        onPress={() => {
          gotoNative();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
