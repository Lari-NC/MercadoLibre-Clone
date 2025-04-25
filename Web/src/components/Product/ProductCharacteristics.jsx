import './ProductCharacteristics.css'

const ProductCharacteristics = ({characteristics}) => {
    return (
        <div className="ProductCharacteristics">
            <h1>Características del producto</h1>
            <div className="horizontal-line"></div>
            <div className="values">
            {characteristics.length > 0 ? (
                    characteristics.map((item,index)=>(
                        <div className="listaCaracteristicas" key= {index}> 
                            <span className="caracteristica"> {item.name}: {item.value} </span>
                        </div>
                    ))
                ): ( <p> No hay características </p>)}
            </div>
        </div>
    );
};

export default ProductCharacteristics;