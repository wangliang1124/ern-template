import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';

function NoSafeArea() {
  return (
    // <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1, backgroundColor: '#1F9AFF' }}>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
      <Text style={styles.text}>
        test test test test test test test test test test test test test test test test test test test test test test
        test test test test
      </Text>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 18, color: '#fff' },
});

export default NoSafeArea;
