import InputPlaceholder from '../InputPlaceholder/InputPlaceholder';
import './InputWithName.css';

const InputWithName = ({name, type = 'text', value, onChange}) => {
    return (
        <div className="InputWithName">
            <span>{name}</span>
            <InputPlaceholder type={type} value={value} onChange={onChange}/>
        </div>
    );
};

export default InputWithName;