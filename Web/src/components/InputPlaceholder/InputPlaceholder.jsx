import './InputPlaceholder.css' 

const InputPlaceholder = ({type = 'text', value, onChange}) => {
    return (
        <input className="InputPlaceholder"
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder="Placeholder..."  />
        
    );
};

export default InputPlaceholder;