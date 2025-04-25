import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const CustomCategory = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={image} style={styles.images}/>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: width * 0.45,
        height: width * 0.45 * 0.6,
        backgroundColor: "white",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        margin: 4,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    images: {
        width: 48,
        height: 48,
    }
});

export default CustomCategory;