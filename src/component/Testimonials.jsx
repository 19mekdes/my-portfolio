
import { useState } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import mastewalImg from "../assets/mastewal.jpg";
import muluImg from "../assets/mulu.jpg";
import kenenImg from "../assets/kenen.jpg";
import "./Testimonials.css";
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Mastewal",
      role: "CEO, Dental Clinic Inc.",
      content:
        "The dental clinic management system revolutionized our practice. Appointment scheduling became effortless, and patient record management is now completely paperless. The developer's attention to detail and understanding of dental workflows is impressive.",
      image: mastewalImg,
      rating: 5,
    },
    {
      id: 2,
      name: "Mulu",
      role: "E-Commerce Manager",
      content:
        "Our online store's performance improved dramatically after the redesign. The checkout process is now seamless, and the admin dashboard makes inventory management a breeze. Highly recommend this developer for e-commerce solutions!",
      image: muluImg,
      rating: 4,
    },
    {
      id: 3,
      name: "Kenen",
      role: "Product Manager",
      content:
        "The QR code packaging system exceeded our expectations. It not only improved our inventory tracking but also enhanced customer engagement. The solution was delivered on time and has been extremely reliable.",
      image: kenenImg,
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? "star filled" : "star"} />
    ));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="testimonials-header"
        >
          <h2 className="section-title">
            Client <span>Testimonials</span>
          </h2>
          <p className="section-subtitle">What people say about my work</p>
        </motion.div>

        <div className="testimonials-carousel">
          <button
            onClick={prevTestimonial}
            className="carousel-btn prev-btn"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <motion.div
            key={testimonials[currentIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="testimonial-card"
          >
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <div className="star-rating">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            <p className="testimonial-content">
              {testimonials[currentIndex].content}
            </p>
            <div className="testimonial-author">
              <div className="author-image">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                />
              </div>
              <div className="author-info">
                <h4>{testimonials[currentIndex].name}</h4>
                <p>{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>

          <button
            onClick={nextTestimonial}
            className="carousel-btn next-btn"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
