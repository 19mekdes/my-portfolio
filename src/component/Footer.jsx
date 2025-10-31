import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Skills", path: "#skills" },
    { name: "Projects", path: "#projects" },
    { name: "Contact", path: "#contact" }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/19mekdes", name: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/mekdes-wale-79a974322?", name: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername", name: "Twitter" },
    { icon: <SiUpwork />, url: "https://upwork.com/freelancers/yourusername", name: "Upwork" }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: "mekdesw60@gmail.com", url: "mekdesw60@gmail.com" },
    { icon: <FaPhone />, text: "+251 980536095", url: "tel:+251980536095" },
    { icon: <FaMapMarkerAlt />, text: "Addis Ababa, Ethiopia", url: "https://maps.google.com/?q=Addis+Ababa" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {}
        <div className="footer-content">
          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="footer-section"
          >
            <h3 className="footer-heading">About Me</h3>
            <p className="footer-about">
              I'm a passionate frontend developer and UI/UX designer creating modern,
              responsive web applications with React and cutting-edge technologies.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-icon"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="footer-section"
          >
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="footer-section"
          >
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="contact-item">
                    <span className="contact-icon">{item.icon}</span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="footer-bottom"
        >
          <p className="copyright">
            &copy; {currentYear} Mekdes. All rights reserved.
          </p>
          <p className="footer-note">
            Built with React and ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;