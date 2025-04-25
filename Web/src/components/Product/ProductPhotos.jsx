import './ProductPhotos.css'
import { useState, useEffect } from 'react';

const ProductPhotos = ({ images }) => {
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        if (images && images.length > 0) {
            setMainImage(images[0]);
        }
    }, [images]);

    const handleImageClick = (clickedImage) => {
        setMainImage(clickedImage);
    };

    return (
        <div className="ProductPhotos">
            <div className="left">
                {Array.isArray(images) && images.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 1}`}
                            onClick={() => handleImageClick(image)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))
                ) : (
                    <p>No images available</p> 
                )}
            </div>
            <div className="main-photo">
                {mainImage ? (
                    <img src={mainImage} alt="Main Product" />
                ) : (
                    <p>No main image available</p>
                )}
            </div>
        </div>
    );
};

export default ProductPhotos;