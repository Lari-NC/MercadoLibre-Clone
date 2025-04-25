import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import RegisterForm from "../../../components/RegisterForm";

export default function RegisterScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <RegisterForm/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E7E7',
        justifyContent: 'center',
        marginBottom: 80,
    },
});