import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>Drive Safe</h1>
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
              <Link to="/home" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/checklist" onClick={toggleMenu}>
                Safety Checklist
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
