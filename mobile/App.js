import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Routes from './src/routes';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.bold} >Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 40
  }
});

