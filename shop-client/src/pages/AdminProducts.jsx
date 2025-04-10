import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';
const CATEGORY_API = 'http://localhost:5000/api/categories';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: '', image: null });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_API);
    setCategories(res.data);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key]) formData.append(key, form[key]);
    });

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData, config);
        setEditId(null);
      } else {
        await axios.post(API, formData, config);
      }
      setForm({ name: '', price: '', category: '', image: null });
      fetchProducts();
    } catch (err) {
      alert('Lỗi khi thêm/sửa sản phẩm');
      console.error(err);
    }
  };

  const handleEdit = product => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: null,
    });
  };

  const handleDelete = async id => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    if (window.confirm('Bạn chắc chắn muốn xoá?')) {
      await axios.delete(`${API}/${id}`, config);
      fetchProducts();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛠️ Admin - Quản lý sản phẩm</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="row g-3 mb-5 bg-light p-4 rounded shadow-sm">
        <div className="col-md-6">
          <label className="form-label">Tên sản phẩm</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Giá</label>
          <input className="form-control" type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Danh mục</label>
          <select className="form-select" name="category" value={form.category} onChange={handleChange} required>
            <option value="">-- Chọn danh mục --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Hình ảnh</label>
          <input className="form-control" type="file" name="image" onChange={handleChange} accept="image/*" />
        </div>

        <div className="col-12 d-flex justify-content-end">
          {/* <button className="btn btn-primary" type="submit">
            {editId ? 'Cập nhật' : 'Thêm sản phẩm'}
          </button> */}
          <div className="flex gap-2">
            <button className="btn btn-primary" type="submit" >Thêm sản phẩm</button>
            <button className="btn btn-warning"type="submit" >Cập nhật</button>
          </div>

        </div>
      </form>

      <div className="mt-4">
        {products.map(p => (
          <div className="card mb-3 shadow-sm" key={p._id}>
            <div className="row g-0 align-items-center">
              <div className="col-md-3 text-center">
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  className="img-fluid rounded-start"
                  alt={p.name}
                  style={{ maxHeight: '150px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text mb-1">💰 {p.price} VNĐ</p>
                  <p className="card-text">
                    <small className="text-muted">Danh mục: {p.category}</small>
                  </p>
                </div>
              </div>
              <div className="col-md-3 text-end pe-4">
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>
                  ✏️ Sửa
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>
                  🗑️ Xoá
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
