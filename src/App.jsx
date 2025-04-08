import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import ScrollSection from './components/ScrollSection';
import ScrollConfig from './components/ScrollConfig';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledApp>
      {loading ? (
        <Loader />
      ) : (
        <div className="app">
          <Navigation />
          <ScrollConfig />
          <ScrollSection className="hero-section">
            <Hero />
          </ScrollSection>
          <ScrollSection className="about-section">
            <About />
          </ScrollSection>
          <ScrollSection className="skills-section">
            <Skills />
          </ScrollSection>
          <ScrollSection className="projects-section">
            <Projects />
          </ScrollSection>
          <ScrollSection className="contact-section">
            <Contact />
          </ScrollSection>
          <ScrollSection className="footer-section">
            <Footer />
          </ScrollSection>
        </div>
      )}
    </StyledApp>
  );
}

const StyledApp = styled.div`
  .app {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
`;

export default App;
