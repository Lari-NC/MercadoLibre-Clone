import React from "react";
import Purchase from "../../../components/Purchase";
import { useLocalSearchParams } from "expo-router";

export default function PurchaseScreen() {
    const { totalPrice, priceShipping } = useLocalSearchParams(); 
    return (
        <Purchase totalPrice={totalPrice} priceShipping={priceShipping}/>
    );
}