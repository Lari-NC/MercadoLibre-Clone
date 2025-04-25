import './ShoppingCart.css';
import Button from '../Button/Button';
import cartIcon from '../../assets/icons/cartIcon.svg';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    return (
        <div className="ShoppingCart">
            <img src={cartIcon} alt="Carrito" className="cartIcon" />
            <p className="cartText">Empezá un carrito de compras!</p>
            <div className="buttonCart">
            <Link to="/">
                    <Button text="Descubrir productos" />
                </Link>
            </div>
        </div>
    );
};

export default ShoppingCart;