import './RelatedProducts.css';
import Product from './Product';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import service from '../../service/Api'

const RelatedProducts = ({ isLoggedIn }) => {
    const {id} = useParams()
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await service.getRelatedProducts(id)
                setRelatedProducts(products);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, [id]);

    return (
        <div className='RelatedProducts' >
            <h1>Productos relacionados</h1>
            <div className="line"></div>
            <div className="products">
            {relatedProducts.length > 0 ? (
                    relatedProducts.slice(0, 6).map(product => (
                        <Product key={product.id} product={product} isLoggedIn={isLoggedIn}/>
                    ))
                ) : (
                    <p>No hay productos relacionados.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;