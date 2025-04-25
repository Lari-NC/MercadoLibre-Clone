import React, { useState } from 'react';
import TemplateWithBack from './navigation/TemplateWithBack';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import InputWithName from './Inputs/InputWithName';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import service from '../service/Api'
import { useAuthContext } from "../hooks/AuthContext";

const Purchase = ({ totalPrice, priceShipping }) => {

    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const { setUser } = useAuthContext();
    const [error, setError] = useState('');
    
    const navigation = useNavigation();
    
    const validateExpirationDate = (date) => {
        const regex = /^\d{4}\/(0[1-9]|1[0-2])$/;
        return regex.test(date);
    };

    const shopMethod = async () => {
        if (!name.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Name cannot be blank',
            });
            return;
        }

        if (!cardNumber.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Card number cannot be blank',
            });
            return;
        }

        if (!cvv.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Card CVV cannot be blank',
            });
            return;
        }

        if (!expirationDate.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Expiration date cannot be blank',
            });
            return;
        }

        if (!validateExpirationDate(expirationDate)) {
            Toast.show({
                type: 'error',
                text1: "Invalid expiration date format. Use 'yyyy/MM'.",
            });
            return;
        }
        
        setError('');

        try {
            const newUser = await service.purchaseCart(cardNumber, expirationDate, cvv, name);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Purchase successful',
                visibilityTime: 3000,
            });
            setUser(newUser);
            navigation.navigate('index');
            navigation.navigate('home');
        } catch (error) {
            setError('Invalid credentials, please try again.');
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Registration error',
                visibilityTime: 3000,
            });
        }
    };
    
    return (
        <TemplateWithBack name="Purchase">
            <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ flex: 1 }}>
                <View style={styles.containerTop}>
                    <View style={styles.priceRow}>
                        <Text style={styles.totalText}>Total</Text>
                        <Text style={styles.totalPrice}>$ {totalPrice}</Text>
                    </View>
                    <View style={styles.shippingRow}>
                        <Text style={styles.shippingText}>Shipping</Text>
                        <Text style={styles.shippingPrice}>$ {priceShipping}</Text>
                    </View>
                </View>
                <View style={styles.containerBottom}>
                    <Text style={styles.paymentTitle}>Choose how to pay</Text>

                    <InputWithName 
                        title="Name"
                        value={name} 
                        onChangeText={(text) => setName(text)} 
                    />
                    <InputWithName 
                        title="Card Number"
                        value={cardNumber}
                        onChangeText={(text) => setCardNumber(text)}
                    />
                    <InputWithName 
                        title="CVV"
                        value={cvv}
                        onChangeText={(text) => setCvv(text)}
                    />
                    <InputWithName 
                        title="Expiration Date"
                        value={expirationDate}
                        onChangeText={(text) => setDate(text)}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <CustomButton title="Comprar" onPress={shopMethod} /> 
                </View>
            </ScrollView>
        </TemplateWithBack>
    );
};



const styles = StyleSheet.create({
    scrollViewContent: { 
        paddingBottom: 90,
    },
    containerTop: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        borderRadius: 8,
        marginVertical: 16,
        padding: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    shippingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    totalText: {
        fontSize: 24,
        color: '#333333',
    },
    totalPrice: {
        fontSize: 24,
        color: '#333333',
    },
    shippingText: {
        fontSize: 18,
        color: '#666666',
    },
    shippingPrice: {
        fontSize: 18,
        color: '#666666',
    },
    containerBottom: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 16,
        gap: 24,
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        alignSelf: 'center',
        borderRadius: 8,
        marginVertical: 16,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
    },
    paymentTitle: {
        fontSize: 24,
        color: '#333333',
        textAlign: 'left',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#00000024',
    },
    buyButton: {
        marginTop: 16,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
});

export default Purchase;