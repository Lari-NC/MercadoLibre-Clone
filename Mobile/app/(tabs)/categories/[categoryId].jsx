import React, { useState, useEffect } from "react";
import TemplateWithBack from "../../../components/navigation/TemplateWithBack";
import { FlatList, StyleSheet, View, ActivityIndicator, Text, Image } from "react-native";
import service from "../../../service/Api";
import ProductMobile from "../../../components/Product/ProductMobile";
import { useLocalSearchParams } from "expo-router";
import bagsIcon from "../../../assets/icons/categoriesIcons/bags.png";
import beautyIcon from "../../../assets/icons/categoriesIcons/beauty.png";
import dressesIcon from "../../../assets/icons/categoriesIcons/dresses.png";
import fraganceIcon from "../../../assets/icons/categoriesIcons/fragance.png";
import furnitureIcon from "../../../assets/icons/categoriesIcons/furniture.png";
import groceriesIcon from "../../../assets/icons/categoriesIcons/groceries.png";
import homeDecorationIcon from "../../../assets/icons/categoriesIcons/home-decoration.png";
import kitchenAccessoriesIcon from "../../../assets/icons/categoriesIcons/kitchen-accessories.png";
import laptopsIcon from "../../../assets/icons/categoriesIcons/laptop.png";
import shirtsIcon from "../../../assets/icons/categoriesIcons/shirts.png";
import shoesIcon from "../../../assets/icons/categoriesIcons/shoes.png";
import watchesIcon from "../../../assets/icons/categoriesIcons/watches.png";
import motorcycleIcon from "../../../assets/icons/categoriesIcons/motorcycle.png";
import skinCareIcon from "../../../assets/icons/categoriesIcons/skin-care.png";
import smartphonesIcon from "../../../assets/icons/categoriesIcons/smartphones.png";
import sportsAccessoriesIcon from "../../../assets/icons/categoriesIcons/sports-accessories.png";
import sunglassesIcon from "../../../assets/icons/categoriesIcons/sunglasses.png";
import tabletsIcon from "../../../assets/icons/categoriesIcons/tablets.png";
import topsIcon from "../../../assets/icons/categoriesIcons/tops.png";
import vehicleIcon from "../../../assets/icons/categoriesIcons/vehicle.png";
import jewelleryIcon from "../../../assets/icons/categoriesIcons/jewellery.png";
import Toast from "react-native-toast-message";

export default function CategoryScreen() {
    const { categoryId } = useLocalSearchParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const categoryNames = {
        "c_1": "Beauty",
        "c_2": "Fragrances",
        "c_3": "Furniture",
        "c_4": "Groceries",
        "c_5": "Home Decoration",
        "c_6": "Kitchen Accessories",
        "c_7": "Laptops",
        "c_8": "Shirts",
        "c_9": "Shoes",
        "c_10": "Watches",
        "c_11": "Mobile Accessories",
        "c_12": "Motorcycle",
        "c_13": "Skin Care",
        "c_14": "Smartphones",
        "c_15": "Sports Accessories",
        "c_16": "Sunglasses",
        "c_17": "Tablets",
        "c_18": "Tops",
        "c_19": "Vehicle",
        "c_20": "Bags",
        "c_21": "Dresses",
        "c_22": "Jewellery"
    };

    const categoryIcons = {
        "c_1": beautyIcon,
        "c_2": fraganceIcon,
        "c_3": furnitureIcon,
        "c_4": groceriesIcon,
        "c_5": homeDecorationIcon,
        "c_6": kitchenAccessoriesIcon,
        "c_7": laptopsIcon,
        "c_8": shirtsIcon,
        "c_9": shoesIcon,
        "c_10": watchesIcon,
        "c_11": smartphonesIcon,
        "c_12": motorcycleIcon,
        "c_13": skinCareIcon,
        "c_14": smartphonesIcon,
        "c_15": sportsAccessoriesIcon,
        "c_16": sunglassesIcon,
        "c_17": tabletsIcon,
        "c_18": topsIcon,
        "c_19": vehicleIcon,
        "c_20": bagsIcon,
        "c_21": dressesIcon,
        "c_22": jewelleryIcon
    };

    const categoryName = categoryNames[categoryId];
    const categoryIcon = categoryIcons[categoryId]

    const fetchProducts = async (newPage) => {
        try {
            if (newPage === 1) {
                setLoading(true);
            } else {
                setIsLoadingMore(true);
            }
            const response = await service.getProductsByCategory(categoryId,newPage);
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
    }, [page, categoryId]);

    const handleLoadMore = () => {
        if (!isLoadingMore && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <TemplateWithBack name={categoryName}>
            <View style={styles.container}>
                {loading && page === 1 ? ( 
                    <ActivityIndicator size="large" color="#3483FA" />
                ) : (
                    <>
                    <View style={styles.title}>
                        <Image style={styles.images} source={categoryIcon}/>
                        <Text style={{fontSize: 18}}>{categoryName}</Text>
                    </View>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductMobile product={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            isLoadingMore ? <ActivityIndicator size="small" color="#3483FA" /> : null
                        }
                    />
                    </>
                )}
            </View>
        </TemplateWithBack>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 16,
        marginHorizontal: 10,
        gap: 10,
    },
    grid: {
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 80
    },
    title: {
        backgroundColor: 'white',
        height: 64,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        elevation: 3,
    },
    images: {
        width: 48,
        height: 48,
    }
});
