import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./component/Header";
import Hero from "./component/Hero";
import About from "./component/About";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Testimonials from "./component/Testimonials";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <div className={`app ${darkMode ? "dark" : ""}`}>
          <Header
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
          />

          <main className="main-content">
            <div>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Testimonials />
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
