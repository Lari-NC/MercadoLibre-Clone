import React, { useState } from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form className="SearchBar" onSubmit={handleSearch}>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Buscar productos, marcas y más..."
            />
            <Link to={`/search?query=${encodeURIComponent(query)}`}>
                <button type="submit" aria-label="Buscar" disabled={!query.trim()}>
                    <img src={searchIcon} alt="Buscar" className="search-icon" />
                </button>
            </Link>
        </form>
    );
};

export default SearchBar;