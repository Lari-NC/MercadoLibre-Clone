import SimpleDataProduct from '../DataProduct/SimpleDataProduct';
import FavButton from '../Button/FavButton'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({product,updateLikedProducts,isLoggedIn}) => {

    const priceDivided = product.price ? (product.price / 12).toFixed(2) : '0.00';

    return (
        <div className="Product">
            <div className="Product-top">
                <Link className="producto" key={product.id} to={`/product/${product.id}`}> 
                    <img src={product.images[0]} alt={`${product.owner.name}'s product`} /> 
                </Link>
            <FavButton productId={product.id}  updateLikedProducts={(id) => updateLikedProducts(id)} isLoggedIn={isLoggedIn}/>
            </div>
            <div className="horizontal-line"></div>
            <div className="Product-bottom">
                <SimpleDataProduct product={product}/>
                <p className="price">$ {product.price ? product.price.toFixed(2) : '0.00'}</p>
                <p className="installments">En 12 cuotas de ${priceDivided}</p>
            </div>
        </div>
    );
};

export default Product;