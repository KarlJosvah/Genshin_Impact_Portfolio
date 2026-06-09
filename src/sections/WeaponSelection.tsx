import React from 'react';
import '../styles/WeaponSelection.css';

interface WeaponSelectionProps {
  onClose: () => void;
}

const WeaponSelection: React.FC<WeaponSelectionProps> = ({ onClose }) => {
  // Generate placeholder weapons (a mix of 4 and 5 stars)
  const weapons = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    rarity: i % 5 === 0 ? 5 : 4,
    refinement: Math.floor(Math.random() * 5) + 1,
    level: 90,
    isLocked: i % 3 === 0
  }));

  return (
    <div className="weapon-selection-overlay">
      {/* Top Right Global Buttons */}
      <div className="ws-global-buttons">
        <button className="ws-btn-compare">Compare</button>
        <button className="ws-btn-back" onClick={onClose}>↩</button>
      </div>

      {/* Left Panel */}
      <div className="weapon-selection-panel">
        <div className="ws-header">
          <div className="ws-header-icon"></div>
          <h2 className="ws-title">Weapon Selection</h2>
        </div>

        <div className="ws-grid-container">
          <div className="ws-grid">
            {weapons.map(weapon => (
              <div key={weapon.id} className={`ws-card rarity-${weapon.rarity}`}>
                <div className="ws-card-refine">{weapon.refinement}</div>
                {weapon.isLocked && <div className="ws-card-lock">🔒</div>}
                {/* Placeholder empty div for weapon image */}
                <div className="ws-card-image" />
                
                <div className="ws-card-bottom">
                  <div className="ws-card-stars">
                    {Array.from({ length: weapon.rarity }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <div className="ws-card-level">Lv. {weapon.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ws-bottom-controls">
          <button className="ws-icon-btn">⧨</button> {/* Placeholder for filter icon */}
          <div className="ws-dropdown">
            <span>Quality</span>
            <span>▼</span>
          </div>
          <button className="ws-icon-btn">⇅</button> {/* Placeholder for sort icon */}
        </div>
      </div>
    </div>
  );
};

export default WeaponSelection;
