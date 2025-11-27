// src/Components/Formateur.js
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Star, Users, Award, ChevronRight, 
  Linkedin, Twitter, Mail, Globe, Check, Video, 
  TrendingUp, Target, MessageCircle 
} from 'lucide-react';
import './Formateur.css';

export default function Formateur() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredInstructor, setHoveredInstructor] = useState(null);
  const [instructors, setInstructors] = useState([]);

  const categories = ['all', 'Développement', 'Design', 'Business', 'Marketing', 'Data Science'];

  // Stats pour la section supérieure
  const stats = [
    { icon: <Users />, value: '100+', label: 'Formateurs Experts' },
    { icon: <BookOpen />, value: '500+', label: 'Cours Disponibles' },
    { icon: <Star />, value: '4.8/5', label: 'Note Moyenne' },
    { icon: <Award />, value: '50K+', label: 'Certificats Délivrés' }
  ];

  // Fetch depuis backend
  const fetchInstructors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/instructors');
      const data = await res.json();
      setInstructors(data);
    } catch (err) {
      console.error('Erreur API:', err);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // Filtrer par catégorie
  const filteredInstructors = selectedCategory === 'all' 
    ? instructors 
    : instructors.filter(inst => inst.category === selectedCategory);

  return (
    <div className="formateurs-container">
      
      {/* Hero Section */}
      <section className="formateurs-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">👨‍🏫 Nos Formateurs</div>
          <h1 className="hero-title">
            Apprenez avec les <span className="gradient-text">meilleurs experts</span>
          </h1>
          <p className="hero-subtitle">
            Des professionnels passionnés et reconnus dans leur domaine, prêts à partager leur expertise avec vous
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <h2 className="filter-title">Filtrer par spécialité</h2>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Tous les formateurs' : category}
            </button>
          ))}
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="instructors-section">
        <div className="instructors-grid">
          {filteredInstructors.map(inst => (
            <div 
              key={inst._id} 
              className="instructor-card"
              onMouseEnter={() => setHoveredInstructor(inst._id)}
              onMouseLeave={() => setHoveredInstructor(null)}
            >
              <div className="card-inner">
                {/* Front Side */}
                <div className="card-front">
                  <div className="instructor-image-wrapper">
                    <img 
                      src={inst.image} 
                      alt={inst.name}
                      className="instructor-image"
                    />
                    <div className="image-overlay">
                      <div className="rating-badge">
                        <Star className="star-icon" />
                        <span>{inst.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="instructor-info">
                    <div className="category-badge">{inst.category}</div>
                    <h3 className="instructor-name">{inst.name}</h3>
                    <p className="instructor-specialty">{inst.specialty}</p>
                    <div className="instructor-stats">
                      <div className="stat-item">
                        <Users className="stat-icon-small" />
                        <span>{inst.students.toLocaleString()} étudiants</span>
                      </div>
                      <div className="stat-item">
                        <BookOpen className="stat-icon-small" />
                        <span>{inst.courses} cours</span>
                      </div>
                    </div>
                    <button className="view-profile-btn">
                      Voir le profil
                      <ChevronRight className="arrow-icon" />
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div className="card-back">
                  <div className="back-content">
                    <h3 className="back-name">{inst.name}</h3>
                    <p className="back-description">{inst.description}</p>
                    <div className="achievements">
                      <h4 className="achievements-title">Réalisations</h4>
                      {inst.achievements?.map((ach, idx) => (
                        <div key={idx} className="achievement-item">
                          <Check className="check-icon" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                    <div className="social-links">
                      <a href={inst.social?.linkedin} className="social-link"><Linkedin /></a>
                      <a href={inst.social?.twitter} className="social-link"><Twitter /></a>
                      <a href={inst.social?.website} className="social-link"><Globe /></a>
                      <a href="#contact" className="social-link"><Mail /></a>
                    </div>
                    <button className="contact-btn">
                      <MessageCircle className="btn-icon" />
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become Instructor Section */}
      <section className="become-instructor-section">
        <div className="cta-content">
          <div className="cta-icon">
            <Award className="award-icon" />
          </div>
          <h2 className="cta-title">Vous êtes un expert dans votre domaine ?</h2>
          <p className="cta-description">
            Rejoignez notre équipe de formateurs et partagez vos connaissances avec des milliers d'étudiants passionnés
          </p>
          <div className="cta-features">
            <div className="feature-item">
              <Check className="feature-icon" />
              <span>Revenus attractifs</span>
            </div>
            <div className="feature-item">
              <Check className="feature-icon" />
              <span>Flexibilité totale</span>
            </div>
            <div className="feature-item">
              <Check className="feature-icon" />
              <span>Support dédié</span>
            </div>
          </div>
          <button className="become-btn">
            <Target className="btn-icon" />
            Devenir formateur
          </button>
        </div>
      </section>

      {/* Why Choose Our Instructors */}
      <section className="why-instructors-section">
        <h2 className="section-title">Pourquoi choisir nos formateurs ?</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon"><Award /></div>
            <h3 className="why-title">Experts Certifiés</h3>
            <p className="why-description">
              Tous nos formateurs sont des professionnels reconnus avec des certifications et une expérience pratique
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon"><Video /></div>
            <h3 className="why-title">Contenu de Qualité</h3>
            <p className="why-description">
              Des cours structurés, à jour et créés avec les meilleures pratiques pédagogiques
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon"><MessageCircle /></div>
            <h3 className="why-title">Support Actif</h3>
            <p className="why-description">
              Nos formateurs répondent à vos questions et vous accompagnent tout au long de votre apprentissage
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon"><TrendingUp /></div>
            <h3 className="why-title">Résultats Prouvés</h3>
            <p className="why-description">
              Des milliers d'étudiants ont transformé leur carrière grâce à nos formations
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
