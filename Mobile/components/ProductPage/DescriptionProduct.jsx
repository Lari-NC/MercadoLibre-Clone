import React from "react";
import SectionWithName from "./SectionWithName";
import { Text, StyleSheet } from "react-native";

const DescriptionProduct = ({ product }) => {
    return (
        <SectionWithName title="Description">
            <Text>{product.description}</Text>
        </SectionWithName>

    );
}

const styles = StyleSheet.create ({
    container: {
        
    },
});

export default DescriptionProduct;