import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import './AuthPage.css';

function AuthPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('user-login'); // user-login, user-register, admin-login
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation (register only)
    if ((authMode === 'user-register') && !formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    // Confirm password validation (register only)
    if ((authMode === 'user-register') && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      let url, payload, storageKey, isAdmin = false;

      if (authMode === 'user-login') {
        url = "http://localhost:5000/api/users/login";
        payload = { email: formData.email, password: formData.password };
      } else if (authMode === 'user-register') {
        url = "http://localhost:5000/api/users/register";
        payload = { 
          name: formData.username, 
          email: formData.email, 
          password: formData.password 
        };
      } else if (authMode === 'admin-login') {
        url = "http://localhost:5000/api/admin/login";
        payload = { email: formData.email, password: formData.password };
        isAdmin = true;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Une erreur s'est produite");
        setLoading(false);
        return;
      }

      // ✅ Login/Admin Login Success
      if (authMode === 'user-login' || authMode === 'admin-login') {
        if (isAdmin) {
          // 🔐 Admin Login
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminUser", JSON.stringify(data.admin));
        } else {
          // 👤 User Login
          localStorage.setItem("user", JSON.stringify(data));
        }

        setIsLoggedIn(true);
        setLoading(false);
        
        // Redirect based on role
        if (isAdmin) {
          navigate('/Dashbord');
        } else {
          navigate('/');
        }
      } 
      // ✅ Registration Success
      else if (authMode === 'user-register') {
        alert("✅ Inscription réussie! Veuillez vous connecter.");
        setLoading(false);
        switchMode('user-login');
      }

    } catch (error) {
      console.error("Erreur:", error);
      setServerError("Erreur de connexion au serveur");
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setAuthMode(newMode);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setServerError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        
        {/* MODE SELECTOR */}
        <div className="auth-mode-selector">
          <button
            className={`mode-btn ${authMode.includes('user') ? 'active' : ''}`}
            onClick={() => switchMode('user-login')}
          >
            👤 Utilisateur
          </button>
          <button
            className={`mode-btn ${authMode === 'admin-login' ? 'active' : ''}`}
            onClick={() => switchMode('admin-login')}
          >
            🔐 Admin
          </button>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            {authMode === 'user-login' && (
              <>
                <h1>Connexion</h1>
                <p>Bon retour parmi nous! 👋</p>
              </>
            )}
            {authMode === 'user-register' && (
              <>
                <h1>Inscription</h1>
                <p>Créez votre compte et commencez à apprendre 📚</p>
              </>
            )}
            {authMode === 'admin-login' && (
              <>
                <h1>🔐 Admin Login</h1>
                <p>Connexion administrateur sécurisée</p>
              </>
            )}
          </div>

          {/* SERVER ERROR ALERT */}
          {serverError && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{serverError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            
            {/* USERNAME FIELD (Register Only) */}
            {authMode === 'user-register' && (
              <div className="form-group">
                <label>
                  <User size={18} />
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'error' : ''}
                  placeholder="Votre nom d'utilisateur"
                />
                {errors.username && (
                  <span className="error-message">⚠️ {errors.username}</span>
                )}
              </div>
            )}

            {/* EMAIL FIELD */}
            <div className="form-group">
              <label>
                <Mail size={18} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder={authMode === 'admin-login' ? 'admin@example.com' : 'votre@email.com'}
              />
              {errors.email && (
                <span className="error-message">⚠️ {errors.email}</span>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="form-group">
              <label>
                <Lock size={18} />
                Mot de passe
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">⚠️ {errors.password}</span>
              )}
            </div>

            {/* CONFIRM PASSWORD FIELD (Register Only) */}
            {authMode === 'user-register' && (
              <div className="form-group">
                <label>
                  <Lock size={18} />
                  Confirmer le mot de passe
                </label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">⚠️ {errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Veuillez patienter...
                </>
              ) : (
                <>
                  {authMode === 'user-login' && '🔓 Se connecter'}
                  {authMode === 'user-register' && '📝 S\'inscrire'}
                  {authMode === 'admin-login' && '🔐 Se connecter Admin'}
                </>
              )}
            </button>

            {/* TOGGLE MODE SECTION */}
            {(authMode === 'user-login' || authMode === 'user-register') && (
              <div className="toggle-mode">
                <p>
                  {authMode === 'user-login' 
                    ? 'Pas encore de compte?' 
                    : 'Vous avez déjà un compte?'}
                  {' '}
                  <button
                    type="button"
                    onClick={() => switchMode(
                      authMode === 'user-login' ? 'user-register' : 'user-login'
                    )}
                    className="toggle-btn"
                  >
                    {authMode === 'user-login' ? "S'inscrire" : 'Se connecter'}
                  </button>
                </p>
              </div>
            )}

            {/* ADMIN FORGOT PASSWORD HINT */}
            {authMode === 'admin-login' && (
              <div className="admin-hint">
                <small>💡 Mot de passe oublié? Contactez le super-admin.</small>
              </div>
            )}
          </form>
        </div>

        {/* DECORATIVE ELEMENTS */}
        <div className="auth-decoration">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;