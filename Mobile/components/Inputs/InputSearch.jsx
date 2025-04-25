import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from "../../assets/icons/search-icon.svg";

const InputSearch = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChangeText={onSearchChange}
                onSubmitEditing={onSearchSubmit}
            />
            <View style={styles.verticalLine} />
            <TouchableOpacity style={styles.button} onPress={onSearchSubmit}>
                <SearchIcon />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        overflow: 'hidden',
        borderWidth: 0,
        borderRadius: 2,
        backgroundColor: 'white',
        elevation: 3,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'transparent',
        paddingLeft: 10,
        fontSize: 13,
    },
    button: {
        height: 40,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    verticalLine: {
        height: 24,
        width: 1,
        backgroundColor: '#00000099',
        marginLeft: 10,
    }
});

export default InputSearch;