import { useState, useEffect } from 'react';

const useProducts = (fetchFunction, dependencies = []) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { products, totalPages } = await fetchFunction(currentPage);
                setProducts(products);
                setTotalPages(totalPages || 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, ...dependencies]);

    return {
        products,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
    };
};

export default useProducts;