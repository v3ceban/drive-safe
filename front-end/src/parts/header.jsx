import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenuLogo = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = isMenuOpen ? "hidden" : "visible";
    };

    handleBodyScroll();

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMenuOpen]);

  return (
    <header>
      <div className="logo">
        <Link
          to="/home"
          className={location.pathname === "/home" ? "active" : ""}
          onClick={toggleMenuLogo}
        >
          <img src={logo} alt="logo" />
          <h1>Drive Safe</h1>
        </Link>
      </div>
      <div className="desktopNav">
        <nav className={`nav ${isMenuOpen ? "is-active" : ""}`}>
          <ul>
            <li>
              <Link
                to="/home"
                className={
                  location.pathname === "/home" || location.pathname === "/"
                    ? "active"
                    : ""
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/checklist"
                className={location.pathname === "/checklist" ? "active" : ""}
              >
                Safety Checklist
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mobileNav">
        <button
          className={`hamburger hamburger--slider-r ${
            isMenuOpen ? "is-active" : ""
          }`}
          type="button"
          onClick={toggleMenu}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <nav className={`nav ${isMenuOpen ? "is-active" : ""}`}>
          <ul>
            <li>
              <Link
                to="/home"
                className={
                  location.pathname === "/home" || location.pathname === "/"
                    ? "active"
                    : ""
                }
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/checklist"
                className={location.pathname === "/checklist" ? "active" : ""}
                onClick={toggleMenu}
              >
                Safety Checklist
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active" : ""}
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p>Get ready for your DMV behind the wheel driving test with us</p>
      <p>Safe driving starts here</p>
    </header>
  );
};

export default Header;
