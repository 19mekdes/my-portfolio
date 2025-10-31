import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaTwitter
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
      title: "Address",
      info: "Addis abeba, Ethiopia",
      link: "https://maps.google.com/?q=Addis+Ababa"
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      info: "+251 980536095",
      link: "tel:+251980536095"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      info: "mekdesw60@gmail.com",
      link:"mekdesw60@gmail.com"
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/19mekdes" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/mekdes-wale-79a974322?" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername" }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="contact-header"
        >
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p className="section-subtitle">Connect with me through multiple channels</p>
        </motion.div>

        <div className="contact-content">
          {}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="contact-info"
          >
            <h3>Contact Information</h3>
            <p>Fill out the form or reach out through these channels:</p>
            
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <a 
                  key={index} 
                  href={method.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-method"
                >
                  <div className="contact-icon">{method.icon}</div>
                  <div>
                    <h4>{method.title}</h4>
                    <p>{method.info}</p>
                  </div>
                </a>
              ))}
            </div>

            {}
            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {}
            <div className="map-container">
              <h4>My Location</h4>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.923646981572!2d38.76395021478613!3d8.980506093545915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="200" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </motion.div>

          {}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form"
          >
            {isSubmitSuccessful && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                Message sent successfully!
              </motion.div>
            )}

            <div className="oauth-buttons">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                text="continue_with"
                size="medium"
                width="300"
              />
              
              <a 
                href="https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID"
                className="github-btn"
              >
                <FaGithub /> Continue with GitHub
              </a>
            </div>

            <div className="form-divider">
              <span>or</span>
            </div>

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
              <label htmlFor="email">Your Email</label>
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
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
                rows="4"
              />
              <label htmlFor="message">Your Message</label>
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;