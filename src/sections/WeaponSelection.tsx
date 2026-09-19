import React, { useState } from 'react';
import WeaponCard, { type WeaponItem } from '../components/ui/WeaponCard.tsx';
import '../styles/WeaponSelection.css';

interface WeaponSelectionProps {
  onClose: () => void;
}

const WeaponSelection: React.FC<WeaponSelectionProps> = ({ onClose }) => {
  const [selectedId, setSelectedId] = useState<number>(0);

  // Generate placeholder weapons (a mix of 4 and 5 stars)
  const weapons: WeaponItem[] = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    rarity: i % 5 === 0 ? 5 : 4,
    refinement: Math.floor(Math.random() * 5) + 1,
    level: 90,
    isLocked: i % 3 === 0,
    equippedAvatarSrc: i === 0 ? '/assets/images/side_icons/Albedo_Side_Icon.webp' : undefined,
  }));

  return (
    <div className="weapon-selection-overlay">
      {/* Top Right Global Buttons */}
      <div className="ws-global-buttons">
        <button className="ws-btn-compare">Compare</button>
        <button className="ws-btn-back" onClick={onClose} aria-label="Back">
          ↶
        </button>
      </div>

      {/* Left Panel */}
      <div className="weapon-selection-panel">
        <div className="ws-header">
          <img
            src="/assets/images/svg/ATK.svg"
            alt="ATK"
            className="ws-header-icon"
          />
          <h2 className="ws-title">Weapon Selection</h2>
        </div>

        <div className="ws-grid-container">
          <div className="ws-grid">
            {weapons.map(weapon => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                isSelected={selectedId === weapon.id}
                onClick={() => setSelectedId(weapon.id)}
              />
            ))}
          </div>
        </div>

        <div className="ws-bottom-controls">
          <button className="ws-icon-btn" title="Filter">
            <img src="/assets/images/svg/filter.svg" alt="Filter" className="ws-btn-icon" />
          </button>
          <div className="ws-dropdown">
            <span>Quality</span>
            <span>▼</span>
          </div>
          <button className="ws-icon-btn" title="Sort">
            <img src="/assets/images/svg/sort.svg" alt="Sort" className="ws-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeaponSelection;
