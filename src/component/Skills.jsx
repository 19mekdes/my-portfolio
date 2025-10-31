import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaHtml5, 
  FaCss3Alt,
  FaFigma,
  FaSketch,
  
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiTailwindcss, 
  SiAdobexd
} from 'react-icons/si'; 
import './Skills.css';

const Skills = () => {
  const frontendSkills = [
    { name: 'React', level: 95, icon: <FaReact />, color: '#61DAFB' },
    { name: 'JavaScript', level: 90, icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, icon: <SiTypescript />, color: '#3178C6' },
    { name: 'HTML5', level: 98, icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS3', level: 95, icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'Tailwind', level: 90, icon: <SiTailwindcss />, color: '#06B6D4' },
     
  ];

  const designSkills = [
    { name: 'UI/UX Design', level: 90, icon: <FaFigma />, color: '#F24E1E' },
    { name: 'Figma', level: 92, icon: <FaFigma />, color: '#F24E1E' },
    { name: 'Adobe XD', level: 85, icon: <SiAdobexd />, color: '#FF61F6' },
    { name: 'Sketch', level: 75, icon: <FaSketch />, color: '#F7B500' },
    { name: 'Prototyping', level: 88, icon: <FaFigma />, color: '#F24E1E' },
    
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="skills-category"
        >
          <h2 className="category-title">
            <span className="text-react">Frontend</span> Development
          </h2>
          <div className="skills-grid">
            {frontendSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="skill-card"
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="skills-category"
        >
          <h2 className="category-title">
            <span className="text-design">UI/UX</span> Design
          </h2>
          <div className="skills-grid">
            {designSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="skill-card"
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;