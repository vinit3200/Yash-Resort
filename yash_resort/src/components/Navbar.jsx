import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/VC yesh resort colour.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms", href: "/rooms" },
    { label: "Dining", href: "/#dining" },
    { label: "Events", href: "/#events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Book Now", href: "/book" },
  ];

  return (
    <>
      {/* 1. Header (Top Navbar Bar) */}
      <header
        className={`hero-header ${menuOpen ? "hero-header--menu-open" : ""}`}
      >
        <div className="hero-header__tagline">
          <span className="hero-header__tagline-icon text-gold">✧</span>
          WHERE SERENITY MEETS COMFORT
        </div>

        <div className="hero-header__logo">
          <Link to="/">
            <img
              src={logoImg}
              alt="Yash Resort"
              className="hero-header__logo-img"
            />
          </Link>
        </div>

        <button
          className={`hero-header__menu-btn ${menuOpen ? "hero-header__menu-btn--open" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          id="menu-toggle-btn"
        >
          <span className="hero-header__menu-label">
            {menuOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="hero-header__hamburger">
            <span />
            <span />
          </div>
        </button>
      </header>

      {/* 2. Fullscreen Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? "menu-overlay--open" : ""}`}>
        <div className="menu-overlay__inner">
          {/* LEFT — Navigation Links */}
          <nav className="menu-overlay__nav">
            {menuLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.href}
                className="menu-overlay__nav-link text-white hover:text-gold"
                style={{
                  transitionDelay: menuOpen ? `${0.15 + i * 0.07}s` : "0s",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);

                  const isHashOnHome = link.href.startsWith("/#");
                  const isRoute = !link.href.includes("#");

                  if (isRoute) {
                    // Pure route like / or /about
                    setTimeout(() => navigate(link.href), 350);
                  } else if (isHashOnHome) {
                    const hash = link.href.replace("/", "");
                    if (location.pathname === "/") {
                      // Already on home, just scroll
                      setTimeout(() => {
                        const el = document.querySelector(hash);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 400);
                    } else {
                      // Navigate to home first, then scroll
                      navigate("/");
                      setTimeout(() => {
                        const el = document.querySelector(hash);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 600);
                    }
                  }
                }}
              >
                <span className="menu-overlay__nav-num text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="menu-overlay__nav-text">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* RIGHT — Contact + Social */}
          <div className="menu-overlay__right text-white">
            <div className="menu-overlay__contact-block">
              <h4 className="menu-overlay__right-title text-gold font-serif text-2xl font-bold mb-6">Get in Touch</h4>
              <div className="menu-overlay__contact mb-4">
                <span className="menu-overlay__contact-label text-gold/70 text-xs uppercase tracking-widest block mb-1">Address</span>
                <span className="menu-overlay__contact-val font-light">
                  Bhandardara, Maharashtra, India
                </span>
              </div>
              <div className="menu-overlay__contact mb-4">
                <span className="menu-overlay__contact-label text-gold/70 text-xs uppercase tracking-widest block mb-1">
                  24/7 Front Desk Support
                </span>
                <span className="menu-overlay__contact-val font-light">
                  +91 253 660 0000
                </span>
              </div>
              <div className="menu-overlay__contact">
                <span className="menu-overlay__contact-label text-gold/70 text-xs uppercase tracking-widest block mb-1">Email</span>
                <span className="menu-overlay__contact-val font-light">
                  stay@yashresort.in
                </span>
              </div>
            </div>

            <div className="menu-overlay__social-block mt-12">
              <h4 className="menu-overlay__right-title text-gold font-serif text-2xl font-bold mb-6">Follow Us</h4>
              <div className="menu-overlay__social flex gap-4">
                {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
                  <Link
                    key={s}
                    to="#"
                    className="menu-overlay__soc-btn w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-gold hover:text-white transition-all text-sm font-medium"
                    aria-label={s}
                  >
                    {s.slice(0, 2)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
