import './SimpleDataProduct.css';
import { Link } from 'react-router-dom';

const SimpleDataProduct = ({product}) => {
    return (
        <div className="SimpleDataProduct">
            <Link className="producto" key={product.id} to={`/product/${product.id}`}>
                <p className="productName">{product.title}</p>
            </Link>
            <Link className="producto" key={product.owner.id} to={`/user/${product.owner.id}`}>
                <p className="owner">Por {product.owner.name}</p>
            </Link>
        </div>
    );
};

export default SimpleDataProduct;