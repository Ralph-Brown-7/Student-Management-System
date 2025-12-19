import React, { useEffect, useState } from 'react';
import { User as UserIcon, Trash2, Edit } from 'lucide-react';
import api from '../api.js';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAction = async (action, user) => {
    if (action === 'delete') {
      if (!confirm(`Delete user ${user.name}?`)) return;
      try {
        await api.delete(`/users/${user.id}`);
        setUsers(users.filter(u => u.id !== user.id));
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    } else if (action === 'edit') {
      alert(`Edit ${user.name} (Implement your form or modal)`);
    } else if (action === 'add') {
      alert('Add user (Implement your form or modal)');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-3">User Management</h1>
      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={() => handleAction('add')}>
          <UserIcon className="me-2" /> Add User
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="text-capitalize">{u.role}</td>
                <td><span className={`badge ${u.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>{u.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleAction('edit', u)}><Edit size={14} /></button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleAction('delete', u)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
