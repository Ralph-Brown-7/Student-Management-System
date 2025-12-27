import React, { useState } from "react";

export default function LoginPage({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Pass both email and password to the parent handler
      await onLogin(email, password);
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4" style={{ maxWidth: "400px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <button className="btn btn-link p-0" onClick={onRegister}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}