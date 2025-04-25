import InputClave from '../InputPlaceholder/InputClave';
import './InputWithName.css';

const InputWithNameClave = ({name, type = 'text', value, onChange}) => {
    return (
        <div className="InputWithName">
            <span>{name}</span>
            <InputClave type={type} value={value} onChange={onChange}/>
        </div>
    );
};

export default InputWithNameClave;