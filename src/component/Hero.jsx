// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaFileDownload, FaArrowDown, FaCode, FaServer, FaPalette } from "react-icons/fa";
import { useEffect, useRef } from "react";
import yourPhoto from "../assets/your-photo.jpg";
import "./Hero.css";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.floor(Math.random() * 100 + 156)}, ${Math.floor(Math.random() * 100 + 156)}, 255, ${Math.random() * 0.3 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Advanced Canvas Background */}
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Geometric Background Elements */}
      <div className="geometric-background">
        <div className="hexagon hexagon-1"></div>
        <div className="hexagon hexagon-2"></div>
        <div className="hexagon hexagon-3"></div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="triangle triangle-1"></div>
        <div className="triangle triangle-2"></div>
        
        {/* Floating Tech Icons */}
        <motion.div 
          className="floating-tech-icon"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: '10%', top: '20%' }}
        >
          <FaCode />
        </motion.div>
        <motion.div 
          className="floating-tech-icon"
          initial={{ y: 0 }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ right: '15%', top: '40%' }}
        >
          <FaServer />
        </motion.div>
        <motion.div 
          className="floating-tech-icon"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ left: '20%', bottom: '30%' }}
        >
          <FaPalette />
        </motion.div>
      </div>

      {/* Gradient Orbs */}
      <div className="gradient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Main Content */}
      <div className="hero-container">
        {/* Left Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Professional Badge */}
          <motion.div
            className="professional-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge-dot"></span>
            <span className="badge-text">Open to Opportunities</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Crafting Digital{" "}
            <motion.span 
              className="title-highlight"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Experiences
            </motion.span>
            <br />
            <span className="title-name">Mekdes Wale</span>
          </motion.h1>

          {/* Subtitle with Type Animation */}
          <motion.div
            className="role-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="role-line"></div>
            <div className="role-text">
              <TypeAnimation
                sequence={[
                  ' Frontend Developer',
                  2000,
                  'React js & nodejs Expert',
                  2000,
                  'Full Stack Specialist',
                  2000,
                  'Backend developer',
                  2000,
                  'Performance Optimizer',
                  2000,
                ]}
                wrapper="h2"
                cursor={true}
                repeat={Infinity}
                className="hero-subtitle"
              />
            </div>
            <div className="role-line"></div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            I architect and build <span className="highlight">high-performance web applications</span> using modern technologies. 
            With expertise in <span className="highlight">React ecosystem</span>, <span className="highlight">TypeScript</span>, and 
            <span className="highlight"> cloud solutions</span>, I transform complex requirements into elegant, scalable solutions 
            that drive business growth.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            className="tech-stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="tech-label">Tech Stack</div>
            <div className="tech-items">
              {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind', 'MangoDb'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="tech-item"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.a
              href="#projects"
              className="cta-button primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
              <FaArrowDown className="button-icon" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="cta-button secondary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Me</span>
            </motion.a>
            
            <motion.a
              href="/resume.pdf"
              download
              className="resume-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileDownload />
            </motion.a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="social-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            
            
            <div className="social-links">
              <motion.a
                href="https://github.com/19mekdes"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mekdes-wale-79a974322"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Profile Section */}
        <motion.div
          className="hero-profile"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="profile-container">
            {/* Animated Border */}
            <div className="profile-border">
              <div className="border-animation"></div>
            </div>
            
            {/* Profile Image */}
            <motion.div
              className="profile-image-wrapper"
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src={yourPhoto} 
                alt="Mekdes Wale - Professional Developer"
                className="profile-image"
              />
              
              {/* Floating Tech Dots */}
              <motion.div 
                className="tech-dot dot-1"
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="dot-tooltip">React</div>
              </motion.div>
              <motion.div 
                className="tech-dot dot-2"
                animate={{ 
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="dot-tooltip">TypeScript</div>
              </motion.div>
              <motion.div 
                className="tech-dot dot-3"
                animate={{ 
                  x: [0, 25, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="dot-tooltip">Next.js</div>
              </motion.div>
            </motion.div>

            {/* Profile Card */}
            <motion.div 
              className="profile-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="card-header">
                <div className="current-status">
                  <div className="status-indicator"></div>
                  <span>Currently Available</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Let's Build Together</h3>
                <p>Open to new challenges and collaborations</p>
                <a href="#contact" className="card-button">
                  Start Conversation
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="scroll-line"
          animate={{ height: [0, 30, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <span className="scroll-text">Explore My Work</span>
      </motion.div>
    </section>
  );
};

export default Hero;