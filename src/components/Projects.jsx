import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = gsap.utils.toArray('.project-card');

    // Create a smooth horizontal scroll animation with enhanced easing
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: { min: 0.3, max: 0.6 },
          ease: 'power2.inOut'
        },
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate which card is most visible
          const progress = self.progress * (cards.length - 1);
          const currentIndex = Math.round(progress);
          
          cards.forEach((card, index) => {
            if (index === currentIndex) {
              card.classList.add('active');
            } else {
              card.classList.remove('active');
            }
          });

          // Add smooth easing at edges
          if (self.progress > 0.95) {
            self.animation.timeScale(0.5);
          } else if (self.progress < 0.05) {
            self.animation.timeScale(0.5);
          } else {
            self.animation.timeScale(1);
          }
        }
      }
    });

    // Enhanced parallax and rotation effects for project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.to(card, {
        y: 30,
        rotationY: 10,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 1,
          containerAnimation: gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth)
          })
        }
      });

      // Add hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 10,
          duration: 0.5,
          ease: 'power2.in'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: 'Flight Booking Platform',
      description: 'A full-stack Booking platform with modern UI and secure payment integration.',
      image: 'flight.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: 'https://playful-cobbler-e3b91b.netlify.app/',
      githubLink: 'https://github.com/cyber-traveller/Flight-app-client.git'
    },
    {
      title: 'Real-Time Chat App',
      description: 'A responsive real-time chat application with support for private and group chats, built with a modern UI and scalable backend.',
      image: 'chatapp.png', // Replace with actual screenshot if available
      technologies: ['MongoDB', 'Socket.io', 'React', 'Node.js', 'DaisyUI', 'Tailwind CSS'],
      demoLink: 'https://0-chatapp.netlify.app/login',
      githubLink: 'https://github.com/cyber-traveller/chat-app-frontend.git'
    },
    {
      title: 'Breach Search Platform',
      description: 'A cybersecurity tool that allows users to check if their email, phone number, or username has been exposed in data breaches, with detailed breach reports and safety recommendations.',
      image: 'breachsearch.png', // Replace with a screenshot of your UI if available
      technologies: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
      demoLink: 'https://breachsearch.site',
      githubLink: 'https://github.com/cyber-traveller/BreachHunter-Bot.git'
    },
    {
      title: 'Restaurant Reservation & Booking',
      description: 'A web platform that allows users to discover restaurants, make real-time table reservations, and read/write reviews. Includes admin dashboard, payment integration, and personalized recommendations.',
      image: 'restoreser.png', // Replace with a screenshot or a banner image of your project UI
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Razorpay'],
      demoLink: 'https://dineease6000.netlify.app/',
      githubLink: 'https://github.com/cyber-traveller/dineease.git'
    },
    {
      title: 'Movie Search App',
      description: 'A sleek web application that lets users search for movies, view details like ratings, cast, and plot summaries using a third-party movie API. Includes responsive design and loading animations.',
      image: 'movieapp.png', // Replace with your actual screenshot or banner
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'OMDb API'],
      demoLink: 'https://movie-searchingapp.netlify.app/',
      githubLink: 'https://github.com/cyber-traveller/movie-search-app.git'
    },
    {
      title: 'Travel & Tourism Landing Page',
      description: 'A visually appealing landing page designed to promote travel destinations and tour packages, featuring interactive elements and responsive design for an engaging user experience.',
      image: 'trip.png', // Replace with a beautiful travel-themed screenshot
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://tripnic.netlify.app/',
      githubLink: 'https://github.com/yourusername/travel-tourism-landing-page'
    }
    
  ];

  const ProjectCard = ({ project }) => {

    return (
      <div className="project-card">
        <div className="project-image">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width="600"
            height="400"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <motion.div 
          className="project-info"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-technologies">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="tech-tag"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="project-links">
            <a
              href={project.demoLink}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Demo"
            >
              <FiExternalLink />
            </a>
            <a
              href={project.githubLink}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="projects" 
      id="projects"
    >
      <div className="projects-content">
        <h2 className="projects-title">Projects</h2>
        <div 
          className="projects-grid"
          ref={containerRef}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;