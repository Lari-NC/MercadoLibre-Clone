import InputSelect from '../InputSelect/InputSelect';
import './InputSelectWithName.css';


const InputSelectWithName = ({name, value, onChange}) => {
    return (
        <div className="InputSelectWithName">
            <span>{name}</span>
            <InputSelect value={value} onChange={onChange}/>
        </div>
    );
};

export default InputSelectWithName;