import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onCTA }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 880) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Cours", path: "/cours" },
    { label: "Formateurs", path: "/formateurs" },
    { label: "À propos", path: "/about" },
    { label: "Contact", path: "/contact" },
     

  ];

  return (
    <header className="app-navbar" role="banner">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="logo-mark" aria-hidden>📘</span>
          <span className="brand-name">Learn</span>
        </Link>

        <button
          className={`hamburger ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`} role="navigation" aria-label="Principales">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <button
              className="btn primary"
              onClick={() => {
                if (onCTA) onCTA();
                setOpen(false);
              }}
            >
              Commencer Maintenant
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}