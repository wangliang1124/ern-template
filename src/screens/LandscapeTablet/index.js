import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import commonStore from '~/stores/commonStore';

class LandscapeTablet extends Component {
  componentDidMount() {}

  render() {
    const { isLandscape, isTablet } = commonStore;

    console.log('isLandscape---', isLandscape, isTablet);

    return (
      <View style={{ flex: 1, flexDirection: isLandscape ? 'row' : 'column' }}>
        <View
          style={{
            height: 200,
            flex: isLandscape ? 0.5 : 0,
            backgroundColor: 'lightgray',
          }}
        >
          <Text> textInComponent </Text>
          <Text> textInComponent </Text>
          <Text> textInComponent </Text>
          <Text> textInComponent </Text>
          <Text> textInComponent </Text>
          <Text> textInComponent </Text>
          <Text> textInComponent </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'darkgray' }}>
          <Text> textInComponent </Text>
        </View>
      </View>
    );
  }
}

export default observer(LandscapeTablet);
