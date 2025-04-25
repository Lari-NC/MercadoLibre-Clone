import './UserNav.css';
import { useEffect, useState } from 'react';
import service from '../../service/Api'
import Product from '../Product/Product';

const UserNav = ({ isLoggedIn }) => {

    const [userData, setUserData] = useState({
        likedProducts: [],
        salesHistory: [],
        purchaseHistory: [],
        products: []
    });
    const [selectedButton, setSelectedButton] = useState('My Products');
    const [error, setError] = useState('');

    const handleButtonClick = (buttonName) => setSelectedButton(buttonName);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await service.getUser();
                setUserData({
                    likedProducts: user.likedProducts,
                    salesHistory: user.salesHistory,
                    purchaseHistory: user.purchaseHistory,
                    products: user.products
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    const getProductList = () => {
        switch (selectedButton) {
            case 'Liked':
                return userData.likedProducts;
            case 'Sales':
                return userData.salesHistory.map(sale => sale.product);
            case 'Purchases':
                return userData.purchaseHistory.flatMap(purchase => 
                    purchase.items.map(item => item.product)
                );
            case 'My Products':
                return userData.products;
            default:
                return [];
        }
    };

    const updateLikedProducts = async (updatedProduct) => {
        try {
            setUserData((prevState) => ({
                ...prevState,
                likedProducts: updatedProduct.likedProducts || [] 
            }));
        } catch (err) {
            setError("Error al actualizar el producto.");
        }
    };

    const renderProducts = () => {
        const productList = getProductList();
        return (
            productList.length > 0 ? (
                productList.map(product => (
                    <Product key={product.id} product={product} updateLikedProducts={(id) => updateLikedProducts(id)} isLoggedIn={isLoggedIn}/>
                ))
            ) : (
                <p>No hay productos disponibles.</p>
            ))
    };

    return (
        <div className="UserNav">
            <div className="button-group">
                <button
                    className={selectedButton === 'Liked' ? 'selected' : ''}
                    onClick={() => handleButtonClick('Liked')}
                >
                    Liked
                </button>
                <button
                    className={selectedButton === 'Sales' ? 'selected' : ''}
                    onClick={() => handleButtonClick('Sales')}
                >
                    Sales
                </button>
                <button
                    className={selectedButton === 'Purchases' ? 'selected' : ''}
                    onClick={() => handleButtonClick('Purchases')}
                >
                    Purchases
                </button>
                <button
                    className={selectedButton === 'My Products' ? 'selected' : ''}
                    onClick={() => handleButtonClick('My Products')}
                >
                    My Products
                </button>
            </div>

            <div className="products">
                {renderProducts()}
            </div>

            {error && <p>Error: {error}</p>}
        </div>
    );
};
export default UserNav;