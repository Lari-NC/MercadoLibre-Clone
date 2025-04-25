import service from '../../service/Api';
import Product from '../../components/Product/Product';
import Pagination from '../../components/Pagination/Pagination';
import './HomePage.css';
import useProducts from '../../hooks/useProducts';

const HomePage = ({ isLoggedIn }) => {
    const {
        products,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
    } = useProducts(service.getAllProducts);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error}</p>;

    return (
        <>
            <div className="products-list">
                {products.length > 0 ? (
                    <div className="products-grid">
                        {products.map((p) => (
                            <Product key={p.id} product={p} isLoggedIn={isLoggedIn}/>
                        ))}
                    </div>
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default HomePage;
