import Product from "./Product/Product"
import { Link } from "react-router-dom"
import './ProductDisplay.css'

const ProductDisplay = ({product}) => {

    return (
        <Link className="producto" key={product.id} to={`/product/${product.id}`}>
            <Product
                image={product.images[0]}
                name={product.title}
                owner={product.owner.name} 
                price={product.price.toFixed(2)}/>
        </Link>)
}

export default ProductDisplay; 