import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import CourseDetails from "./CourseDetails";
import axios from "axios";

import { 
  BookOpen, Star, Users, Clock, Play, ChevronRight, 
  TrendingUp, Award, Filter, Search, Heart,
  Video, FileText, Code, Palette,
  Briefcase, Brain, Zap, CheckCircle, Target
} from 'lucide-react';

import './Cours.css';

export default function CoursPopulaires() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  const [courses, setCourses] = useState([]);

  // ****************** FETCH FROM BACKEND ******************
  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => {
        const fixedCourses = res.data.map(c => ({
          ...c,
          price: Number(c.price ?? 0),
          students: Number(c.students ?? 0),
          reviews: Number(c.reviews ?? 0),
          rating: Number(c.rating ?? 0),
          level: c.level || "Débutant",
          category: c.category || "development",
          image: c.image || "https://via.placeholder.com/600x400",
          description: c.description || "Aucune description disponible.",
          lessons: c.lessons ?? 10,
          duration: c.duration ?? "10h",
          originalPrice: c.originalPrice ?? c.price + 50,
          instructor: c.instructor ?? "Instructeur",
          instructorImage: c.instructorImage ?? "https://via.placeholder.com/80"
        }));
        setCourses(fixedCourses);
      })
      .catch(err => console.error(err));
  }, []);

  // ****************** CONSTANTS ******************
  const categories = [
    { id: 'all', name: 'Tous les cours', icon: <BookOpen /> },
    { id: 'development', name: 'Développement', icon: <Code /> },
    { id: 'design', name: 'Design', icon: <Palette /> },
    { id: 'business', name: 'Business', icon: <Briefcase /> },
    { id: 'data', name: 'Data Science', icon: <Brain /> },
    { id: 'marketing', name: 'Marketing', icon: <TrendingUp /> }
  ];

  const levels = ['all', 'Débutant', 'Intermédiaire', 'Avancé'];

  // ****************** STATS (Manquantes → ajoutées) ******************
  const stats = [
    { icon: <Users />, value: "12 500+", label: "Étudiants inscrits" },
    { icon: <BookOpen />, value: "150+", label: "Cours disponibles" },
    { icon: <Award />, value: "4.8/5", label: "Moyenne des avis" },
    { icon: <TrendingUp />, value: "98%", label: "Taux de satisfaction" }
  ];

  // ****************** FAVORITES ******************
  const toggleFavorite = (courseId) => {
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // ****************** FILTER + SORT ******************
  const filteredCourses = courses
    .filter(course => {
      const matchCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      const matchLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchLevel && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.students - a.students;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  // ****************** VIEW COURSE ******************
  const handleVoirCours = (course) => {
    navigate(`/cours/${course._id}`, { state: { course } });
  };

  return (
    <div className="cours-container">
      
      {/* Hero Section */}
      <section className="cours-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">📚 Cours Populaires</div>
          <h1 className="hero-title">
            Découvrez nos
            <span className="gradient-text"> formations les plus demandées</span>
          </h1>

          <div className="search-bar">
            <Search className="search-icon" />
            <input 
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
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

      {/* Filters */}
      <section className="filters-section">
        <div className="filters-container">
          
          <div className="filter-group">
            <h3 className="filter-title">Catégories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="secondary-filters">
            <div className="level-filter">
              <Filter className="filter-icon" />
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tous les niveaux</option>
                {levels.filter(l => l !== 'all').map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="sort-filter">
              <TrendingUp className="filter-icon" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="popular">Plus populaires</option>
                <option value="rating">Mieux notés</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-section">
        <div className="courses-grid">

          {filteredCourses.map(course => (
            <div key={course._id} className="course-card">

              {/* Image */}
              <div className="course-image-wrapper">
                <img src={course.image} alt={course.title} className="course-image" />

                {course.bestseller && (
                  <span className="badge bestseller">
                    <Award className="badge-icon" />
                    Best-seller
                  </span>
                )}

                {course.new && (
                  <span className="badge new">
                    <Zap className="badge-icon" />
                    Nouveau
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="course-info">

                <h3 className="course-title">{course.title}</h3>

                <p className="course-description">{course.description}</p>

                <div className="course-instructor">
                 
                  <span className="instructor-name">{course.instructor}</span>
                </div>

                <div className="course-stats">
                  <div className="stat-item">
                    <Star className="star-icon filled" />
                    <span>{course.rating}</span>
                    <span className="reviews">({course.reviews})</span>
                  </div>

                  <div className="stat-item">
                    <Users className="stat-icon-small" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>

                  <div className="stat-item">
                    <Clock className="stat-icon-small" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="course-features">
                  <div className="feature-item">
                    <Video className="feature-icon" />
                    <span>{course.lessons} leçons</span>
                  </div>

                  <div className="feature-item">
                    <CheckCircle className="feature-icon" />
                    <span>Certificat</span>
                  </div>
                </div>

          {/* Price & Button */}
<div className="course-footer">
  <div className="price-section">
    <span className="current-price">{course.price}€</span>
    <span className="original-price">{course.originalPrice}€</span>
    <span className="discount">
      -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
    </span>
  </div>

  <button 
    className="cta-btn"
    onClick={() => handleVoirCours(course)}
  >
    Voir le cours <ChevronRight className="btn-icon" />
  </button>
</div>

              </div>
            </div>
          ))}

        </div>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3>Aucun cours trouvé</h3>
            <p>Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <Target className="cta-icon-large" />
          <h2 className="cta-title">Prêt à commencer votre apprentissage ?</h2>
          <p className="cta-description">
            Rejoignez des milliers d'étudiants qui développent leurs compétences
          </p>

          <button className="cta-btn-large">
            <BookOpen className="btn-icon" />
            Explorer tous les cours
          </button>
        </div>
      </section>

    </div>
  );
}
