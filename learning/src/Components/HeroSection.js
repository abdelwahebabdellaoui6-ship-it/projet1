import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Play, ChevronRight, Star, Users, Award, 
  TrendingUp, Zap, CheckCircle, ArrowRight, Search,
  Sparkles, Rocket, Target, Globe
} from 'lucide-react';
import './Hero.css';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const rotatingTexts = [
    'développeurs web',
    'designers créatifs',
    'entrepreneurs',
    'data scientists',
    'marketeurs digitaux'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentText = rotatingTexts[textIndex];
    if (typedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText('');
        setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, textIndex]);

  const features = [
    { icon: <BookOpen />, text: '10,000+ Cours' },
    { icon: <Users />, text: '500K+ Étudiants' },
    { icon: <Award />, text: 'Certificats Reconnus' },
    { icon: <Star />, text: 'Note 4.8/5' }
  ];

  const stats = [
    { value: '500K+', label: 'Étudiants actifs' },
    { value: '10,000+', label: 'Cours disponibles' },
    { value: '50+', label: 'Pays représentés' },
    { value: '95%', label: 'Taux de satisfaction' }
  ];

  const benefits = [
    'Accès illimité à vie',
    'Certificats professionnels',
    'Support expert 24/7',
    'Projets réels inclus'
  ];

  return (
    <div className="hero-wrapper">
      {/* Hero Section 1: Video Background */}
      <section className="hero-section hero-video">
        {/* Video Background */}
        <div className="video-background">
          <div className="video-overlay"></div>
          {/* Remplacez par votre vidéo: <video autoPlay muted loop src="/hero-bg.mp4"></video> */}
          <div className="animated-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-main">
            <div className="hero-badge">
              <Sparkles className="badge-icon" />
              <span>Plateforme E-Learning N°1</span>
            </div>

            <h1 className="hero-title">
              Apprenez avec les
              <span className="highlight-text"> meilleurs cours</span>
              <br />en ligne
            </h1>

            <p className="hero-description">
              Développez vos compétences avec des formations de qualité créées par des experts. 
              Accédez à des milliers de cours en ligne et transformez votre carrière dès aujourd'hui.
            </p>

            <div className="hero-cta">
              <button className="btn-primary-large">
                <Rocket className="btn-icon" />
                Explorer les cours
                <ChevronRight className="arrow-icon" />
              </button>
              
              <button className="btn-secondary-large">
                <Play className="play-icon" />
                Voir la démo
              </button>
            </div>

            <div className="hero-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-cards">
              <div className="floating-card card-1">
                <div className="card-icon">
                  <BookOpen />
                </div>
                <div className="card-info">
                  <h4>React JS</h4>
                  <p>12h 30min</p>
                  <div className="card-rating">
                    <Star className="star" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>

              <div className="floating-card card-2">
                <div className="card-icon">
                  <Award />
                </div>
                <div className="card-info">
                  <h4>Certificat</h4>
                  <p>+50K délivrés</p>
                  <CheckCircle className="check-icon" />
                </div>
              </div>

              <div className="floating-card card-3">
                <div className="card-icon">
                  <TrendingUp />
                </div>
                <div className="card-info">
                  <h4>Progression</h4>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <p>75% complété</p>
                </div>
              </div>

              <div className="floating-card card-4">
                <div className="card-icon">
                  <Users />
                </div>
                <div className="card-info">
                  <h4>Communauté</h4>
                  <p>500K+ membres</p>
                  <div className="avatar-group">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" alt="" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" alt="" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" alt="" />
                    <span className="more">+12K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll pour découvrir</p>
        </div>
      </section>

      {/* Hero Section 2: Dynamic Typography */}
      <section className="hero-section hero-dynamic">
        <div className="hero-background-pattern"></div>
        
        <div className="hero-content">
          <div className="hero-main centered">
            <h1 className="hero-title-large">
              Devenez
              <span className="typed-text"> {typedText}</span>
              <span className="cursor">|</span>
            </h1>

            <p className="hero-subtitle">
              Rejoignez la plus grande communauté d'apprentissage en ligne
            </p>

            <div className="search-hero">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Que voulez-vous apprendre aujourd'hui ?" 
                className="search-input"
              />
              <button className="search-btn">
                Rechercher
              </button>
            </div>

            <div className="popular-searches">
              <span>Populaire:</span>
              <button className="tag">React JS</button>
              <button className="tag">UI/UX Design</button>
              <button className="tag">Python</button>
              <button className="tag">Marketing Digital</button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section 3: Image Background with Stats */}
      <section className="hero-section hero-image">
        <div className="image-background">
          <div className="image-overlay"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop" 
            alt="Students learning"
          />
        </div>

        <div className="hero-content">
          <div className="hero-split">
            <div className="hero-left">
              <div className="hero-badge-alt">
                <Zap className="badge-icon" />
                Commencez gratuitement
              </div>

              <h1 className="hero-title-alt">
                Transformez votre
                <span className="gradient-text"> avenir professionnel</span>
              </h1>

              <p className="hero-text">
                Des formations certifiantes créées par des experts reconnus. 
                Apprenez à votre rythme et atteignez vos objectifs de carrière.
              </p>

              <div className="benefits-list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <CheckCircle className="check-icon" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <button className="btn-hero-primary">
                  <Target className="btn-icon" />
                  Commencer maintenant
                </button>
                <button className="btn-hero-outline">
                  En savoir plus
                  <ArrowRight className="arrow-icon" />
                </button>
              </div>

              <div className="trust-badges">
                <div className="trust-item">
                  <Star className="trust-icon" />
                  <div>
                    <strong>4.9/5</strong>
                    <span>sur Trustpilot</span>
                  </div>
                </div>
                <div className="trust-item">
                  <Users className="trust-icon" />
                  <div>
                    <strong>500K+</strong>
                    <span>étudiants actifs</span>
                  </div>
                </div>
                <div className="trust-item">
                  <Globe className="trust-icon" />
                  <div>
                    <strong>50+</strong>
                    <span>pays</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="stats-container">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section 4: Minimal & Clean */}
      <section className="hero-section hero-minimal">
        <div className="container-minimal">
          <div className="minimal-content">
            <h1 className="minimal-title">
              Apprenez. Grandissez. Réussissez.
            </h1>
            
            <p className="minimal-subtitle">
              La plateforme d'apprentissage en ligne qui s'adapte à votre rythme
            </p>

            <div className="minimal-actions">
              <button className="btn-minimal-primary">
                Commencer gratuitement
              </button>
              <button className="btn-minimal-secondary">
                <Play className="play-icon" />
                Découvrir comment ça marche
              </button>
            </div>

            <div className="minimal-stats">
              <div className="minimal-stat">
                <span className="stat-number">10K+</span>
                <span className="stat-text">Cours</span>
              </div>
              <div className="divider"></div>
              <div className="minimal-stat">
                <span className="stat-number">500K+</span>
                <span className="stat-text">Étudiants</span>
              </div>
              <div className="divider"></div>
              <div className="minimal-stat">
                <span className="stat-number">4.9/5</span>
                <span className="stat-text">Note</span>
              </div>
            </div>
          </div>

          <div className="minimal-image">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop" 
              alt="Learning platform"
            />
          </div>
        </div>
      </section>
    </div>
  );
}