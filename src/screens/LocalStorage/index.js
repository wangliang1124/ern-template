import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import LocalStorage from '~/utils/LocalStorage';

function LocalStorageDemo() {
  const [key, setKey] = useState();
  const [value, setValue] = useState();
  const [storageValues, setStorageValues] = useState([]);
  const [result, setResult] = useState();

  const getValues = async () => {
    const storage = await LocalStorage.getAll();
    setStorageValues(storage);
  };

  const clearInput = () => {
    setKey();
    setValue();
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'snow' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        {/* <Button title="Get" onPress={() => {}} /> */}
        <Text>Search</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="search storage key"
          onEndEditing={async ({ nativeEvent: { text } }) => {
            if (!text) return;
            const value = await LocalStorage.get(text);
            setResult(value);
            console.log('----', text, value, typeof value);
          }}
          clearButtonMode="always"
          autoCapitalize="none"
        />

        <Text style={{ flex: 1 }}>{result}</Text>
      </View>

      <View style={{ flexDirection: 'column' }}>
        <TextInput
          style={styles.input}
          placeholder="key"
          value={key}
          onChangeText={(text) => {
            setKey(text);
          }}
          clearButtonMode="always"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="value"
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
          clearButtonMode="always"
          autoCapitalize="none"
        />
        <Button
          title="Add"
          onPress={() => {
            LocalStorage.set(key, value).then((res) => {
              console.log('LocalStorage', res);
              getValues();
              clearInput();
            });
          }}
        />
      </View>

      <FlatList
        data={storageValues}
        renderItem={({ item: [key, value], index }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              backgroundColor: index % 2 === 1 ? 'azure' : '#eee',
            }}
          >
            <Text>{`${key} : ${value}`}</Text>
            <Button
              title="Remove"
              onPress={() => {
                AsyncStorage.removeItem(key);
                getValues();
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item[0]}
      />
      <Button
        title="Clear"
        color="red"
        onPress={async () => {
          await LocalStorage.clear();
          getValues();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 8,
    padding: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default LocalStorageDemo;
