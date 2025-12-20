import React, { useState } from "react";

export default function RegisterPage({ onBack, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onRegister(name, email, role);
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onBack}>
          Back to Login
        </button>
      </form>
    </div>
  );
}
