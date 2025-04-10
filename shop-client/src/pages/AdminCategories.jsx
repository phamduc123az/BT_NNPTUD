import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CATEGORY_API = 'http://localhost:5000/api/categories';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh mục:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editId) {
        await axios.put(`${CATEGORY_API}/${editId}`, { name }, config);
      } else {
        await axios.post(CATEGORY_API, { name }, config);
      }
      setName('');
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert('Lỗi khi lưu danh mục');
      console.error(err);
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xoá danh mục này?')) return;

    try {
      await axios.delete(`${CATEGORY_API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories();
    } catch (err) {
      alert('Lỗi khi xoá danh mục');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📂 Quản lý Danh mục</h2>

      <form onSubmit={handleSubmit} className="row g-3 bg-light p-4 rounded shadow-sm mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" type="submit">
            {editId ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>

      <div className="card shadow-sm">
        <ul className="list-group list-group-flush">
          {categories.map((cat) => (
            <li key={cat._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{cat.name}</span>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cat)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat._id)}> Xoá</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminCategories;
