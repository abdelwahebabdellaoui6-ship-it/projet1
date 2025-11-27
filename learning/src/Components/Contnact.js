import React, { useState } from 'react';
import './Contact.css';

const Contnact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      try {
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          alert(data.error || "Une erreur est survenue.");
        }
      } catch (error) {
        alert("Erreur de connexion au serveur.");
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">📍 Contactez-Nous</h1>
        <p className="contact-subtitle">Nous sommes là pour vous aider. N'hésitez pas à nous contacter !</p>
      </div>

      <div className="contact-content">
        {/* Informations de contact */}
        <div className="contact-info-section">
          <h2 className="section-title">Informations de Contact</h2>
          
          <div className="info-card">
            <div className="info-icon">📞</div>
            <div className="info-details">
              <h3 className="info-title">Téléphone</h3>
              <p className="info-text">+216 XX XXX XXX</p>
              <p className="info-text">+216 XX XXX XXX</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <div className="info-details">
              <h3 className="info-title">Email</h3>
              <p className="info-text">contact@rme-elearning.tn</p>
              <p className="info-text">support@rme-elearning.tn</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">🏢</div>
            <div className="info-details">
              <h3 className="info-title">Adresse</h3>
              <p className="info-text">Avenue Habib Bourguiba</p>
              <p className="info-text">Tunis, Tunisie</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">⏰</div>
            <div className="info-details">
              <h3 className="info-title">Heures d'Ouverture</h3>
              <p className="info-text">Lundi - Vendredi: 8h00 - 18h00</p>
              <p className="info-text">Samedi: 9h00 - 13h00</p>
              <p className="info-text">Dimanche: Fermé</p>
            </div>
          </div>

          <div className="social-section">
            <h3 className="social-title">🌐 Suivez-nous</h3>
            <div className="social-icons">
              <a href="#" className="social-btn facebook">Facebook</a>
              <a href="#" className="social-btn linkedin">LinkedIn</a>
              <a href="#" className="social-btn instagram">Instagram</a>
              <a href="#" className="social-btn twitter">Twitter</a>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="contact-form-section">
          <h2 className="section-title">Envoyez-nous un Message</h2>
          
          <div className="form-group">
            <label className="form-label">Nom Complet *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre.email@example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sujet *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Sujet de votre message"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              placeholder="Écrivez votre message ici..."
              className="form-textarea"
            />
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Envoyer le Message 📤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contnact;
