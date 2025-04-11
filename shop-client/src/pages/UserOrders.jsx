import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.data);
      } catch (err) {
        alert('Không thể tải đơn hàng');
        console.error(err);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h2>Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        // orders.map((order, idx) => (
          orders.slice().reverse().map((order, idx) => (
          <div key={order._id} style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
            <h4>Đơn #{idx + 1} - Tổng tiền:  {order.totalAmount?.toLocaleString()} VNĐ</h4>
           
            <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Trạng thái: {order.status || 'Đang xử lý'}</p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  SP: {item.productId?.name || '---'} | SL: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;

