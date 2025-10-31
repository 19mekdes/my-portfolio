import { motion } from "framer-motion";
import yourImage from "../assets/about-me.jpg"; 
import { FaReact, FaNodeJs, FaFigma, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiTailwindcss } from "react-icons/si";
import "./About.css";

const About = () => {
  const skills = [
    { icon: <FaReact />, name: "React", level: "90%" },
    { icon: <SiTypescript />, name: "TypeScript", level: "85%" },
    { icon: <FaNodeJs />, name: "Node.js", level: "80%" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", level: "95%" },
    { icon: <FaFigma />, name: "UI/UX Design", level: "75%" },
    { icon: <FaDatabase />, name: "Database", level: "70%" },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {}
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
          </div>
        </motion.div>

        {}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <h3 className="section-subtitle">Passionate Frontend Developer</h3>

          <p className="about-text">
            I’m a motivated frontend developer specializing in React, with
            hands-on experience building dynamic web applications. My journey in
            tech started with a deep curiosity for how things work—leading me to
            dive into coding, where I discovered a love for turning ideas into
            interactive, user-centric experiences.
          </p>

          <p className="about-text">
            I focus on writing clean, maintainable code and enjoy solving
            problems with modern tools like TypeScript, Tailwind CSS, and
            Next.js. When I’m not coding, I’m learning new technologies,
            contributing to open-source projects, or sketching UI designs. Let’s
            build something amazing together!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
