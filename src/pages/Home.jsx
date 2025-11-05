import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim() !== '') {
      navigate(`/items?search=${searchTerm}`);
    }
  };

  return (
    <div className="home-container">
      
      <img 
        src="/las-compras-en-linea.png" 
        alt="Bazar en línea" 
        className="home-icon" 
      />
      
      <h2>Encuentra lo que buscas</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Ej: iPhone, laptop, mascara..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default Home;