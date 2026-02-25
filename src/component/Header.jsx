import { useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { FaCode, FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { id: "home", label: "home()", icon: "{}" },
    { id: "about", label: "about()", icon: "</>" },
    { id: "skills", label: "skills()", icon: "[]" },
    { id: "projects", label: "projects()", icon: "<>" },
    { id: "contact", label: "contact()", icon: "()" }
  ];

  return (
    <motion.header 
      className="header-creative"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container">
        {/* Animated Code Background */}
        <div className="code-background">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="code-line"
              initial={{ x: -100 }}
              animate={{ x: "100vw" }}
              transition={{ 
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.5 
              }}
            >
              <span>const portfolio = new Portfolio();</span>
            </motion.div>
          ))}
        </div>

        {/* Logo with Code Style */}
        <motion.div 
          className="logo-creative"
          whileHover={{ rotate: 5 }}
        >
          <Link to="home" smooth={true} duration={500}>
            <FaCode className="code-icon" />
            <span className="logo-code">
              {"<"}
              <span className="logo-name">Mekdes</span>
              {"/>"}
            </span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="nav-creative">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              className="nav-item-creative"
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -3 }}
            >
              <Link
                to={item.id}
                smooth={true}
                duration={500}
                offset={-80}
                className="nav-link-creative"
                activeClass="active-creative"
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {hovered === item.id && (
                  <motion.span 
                    className="hover-line"
                    layoutId="hover-line"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        
      </div>
    </motion.header>
  );
};

export default Header;