import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0); 

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`) 
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener producto:", err);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = () => {
    setPurchaseMessage('Procesando compra...');

    fetch(`${import.meta.env.VITE_API_URL}/api/addSale`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product), 
    })
    .then(response => response.json())
    .then(success => {
      if (success) {
        setPurchaseMessage('¡Compra registrada con éxito!');
        setTimeout(() => {
          navigate('/sales');
        }, 2000);
      } else {
        setPurchaseMessage('Hubo un error al registrar la compra.');
      }
    })
    .catch(err => {
      console.error("Error al registrar la compra:", err);
      setPurchaseMessage('Error de conexión al guardar.');
    });
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.title,
        text: `¡Mira este producto! ${product.description}`,
        url: window.location.href, // Comparte la URL actual
      })
      .then(() => console.log('Producto compartido'))
      .catch((error) => console.log('Error al compartir', error));
    } else {
      // Fallback para computadoras (copiar al portapapeles)
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="image-gallery">
        <img 
          src={product.images[selectedImage]} 
          alt={product.title} 
          className="main-image" 
        />
        <div className="thumbnail-list">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={index === selectedImage ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <span className="category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="description-detail">{product.description}</p>
        <p className="price-detail">${product.price}</p>
        <p className="rating-detail">Rating: {product.rating} ⭐</p>
        
        <ul>
          <li><strong>Marca:</strong> {product.brand}</li>
          <li><strong>Stock:</strong> {product.stock}</li>
          <li><strong>SKU:</strong> {product.sku}</li>
        </ul>

        <div className="button-group">
          <button onClick={handlePurchase} className="buy-button">Comprar</button>
          <button onClick={handleShare} className="share-button">Compartir</button>
        </div>

        {purchaseMessage && <p className="purchase-message">{purchaseMessage}</p>}
      </div>
    </div>
  );
}

export default ProductDetail;