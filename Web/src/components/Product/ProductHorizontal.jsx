import './ProductHorizontal.css'
import ProductPhotos from './ProductPhotos';
import ProductInfo from './ProductInfo'

const ProductHorizontal = ({images, isLoggedIn}) => {
    return (
        <div className="ProductHorizontal">
            <ProductPhotos images={images}/>
            <ProductInfo isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default ProductHorizontal;