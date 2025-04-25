import "./ProductByIdWQ.css"
import ProductById from "./ProductById";
import ProductQuestions from "../ProductQuestions/ProductQuestions";

const ProductByIdWithQuestions = ({ isLoggedIn }) => {
    return (
        <div className="ProductByIdWQ">
            <ProductById isLoggedIn={isLoggedIn}/>
            <ProductQuestions isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default ProductByIdWithQuestions;