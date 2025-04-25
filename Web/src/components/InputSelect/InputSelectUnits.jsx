import './InputSelectUnits.css';
import chevronDown from '../../assets/icons/chevronDownIcon.svg'
import { useState } from 'react';

const InputSelectUnits = ({ quantity, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(quantity || 1);

    const quantities = Array.from({ length: quantity }, (_, i) => i + 1);

    const handleOptionClick = (quantity) => {
        setSelectedQuantity(quantity);
        onChange(quantity);
        setShowOptions(false); 
    };

    const toggleDropdown = () => {
        setShowOptions(!showOptions); 
    };

    return (
        <div className="InputSelectUnits">
            <span>{selectedQuantity} unidades</span>
            <button className="dropdown-button" onClick={toggleDropdown}>
                <img src={chevronDown} alt="Seleccionar" className="chevronDown" />
            </button>
            {showOptions && (
                <ul className="options-list">
                    {quantities.map((quantity) => (
                        <li 
                            key={quantity} 
                            onClick={() => handleOptionClick(quantity)} 
                            className="dropdown-item">
                            {quantity}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InputSelectUnits;