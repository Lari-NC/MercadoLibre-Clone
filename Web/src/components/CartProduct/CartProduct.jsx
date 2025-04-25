import React, { useState, useEffect } from 'react';
import Amount from '../Amount/Amount';
import DataProduct from '../DataProduct/DataProduct';
import './CartProduct.css';

const CartProduct = ({ name, price, priceProduct, image, owner, stock, onAmountChange, quantity, onDelete, productId}) => {
    const [amount, setAmount] = useState(quantity || 1);
    localStorage.setItem('amount', amount)
    const totalPrice = priceProduct * amount;

    useEffect(() => {
        onAmountChange(amount);
    }, [amount, onAmountChange]);

    return (
        <div className="CartProduct">
            <div className="Top">
                <DataProduct name={name} image={image} owner={owner} onDelete={onDelete}/>
                <Amount amount={amount} setAmount={setAmount} max={stock} productId={productId} />
                <p className="topPrice">$ {totalPrice.toFixed(2)}</p>
            </div>
            <div className="Bottom">
                <p className="left">Envío</p>
                <p className="right">$ {price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartProduct;