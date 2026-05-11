import { useState } from 'react';
import '../styles/TalentsSection.css';

const TALENTS = [
  {
    id: 'normal',
    name: 'Frontend Development',
    type: 'Normal Attack',
    description: 'Performs up to 5 consecutive strikes with React and CSS, dealing Area of Effect (AoE) styling damage to users.',
    stats: [
      { label: '1-Hit Damage', value: '85.4%' },
      { label: 'Loading Speed', value: '0.8s' },
      { label: 'Accessibility Score', value: '100' }
    ]
  },
  {
    id: 'skill',
    name: 'Component Architecture',
    type: 'Elemental Skill',
    description: 'Summons a reusable component that absorbs complex state and releases it as a clean user interface. Generates 3 clean props upon impact.',
    stats: [
      { label: 'Skill DMG', value: '214%' },
      { label: 'Cooldown', value: '10.0s' },
      { label: 'Reusability', value: 'High' }
    ]
  },
  {
    id: 'burst',
    name: 'Full Stack Deployment',
    type: 'Elemental Burst',
    description: 'Unleashes the power of the Backend, merging database and frontend into a single production-ready entity. Increases overall project stability by 25%.',
    stats: [
      { label: 'Burst DMG', value: '450%' },
      { label: 'Energy Cost', value: '60' },
      { label: 'Duration', value: '15.0s' }
    ]
  }
];

const TalentsSection = () => {
  const [activeTalent, setActiveTalent] = useState(TALENTS[0]);

  return (
    <div className="sidebar-right talents-container">
      <div className="talents-list">
        {TALENTS.map((talent) => (
          <div 
            key={talent.id}
            className={`talent-item ${activeTalent.id === talent.id ? 'active' : ''}`}
            onClick={() => setActiveTalent(talent)}
          >
            {/* Placeholder for Talent Icon */}
            <div className="talent-icon" style={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%',
              width: '30px',
              height: '30px'
            }}></div>
          </div>
        ))}
      </div>

      <div className="talent-details" key={activeTalent.id}>
        <div className="talent-header">
          <div className="talent-type">{activeTalent.type}</div>
          <h1 className="talent-name">{activeTalent.name}</h1>
        </div>

        <p className="talent-description">
          {activeTalent.description}
        </p>

        <div className="talent-stats">
          {activeTalent.stats.map((stat, idx) => (
            <div key={idx} className="talent-stat-row">
              <span className="talent-stat-label">{stat.label}</span>
              <span className="talent-stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentsSection;

