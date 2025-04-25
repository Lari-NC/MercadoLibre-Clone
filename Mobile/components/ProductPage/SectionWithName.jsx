import React from "react"; 
import { View, StyleSheet, Text } from "react-native";

const SectionWithName = ({ title, children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.horizontalLine}/>
            <View style={styles.section}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        gap: 8,
    },
    title: {
        fontSize: 20,
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#00000040',
    }
});

export default SectionWithName;