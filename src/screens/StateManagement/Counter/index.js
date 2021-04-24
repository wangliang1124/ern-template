import React from 'react';
import { View } from 'react-native';
import CounterButtons from './CounterButtons';
import CounterNumber from './CounterNumber';
import { StateProvider } from './CounterStore';

// 状态管理第三种方式: 这种方式其实就是对第二种方式的一种抽象，
// 把创建 Prodider 提炼为一个工厂方法，传入reducer 和 initialState
// 这种方式，使得 Provider 有了更好的封装
function ProviderStoreDemo() {
  return (
    <StateProvider>
      <View>
        <CounterButtons />
        <CounterNumber />
      </View>
    </StateProvider>
  );
}

export default ProviderStoreDemo;
