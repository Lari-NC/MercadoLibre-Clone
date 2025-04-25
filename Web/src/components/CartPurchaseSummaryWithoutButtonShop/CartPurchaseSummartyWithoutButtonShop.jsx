import './CartPurchaseSummaryWithoutButtonShop.css';

const CartPurchaseSummaryWithoutButtonShop = ({quantityProducts, quantityShipping, priceProduct, priceShipping}) => {

    const validPriceProduct = typeof priceProduct === 'number' ? priceProduct : 0;
    const validPriceShipping = typeof priceShipping === 'number' ? priceShipping : 0;

    return (
        <div className="CartPurchaseSummaryWithoutButtonShop">
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
                <p className="totalPrice"> $ {(validPriceProduct + validPriceShipping).toFixed(2)} </p> {/* Solucionado */}
            </div>
        </div>
    );
};

export default CartPurchaseSummaryWithoutButtonShop;