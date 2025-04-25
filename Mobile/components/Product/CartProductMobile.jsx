import {React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import DataProduct from './DataProduct';
import Amount from '../Amount';
import BasicButton from '../BasicButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


     const CartProductMobile = ({product, onAmountChange, quantity, onDelete}) => {
        const [amount, setAmount] = useState(quantity || 1);
        AsyncStorage.setItem('amount', amount.toString());
        const totalPrice = product.price * amount;
         useEffect(() => {
           onAmountChange(amount);
        }, [amount, onAmountChange]);
        
        return (
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.infoContainer}>
                         <Image source={{ uri: product.images[0] }} style={styles.imagenBrat} /> 
                            <View style={styles.info}>
                            <DataProduct product={product} style={styles.dataProduct} />
                            <BasicButton title="Eliminar" onPress={onDelete} />
                            </View>
                        </View>
                        <View style={styles.amountPriceContainer}>
                            <Amount style={styles.amount} amount={amount} setAmount={setAmount} max={product.stock} productId={product.id}/>
                            <Text style={styles.topPrice}>$ {totalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.left}>Envío</Text>
                        <Text style={styles.right}>$ {product.shipping.toFixed(2)}</Text>
                    </View>
                </View>
            );
        }
        
        const styles = StyleSheet.create({
            imagenBrat: {
                height: 81.75,
                width: 100,
                marginRight: 10,
            },
            container: {
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 8,
            },
            top: {
                flexDirection: 'column',
                width: '100%',
                alignItems: 'flex-start',
                marginBottom: 10,
                overflow: 'hidden',
            },
            info: {
                paddingTop: 5,
                justifyContent:'space-between',
            },
            infoContainer: {
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
            },
            amountPriceContainer: { 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: 12,
                paddingLeft: 124,
            },
            amount: {
                alignSelf: 'flex-end', 
            },
            dataProduct: {
                marginBottom: 4,
            },
            topPrice: {
                fontSize: 18,
                color: '#333333',
                textAlign: 'right',
                flex: 1,
            },
            bottom: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderTopColor: '#00000040',
                paddingTop: 10,
                width: '100%',
            },
            left: {
                fontSize: 18,
                color: '#333333',
            },
            right: {
                fontSize: 18,
                color: '#333333',
            },
        });
        
export default CartProductMobile;