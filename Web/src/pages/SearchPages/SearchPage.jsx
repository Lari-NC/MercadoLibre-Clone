import { useSearchParams } from 'react-router-dom';
import service from '../../service/Api';
import Pagination from '../../components/Pagination/Pagination';
import './SearchPage.css';
import Product from '../../components/Product/Product';
import useProducts from '../../hooks/useProducts';

const SearchPage = ({ isLoggedIn }) => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('query');

    const {
        products,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
    } = useProducts(
        (page) => service.search(searchQuery, page),
        [searchQuery]
    );

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error}</p>;

    return (
        <>
            <div className="search-title">
                <h2>Search: {searchQuery}</h2>
            </div>
            <div className="search-product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} product={product} isLoggedIn={isLoggedIn}/>
                    ))
                ) : (
                    <div>No hay productos para esa búsqueda.</div>
                )}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
};

export default SearchPage;