import React, { useEffect, useState } from 'react';
import api from '../api.js';

const Settings = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await api.put(`/users/${userId}`, { status: newStatus });
      setStatus(newStatus);
      alert('Status updated successfully!');
    } catch {
      alert('Failed to update status');
    }
  };

  if (loading) return <p>Loading settings...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-3">Settings</h1>
      <div className="card">
        <div className="card-body">
          <h5>Account</h5>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <label>
            Status:
            <select value={status} onChange={handleStatusChange} className="form-select mt-1">
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
