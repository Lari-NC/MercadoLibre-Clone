import useProducts from '../../hooks/useProducts';
import { useParams } from "react-router-dom";
import service from "../../service/Api";
import Product from "../../components/Product/Product";
import Avatar from "../../components/Avatar/Avatar";
import fraganceIcon from "../../assets/icons/fraganceIcon.svg";
import beautyIcon from "../../assets/icons/beautyIcon.svg";
import furnitureIcon from "../../assets/icons/furnitureIcon.svg";
import groceriesIcon from "../../assets/icons/groceriesIcon.svg";
import homeDecorationIcon from "../../assets/icons/homeDecorationIcon.svg";
import kitchenAccessoriesIcon from "../../assets/icons/kitchenAccessoriesIcon.svg";
import laptopsIcon from "../../assets/icons/laptopsIcon.svg";
import shirtsIcon from "../../assets/icons/shirtsIcon.svg";
import shoesIcon from "../../assets/icons/shoesIcon.svg";
import watchesIcon from "../../assets/icons/watchesIcon.svg";
import mobileAccessoriesIcon from "../../assets/icons/mobileAccessoriesIcon.svg";
import motorcycleIcon from "../../assets/icons/motorcycleIcon.svg";
import skinCareIcon from "../../assets/icons/skinCareIcon.svg";
import smartphonesIcon from "../../assets/icons/smartphonesIcon.svg";
import sportsAccessoriesIcon from "../../assets/icons/sportsAccessoriesIcon.svg";
import sunglassesIcon from "../../assets/icons/sunglassesIcon.svg";
import tabletsIcon from "../../assets/icons/tabletsIcon.svg";
import topsIcon from "../../assets/icons/topsIcon.svg";
import vehicleIcon from "../../assets/icons/vehicleIcon.svg";
import bagsIcon from "../../assets/icons/bagsIcon.svg";
import dressesIcon from "../../assets/icons/dressesIcon.svg";
import jewelleryIcon from "../../assets/icons/jewelleryIcon.svg";
import Pagination from "../../components/Pagination/Pagination"
import './CategoryProductsPage.css'

const categoryIcons = {
    "c_1": beautyIcon,
    "c_2": fraganceIcon,
    "c_3": furnitureIcon,
    "c_4": groceriesIcon,
    "c_5": homeDecorationIcon,
    "c_6": kitchenAccessoriesIcon,
    "c_7": laptopsIcon,
    "c_8": shirtsIcon,
    "c_9": shoesIcon,
    "c_10": watchesIcon,
    "c_11": mobileAccessoriesIcon,
    "c_12": motorcycleIcon,
    "c_13": skinCareIcon,
    "c_14": smartphonesIcon,
    "c_15": sportsAccessoriesIcon,
    "c_16": sunglassesIcon,
    "c_17": tabletsIcon,
    "c_18": topsIcon,
    "c_19": vehicleIcon,
    "c_20": bagsIcon,
    "c_21": dressesIcon,
    "c_22": jewelleryIcon
};

const categoryNames = {
    "c_1": "Beauty",
    "c_2": "Fragrances",
    "c_3": "Furniture",
    "c_4": "Groceries",
    "c_5": "Home Decoration",
    "c_6": "Kitchen Accessories",
    "c_7": "Laptops",
    "c_8": "Shirts",
    "c_9": "Shoes",
    "c_10": "Watches",
    "c_11": "Mobile Accessories",
    "c_12": "Motorcycle",
    "c_13": "Skin Care",
    "c_14": "Smartphones",
    "c_15": "Sports Accessories",
    "c_16": "Sunglasses",
    "c_17": "Tablets",
    "c_18": "Tops",
    "c_19": "Vehicle",
    "c_20": "Bags",
    "c_21": "Dresses",
    "c_22": "Jewellery"
};

const CategoryProductsPage = () => {
    const { id } = useParams();

    const {
        products,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
    } = useProducts(
        (page) => service.getProductsByCategory(id, page),
        [id]
    );

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error}</p>;

    const categoryIcon = categoryIcons[id];
    const categoryName = categoryNames[id];

    return (
        <>
            <div className="avatar-category">
                <Avatar image={categoryIcon} name={categoryName} />
            </div>
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <p>No hay productos disponibles para esta categoría.</p>
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

export default CategoryProductsPage;