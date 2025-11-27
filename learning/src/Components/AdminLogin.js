// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Update form fields
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  };

  // Simple client-side validation
  const validate = () => {
    const err = {};
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Invalid email";
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6) err.password = "Password must be >= 6 chars";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      // API backend Node.js/MongoDB
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email: form.email,
        password: form.password
      });

      const { token, admin } = res.data;
      if (!token) throw new Error("No token returned");

      // Save token in localStorage
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(admin));

      // Redirect to Dashboard
      navigate("/Dashbord");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {serverError && <div className="error-banner">{serverError}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            autoComplete="username"
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </label>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Sign in"}
        </button>

        <div className="helper-row">
          <small>Forgot password? Contact super-admin.</small>
        </div>
      </form>
    </div>
  );
}
