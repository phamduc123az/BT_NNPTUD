import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      // .then(res => setProducts(res.data))
      // .catch(err => console.error(err));
      .then(res => {
        console.log('API response:', res.data); 
        setProducts(res.data.data);
      })
      .catch(err => console.error(err));
      // moi sua 
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛍 Danh sách sản phẩm</h2>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-danger fw-bold">
                  {product.price.toLocaleString()} VNĐ
                </p>
                <p className="card-title">Mô tả : {product.description}</p>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
