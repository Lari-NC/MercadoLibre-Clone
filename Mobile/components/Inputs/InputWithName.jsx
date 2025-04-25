import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

const InputWithName = ({ title, example, value, onChangeText, secureTextEntry, autoCapitalize }) => {
    
    const capitalizeSetting = autoCapitalize !== undefined ? autoCapitalize : "sentences";

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder={example}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                autoCapitalize={capitalizeSetting} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 59,
        width: '100%',
        marginBottom: 10,
    },
    title: {
        color: 'black',
        fontSize: 16,
    },
    input: {
        height: 32,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginTop: 8,
    },
});

export default InputWithName;