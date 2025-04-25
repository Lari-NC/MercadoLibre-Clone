import './InputSelect.css' 
import chevronDown from '../../assets/icons/chevronDownIcon.svg'
import { useEffect, useState } from 'react';
import service from '../../service/Api';

const InputSelect = ({ value, onChange }) => {
  const [categories,setCategories] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ id: '', name: '' });

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const data = await service.getCategories();
              setCategories(data);
          } catch (err) {
              setError(err.message);
          }
      };
      fetchCategories();
  }, []);

  useEffect(() => {
    if(value) {
      const category = categories.find(category => category.id === value);
      setSelectedOption(category);
    }
  },[categories]);

  const handleOptionClick = (category) => {
    setSelectedOption(category);
    onChange(category.id);
    setShowOptions(false);
  };

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };


  return (
    <div className="InputSelect">
      <button className="dropdown-button" onClick={toggleDropdown}>
          <img src={chevronDown} alt="Seleccionar" className="chevronDown" /> 

      </button>
      <input
        className="input-with-dropdown"
        id="category"
        value={selectedOption.name || ''}
        readOnly
        placeholder="Seleccionar"
      />
      {showOptions && (
        <ul className="options-list">
          {categories.map((category) => (
              <li 
                  key={category.id} 
                  onClick={() => handleOptionClick(category)} 
                  className="dropdown-item">
                   {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelect;