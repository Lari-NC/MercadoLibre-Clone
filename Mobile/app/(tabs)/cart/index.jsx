import React, { useEffect, useState } from "react";
import Template from "../../../components/navigation/Template";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CartProductMobile from '../../../components/Product/CartProductMobile';
import CustomButton from "../../../components/CustomButton";
import CartEmptyPage from "../../../components/CartEmptyPage";
import service from '../../../service/Api';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from "../../../hooks/AuthContext";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function Cart() {
    const [cart, setCart] = useState({ user: null, items: [] });
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const {user, setUser} = useAuthContext()
    const isFocused = useIsFocused();
    const router = useRouter();

    const navigation = useNavigation();

    const goToPurchase = () => {
        navigation.navigate('purchase', {
            totalPrice: totalProducts.toFixed(2),   
            priceShipping: totalShipping.toFixed(2),  
        });
    };

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
            try {
                const cartResponse = await service.getCart();        
                if (cartResponse.items.length === 0) {
                                  
                    setCart(cartResponse);
                    return;  
                }
                const updatedItems = await Promise.all(cartResponse.items.map(async (item) => {
                    const productResponse = await service.getProductByID(item.product.id);
                    return {
                        ...item,
                        product: {
                            ...item.product,
                            stock: productResponse.stock,
                            quantity: item.amount || 1,
                        },
                    };
                }));
                setCart({ ...cartResponse, items: updatedItems });

            } catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Error fetching cart"
                });
            }
        } else { router.push("/(tabs)/user") };
    };
        if(isFocused) fetchCart();
    }, [isFocused]);

    const handleDelete = async (productId) => {
        try {
            await service.deleteProductFromCart(productId);
            const updatedProducts = cart.items.filter(el => el.product?.id !== productId);
            setCart({...cart, items: updatedProducts})
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error deleting product"
            });
        }
    };  
    
    useEffect(() => {
        const total = cart?.items.reduce((acc, item) => {
            const price = parseFloat(item.product.price) || 0;
            const quantity = parseFloat(item.product.quantity) || 0;
            return acc + (price * quantity);
        }, 0);
        setTotalProducts(total);
    }, [cart?.items]);

    const totalShipping = cart?.items.length > 0 
        ? cart?.items.reduce((acc, item) => acc + parseFloat(item.product.shipping), 0) 
        : 0;

    const updateAmount = (itemId, newAmount) => {
        if (newAmount < 1) return; 
        setCart((prevCart) => {
            const updatedItems = [...prevCart.items];
            const index = updatedItems.findIndex((elem) => elem.product.id === itemId);
            if (updatedItems[index].product.quantity !== newAmount) {
                updatedItems[index].product.quantity = newAmount;
                return {
                    ...prevCart,
                    items: updatedItems,
                };
            }
            return prevCart;
        });
    };

    if (error) {
        return <View><Text>Error: {error}</Text></View>;
    }

    if (cart?.items.length === 0 || !!!user) {
        return <CartEmptyPage />;
    }

    return (
        <Template name="Cart" style={{ flex: 1 }}> 
        <View style={styles.mainContainer}> 
            <ScrollView style={styles.scrollViewContent} >
                <View style={styles.containerProducts}>
                    <Text style={styles.titleProduct}>Products</Text>
                    {cart.items.length ? (
                        cart.items.map((item) => item.product && (
                            <CartProductMobile 
                                key={item.product.id}
                                product={item.product}
                                quantity={item.amount}
                                onAmountChange={(newAmount) => updateAmount(item.product.id, newAmount)}
                                onDelete={() => handleDelete(item.product.id)}
                            />
                        ))
                    ) : ( 
                        <CartEmptyPage />
                    )}
                </View>
            </ScrollView>        
            <View style={styles.summaryContainer}> 
                <View style={styles.summaryRowShipping}>
                    <Text style={styles.summaryText}>Shipping ({cart.items.length})</Text>
                    <Text style={styles.summaryPrice}>$ {totalShipping.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRowTotal}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalPrice}>$ {totalProducts.toFixed(2)}</Text>
                </View>
                <View style={styles.button}>
                    <CustomButton title="Comprar" onPress={goToPurchase} />
                </View>
            </View>
        </View>
        </Template>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.9,
        marginVertical: 24,
    },
    scrollViewContent: { 
        paddingBottom: 60,
        marginBottom: 16,
    },
    containerProducts: {
        width: '90%',
        backgroundColor: "#FFFFFF",
        gap: 24,
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignSelf: 'center',
        borderRadius: 8,
    },
    titleProduct: { 
        fontSize: 24,
        color: '#333333',
        textAlign: 'left',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#00000024',
    },
    summaryContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 16,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
    },
    summaryRowShipping: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    summaryRowTotal: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        paddingBottom: 8,
    },
    summaryText: { 
        fontSize: 18,
        fontWeight: '300',
        color: '#333333',
    },
    summaryPrice: { 
        fontSize: 18,
        fontWeight: '300',
        color: '#333333',
    },
    totalText: { 
        fontSize: 24,
        color: '#333333',
    },
    totalPrice: { 
        fontSize: 24,
        color: '#333333',
    },
    button: {
        width: '100%',
        height: 34,
    },
    grid: {
        gap: 16,
    },
})
