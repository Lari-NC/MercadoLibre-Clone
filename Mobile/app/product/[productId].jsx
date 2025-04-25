import React, { useState, useEffect } from "react";
import api from '../../service/Api';
import Product from '../../components/ProductPage/Product';
import TemplateWithBack from "../../components/navigation/TemplateWithBack";
import { useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

export default function ProductScreen() {
    const [product, setProduct] = useState(null);
    const { productId } = useLocalSearchParams(); 

    const getProduct = async () => {
        try {
            const response = await api.getProductByID(productId);
            setProduct(response);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error getting product"
            });
        } 
    };

    useEffect(() => {
        getProduct();
    }, [productId]);

    return (
        product && 
        <TemplateWithBack name={product.title}>
            <Product product={product} /> 
        </TemplateWithBack>
    );
};