import React from 'react';
import { View, Button } from 'react-native';

const StateManagement = ({ navigation }) => {
  const push = (routeName) => {
    navigation.navigate(routeName);
  };
  return (
    <View>
      <Button
        title="Context Provider && Consumer"
        onPress={() => {
          push('ContextProviderConsumer');
        }}
      />
      <Button
        title="Context Provider Using Hook"
        onPress={() => {
          push('ContextProviderUsingHook');
        }}
      />
      <Button
        title="Context Provider Store"
        onPress={() => {
          push('ProviderStoreDemo');
        }}
      />
      <Button
        title="ProxyStore Demo"
        onPress={() => {
          push('ProxyStoreDemo');
        }}
      />
    </View>
  );
};

export default StateManagement;
