import React from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import LeftArrowIcon from '../../assets/icons/leftArrowIcon.svg';
import { useRouter } from 'expo-router';

const TemplateWithBack = ({ name, children }) => {

    const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <LeftArrowIcon/>
        </TouchableOpacity >
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    gap: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#000000E5',
    paddingBottom: 5,
  },
  content: {
    backgroundColor: '#E7E7E7',
    flex: 1
  },
});

export default TemplateWithBack; 