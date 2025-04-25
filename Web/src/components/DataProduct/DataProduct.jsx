import './DataProduct.css';

const DataProduct = ({ name, image, owner, onDelete }) => {
    return (
        <div className="DataProduct">
            <div className="Image">
                <img src={image} alt={`${owner}'s product`} />
            </div>
            <div className="Info">
                <p className="productName">{name}</p>
                <p className="owner">Por {owner}</p>
                <button onClick={onDelete}>Eliminar</button>
            </div>
        </div>
    );
};

export default DataProduct;