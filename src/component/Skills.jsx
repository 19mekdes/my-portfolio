import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs,
  FaGitAlt,
  FaBrain,
  FaPalette,
  FaServer,
  FaTools,
  FaRocket,
  FaDatabase,
  FaCode,
  FaMobileAlt,
  FaUsers,
  FaLightbulb,
  FaComments,
  FaChartLine,
  FaBolt,
  FaShieldAlt
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs,
  SiMongodb,
  SiDocker,
  SiJest,
  SiRedux,
  SiPostgresql,
  SiFigma,
  SiVite,
  SiGraphql
} from 'react-icons/si'; 
import './Skills.css';

const Skills = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

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
        
        const colors = [
          'rgba(59, 130, 246, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.speedX += (Math.random() - 0.5) * 0.02;
        this.speedY += (Math.random() - 0.5) * 0.02;
        
        this.speedX = Math.max(-0.5, Math.min(0.5, this.speedX));
        this.speedY = Math.max(-0.5, Math.min(0.5, this.speedY));
        
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
        
        this.pulsePhase += this.pulseSpeed;
      }

      draw() {
        const pulseSize = this.size * (0.8 + 0.4 * Math.sin(this.pulsePhase));
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 0.3 * (1 - distance / maxDistance);
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, particles[i].color.replace('0.6', opacity.toString()));
            gradient.addColorStop(1, particles[j].color.replace('0.6', opacity.toString()));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + (1 - distance / maxDistance) * 1.5;
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

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const categories = [
    { 
      id: 'frontend', 
      label: 'Frontend Development', 
      color: '#61DAFB',
      icon: <FaPalette />,
      description: 'Building responsive, interactive user interfaces with modern frameworks',
      skills: [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
        { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
        { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' }
      ]
    },
    { 
      id: 'backend', 
      label: 'Backend Development', 
      color: '#339933',
      icon: <FaServer />,
      description: 'Server-side logic, APIs, databases, and server management',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' },
        { name: 'REST API', icon: <FaCode />, color: '#4A90E2' },
        { name: 'Authentication', icon: <FaShieldAlt />, color: '#4299E1' }
      ]
    },
    { 
      id: 'tools', 
      label: 'Dev Tools & Workflow', 
      color: '#8b5cf6',
      icon: <FaTools />,
      description: 'Development tools, testing, and deployment automation',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
        { name: 'Jest', icon: <SiJest />, color: '#C21325' },
        { name: 'Vite', icon: <SiVite />, color: '#646CFF' },
        { name: 'ESLint', icon: <FaCode />, color: '#4B32C3' },
        { name: 'VS Code', icon: <FaCode />, color: '#007ACC' }
      ]
    },
    { 
      id: 'soft', 
      label: 'Soft Skills', 
      color: '#ec4899',
      icon: <FaBrain />,
      description: 'Essential interpersonal and professional skills for development',
      skills: [
        { name: 'Problem Solving', icon: <FaLightbulb />, color: '#F59E0B' },
        { name: 'Communication', icon: <FaComments />, color: '#3B82F6' },
        { name: 'Teamwork', icon: <FaUsers />, color: '#10B981' },
        { name: 'Adaptability', icon: <FaBolt />, color: '#ec4899' },
        { name: 'Creativity', icon: <FaPalette />, color: '#8b5cf6' },
        { name: 'Project Management', icon: <FaChartLine />, color: '#ef4444' }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="skills-canvas" />
      
      <div className="container">
        {/* Header - This is at the VERY TOP of the section */}
        <motion.div 
          className="skills-header-top"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="header-content-top">
            <span className="header-badge-top">MY SKILLS</span>
            <h2 className="section-title-top">
              Technical <span className="gradient-text">Expertise</span>
            </h2>
            <p className="section-description-top">
              A comprehensive skill set covering modern web development
            </p>
            <div className="title-line-top"></div>
          </div>
        </motion.div>

        {/* Horizontal Categories Grid - Single Row */}
        <div className="categories-grid-horizontal">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card-horizontal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="category-header">
                <div 
                  className="category-icon-wrapper"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <div 
                    className="category-icon"
                    style={{ color: category.color }}
                  >
                    {category.icon}
                  </div>
                </div>
                <h3 className="category-title">{category.label}</h3>
                <p className="category-description">{category.description}</p>
              </div>

              {/* Skills Logos Grid */}
              <div className="skills-logos-grid">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: skillIndex * 0.05 + index * 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div 
                      className="logo-wrapper"
                      style={{ 
                        backgroundColor: `${skill.color}15`,
                        borderColor: `${skill.color}30`
                      }}
                    >
                      <div 
                        className="logo-icon"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </div>
                    </div>
                    <span className="logo-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div 
          className="skills-summary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="summary-card">
            <div className="summary-content">
              <FaRocket className="summary-icon" />
              <h3 className="summary-title">Development Approach</h3>
              <p className="summary-text">
                Combining technical expertise with modern development practices to build 
                scalable, maintainable, and user-friendly web applications.
              </p>
              <div className="summary-stats">
                <div className="stat-item">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Categories</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24</div>
                  <div className="stat-label">Technologies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Quality Focus</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;