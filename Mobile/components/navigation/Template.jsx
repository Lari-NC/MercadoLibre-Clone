import React from 'react';
import {Text, StyleSheet, SafeAreaView } from 'react-native';

const Template = ({ name, children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>{name}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.content}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  header: {
    width: '100%',
    height: 80,
    paddingLeft:16, 
    backgroundColor: '#FFE600',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24,
    color: '#000000E5',
    marginTop: 30,
  },
  content: {
    backgroundColor: '#E7E7E7',
    flex: 1
  },
});

export default Template; 