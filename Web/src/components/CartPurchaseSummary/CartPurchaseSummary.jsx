import './CartPurchaseSummary.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const CartPurchaseSummary = ({ quantityProducts, quantityShipping, priceProduct, priceShipping }) => {
    const validPriceProduct = priceProduct ?? 0;
    const validPriceShipping = priceShipping ?? 0;

    return (
        <div className="CartPurchaseSummary">
            <p className="cartPurchaseSummaryTitle">Resumen de compra</p>
            
            <div className="summaryRow">
                <p className="productosTitle">Productos ({quantityProducts})</p>
                <p className="price"> $ {validPriceProduct.toFixed(2)}</p>
            </div>
            
            <div className="summaryRow">
                <p className="enviosTitle">Envíos ({quantityShipping}) </p>
                <p className="price"> $ {validPriceShipping.toFixed(2)} </p>
            </div>
            
            <div className="totalRow">
                <p className="totalTitle">Total</p>
                <p className="totalPrice"> $ {(validPriceProduct + validPriceShipping).toFixed(2)} </p> 
            </div>

            <div className="buttonShop">
                <Link
                    to={{
                        pathname: "/purchase",
                    }}
                    state={{ 
                        quantityProducts: quantityProducts,
                        quantityShipping: quantityShipping,
                        priceProduct: validPriceProduct,
                        priceShipping: validPriceShipping 
                    }}
                >
                    <Button text="Comprar" />
                </Link>
            </div>
        </div>
    );
};

export default CartPurchaseSummary;