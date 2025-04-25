import { Link, useParams } from 'react-router-dom';
import BasicButton from '../Button/BasicButton';
import ChevronRightIcon from '../../assets/icons/chevronRightIcon.svg';
import ProductHorizontal from '../Product/ProductHorizontal'
import ProductCharacteristics from '../Product/ProductCharacteristics'
import ProductDescription from '../Product/ProductDescription'
import RelatedProducts from '../Product/RelatedProducts'
import service from '../../service/Api';
import './ProductById.css';
import { useEffect, useState } from 'react';

const ProductById = ({ isLoggedIn }) => {
    const {id} = useParams();
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [images, setImages] = useState ('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [characteristics, setCharacteristics] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await service.getProductByID(id);
                setCategoryId(productData.category.id);
                setCategoryName(productData.category.name);
                setImages(productData.images);
                setCharacteristics(productData.characteristics);
                setDescription(productData.description)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    const capitalize = (text) => {
        return text
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    return (
        <div className="ProductById">
            <div className="category">
                <Link to="/categories">
                    <BasicButton text="Categorias" />
                </Link>
                <img src={ChevronRightIcon} alt="to" />
                <Link to={`/category/${categoryId}`}>
                    <BasicButton text={capitalize(categoryName)} />
                </Link>
            </div>
            <ProductHorizontal images={images} isLoggedIn={isLoggedIn}/>
            <ProductCharacteristics characteristics={characteristics} />
            <ProductDescription description={description}/>
            <RelatedProducts isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default ProductById;