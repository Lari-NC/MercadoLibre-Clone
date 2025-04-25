import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import InputWithName from "./Inputs/InputWithName";
import CustomButton from "./CustomButton";
import BasicButton from "./BasicButton";
import Vision from "../assets/icons/vision.svg";
import NoVision from "../assets/icons/noVision.svg";
import { useRouter } from 'expo-router';
import { useAuthContext } from "../hooks/AuthContext";

const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {handleLogin} = useAuthContext()

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.divider} />
            <InputWithName 
                title="Email" 
                example="example123@gmail.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <InputWithName 
                    title="Password" 
                    example="**********"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)} 
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <NoVision /> : <Vision />}
                </TouchableOpacity>
            </View>
            <CustomButton title="Login" onPress={() => handleLogin(email,password)} />
            <BasicButton title="Register"  onPress={() => router.push("/(tabs)/user/register")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        backgroundColor: "white",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingVertical: 24,
        gap: 16,
    },
    title: {
        color: 'black',
        fontSize: 24,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#00000040',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 39,
    },
});

export default LoginForm;