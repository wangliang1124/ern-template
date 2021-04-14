import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { readLogFile, createLogFile, writeLogFile, uploadLogFiles, emptyLogDir } from '~/utils/logFS';

export default class RNFSDemo extends Component {
  readFile = () => {
    readLogFile();
  };

  writeFile = () => {
    for (let i = 0; i < 100; i++) {
      writeLogFile('---- some text !!!test test test test test test test test test test! -----');
    }
  };

  render() {
    return (
      <View>
        <Button title="Create Logs Dir and Create Today log File" onPress={createLogFile} />
        <Button title="Read File" onPress={this.readFile} />
        <Button title="Write Somethings To Log File" onPress={this.writeFile} />
        <Button title="Upload File" onPress={uploadLogFiles} />
        <Button title="Empty logs" onPress={emptyLogDir} />
      </View>
    );
  }
}
