import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import service from '../service/Api';
import Toast from 'react-native-toast-message';

const Amount = ({ amount, setAmount, max, productId }) => {

    const increaseAmount = async () => {
        if (amount < max) {
            try {
                await service.addProductToCart(productId, amount + 1);
                setAmount(amount + 1);
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Error increasing amount"
                });
            }
        }
    };

    const decreaseAmount = async () => {
        if (amount > 1) {
            try {
                await service.addProductToCart(productId, amount - 1);
                setAmount(amount - 1);
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Error decreasing amount"
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={decreaseAmount}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{amount}</Text>
            <TouchableOpacity style={styles.button} onPress={increaseAmount}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 101,
        height: 32,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderColor: '#00000040',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    button: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 3,
    },
    buttonText: {
        color: '#3483FA',
        fontSize: 16,
    },
    text: {
        color: '#00000099',
        fontSize: 16,
    },
});

export default Amount;



