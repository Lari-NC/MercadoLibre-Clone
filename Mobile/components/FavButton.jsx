import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StarIcon from "../assets/icons/starIcon.svg";
import StarIconFilled from "../assets/icons/starIconFilled.svg";
import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/AuthContext";
import service from '../service/Api'
import {  useRouter } from "expo-router";

const FavButton = ({ productId }) => {

    const [isLiked, setIsLiked] = useState(false);
    const {user, setUser} = useAuthContext()
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const checkIfLiked = () => {
                const isProductLiked = user.likedProducts.some(product => product.id === productId);
                setIsLiked(isProductLiked);
            };
            checkIfLiked();
        };
    }, [productId, user]);   

    const toggleLiked = async () => {
        if (user) {
            const userWithupdatedProduct = await service.likeProduct(productId); 
            setIsLiked(!isLiked);
            setUser(userWithupdatedProduct)
        } else {router.push("/(tabs)/user")};
    };

    return (
        <TouchableOpacity onPress={toggleLiked}>
            <View style={styles.container}>
                {isLiked ? <StarIconFilled /> : <StarIcon />}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, 
    },
    img: {
        width: 20,
        height: 20,
    },
});

export default FavButton;