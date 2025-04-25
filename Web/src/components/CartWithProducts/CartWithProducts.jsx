import './CartWithProducts.css';
import CartPurchaseSummary from '../CartPurchaseSummary/CartPurchaseSummary';
import { useEffect, useState } from 'react';
import service from '../../service/Api';
import CartProduct from '../CartProduct/CartProduct';
import CartEmptyPage from "../CartEmpty/CartEmpty";
import { toast } from 'react-toastify';

const CartWithProducts = () => {
    const [cart, setCart] = useState({ user: null, items: [] });
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartResponse = await service.getCart();
    
                if (cartResponse.items.length === 0) {
                }
    
                const updatedItems = await Promise.all(cartResponse.items.map(async (item) => {
                    const productResponse = await service.getProductByID(item.product.id);
                    return {
                        ...item,
                        product: {
                            ...item.product,
                            stock: productResponse.stock,
                        
                    }
                }}));
    
                setCart({ ...cartResponse, items: updatedItems });
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCart();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await service.deleteProductFromCart(productId);
            const updatedProducts = cart.items.filter(el => el.product.id !== productId);
            setCart({...cart, items: updatedProducts})
        } catch (error) {
            toast.error("Error al eliminar el producto:" + productId);

        }
    };
    
    useEffect(() => {
        const total = cart?.items.reduce((acc, item) => {
            const price = parseFloat(item.product.price) || 0;
            const quantity = parseFloat(item.product.quantity) || 0;
            return acc + (price * quantity);
        }, 0);
        setTotalProducts(total);
    }, [cart?.items]);
    
    const totalShipping = cart?.items.length > 0 
        ? cart?.items.reduce((acc, item) => acc + parseFloat(item.product.shipping), 0) 
        : 0;

        const updateAmount = (itemId, newAmount) => {

            if (newAmount < 1) return; 
        
            setCart((prevCart) => {
                const updatedItems = [...prevCart.items];
                const index = updatedItems.findIndex((elem) => elem.product.id === itemId);
                if (updatedItems[index].product.quantity !== newAmount) {
                    updatedItems[index].product.quantity = newAmount;
                    return {
                        ...prevCart,
                        items: updatedItems,
                    };
                }
        
                return prevCart;
            });
        };

    const quantityProducts = cart?.items.reduce((acc, item) => acc + item.product.quantity, 0);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (cart?.items.length === 0) {
        return <CartEmptyPage />;
    }

    return (
        <div className="CartWithProducts">
            <div className="CartProductSummary">
                <p className="productsTitle"> Productos </p>
                {cart?.items.map((item) => (
                    <div key={item.product.id}>
                        <CartProduct
                            name={item.product.title}
                            owner={item.product.owner.name}
                            priceProduct={item.product.price}
                            price={item.product.shipping}
                            image={item.product.images[0]}
                            stock={item.product.stock}
                            quantity={item.amount}
                            onAmountChange={(newAmount) => updateAmount(item.product.id, newAmount)}
                            onDelete={() => handleDelete(item.product.id)}
                            productId={item.product.id}
                        />
                        {cart.items.some((nextItem) => nextItem.product.id !== item.product.id) && <hr className="cart-divider" />}
                    </div>
                ))}
            </div>
            <CartPurchaseSummary
                quantityProducts={quantityProducts}
                quantityShipping={cart?.items.length}
                priceProduct={totalProducts}
                priceShipping={totalShipping}
            />
        </div>
    );
};

export default CartWithProducts;