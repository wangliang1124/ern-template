import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Button } from 'react-native';
// import { isLandscape, isTablet } from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gotoNative } from '~/utils/native';

export default function Home({ routes, navigation: { navigate } }) {
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  return (
    <SafeAreaView style={[styles.container]}>
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

function getStyles({ colors }) {
  //   const tablet = isTablet();
  //   const isLand = isLandscape();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  });
}
