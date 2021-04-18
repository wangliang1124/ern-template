import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { Screens } from '~/router/Screens';
import Router from '~/utils/router';

function SafeAreaDemo() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="No SafeArea"
        onPress={() => {
          Router.push(Screens.NoSafeArea);
        }}
      />
      <Button
        title="Full Page"
        onPress={() => {
          Router.push(Screens.FullPage);
        }}
      />
      <Button
        title="SafeArea"
        onPress={() => {
          Router.push(Screens.SafeArea);
        }}
      />
    </SafeAreaView>
  );
}

export default SafeAreaDemo;
