import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCode,
  FaServer,
  FaMobileAlt,
  FaGlobe,
  FaRocket
} from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Contact.css';

const Contact = () => {
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful } 
  } = useForm();

  const canvasRef = useRef(null);
  const [hoveredContact, setHoveredContact] = useState(null);

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
        this.speedX = Math.random() * 0.25 - 0.125;
        this.speedY = Math.random() * 0.25 - 0.125;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.shape = Math.random() > 0.7 ? 'square' : 'circle';
      }

      update() {
        this.x += this.speedX + Math.sin(time + this.waveOffset) * 0.2;
        this.y += this.speedY + Math.cos(time + this.waveOffset) * 0.2;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        if (this.shape === 'circle') {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
          ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        }
        
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(70, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 90;
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

    const drawNetworkGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawDataFlow = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 150;
      
      // Draw data flow circles
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 3; i++) {
        const r = radius + i * 60;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw flowing data points
      const dataPoints = 8;
      for (let i = 0; i < dataPoints; i++) {
        const angle = (i / dataPoints) * Math.PI * 2 + time * 0.5;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawNetworkGrid();
      drawDataFlow();
      
      time += 0.015;
      
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

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        data,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setValue('name', decoded.name);
    setValue('email', decoded.email);
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
  };

  const contactMethods = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      info: "Addis Ababa, Ethiopia",
      link: "https://maps.google.com/?q=Addis+Ababa",
      color: "#3B82F6"
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      info: "+251 980536095",
      link: "tel:+251980536095",
      color: "#10B981"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      info: "mekdesw60@gmail.com",
      link: "mailto:mekdesw60@gmail.com",
      color: "#8B5CF6"
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/19mekdes", color: "#333", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/mekdes-wale-79a974322", color: "#0077B5", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername", color: "#1DA1F2", label: "Twitter" }
  ];

  const floatingTechIcons = [
    { icon: <FaCode />, name: "Code" },
    { icon: <FaServer />, name: "Server" },
    { icon: <FaMobileAlt />, name: "Mobile" },
    { icon: <FaGlobe />, name: "Web" },
    { icon: <FaRocket />, name: "Launch" }
  ];

  return (
    <section id="contact" className="contact-section">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="contact-canvas" />
      
      {/* Floating Tech Icons */}
      <div className="floating-tech-icons">
        {floatingTechIcons.map((tech, i) => (
          <motion.div
            key={i}
            className="tech-icon"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
      </div>

      {/* Floating Data Elements */}
      <div className="floating-data">
        {['@', 'mailto:', 'https://', 'api/', 'GET', 'POST', '200 OK', 'WebSocket'].map((text, i) => (
          <motion.div
            key={i}
            className="data-element"
            animate={{
              y: [0, 25, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 0.8 + 0.6}rem`
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <div className="contact-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-header"
        >
          <div className="header-content">
            
            <h2 className="section-title">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="section-subtitle">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
            <div className="title-underline"></div>
          </div>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="contact-info"
          >
            <div className="info-card">
              <div className="info-header">
                <h3>Contact Information</h3>
                <p>Multiple ways to reach me</p>
              </div>
              
              <div className="contact-methods-grid">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: `0 10px 25px ${method.color}30`
                    }}
                    onMouseEnter={() => setHoveredContact(index)}
                    onMouseLeave={() => setHoveredContact(null)}
                  >
                    <div 
                      className="method-icon-wrapper"
                      style={{ 
                        backgroundColor: `${method.color}15`,
                        borderColor: `${method.color}30`
                      }}
                    >
                      <div 
                        className="method-icon"
                        style={{ color: method.color }}
                      >
                        {method.icon}
                      </div>
                    </div>
                    <div className="method-content">
                      <h4>{method.title}</h4>
                      <p>{method.info}</p>
                    </div>
                    
                    {hoveredContact === index && (
                      <motion.div 
                        className="method-glow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          background: `radial-gradient(circle at center, ${method.color}20, transparent 70%)`
                        }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Connect Socially</h4>
                <div className="social-icons-grid">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-card"
                      style={{ backgroundColor: `${social.color}15` }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -3,
                        backgroundColor: `${social.color}25`
                      }}
                    >
                      <div 
                        className="social-icon"
                        style={{ color: social.color }}
                      >
                        {social.icon}
                      </div>
                      <span className="social-label">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="map-section">
                <h4>📍 Location</h4>
                <div className="map-wrapper">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.923646981572!2d38.76395021478613!3d8.980506093545915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="180" 
                    style={{ border: 0, borderRadius: '12px' }} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Addis Ababa Location"
                    className="contact-map"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form"
          >
            <div className="form-card">
              {isSubmitSuccessful && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  ✨ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {/* OAuth Buttons */}
              <div className="oauth-section">
                <h4 className="oauth-title">Quick Connect</h4>
                <div className="oauth-buttons">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    text="continue_with"
                    size="medium"
                    width="100%"
                  />
                  
                  <motion.a 
                    href="https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID"
                    className="github-oauth-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub /> Continue with GitHub
                  </motion.a>
                </div>
              </div>

              <div className="form-divider">
                <span>or send a message directly</span>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder=" "
                  />
                  <label htmlFor="name">Your Name</label>
                  {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder=" "
                  />
                  <label htmlFor="email">Email Address</label>
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder=" "
                />
                <label htmlFor="subject">Subject</label>
                {errors.subject && (
                  <span className="error-message">{errors.subject.message}</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  {...register("message", { 
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                  className={`form-input ${errors.message ? 'error' : ''}`}
                  placeholder=" "
                  rows="5"
                />
                <label htmlFor="message">Your Message</label>
                {errors.message && (
                  <span className="error-message">{errors.message.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>

              <div className="form-footer">
                <p className="privacy-note">
                  🔒 Your information is secure and will only be used to respond to your inquiry.
                </p>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;