import React, { useState, useEffect } from "react";
import Template from "../../components/navigation/Template";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import service from "../../service/Api";
import ProductMobile from "../../components/Product/ProductMobile";
import { useIsFocused } from '@react-navigation/native';
import Toast from "react-native-toast-message";

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const isFocused = useIsFocused();

    const fetchProducts = async (newPage) => {
        try {
            if (newPage === 1) {
                setLoading(true);
            } else {
                setIsLoadingMore(true);
            }
            const response = await service.getAllProducts(newPage);
            const { products: newProducts, totalPages: fetchedTotalPages } = response;

            if (newProducts) {
                setProducts((prevProducts) =>
                    newPage === 1 ? newProducts : [...prevProducts, ...newProducts]
                );
                setTotalPages(fetchedTotalPages || 1);
            } 
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error fetching products"
            });
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page, isFocused]);

    const handleLoadMore = () => {
        if (!isLoadingMore && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <Template name="Latest updated products">
            <View style={styles.container}>
                {loading && page === 1 ? ( 
                    <ActivityIndicator size="large" color="#3483FA" />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductMobile product={item}/>}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        numColumns={2}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            isLoadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
                        }
                    />
                )}
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 8,
        marginVertical: 16,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    grid: {
        alignItems: 'center',
        paddingBottom: 80
    },
});
