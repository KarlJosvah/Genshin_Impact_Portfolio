import React from 'react';
import WeaponCard from '../components/ui/WeaponCard.tsx';
import { WEAPONS_DATA, type WeaponItemData } from '../constants/weapons.ts';
import '../styles/WeaponSelection.css';

interface WeaponSelectionProps {
  onClose: () => void;
  selectedWeapon: WeaponItemData;
  onSelectWeapon: (weapon: WeaponItemData) => void;
}

const WeaponSelection: React.FC<WeaponSelectionProps> = ({
  onClose,
  selectedWeapon,
  onSelectWeapon,
}) => {
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
            src="/assets/images/svg-gi/ATK.svg"
            alt="ATK"
            className="ws-header-icon"
          />
          <h2 className="ws-title">Weapon Selection</h2>
        </div>

        <div className="ws-grid-container">
          <div className="ws-grid">
            {WEAPONS_DATA.map(weapon => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                isSelected={selectedWeapon.id === weapon.id}
                onClick={() => onSelectWeapon(weapon)}
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
