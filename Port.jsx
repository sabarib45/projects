/*  Here’s a short paragraph you can say confidently in an interview about your project:

“This is a personal portfolio website built with React and React Router to showcase my skills, education, and projects. It has a dynamic navigation bar with a light/dark theme toggle, reusable components for each section, and uses state to manage UI features. The Projects section maps an array of project data into cards with images, tags, live demos, and source links. I also included a contact form that opens an email draft with user input, and a footer with social links. Overall, this project demonstrates my ability to build a responsive, component-based React application with real-world functionality and clean structure.”   */



import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import img from "./assets/me.jpg";
import img1 from "./assets/me.jpg";
import "./Port.css";
import Resume from "./assets/resume/Sabari_Java Fullstack_2025.pdf";


// ----------------- NAVBAR -----------------

import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect } from "react";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Apply mode on initial load
    if (darkMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav
      style={{
        background: darkMode ? "#111" : "#f2ededac",
        padding: "0.5rem 1rem",
        color: darkMode ? "#fff" : "#111",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link to="/"
          style={{
            color: darkMode ? "#fff" : "#111",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <span>SB</span> Sabari B
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Links */}
          <Link to="/" style={{ color: darkMode ? "#fff" : "#111", textDecoration: "none" }}>Home</Link>
          <Link to="/about" style={{ color: darkMode ? "#fff" : "#111", textDecoration: "none" }}>About</Link>
          <Link to="/skills" style={{ color: darkMode ? "#fff" : "#111", textDecoration: "none" }}>Skills</Link>
          <Link to="/education" style={{ color: darkMode ? "#fff" : "#111", textDecoration: "none" }}>Education</Link>
          <Link to="/projects" style={{ color: darkMode ? "#fff" : "#111", textDecoration: "none" }}>Projects</Link>
          <Link to="/contact" style={{ color: darkMode ? "#fff" : "#111", textDecoration: "none" }}>Contact</Link>

          {/* 🌙 / ☀ button */}
          <button onClick={toggleTheme}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1.3rem",
              color: darkMode ? "#fff" : "#141313ff",
            }} >
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
};






// ----------------- HOME -----------------
const Home = () => (
  <header className="container hero">
    <div>
      <div className="kicker">Full Stack Developer</div>
      <h1 className="title">
        Hi, I'm <span className="gradient-text">Sabari</span>
      </h1>
      <p className="subtitle">
      I’m a passionate <strong>Full-Stack Developer</strong>Full-Stack Developer building modern, scalable, and user-friendly web applications.  
  Skilled in <strong>React (HTML, CSS, JavaScript) </strong> , <strong>Python</strong> and <strong>MySQL</strong> . I turn ideas into interactive experiences.  
  I create responsive and performance-optimized front-end interfaces with seamless back-end integration.  
  Experienced in developing full-stack solutions with secure APIs, database management, and cloud deployment.  
  My goal is to deliver impactful software that solves real-world problems and enhances user experiences.
      </p>
      <div className="cta">
        <Link className="btn primary" to="/contact">Hire Me</Link>
        <Link className="btn primary" to="/projects">View Projects</Link>
        <a className="btn primary" href={Resume} download>Download Resume</a>
      </div>
    </div>

    <div className="hero-card" style={{ textAlign: "center" }}>
      <img
        src={img}
        alt="Profile"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          objectFit: "cover",
          margin: "auto",
          border: "4px solid rgba(255,255,255,.1)",
          boxShadow: "0 8px 24px rgba(0,0,0,.35)"
        }}
      />
      <div className="hero-grid" style={{ marginTop: 20 }}>
        <div className="metric"><h4>Full Stack</h4><p> React • Python • MySQL</p></div>
        <div className="metric"><h4>2025</h4><p>B.Sc., Computer Science</p></div>
        <div className="metric"><h4>Projects</h4><p> Portfolio, E-Commerce</p></div>
        <div className="metric"><h4>100%</h4><p>Responsive layouts</p></div>
      </div>
    </div>
  </header>
);

