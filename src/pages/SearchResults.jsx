import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SearchResults() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false); 
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search'); 

  useEffect(() => {
    if (query) {
      setLoading(true); 
      
      fetch(`${import.meta.env.VITE_API_URL}/api/items?q=${query}`)

        .then(response => response.json())
        .then(data => {
          setProducts(data); 
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al obtener productos:", err);
          setLoading(false); 
        });
    }
  }, [query]); 

  return (
    <div>
      <h2 className="results-header">Resultados de la búsqueda de: "{query}"</h2>
      
      {loading && <p>Cargando productos...</p>}
      
      {!loading && products.length === 0 && <p>No se encontraron productos para "{query}".</p>}

      <div className="products-list">
        {products.map(product => (
          <Link to={`/item/${product.id}`} key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />

            <div className="product-card-info">
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <p className="description">{product.description}</p>
              <p className="rating">Rating: {product.rating} ⭐</p>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;