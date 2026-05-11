import '../styles/WeaponsSection.css';

const WeaponsSection = () => {
  return (
    <div className="sidebar-right weapon-container">
      <div className="weapon-image-container">
        {/* Placeholder for Tech Stack Icon/Logo */}
        <div style={{ 
          width: '300px', 
          height: '300px', 
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" 
            alt="React" 
            className="weapon-image"
          />
        </div>
      </div>

      <div className="weapon-header">
        <h1 className="weapon-name">React.js</h1>
        <div className="weapon-rarity">
          {[1, 2, 3, 4, 5].map(i => (
            <span key={i} style={{ color: 'var(--genshin-accent)', fontSize: '1.2rem' }}>★</span>
          ))}
        </div>
      </div>

      <div className="weapon-main-stats">
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">Level 90 / 90</span>
        </div>
        <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">Base ATK</span>
          <span className="weapon-stat-value">674</span>
        </div>
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">Component Architecture</span>
          <span className="weapon-stat-value">44.1%</span>
        </div>
      </div>

      <div className="weapon-passive">
        <div className="weapon-passive-name">
          <span>Virtual DOM Mastery</span>
          <span className="weapon-refine">Refinement Rank 5</span>
        </div>
        <p className="weapon-passive-desc">
          Increases rendering speed by <span style={{ color: 'var(--genshin-accent)' }}>40%</span>. 
          When triggering a state change, creates a reconciliation burst that optimizes 
          the component tree, providing a <span style={{ color: 'var(--genshin-accent)' }}>24%</span> boost 
          to User Experience for 12s.
        </p>
      </div>

      <div className="description-container">
        <p className="description-text">
          A high-performance library for building interactive user interfaces. 
          Its power lies in the seamless management of complex states.
        </p>
      </div>
    </div>
  );
};

export default WeaponsSection;

