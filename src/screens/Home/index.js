import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function Home({ routes, navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      {routes.map((routeName) => (
        <Button
          onPress={() => {
            navigate(routeName);
          }}
          title={routeName}
          key={routeName}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
