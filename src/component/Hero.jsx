import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import yourPhoto from "../assets/your-photo.jpg";
import "./Hero.css";
const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Hi, I'm <span className="text-highlight">Mekdes Wale</span>
          </h1>

          <div className="role-animation">
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                1500,
                "Web Developer",
                1500,
                "UX/UI Designer",
                1500,
                "React Specialist",
                1500,
              ]}
              wrapper="h2"
              cursor={true}
              repeat={Infinity}
              className="hero-subtitle"
            />
          </div>

          <p className="hero-description">
            "As a passionate Frontend Developer, I specialize in crafting
            intuitive and visually stunning web applications that captivate
            users. With expertise in React, Tailwind CSS, and TypeScript, I
            blend technical precision with a keen eye for design to deliver
            seamless user experiences. I thrive on optimizing performance,
            implementing responsive layouts, and collaborating closely with
            designers to transform innovative ideas into elegant, functional
            code. Currently, I'm diving into state management solutions and
            exploring the world of interactive animations to elevate my projects
            to new heights. Let’s connect and embark on a journey to create
            something truly extraordinary together!"
          </p>

          <div className="hero-buttons">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="primary-button"
            >
              Contact Me
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="secondary-button"
            >
              <FaFileDownload /> Download CV
            </motion.a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/19mekdes"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mekdes-wale-79a974322?"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="image-wrapper">
            <img src={yourPhoto} alt="Your Name" className="profile-image" />
            <div className="image-border"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
