import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import dentalClinicImg from '../assets/dental-clinic.jpg';
import ecommerceImg from '../assets/ecommerce.jpg';
import videoCallImg from '../assets/video-call.jpg';
import qrGeneratorImg from '../assets/qr-generator.jpg';
import portfolioImg from '../assets/portfolio.jpg';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Dental Clinic Management",
      description: "A comprehensive management system for dental clinics with appointment scheduling, patient records, and billing features. Built with React, Node.js, and MongoDB.",
      tags: ["React", "Node.js", "CSS", "phyton"],
      image: dentalClinicImg,
      github: "https://github.com/19mekdes/Tana-Med-Solution.git",
      live: "#"
    },
    {
      id: 2,
      title: "E-Commerce Website",
      description: "Full-featured online store with product catalog, shopping cart, and payment integration. Includes admin dashboard for inventory management.",
      tags: ["HTML", "CSS", "Javascript", "Tailwind CSS"],
      image: ecommerceImg,
      github: "https://github.com/19mekdes/E-commerce-website.git",
      live: "#"
    },
    {
      id: 3,
      title: "Video Call Application",
      description: "Real-time video conferencing app with screen sharing, chat, and recording capabilities. Uses WebRTC for peer-to-peer connections.",
      tags: ["HTML", "CSS", "Javascript", "bootstrap"],
      image: videoCallImg,
      github: "https://github.com/19mekdes/Video-call.git",
      live: "#"
    },
    {
      id: 4,
      title: "QR Code Packaging System",
      description: "Custom QR code generator for product packaging that tracks inventory and provides product information to consumers.",
      tags: ["HTML", "CSS", "Javascript", "QR Code"],
      image: qrGeneratorImg,
      github: "https://github.com/19mekdes/QR-Generater.git",
      live: "#"
    },
    {
      id: 4,
      title: "My-Portfolio",
      description: "My portfolio project showcases a collection of my best work, highlighting my skills and creativity across various mediums. It serves as a visual representation of my professional journey and expertise.",
      tags: ["React", "CSS", "Node.js", ""],
      image: portfolioImg,
      github: "https://github.com/19mekdes/portfolio.git",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="projects-header"
        >
          <h2 className="section-title">My <span>Projects</span></h2>
          <p className="section-subtitle">Featured work I've built</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card"
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub /> Code
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;