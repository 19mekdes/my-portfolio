import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaStar, FaFire } from 'react-icons/fa';
import dentalClinicImg from '../assets/dental-clinic.jpg';
import ecommerceImg from '../assets/ecommerce.jpg';
import videoCallImg from '../assets/video-call.jpg';
import qrGeneratorImg from '../assets/qr-generator.jpg';
import portfolioImg from '../assets/portfolio.jpg';
import './Projects.css';

const Projects = () => {
  const canvasRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.type = Math.random() > 0.5 ? 'circle' : 'square';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Add subtle wave motion
        this.x += Math.sin(time + this.waveOffset) * 0.2;
        this.y += Math.cos(time + this.waveOffset) * 0.2;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        if (this.type === 'circle') {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
          const size = this.size * 1.5;
          ctx.rect(this.x - size/2, this.y - size/2, size, size);
        }
        
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
      const maxDistance = 100;
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

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      
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
    };

    const drawFloatingCode = () => {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.font = '14px "Courier New", monospace';
      
      const codeElements = ['<div>', '() =>', 'const', 'import', 'export', 'return', 'useState', 'useEffect'];
      
      codeElements.forEach((element, i) => {
        const x = (canvas.width / codeElements.length) * i + Math.sin(time + i) * 20;
        const y = canvas.height * 0.3 + Math.cos(time + i) * 50;
        
        ctx.fillText(element, x, y);
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawFloatingCode();
      
      time += 0.02;
      
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

  const projects = [
    {
      id: 1,
      title: "Dental Clinic Management",
      description: "A comprehensive management system for dental clinics with appointment scheduling, patient records, and billing features. Built with React, Node.js, and MongoDB.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      image: dentalClinicImg,
      github: "https://github.com/19mekdes/Tana-Med-Solution.git",
      live: "#",
      featured: true,
      stats: { complexity: 90, impact: 85 }
    },
    {
      id: 2,
      title: "E-Commerce Website",
      description: "Full-featured online store with product catalog, shopping cart, and payment integration. Includes admin dashboard for inventory management.",
      tags: ["HTML", "CSS", "Javascript", "Tailwind CSS"],
      image: ecommerceImg,
      github: "https://github.com/19mekdes/E-commerce-website.git",
      live: "#",
      featured: true,
      stats: { complexity: 85, impact: 90 }
    },
    {
      id: 3,
      title: "Video Call Application",
      description: "Real-time video conferencing app with screen sharing, chat, and recording capabilities. Uses WebRTC for peer-to-peer connections.",
      tags: ["WebRTC", "Socket.io", "React", "Node.js"],
      image: videoCallImg,
      github: "https://github.com/19mekdes/Video-call.git",
      live: "#",
      featured: false,
      stats: { complexity: 95, impact: 80 }
    },
    {
      id: 4,
      title: "QR Code Packaging System",
      description: "Custom QR code generator for product packaging that tracks inventory and provides product information to consumers.",
      tags: ["QR Code", "Node.js", "React", "MongoDB"],
      image: qrGeneratorImg,
      github: "https://github.com/19mekdes/QR-Generater.git",
      live: "#",
      featured: false,
      stats: { complexity: 75, impact: 70 }
    },
    {
      id: 5,
      title: "My-Portfolio",
      description: "My portfolio project showcases a collection of my best work, highlighting my skills and creativity across various mediums.",
      tags: ["React", "Framer Motion", "CSS", "Responsive"],
      image: portfolioImg,
      github: "https://github.com/19mekdes/portfolio.git",
      live: "#",
      featured: true,
      stats: { complexity: 80, impact: 85 }
    }
  ];

  return (
    <section id="projects" className="projects-section">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="projects-canvas" />
      
      {/* Floating Code Elements */}
      <div className="floating-code-projects">
        {['</>', '{ }', 'JS', 'API', 'CSS', 'DEV'].map((text, i) => (
          <motion.div
            key={i}
            className="code-element"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="projects-orbs">
        <motion.div 
          className="orb orb-1"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="orb orb-2"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="projects-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <div className="header-wrapper">
            
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle">
              Showcasing my best work and development journey
            </p>
            <div className="title-underline"></div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Glow Effect */}
              {hoveredProject === project.id && (
                <motion.div 
                  className="project-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 70%)`
                  }}
                />
              )}

              {/* Featured Badge */}
              {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Featured
                </div>
              )}

              {/* Project Image */}
              <div className="project-image-wrapper">
                <div className="image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="image-overlay"></div>
                </div>
                
                {/* Stats Indicator */}
                <div className="project-stats">
                  <div className="stat">
                    <div className="stat-label">Complexity</div>
                    <div className="stat-bar">
                      <motion.div 
                        className="stat-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.stats.complexity}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Impact</div>
                    <div className="stat-bar">
                      <motion.div 
                        className="stat-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.stats.impact}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Project Links */}
                <div className="project-links">
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link github"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    <span>Code</span>
                  </motion.a>
                  <motion.a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link live"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <div className="content-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-icons">
                    <FaCode className="icon" />
                    <FaRocket className="icon" />
                    {project.featured && <FaFire className="icon featured-icon" />}
                  </div>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <motion.span 
                      key={i}
                      className="tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Hover Border Animation */}
              <motion.div 
                className="project-border"
                animate={{ 
                  rotate: hoveredProject === project.id ? 360 : 0,
                  scale: hoveredProject === project.id ? 1.02 : 1
                }}
                transition={{ 
                  rotate: { duration: 20, ease: "linear" },
                  scale: { duration: 0.3 }
                }}
              />
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Projects;