import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useCart } from '../context/CartContext';

function Cart() {
  const [cart, setCart] = useState([]);
  // const { cart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bạn cần đăng nhập để đặt hàng.');
        return;
      }

      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
      };

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(' Đặt hàng thành công!');
      localStorage.removeItem('cart');
      setCart([]);
      // clearCart();
    } catch (error) {
      console.error(error);
      alert(' Đặt hàng thất bại!');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛒 Giỏ hàng của bạn</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">Chưa có sản phẩm nào trong giỏ hàng.</div>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div key={item._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-danger fw-bold">
                    Giá: {item.price.toLocaleString()} VNĐ
                  </p>
                  <p className="card-text">Số lượng: {item.quantity || 1}</p>
                  {/* <button className="btn btn-sm btn-danger"onClick={() => removeFromCart(item._id)}> Xoá</button> */}
                </div>
              </div>
            </div>
          ))}

          {/* Nút đặt hàng */}
          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg px-4" onClick={handleOrder}>
              🧾 Đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
