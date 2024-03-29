import { useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
// import { isLandscape, isTablet } from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gotoNative } from '~/utils/native';

function Home({ routes, navigation: { navigate } }) {
  const { dark, colors } = useTheme();
  const styles = getStyles({ colors });

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ flex: 1 }}>
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
      </View>
      <View>
        <Text style={styles.text}>Dark Mode {dark ? 'ON' : 'OFF'}</Text>
      </View>
    </SafeAreaView>
  );
}

function getStyles({ colors }) {
  //   const tablet = isTablet();
  //   const isLand = isLandscape();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    text: {
      color: colors.text,
    },
  });
}

export default observer(Home);
