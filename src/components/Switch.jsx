import './Switch.css';

const Switch = ({ isOpen, onClick }) => {
  return (
    <div className="switch-wrapper">
      <div className="container">
        <div className={`toggle ${isOpen ? 'active' : ''}`} onClick={onClick}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default Switch;