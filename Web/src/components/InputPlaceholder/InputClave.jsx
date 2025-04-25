import './InputClave.css' 

const InputClave = ({type = 'text', value, onChange}) => {
    return (
        <input className="InputClave"
            type={type}
            value={value}
            onChange={onChange}
            placeholder="Clave"  />
        
    );
};

export default InputClave;