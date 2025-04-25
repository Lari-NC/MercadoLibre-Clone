import InputWithName from "../InputWithName/InputWithName";
import InputSelectWithName from "../InputWithName/InputSelectWithName";
import InputWithNameBigger from "../InputWithName/InputWithNameBigger";
import InputWithNameClave from "../InputWithName/InputWithNameClave";
import InputValor from "../InputPlaceholder/InputValor";
import Button from "../Button/Button"
import "./EditForm.css";
import { useEffect ,useState } from "react";
import service from '../../service/Api'
import BasicButton from "../Button/BasicButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


const EditForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [stock, setStock] = useState(0);
    const [shipping, setShipping] = useState({price: 0});
    const [categoryId, setCategoryId] = useState('');
    const [images, setImages] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [img, setImg] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await service.getProductByID(id);
                setTitle(product.title)
                setDescription(product.description)
                setPrice(product.price)
                setStock(product.stock)
                setShipping(product.shipping)
                setCategoryId(product.category.id)
                setImages(product.images)
                setCharacteristics(product.characteristics)
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProduct();
    }, []);
  

    const deleteCharacteristics = (index) => {
        setCharacteristics(characteristics.filter((_, i) => i !== index));        
    }


    const handleCharacteristics = async () => {
        setCharacteristics([...characteristics,{name, value}])
        setName('')
        setValue('')
    }
    
    const handleImages = async () => {
        setImages([...images, img]);
        setImg('');  
    }

    const deleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleEditProduct  = async () => {
        const newProduct = {
            title: title,
            description: description,
            price: price,
            images: images,
            stock: stock,
            shipping: shipping,
            characteristics: characteristics,
            categoryId: categoryId
        }
        try {
            const product = await service.editProduct(newProduct,id)
            toast.success('Producto editado con éxito');
            navigate(`/product/${product.id}`);
        } catch (err) {
            toast.error('Error al realizar la compra: ' + (error.message || "Error desconocido"));
        }
    }

    
    return (
        
            <div className="NewProductForm">
                <h2>Edit product</h2>
                <div className="top">
                    <InputWithName 
                        name="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <InputWithName 
                        name="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    <InputWithName 
                        name="Price"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        type="number"/>
                    <InputWithName 
                        name="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type="number"/>
                    <InputWithName 
                        name="Shipping"
                        value={shipping.price}
                        onChange={(e) => setShipping({...shipping, price: e.target.value})}
                        type="number"/>
                    <InputSelectWithName 
                        name="Category" 
                        value={categoryId}
                        onChange={(id) => setCategoryId(id)}/>
                </div>
                <div className="horizontal-line"></div>
                <div className="centre">
                    <InputWithNameBigger 
                        name="Imagenes"
                        value={img}
                        onChange={(e) => setImg(e.target.value)} />
                    <Button text= "Agregar imagen" onClick={handleImages}/>
                    <div className="images">                
                    {
                    images.length > 0 ? (
                        images.map((img, index)=>(
                            <div className="imageList" key= {index}> 
                                <span className="image"> {img} </span>
                                <BasicButton text="Delete" onClick={() => deleteImage(index)}> </BasicButton>
                            </div>
                        ))
                    ): ( <p className="imageText"> No agregaste ninguna imagen</p>)}
    
                    </div>
                </div>
                <div className="horizontal-line"></div>
                <div className="bottom">
                    <InputWithNameClave 
                        name="Caracteristicas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    <InputValor 
                        name="Caracteristicas valor"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <Button text="Agregar" onClick={handleCharacteristics}  />
                </div>
                <div className="Caracteristicas" >
                    {characteristics.length > 0 ? (
                        characteristics.map((item,index)=>(
                            <div className="listaCaracteristicas" key= {index}> 
                                <span className="caracteristica"> {item.name}:{item.value} </span>
                                <BasicButton text="Delete" onClick={() => deleteCharacteristics(index)}> </BasicButton>
                            </div>
                        ))
                    ): ( <p>No agregaste ninguna caracteristica</p>)}
                </div>
                <div className="horizontal-line"></div>
                <div className="save-button">
                <Button text="Edit"  onClick={handleEditProduct}/>
                </div>
            </div>
        );
};

export default EditForm;