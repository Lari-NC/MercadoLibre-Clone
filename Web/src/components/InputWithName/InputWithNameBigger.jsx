import InputPlaceholderBigger from '../InputPlaceholder/InputPlaceholderBigger';
import './InputWithName.css';

const InputWithNameBigger = ({name, type = 'text', value, onChange}) => {
    return (
        <div className="InputWithName">
            <span>{name}</span>
            <InputPlaceholderBigger type={type} value={value} onChange={onChange}/>
        </div>
    );
};

export default InputWithNameBigger;