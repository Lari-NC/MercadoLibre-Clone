import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight } from "react-native";
import CustomButton from "../CustomButton";
import DataProduct from "../Product/DataProduct";
import InputAmount from "../Inputs/InputAmount";
import service from "../../service/Api"
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../hooks/AuthContext";

const ProductInfo = ({ product }) => {
    const priceDivided = product.price ? (product.price / 12).toFixed(2) : '0.00';
    const productShipping = product.shipping.price ? product.shipping.price.toFixed(2) : '0.00';
    const productStock = product.stock;
    const [productQuantity, setProductQuantity] = useState(1);
    const images = product.images;
    const [mainImage, setMainImage] = useState(images && images.length > 0 ? images[0] : null);

    const { user } = useAuthContext()

    const handleAddProduct = () => {
        if (user) {
            try {
                const response = service.addProductToCart(product.id, productQuantity)
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Product added successfully',
                    visibilityTime: 3000,
                })
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Error adding product to cart"
                });
            }
        } else {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'You must log in to add products to the cart.',
                visibilityTime: 3000,
            });
        }
    }

    useEffect(() => {
        if (images && images.length > 0) {
            setMainImage(images[0]);
        }
    }, [images]);

    const handleImageClick = (clickedImage) => {
        setMainImage(clickedImage);
    };

    return (
        <View style={styles.container}>
            <DataProduct product={product} />
            <View style={styles.photoContainer}>
                {mainImage ? (
                    <Image 
                        source={{ uri: mainImage }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                    />
                ) : (
                    <Text>No main image available</Text>
                )}
            </View>
            <View style={styles.otherPhotosContainer} >
                {product.images.length > 0 ? (
                    product.images.map((item, index) => 
                        <TouchableHighlight 
                            onPress={() => handleImageClick(item)} 
                            underlayColor="transparent"
                            key={`image-${index}`}
                        >
                            <Image
                                source={{ uri: item }}
                                style={(item == mainImage)? (styles.mainPhoto) : (styles.otherPhoto)}
                            />
                        </TouchableHighlight>
                    )   
                ) : (
                    <Text>No images available</Text>
                )}      
            </View>

            <View style={styles.prices}>
                <Text style={styles.price}>${(product.price).toFixed(2)}</Text>
                <Text style={styles.installments}>In 12 payments of ${priceDivided}</Text>
            </View>
            <View style={styles.shippingContainer}>
                <Text style={styles.shipping}>Shipping: ${productShipping}</Text>
            </View>
            <InputAmount
                quantity={productStock}
                onChange={(selectedQuantity) => setProductQuantity(selectedQuantity)}
                style={styles.input}
            />
            <CustomButton title="Add to cart" onPress={handleAddProduct} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        position: "relative",
    },
    photoContainer: {
        height: 200,
    },
    otherPhotosContainer: {
        height: 80,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingLeft: 10,
    },
    mainPhoto: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#3483FA',
        borderRadius: 2,
        marginRight: 8
    },
    otherPhoto: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#00000040',
        borderRadius: 2,
        marginRight: 8,
    },
    prices: {
        gap: 4,
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
    },
    shippingContainer: {
    },
    shipping: {
        fontSize: 16,
    },
    input: {
    }
});

export default ProductInfo;
