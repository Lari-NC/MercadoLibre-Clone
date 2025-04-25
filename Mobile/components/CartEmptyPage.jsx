import React from "react";
import Template from "../components/navigation/Template";
import { StyleSheet, View, Text } from "react-native";
import EmptyCart from "../assets/images/emptyCart.svg";
import CustomButton from "../components/CustomButton";
import { useNavigation } from '@react-navigation/native';

const CartEmptyPage = () => {

    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('home');
    }

    return (
        <Template name="Cart">
            <View style={styles.container}>
                <View style={styles.image}>
                    <EmptyCart />
                </View>
                <Text style={styles.text}>Empezá un carrito de compras!</Text>
                <View style={styles.button}>
                <CustomButton title="Descubrir productos" onPress={goToHome}/>
                </View>
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        gap: 24,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 96,
        marginHorizontal: 10,
        justifyContent: 'center',
        paddingTop: 50,
        alignItems: 'center',
    },
    image: {
        width: 111,
        height: 95,
        color: "#666666",
    },
    text: {
        fontSize: 32,
        color: "#000000",
        textAlign: 'center'
    },
    button: {
        width: 184,
        height: 100,
    }
});

export default CartEmptyPage;