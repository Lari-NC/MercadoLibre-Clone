import React, { useState } from 'react';
import CartPurchaseSummaryWithoutButtonShop from '../CartPurchaseSummaryWithoutButtonShop/CartPurchaseSummartyWithoutButtonShop';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import './Purchase.css';
import { useLocation } from 'react-router-dom'; 

const Purchase = () => {
    const location = useLocation();
    const { quantityProducts, quantityShipping, priceProduct, priceShipping } = location.state || {};

    return (
        <div className="Purchase">
            <PaymentMethod/> 
            <CartPurchaseSummaryWithoutButtonShop 
                quantityProducts={quantityProducts} 
                quantityShipping={quantityShipping} 
                priceProduct={priceProduct} 
                priceShipping={priceShipping} 
            />
        </div>
    )         

};

export default Purchase;
