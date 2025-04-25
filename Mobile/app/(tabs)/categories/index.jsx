import React, { useEffect, useState } from "react";
import Template from "../../../components/navigation/Template";
import { FlatList, StyleSheet, View } from "react-native";
import CustomCategory from "../../../components/CustomCategory";
import service from '../../../service/Api'
import { useRouter } from 'expo-router';
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

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await service.getCategories();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Template name="Categories">
            <View style={styles.container}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <CustomCategory 
                            title={categoryNames[item.id]} 
                            image={categoryIcons[item.id]}
                            onPress={() => router.push(`/(tabs)/categories/${item.id}`)} 
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 16,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    grid: {
        alignItems: 'center',
        paddingBottom: 80,
    },
});