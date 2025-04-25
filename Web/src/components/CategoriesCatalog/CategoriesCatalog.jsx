import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../Category/Category";
import "./CategoriesCatalog.css";
import fraganceIcon from "../../assets/icons/fraganceIcon.svg"
import service from "../../service/Api"
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

const categoryIcons = {
    "Beauty": beautyIcon,
    "Fragrances": fraganceIcon,
    "Furniture": furnitureIcon,
    "Groceries": groceriesIcon,
    "Home Decoration": homeDecorationIcon,
    "Kitchen Accessories": kitchenAccessoriesIcon,
    "Laptops": laptopsIcon,
    "Shirts": shirtsIcon,
    "Shoes": shoesIcon,
    "Watches": watchesIcon,
    "Mobile Accessories": mobileAccessoriesIcon,
    "Motorcycle": motorcycleIcon,
    "Skin Care": skinCareIcon,
    "Smartphones": smartphonesIcon,
    "Sports Accessories": sportsAccessoriesIcon,
    "Sunglasses": sunglassesIcon,
    "Tablets": tabletsIcon,
    "Tops": topsIcon,
    "Vehicle": vehicleIcon,
    "Bags": bagsIcon,
    "Dresses": dressesIcon,
    "Jewellery": jewelleryIcon
};

const CategoriesCatalog = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const capitalize = (text) => {
        return text
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await service.getCategories();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <div>Cargando categorías...</div>;
    if (error) return <div>Error al cargar categorías: {error}</div>;

    return (
      <div className="categoriesCatalog">
          <h2>Categorías</h2>
          <div className="categories">
              {categories.map((category) => {
                  const icon = categoryIcons[capitalize(category.name)] || fraganceIcon; // pq ese || fragance?
                  return (
                        <Link  to={`/category/${category.id}`}>
                            <Category
                            text={capitalize(category.name)}
                            icon={icon}
                            />
                        </Link>
                  );
              })}
          </div>
      </div>
  );
};

export default CategoriesCatalog;