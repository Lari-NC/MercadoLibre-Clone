import './ProductInfo.css'
import Button from '../Button/Button';
import FavButton from '../Button/FavButton';
import service from '../../service/Api';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputSelectUnits from '../InputSelect/InputSelectUnits';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductInfo = ({ isLoggedIn }) => {
    const { id } = useParams();
    const [productName, setProductName] = useState('');
    const [productOwner, setProductOwner] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productShipping, setProductShipping] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productQuantity, setProductQuantity] = useState(1); 
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(1); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await service.getProductByID(id);
                setProductName(productData.title);
                setProductOwner(productData.owner);
                setProductPrice(productData.price);
                setProductShipping(productData.shipping.price);
                setProductStock(productData.stock);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchUser = async () => {
            if(isLoggedIn) {
                try {
                    const user = await service.getUser(); 
                    setUserId(user.id); 
                } catch (err) {
                    return;
                }
            }
        };

        const fetchCart = async () => {
            if(isLoggedIn) {
                try {
                    const cartBody = await service.getCart();
                    setAmount(cartBody.amount); 
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchProducts();
        fetchUser();
        fetchCart();

    }, [id]);

    useEffect(() => {
        setAmount(productQuantity);
    }, [productQuantity]);

    const navigate = useNavigate();

    const handleAdd = async () => {
        if(isLoggedIn) {
            await service.addProductToCart(id, amount); 
            toast.success('Producto añadido al carrito');
            navigate('/cart');
        } else {
            toast.error('No se pudo añadir al carrito: debe iniciar sesion');
        }
    };

    const priceDivided = productPrice ? (productPrice / 12).toFixed(2) : '0.00';

    return (
        <div className="ProductInfo">
            <div className="info">
                <FavButton productId={id} isLoggedIn={isLoggedIn}/>
                <p className="title">{productName}</p>
                <Link to={`/user/${productOwner.id}`}>
                <p className="owner">Por {productOwner.name}</p>
                </Link>
                <div className="payment-info">
                    <p className="price">$ {productPrice ? productPrice.toFixed(2) : '0.00'}</p>
                    <p className="installments">En 12 cuotas de $ {priceDivided}</p>
                </div>
                <p className="shipping"> Envío: ${productShipping ? productShipping.toFixed(2) : '0.00'} </p>
                <div className="product-stock">
                    <p className="s-disp">Stock disponible</p>
                    <p className="cant-disp">+{productStock} disponibles</p>
                </div>
                <div className="product-quantity">
                    <p>Cantidad:</p>
                    <InputSelectUnits
                        quantity={productStock}
                        onChange={(selectedQuantity) => setProductQuantity(selectedQuantity)} 
                    />
                </div>
            </div>
            <div className="buttons">
                <Button text="Agregar al carrito" onClick={handleAdd}/>
                { userId == productOwner.id ? (
                    <Link to={`/editProduct/${id}`}>
                        <Button text="Editar" />
                    </Link>
                ) : null }
                    
            </div>
        </div>
    );
};

export default ProductInfo;