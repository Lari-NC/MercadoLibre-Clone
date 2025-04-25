import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProductInfo from "./ProductInfo";
import CharacteristicsProduct from "./CharacteristicsProduct";
import DescriptionProduct from "./DescriptionProduct";
import RelatedProducts from "./RelatedProducts";
import QuestionProduct from "./QuestionProduct";

const Product = ({ product }) => {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <ProductInfo product={product} style={styles.info} />
            <CharacteristicsProduct product={product} style={styles.characteristics} />
            <DescriptionProduct product={product}/>
            <RelatedProducts product={product}/>
            <QuestionProduct product={product}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 10,
        gap: 10,
        paddingBottom: 90,
    },
    info: {
        zIndex: 10,
    },
    characteristics: {
        zIndex: 1,
    }
});

export default Product;
