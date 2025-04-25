import './FavButton.css';
import starIcon from '../../assets/icons/starIcon.svg';
import starIconFilled from '../../assets/icons/starIconFilled.svg';
import { useEffect, useState } from 'react';
import service from '../../service/Api';
import { toast } from 'react-toastify';

const FavButton = ({ productId, updateLikedProducts, isLoggedIn }) => {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const checkIfLiked = async () => {
            if(isLoggedIn) {
            const user = await service.getUser();
            const isProductLiked = user.likedProducts.some(product => product.id === productId);
            setIsLiked(isProductLiked);
            }
        };
        checkIfLiked();
    }, [productId, isLoggedIn]);

    const toggleLiked = async () => {
        if(isLoggedIn) {
            try {
                const updatedProduct = await service.likeProduct(productId); 
                setIsLiked(!isLiked);
                updateLikedProducts(updatedProduct); 
            } catch (err) {
            return;
            }
        } else {
            toast.error('Inicia sesión para agregar a favoritos');
        }
    };

    return (
        <div className="FavButton" onClick={toggleLiked}>
            <img src={isLiked ? starIconFilled : starIcon} alt="Favorite icon" />
        </div>
    );
};

export default FavButton;