// ----------------- ABOUT -----------------
const About = () => (
  <section
    className="container about"
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2rem 0",
    }}
  >
    {/* Left content: detailed text with blue box shadow */}
    <div
      className="about-text"
      style={{
        flex: "1 1 450px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
        borderRadius: "15px",
      
        boxShadow: "0 10px 25px rgba(0, 123, 255, 0.5)", // blue shadow
      }}
    >
      <h2 className="section-title">About Me</h2>
      <p>
        I am <strong>Sabari</strong>, a dedicated Full-Stack Developer with a passion for creating seamless, modern, and scalable web applications.
      </p>
      <p>
        With expertise in <strong>React.js</strong>, <strong>Python</strong>, and <strong>MySQL</strong>, I develop dynamic front-end interfaces and robust back-end systems.
      </p>
      <p>
        I design, implement, and manage secure APIs while ensuring efficient database management for high-performance applications.
      </p>
      <p>
        Experienced in integrating third-party services, payment gateways, and cloud solutions to create full-featured, user-friendly applications.
      </p>
      <p>
        I deploy applications on platforms like <strong>Firebase</strong>, <strong>Heroku</strong>, and <strong>Netlify</strong>, optimizing them for speed, scalability, and reliability.
      </p>
     
      
    </div>

    {/* Right content: large circular profile image */}
    <div
      className="about-image"
      style={{
        flex: "1 1 350px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={img1} // your profile image
        alt="Sabari"
        style={{
          width: "350px",
          height: "350px",
          borderRadius: "50%", // circular shape
          objectFit: "cover",
        }}
      />
    </div>
  </section>
);



// ----------------- SKILLS -----------------
const Skills = () => {
  const skills = [
    { name: "HTML & CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "Git & GitHub", level: 70 },
    { name: "Communication", level: 85 },
  ];

  return (
    <section className="container">
      <h2 className="section-title">Skills</h2>
      <p className="section-desc">Technical and soft skills I bring to every project.</p>
      <div className="skills-list">
        {
          skills.map((skill) => (
          <div className="skill" key={skill.name}>
            <div className="skill-info">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <div
                className="skill-level"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// ----------------- EDUCATION -----------------
const Education = () => {
  const educationData = [
    {
      year: "2025-2026",
      degree: "Java Full Stack Development",
      institution: "Besant Technologies, Bengaluru, Karnataka",
      percentage: 90,
    },
    {
      year: "2022-2025",
      degree: "B.Sc Computer Science",
      institution: "Sun Arts and Science College, Thiruvannamalai",
      percentage: 80,
    },
    {
      year: "2020-2022",
      degree: "Higher Secondary",
      institution: "Sri VDS Jain Hr Sec School, Thiruvannamalai",
      percentage: 75,
    },
    {
      year: "2019-2020",
      degree: "Secondary School",
      institution: "SRGDS Higher Secondary School, Thiruvannamalai",
      percentage: 64,
    },
  ];

  return (
    <section className="container">
      <h2 className="section-title">Education</h2>
      <p className="section-desc">Academic and professional development timeline.</p>
      <div className="education-list">
        {
           educationData.map((edu, index) => (
          <div className="education-card" key={index}>
            <div className="education-header">
              <h3>{edu.degree}</h3>
              <span className="year">{edu.year}</span>
            </div>
            <p className="institution">{edu.institution}</p>
            <p className="percentage">Score: {edu.percentage}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ----------------- PROJECTS -----------------
const Projects = () => {
  const projects = [
    {
      title: "Automatic Video to Text Translator",
      desc: "Extracts audio from videos and translates it into text automatically. Useful for subtitles, accessibility, and transcription.",
      img: "https://static.clideo.com/assets/images/landing/translation-voiceover/video-translator.jpg",
      tags: ["Python", "AI", "Text Processing"],
      live: "https://example.com/demo1",
      source: "https://github.com/sathishkumarb45/Automatic-Video-to-Text-Translator",
    },
    {
      title: "Portfolio",
      desc: "A responsive mobile app showcasing my projects, skills, and contact information. Designed for smooth navigation and modern mobile UX.",
      img: "data:image/jpeg;base64,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",
      tags: ["React Native", "Mobile UI", "Responsive Design", "JavaScript"],
      live: "https://example.com/demo1",
      source: "https://github.com/sathishkumarb45/Portfolio-",
    },
     {
    title: "E-Commerce Website",
    desc: "A fully responsive e-commerce website with product listing, shopping cart, and checkout functionality, built using HTML, CSS, and JavaScript.",
    img: "data:image/jpeg;base64,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", // Replace with your website screenshot if you have one
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
    live: "https://example.com/demo1",
    source: "https://github.com/sathishkumarb45/E-Commerce-sample",
  }
  ];

return (
  <section className="container">
    <h2 className="section-title">Projects</h2>
    <div className="projects">
      {projects.map((p) => (
        <article className="card" key={p.title}>
          <img src={p.img} alt={p.title} />
          <div className="card-body">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="tags">
              {p.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="buttons">
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="btn live"
              >
                <FaExternalLinkAlt className="btn-icon" /> Live Demo
              </a>
              <a
                href={p.source}
                target="_blank"
                rel="noreferrer"
                className="btn source"
              >
                <FaGithub className="btn-icon" /> Source Code
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);
}



// ----------------- CONTACT -----------------



import {
  FaAddressBook,
  FaEnvelope,
  FaPhone,
  FaShareAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:sabaribabu27@gmail.com?subject=${subject}&body=${body}`;
    e.target.reset();
  };

  return (
    <section className="container">
      <h2 className="section-title">Contact</h2>
      <p className="section-desc">Reach out for collaborations or opportunities.</p>

      <div
        className="about"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        {/* Contact Form */}
        <div
          className="card"
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              className="btn primary"
              type="submit"
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Card */}
        <div
          className="card contact-card"
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaAddressBook /> Direct Contact
          </h3>
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaEnvelope /> Email:{" "}
            <a href="mailto:sabaribabu27@gmail.com">
              sabaribabu27@gmail.com
            </a>
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaPhone /> Phone:{" "}
            <a href="tel:+919360188596">+919360188596</a>
          </p>

          <h3
            className="mt-4"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            <FaShareAlt /> Social Links
          </h3>
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaGithub /> GitHub:{" "}
            <a
              href="https://github.com/sabarib45"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/sabari45
            </a>
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaLinkedin /> LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/sabarib45/" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/sabari45
              </a>
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaGlobe /> Website:{" "}
            <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
              yourwebsite.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};






// ----------------- FOOTER -----------------

import { FaInstagram, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => (
  <footer>
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "1rem 0",
      }}
    >
      {/* Copyright */}
      <small>© {new Date().getFullYear()} Sabari B - All rights reserved.</small>

      {/* Social Links */}
      <div className="socials" 
               style={{ 
                   display: "flex", 
                   gap: "1rem", 
                   fontSize: "1.5rem" 
                   }}>

        <a href="https://www.instagram.com/m_r___j_e_r_r_y__?igsh=aG03cXd0dTJvaGJr" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/share/174QHVxA3F/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/sabarib45/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/sabarib45" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
          <FaGlobe />
        </a>

      </div>

      {/* Back to Home */}
      <div className="back-home">
        <Link to="/">Back to Home ↑</Link>
      </div>
    </div>
  </footer>
);


// ----------------- APP -----------------
const Port = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/education" element={<Education />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
  </Router>
);

export default Port;