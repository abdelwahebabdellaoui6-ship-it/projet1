import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";



export default function RegisterForm({ courseId, onSuccess }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        ...formData,
        courseId,
      });

      setMessage(response.data.message || "Inscription réussie !");
      setFormData({ name: "", email: "", password: "" });

      if (onSuccess) onSuccess(); // cache le formulaire
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };


  return (
     
    <div className="register-form" style={{ maxWidth: "400px", margin: "auto" }}>
      <h3>Inscription au cours</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
  

    </div>
   
  );
}
