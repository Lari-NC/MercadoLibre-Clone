import PurchaseSummary from '../PurchaseSummary/PurchaseSummary';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import './CartEmpty.css';

const CartEmpty = () => {
    return (
        <div className="CartEmpty">
            <ShoppingCart/>
            <PurchaseSummary/>
        </div>
    );
};

export default CartEmpty;