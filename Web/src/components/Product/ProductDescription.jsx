import './ProductDescription.css';

const ProductDescription = ({description}) => {
    return (
        <div className="ProductDescription">
            <h1>Descripción</h1>
            <div className="horizontal-line"></div>
            <p>{description}</p>
        </div>
    );
};

export default ProductDescription;