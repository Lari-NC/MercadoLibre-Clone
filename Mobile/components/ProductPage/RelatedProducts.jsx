import React, { useState, useEffect } from "react";
import SectionWithName from "./SectionWithName";
import { View, StyleSheet, Text } from "react-native";
import ProductMobile from "../Product/ProductMobile";
import service from "../../service/Api"

const RelatedProducts = ({ product }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await service.getRelatedProducts(product.id);
                setRelatedProducts(products);
            } catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Error fetching products"
                });
            }
        };
        fetchProducts();
    }, [product]);

    return (
        <SectionWithName title="Related Products">
                <View style={styles.container}>
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((item) => 
                            <View style={styles.product} key={item.id} >
                                <ProductMobile product={item} />
                            </View>
                        )
                    ) : (<Text> There are no related products </Text>)}
                </View>
        </SectionWithName>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#00000040',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    product: {
        width: '50%',
    }
});

export default RelatedProducts;