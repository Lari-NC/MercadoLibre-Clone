import React, { useState, useCallback } from "react";
import Template from "../../components/navigation/Template";
import InputSearch from "../../components/Inputs/InputSearch";
import { FlatList, StyleSheet, View, Text } from "react-native";
import NoResultsFound from "../../assets/images/NoResultsFound.svg";
import ProductMobile from "../../components/Product/ProductMobile"; 
import service from "../../service/Api";
import Toast from "react-native-toast-message";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const getProducts = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await service.search(searchQuery, currentPage);
            setProducts(prevProducts => [...prevProducts, ...response.products]);
            setCurrentPage(prevPage => prevPage + 1);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error fetching products"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (text) => {
        setSearchQuery(text);
        setSearchPerformed(false); 
    };

    const handleSearchSubmit = () => {
        setProducts([]);
        setCurrentPage(1); 
        setSearchPerformed(true); 
        getProducts();
    };

    const handleEndReached = useCallback(() => {
        if (!loading && searchPerformed) {
            getProducts();
        }
    }, [loading, searchPerformed]);

    return (
        <Template name="Search">
            <View style={styles.container}>
                <InputSearch 
                    searchQuery={searchQuery} 
                    onSearchChange={handleSearchChange} 
                    onSearchSubmit={handleSearchSubmit} 
                />
                <FlatList
                    data={searchPerformed ? products : []} 
                    renderItem={({ item }) => <ProductMobile product={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.productsContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        searchPerformed ? (
                            <View style={styles.noResultsContainer}>
                                <NoResultsFound />
                                <Text style={styles.noResultsText}>No results found</Text>
                            </View>
                        ) : (
                            <View style={styles.noResultsContainer}>
                                <NoResultsFound />
                                <Text style={styles.noResultsText}>Try to search a product</Text>
                            </View>
                        )
                    }
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        gap: 10,
    },
    productsContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 8,
        paddingBottom: 146, 
    },
    noResultsContainer: {
        paddingTop: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    noResultsText: {
        marginTop: 10,
        fontSize: 32,
        color: 'gray',
    },
});
