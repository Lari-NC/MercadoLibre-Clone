import React, { useState, useEffect } from "react";
import './UserPageWithoutU.css'
import Avatar from '../../components/Avatar/Avatar'
import image from '../../assets/images/avatarImage.svg'
import Product from '../../components/Product/Product'
import { useParams } from "react-router-dom";
import service from '../../service/Api'
import useProducts from '../../hooks/useProducts';

const UserPageWithoutU = () => {
    const { id } = useParams();

    const fetchUserProducts = async (page) => {
        const user = await service.getUserById(id);
        return {
            products: user.products,
            totalPages: 1,
        };
    };

    const { products, loading, error } = useProducts(fetchUserProducts, [id]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const user = await service.getUserById(id);
                setUserName(user.name);
            } catch (err) {
            }
        };

        fetchUserName();
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Cargando productos del usuario...</p>
            ) : error ? (
                <p>Error al cargar productos del usuario: {error}</p>
            ) : (
                <>
            <div className="avatar">
                <Avatar name={userName} image={image} />
            </div>
            <div className="user-products">
                {products.length > 0 ? (
                     products.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))
                ) : (
                <p>No hay productos disponibles.</p>
                )}
            </div>
            </>
            )}
        </div>
    );
};

export default UserPageWithoutU;