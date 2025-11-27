import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Users, Award, TrendingUp, Heart, ChevronRight, Play } from 'lucide-react';
import './AboutPage.css';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "10,000+", label: "Étudiants actifs", icon: Users },
    { number: "500+", label: "Cours disponibles", icon: BookOpen },
    { number: "98%", label: "Taux de satisfaction", icon: Award },
    { number: "50+", label: "Instructeurs experts", icon: TrendingUp }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Contenu de Qualité",
      description: "Des cours créés par des experts du domaine avec du contenu actualisé régulièrement"
    },
    {
      icon: Users,
      title: "Apprentissage Collaboratif",
      description: "Rejoignez une communauté d'apprenants passionnés et échangez vos connaissances"
    },
    {
      icon: Target,
      title: "Parcours Personnalisé",
      description: "Des recommandations adaptées à vos objectifs et votre niveau de compétence"
    },
    {
      icon: Award,
      title: "Certifications Reconnues",
      description: "Obtenez des certificats valorisants pour booster votre carrière professionnelle"
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "Nous nous engageons à fournir la meilleure qualité d'enseignement"
    },
    {
      title: "Accessibilité",
      description: "L'éducation doit être accessible à tous, partout et à tout moment"
    },
    {
      title: "Innovation",
      description: "Nous utilisons les dernières technologies pour améliorer l'apprentissage"
    },
    {
      title: "Communauté",
      description: "Nous créons un environnement d'entraide et de collaboration"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Votre Plateforme d'Apprentissage
          </div>
          <h1 className="hero-title">
            Transformez Votre Avenir avec
            <span className="gradient-text"> l'Éducation en Ligne</span>
          </h1>
          <p className="hero-description">
            Nous sommes une plateforme e-learning innovante qui démocratise l'accès à l'éducation 
            de qualité. Notre mission est de vous accompagner dans votre développement personnel 
            et professionnel à travers des cours interactifs et engageants.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">
              Commencer Gratuitement
              <ChevronRight size={20} />
            </button>
            <button className="btn-secondary">
              <Play size={20} />
              Voir la démo
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-card card-1">
            <BookOpen size={32} />
            <span>500+ Cours</span>
          </div>
          <div className="floating-card card-2">
            <Users size={32} />
            <span>10k+ Étudiants</span>
          </div>
          <div className="floating-card card-3">
            <Award size={32} />
            <span>Certifications</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="stat-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Notre Mission</span>
            <h2 className="section-title">Pourquoi Nous Existons</h2>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <h3>Rendre l'Éducation Accessible à Tous</h3>
              <p>
                Dans un monde en constante évolution, l'accès à une éducation de qualité 
                ne devrait plus être un privilège. Notre plateforme brise les barrières 
                géographiques et financières pour permettre à chacun d'apprendre à son rythme.
              </p>
              <p>
                Nous croyons fermement que l'apprentissage continu est la clé du succès 
                dans le monde professionnel moderne. C'est pourquoi nous offrons des cours 
                dans divers domaines, du développement web à la gestion de projet, en passant 
                par le design et le marketing digital.
              </p>
              <div className="mission-highlight">
                <Heart size={24} />
                <span>Plus de 10,000 vies transformées par l'apprentissage</span>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <BookOpen size={64} />
                <p>Apprentissage Innovant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Comment Nous Aidons</span>
            <h2 className="section-title">Ce Qui Nous Distingue</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Nos Valeurs</span>
            <h2 className="section-title">Les Principes Qui Nous Guident</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`value-card ${activeSection === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveSection(index)}
              >
                <div className="value-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à Commencer Votre Voyage d'Apprentissage ?</h2>
            <p>Rejoignez des milliers d'étudiants qui transforment leur avenir chaque jour</p>
            <button className="btn-cta">
              Créer un Compte Gratuit
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}