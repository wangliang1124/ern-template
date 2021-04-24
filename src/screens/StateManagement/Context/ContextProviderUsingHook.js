/**
 * 这是第二种方式，配饰 react hooks 使用，可以更加的优雅简单，通过 reducer 改变状态，不需要 setState 了
 */
import React from 'react';
import { View, Button, SafeAreaView, Text } from 'react-native';
import { ThemeProvider, getState, ThemeContext, toggleTheme } from './stores/ThemeProvider';

const ContextProviderUsingHook = () => (
  <ThemeProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <Content />
      <ToggleButton />
    </SafeAreaView>
  </ThemeProvider>
);

const Content = () => {
  const [state] = getState();

  console.log('render Content  ---------', state);
  const darkMode = state.theme === 'dark';
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkMode ? '#222' : '#fff',
      }}
    >
      <Text style={{ fontSize: 36, color: darkMode ? '#fff' : '#222' }}>{darkMode ? 'Dark Mode' : 'Light Mode'}</Text>
    </View>
  );
};

class ToggleButton extends React.Component {
  static contextType = ThemeContext;

  render() {
    const [state, dispatch] = this.context;
    console.log('render ToggleButton this.context---', this.context);
    const darkMode = state.theme === 'dark';
    return (
      <View style={{ backgroundColor: darkMode ? '#222' : '#fff' }}>
        <Button title="Change Mode After 1s Later" onPress={() => toggleTheme(dispatch)} />
      </View>
    );
  }
}

export default ContextProviderUsingHook;
