import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sales() {
  const [sales, setSales] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    
    fetch(`${import.meta.env.VITE_API_URL}/api/sales`)

      .then(response => response.json())
      .then(data => {
        setSales(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener las ventas:", err);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <p>Cargando compras registradas...</p>;
  }

  return (
    <div className="sales-container">
      <h2>Compras Registradas</h2>

      {sales.length === 0 ? (
        <p>Aún no has registrado ninguna compra.</p>
      ) : (
        <div className="sales-list">
          {sales.map((sale) => (
            <div key={sale.firebase_id} className="sale-card">
              <img src={sale.thumbnail} alt={sale.title} />
              <div className="sale-info">
                <h3>{sale.title}</h3>
                <p className="price">Precio: ${sale.price}</p>
                <p className="category">Categoría: {sale.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="back-home-button">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Sales;