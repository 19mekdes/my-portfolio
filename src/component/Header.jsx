import { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css"; 
import logo from "../assets/logo.png"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "skills", name: "Skills" },
    { id: "projects", name: "Projects" },
    { id: "contact", name: "Contact" }
  ];

  return (
    <header className="header">
      <div className="header-container">
        {}
        <Link to="home" smooth={true} duration={500} className="logo-link">
          <img src={logo} alt="Mekdes" className="logo" />
        </Link>

        {}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              smooth={true}
              duration={500}
              offset={-80}
              className="nav-link"
              activeClass="active-link"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {}
        {isOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="mobile-nav-link"
                  activeClass="active-link"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;