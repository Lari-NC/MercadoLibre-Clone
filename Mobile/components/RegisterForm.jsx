import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputWithName from "./Inputs/InputWithName";
import CustomButton from "./CustomButton";
import BasicButton from "./BasicButton";
import service from "../service/Api";
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const RegisterForm = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async () => {
        if (!name || name.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Please enter a valid name.",
            });
            return;
        }
        
        if (!email || email.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Please enter a valid email address.",
            });
            return;
        }
    
        if (!image || image.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Please upload a valid image.",
            });
            return;
        }
    
        if (!password || password.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Please enter a valid password.",
            });
            return;
        }
    
        setError('');
        try {
            const result = await service.register(name, email, password, image);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Registration successful',
                visibilityTime: 3000,
            });
            router.push("/(tabs)/user");
        } catch (err) {
            setError('Invalid credentials, please try again.');
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Registration error',
                visibilityTime: 3000,
            });
        }
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.divider} />
            <InputWithName 
                title="Name" 
                example="Name and Lastname" 
                value={name} 
                onChangeText={(text) => setName(text)} 
            />
            <InputWithName 
                title="Email" 
                example="example123@gmail.com" 
                value={email} 
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
            />
            <InputWithName 
                title="Image" 
                example="www.yourPicture.com/image.png" 
                value={image} 
                onChangeText={(text) => setImage(text)} 
            />
            <InputWithName 
                title="Password" 
                example="*****" 
                value={password} 
                secureTextEntry={true} 
                onChangeText={(text) => setPassword(text)} 
                autoCapitalize="none"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <CustomButton title="Register" onPress={register} />
            <BasicButton title="Login" onPress={() => router.push("/(tabs)/user")} />
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
    error: {
        color: 'red',
        marginBottom: 16,
        fontSize: 14,
    },
});

export default RegisterForm;