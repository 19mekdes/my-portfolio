// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import yourImage from "../assets/about-me.jpg"; 
import { FaReact, FaNodeJs, FaFigma, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiTailwindcss } from "react-icons/si";
import "./About.css";

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = `rgba(${Math.floor(Math.random() * 100 + 156)}, ${Math.floor(Math.random() * 100 + 156)}, 255, ${Math.random() * 0.2 + 0.1})`;
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

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 80;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.3;
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
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="about" className="about-section">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Floating Tech Icons */}
      <div className="floating-tech-icons">
        <motion.div 
          className="tech-icon"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          style={{ left: '15%', top: '30%' }}
        >
          <FaReact />
        </motion.div>
        <motion.div 
          className="tech-icon"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -360]
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          style={{ right: '20%', top: '40%' }}
        >
          <SiTypescript />
        </motion.div>
        <motion.div 
          className="tech-icon"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ left: '25%', bottom: '35%' }}
        >
          <FaNodeJs />
        </motion.div>
      </div>

      {/* Gradient Orbs */}
      <div className="gradient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="about-container">
        {/* Image Section */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-wrapper">
            <img src={yourImage} alt="About Me" />
            <div className="image-border"></div>
            <div className="image-glow"></div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="content-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="section-title">
              About <span className="title-highlight">Me</span>
            </h2>
            <h3 className="section-subtitle">Passionate Full Stack Developer</h3>

            <p className="about-text">
              I'm a motivated frontend developer specializing in React, with
              hands-on experience building dynamic web applications. My journey in
              tech started with a deep curiosity for how things work—leading me to
              dive into coding, where I discovered a love for turning ideas into
              interactive, user-centric experiences.
            </p>

            <p className="about-text">
              I focus on writing clean, maintainable code and enjoy solving
              problems with modern tools like TypeScript, Tailwind CSS, and
              Next.js. When I'm not coding, I'm learning new technologies,
              contributing to open-source projects, or sketching UI designs. Let's
              build something amazing together!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;