import './InputPlaceholderBigger.css' 

const InputPlaceholderBigger = ({type = 'text', value, onChange}) => {
    return (
        <input className="InputPlaceholderBigger"
            type={type}
            value={value}
            onChange={onChange}
            placeholder="Placeholder..."  />
        
    );
};

export default InputPlaceholderBigger;