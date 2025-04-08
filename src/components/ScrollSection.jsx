// ScrollSection.jsx - Simplified version without scroll effects
const ScrollSection = ({ children, id, className }) => {
  return (
    <section
      id={id}
      className={className || ''}
    >
      {children}
    </section>
  );
};

export default ScrollSection;