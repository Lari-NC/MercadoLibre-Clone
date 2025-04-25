import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BasicButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
    },
    buttonText: {
        color: '#3483FA',
        fontSize: 14,
    },
});

export default BasicButton;