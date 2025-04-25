import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../../service/Api';
import SearchBar from '../SearchBar/SearchBar';
import BasicButton from '../Button/BasicButton'
import logo from '../../assets/images/logo.svg';
import cartIcon from '../../assets/icons/cart-icon.svg';
import './Header.css';

const Header = ({ isLoggedIn, setLoggedIn }) => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const user = await service.getUser(); 
                    setUserName(user.name); 
                    setLoggedIn(true)
                } catch (err) {
                    if (err.response && err.response.status !== 401) {
                        setError(err.message);
                    }
                }
            }
        };
        fetchUser();
    }, [isLoggedIn]);

    return (
        <header className="Header">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <SearchBar />
            <div className="button-group">
                <Link to="/categories">
                    <BasicButton text="Categorías" />
                </Link>
                <div className="vertical-line"></div>

                {isLoggedIn ? (
                    <div className="user-cart-container">
                        <Link to="/user">
                            <BasicButton text={userName} />
                        </Link>
                        <div className="cart-button">
                            <Link to="/cart">
                                <button aria-label="Carrito">
                                    <img src={cartIcon} alt="Carrito" className="cart-icon" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                
                    <div className ="">
                        <Link to="/register">
                            <BasicButton text="Creá tu cuenta" />
                        </Link>
                        <Link to="/login">
                            <BasicButton text="Ingresá" />
                        </Link>
                    </div>
                )}
            </div>
            {error && <p className="error">Error: {error}</p>}
        </header>
    );
};

export default Header;