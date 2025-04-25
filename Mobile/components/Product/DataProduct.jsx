import React from "react";
import { StyleSheet, View, Text } from "react-native";

const DataProduct = ({ product }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.owner}>By {product.owner.name}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        height: 40,
        gap: 4,
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: 10,
       
    },
    productName: {
        fontSize: 14,
        lineHeight: 18,
        margin: 0,
        textAlign: "left",
        color: "#000000",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    owner: {
        margin: 0,
        color: "#666666",
        fontSize: 13,
        lineHeight: 18,
        textAlign: "left",
    },
});

export default DataProduct;