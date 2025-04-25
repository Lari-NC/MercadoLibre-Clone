import React from 'react';
import './Amount.css';
import service from '../../service/Api';

const Amount = ({ amount, setAmount, max, productId}) => {

    const increaseAmount = async () => {
        if (amount < max) {
            await service.addProductToCart(productId, amount + 1)
            setAmount(amount + 1);
        }
    };

    const decreaseAmount = async () => {
        if (amount > 1) {
            await service.addProductToCart(productId, amount - 1)
            setAmount(amount - 1);
        }
    };

    return (
        <div className="Amount">
            <button className="decrease" onClick={decreaseAmount}>-</button>
            <p className="number">{amount}</p>
            <button className="increase" onClick={increaseAmount}>+</button>
        </div>
    );
};

export default Amount;