import React, { Component } from 'react';
import { StyleSheet, View, requireNativeComponent } from 'react-native';

const Light = requireNativeComponent('Light');

export default class LightDemo extends Component {
  state = { isOn: false };

  onStatusChange = (e) => {
    this.setState({ isOn: e.nativeEvent.isOn });
  };

  render() {
    const { isOn } = this.state;
    return (
      <View style={styles.container}>
        <Light style={styles.bottom} isOn={isOn} onStatusChange={this.onStatusChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
