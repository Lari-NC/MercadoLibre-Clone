import React from "react";
import { Image, StyleSheet, View, Text, TouchableHighlight } from "react-native";
import DataProduct from "./DataProduct";
import FavButton from "../FavButton";
import { useRouter } from 'expo-router';

const ProductMobile = ({product}) => {
    const router = useRouter();
    const priceDivided = product.price ? (product.price / 12).toFixed(2) : '0.00';

    return (
        <TouchableHighlight onPress={() => router.push(`/product/${product.id}`)} >

        <View style={styles.container}>
            <View style={styles.Product_top}>
                <View style={styles.favButton}>
                    <FavButton productId={product.id} />
                </View>
                <Image 
                    style={styles.image} 
                    source={{ uri: product.images[0] }} 
                    resizeMode="contain" 
                />
            </View>
            <View style={styles.horizontal_line} />
            <View style={styles.Product_bottom}>
                <DataProduct product={product}/>
                <View style={styles.priceDataProduct}>
                    <Text style={styles.price}>$ {product.price ? product.price.toFixed(2) : '0.00'}</Text>
                    <Text style={styles.installments}>In 12 payments of ${priceDivided}</Text>
                </View>
            </View>
        </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        width: 188.5,
        backgroundColor: "#FFFFFF",
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#00000040',
        gap: 16,
    },
    horizontal_line: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#00000040",
        margin: 0,
        padding: 0,
    },
    Product_top: {
        height: 142,
        position: 'relative',
        alignItems: 'flex-end',
    },
    favButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: 106,
        alignSelf: "center",
        position: 'absolute',
        padding: 8,
        top: 24,
        zIndex: 1,
    },
    Product_bottom: {
        paddingHorizontal: 8,
        gap: 16,
    },
    priceDataProduct: {
        marginBottom: 24,
        height: 40,
        gap: 4,
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "flex-start",
    },
    price: {
        fontSize: 18,
        color: "#000000",
        lineHeight: 18,
        textAlign: "left",
    },
    installments: {
        fontSize: 14,
        lineHeight: 18,
        textAlign: "left",
        color: "#00A650",
    }
});

export default ProductMobile;