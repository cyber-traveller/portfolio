import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../utils/cn';
import './Hero.css';
import './BackgroundCell.css';

const BackgroundCellAnimation = () => {
  return (
    <div className="background-cell" style={{'--cell-index': 0}}>
      <BackgroundCellCore />
      <div className="mask-overlay"></div>
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickedCell, setClickedCell] = useState(null);
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const size = 400;
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full absolute inset-0"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div className="cell-grid">
            {matrix.map((row, rowIdx) => (
              <div
                key={`matrix-row-${rowIdx}`}
                className="cell-column"
              >
                {row.map((column, colIdx) => {
                  const controls = useAnimation();

                  useEffect(() => {
                    if (clickedCell) {
                      const distance = Math.sqrt(
                        Math.pow(clickedCell[0] - rowIdx, 2) +
                          Math.pow(clickedCell[1] - colIdx, 2)
                      );
                      const delay = distance * 0.05;
                      controls.start({
                        opacity: [0, 0.8, 0],
                        scale: [1, 1.2, 1],
                        transition: {
                          duration: 0.6,
                          delay,
                          ease: "easeOut",
                        },
                      });
                    }
                  }, [clickedCell]);

                  return (
                    <motion.div
                      key={`matrix-col-${colIdx}`}
                      className="cell"
                      onClick={() => setClickedCell([rowIdx, colIdx])}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={controls}
                        className="cell-highlight"
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero relative">
      <BackgroundCellAnimation />
      
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hi, I'm Joel</h1>
          <p className="title">Full-Stack Developer </p>
          <div className="cta-buttons">
            <Link to="projects" smooth={true} duration={500} offset={-70} className="btn btn-primary">View Projects</Link>
            <a href="/resume.pdf" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="docs-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1={16} y1={13} x2={8} y2={13} />
                <line x1={16} y1={17} x2={8} y2={17} />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Resume
              <div className="download-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1={12} y1={15} x2={12} y2={3} />
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/profile1.png" alt="Joel's profile" />
        </div>
      </div>
    </section>
  );
};



const Pattern = ({
  className,
  cellClassName,
}) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState(null);

  return (
    <motion.div 
      className={cn("cell-grid", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {matrix.map((row, rowIdx) => (
        <motion.div
          key={`matrix-row-${rowIdx}`}
          className="cell-column"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: rowIdx * 0.05, duration: 0.5 }}
        >
          {row.map((column, colIdx) => {
            const controls = useAnimation();

            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(
                  Math.pow(clickedCell[0] - rowIdx, 2) +
                    Math.pow(clickedCell[1] - colIdx, 2)
                );
                const delay = distance * 0.05;
                controls.start({
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 0.6,
                    delay,
                    ease: "easeOut",
                  },
                });
              }
            }, [clickedCell]);

            return (
              <motion.div
                key={`matrix-col-${colIdx}`}
                className={cellClassName}
                onClick={() => setClickedCell([rowIdx, colIdx])}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  animate={controls}
                  className="cell-highlight rounded-sm"
                />
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </motion.div>
  );
};



export default Hero;