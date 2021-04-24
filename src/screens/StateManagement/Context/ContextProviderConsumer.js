/**
 * simple demo just use Context.Provider && Context.Consumer
 * 这是最基本的方式，只是使用 Context.Provider && Context.Consumer 来实现数据的传递
 */
import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 这种方式不会触发父组件（SimpleDemo）的重新渲染，所以子组件也不会重新渲染
// const theme = 'dark'
// function toggleTheme() {
//   theme = theme === 'dark' ? 'light' : 'dark'
// }

// 这部分在实际项目中可以单独放在一个文件中，方便其他组件 import
const initialTheme = 'light';
export const ThemeContext = React.createContext(initialTheme);

class ContextProviderConsumer extends React.Component {
  state = {
    theme: initialTheme,
  };

  toggleTheme = () => {
    const { theme } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
  };

  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
          <Content />
          <ToggleButton />
        </SafeAreaView>
      </ThemeContext.Provider>
    );
  }
}

// 实际项目中这里应该是一个单独的组件文件
const Content = () => {
  console.log('--- render content ---');
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        const darkMode = theme === 'dark';
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: darkMode ? '#222' : '#fff',
            }}
          >
            <Text style={{ fontSize: 36, color: darkMode ? '#fff' : '#222' }}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
        );
      }}
    </ThemeContext.Consumer>
  );
};

/**
 * 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
 * 此属性能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
 */
class ToggleButton extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { theme, toggleTheme } = this.context;
    const darkMode = theme === 'dark';
    return (
      <View style={{ backgroundColor: darkMode ? '#222' : '#fff' }}>
        <Button title="Change Mode" onPress={toggleTheme} />
      </View>
    );
  }
}

export default ContextProviderConsumer;
