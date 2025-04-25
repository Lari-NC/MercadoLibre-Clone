import React from "react";
import SectionWithName from "./SectionWithName";
import { View, StyleSheet, Text } from "react-native";

const CharacteristicsProduct = ({ product }) => {
    return (
        <SectionWithName title="Characteristics">
            <View style={styles.container}>
                <View style={styles.values}>
                {product.characteristics.length > 0 ? (
                        product.characteristics.map((item, index)=>(
                            <View style={styles.item} key={`characteristic-${index}`}>
                                <Text> {item.name}: {item.value} </Text>
                            </View>
                        ))
                    ): ( <Text> No characteristics </Text>)}
                </View>
            </View>
        </SectionWithName>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 8,
    },
    values: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent:'left',
    },
    item: {
        width: "50%",
        paddingVertical: 5,
    },
});

export default CharacteristicsProduct;