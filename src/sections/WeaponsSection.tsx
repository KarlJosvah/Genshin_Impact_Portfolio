import { useState } from 'react';
import '../styles/WeaponsSection.css';
import WeaponSelection from './WeaponSelection.tsx';

interface WeaponsSectionProps {
  isSelectionOpen?: boolean;
  setIsSelectionOpen?: (open: boolean) => void;
}

const WeaponsSection: React.FC<WeaponsSectionProps> = ({
  isSelectionOpen: propIsSelectionOpen,
  setIsSelectionOpen: propSetIsSelectionOpen,
}) => {
  const [localIsSelectionOpen, localSetIsSelectionOpen] = useState(false);

  const isSelectionOpen = propIsSelectionOpen !== undefined ? propIsSelectionOpen : localIsSelectionOpen;
  const setIsSelectionOpen = (open: boolean) => {
    if (propSetIsSelectionOpen) {
      propSetIsSelectionOpen(open);
    } else {
      localSetIsSelectionOpen(open);
    }
  };

  return (
    <>
    <div className="sidebar-right weapon-container">


      <div className="weapon-header">
        <h1 className="weapon-name">Cinnabar Spindle</h1>
        <div className="weapon-type-row">
          <span className="weapon-type">Sword</span>
          <span className="weapon-lock">🔒</span>
        </div>
      </div>

      <div className="weapon-main-stats">
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">Base ATK</span>
          <span className="weapon-stat-value">454</span>
        </div>
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">DEF</span>
          <span className="weapon-stat-value">69.0%</span>
        </div>
      </div>

      <div className="weapon-rarity">
        {[1, 2, 3, 4].map(i => (
          <span key={i} className="star-icon">★</span>
        ))}
      </div>

      <div className="weapon-level-box">
        <span className="level-text">Lv. <span className="level-highlight">90</span>/90</span>
        <div className="ascension-stars">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <span key={i} className="ascension-star">✦</span>
          ))}
        </div>
      </div>

      <div className="weapon-passive">
        <div className="weapon-refine">Refinement Rank 5</div>
        <div className="weapon-passive-name">Spotless Heart</div>
        <p className="weapon-passive-desc">
          · Elemental Skill DMG is increased by <span className="highlight-cyan">80%</span> of DEF. 
          The effect will be triggered no more than once every 1.5s and will be cleared 0.1s after the 
          Elemental Skill deals DMG.
        </p>
      </div>

      <div className="description-container">
        <p className="description-text">
          A sword made from materials that do not belong in this world. The power within might even be able to withstand the corruption of a venom that could corrode a mighty dragon.
        </p>
      </div>

      {isSelectionOpen && (
        <div className="equipped-badge">
          <div className="equipped-avatar-wrapper">
            <img
              src="/assets/images/side_icons/Albedo_Side_Icon.webp"
              alt="Albedo"
              className="equipped-avatar"
            />
          </div>
          <span>Equipped: Albedo</span>
        </div>
      )}

      <div className="weapon-actions">
        <button 
          className={`weapon-btn btn-switch ${isSelectionOpen ? 'disabled' : ''}`}
          onClick={() => setIsSelectionOpen(true)}
          disabled={isSelectionOpen}
        >
          Switch
        </button>
        <button className="weapon-btn btn-enhance">Enhance</button>
      </div>
    </div>
    {isSelectionOpen && <WeaponSelection onClose={() => setIsSelectionOpen(false)} />}
    </>
  );
};

export default WeaponsSection;
