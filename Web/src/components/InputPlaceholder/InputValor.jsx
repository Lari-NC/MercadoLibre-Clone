import './InputValor.css' 

const InputValor = ({type = 'text', value, onChange}) => {
    return (
        <input className="InputValor"
            type={type}
            value={value}
            onChange={onChange}
            placeholder="Valor"  />
        
    );
};

export default InputValor;