import { useState } from 'react';
import '../styles/WeaponsSection.css';
import WeaponSelection from './WeaponSelection.tsx';
import { EQUIPPED_WEAPON, type WeaponItemData } from '../constants/weapons.ts';

interface WeaponsSectionProps {
  isSelectionOpen?: boolean;
  setIsSelectionOpen?: (open: boolean) => void;
  selectedWeapon?: WeaponItemData;
  onSelectWeapon?: (weapon: WeaponItemData) => void;
}

const WeaponsSection: React.FC<WeaponsSectionProps> = ({
  isSelectionOpen: propIsSelectionOpen,
  setIsSelectionOpen: propSetIsSelectionOpen,
  selectedWeapon = EQUIPPED_WEAPON,
  onSelectWeapon = () => {},
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
        <h1 className="weapon-name">{selectedWeapon.name}</h1>
        <div className="weapon-type-row">
          <span className="weapon-type">{selectedWeapon.type}</span>
          <span className="weapon-lock">{selectedWeapon.isLocked ? '🔒' : '🔓'}</span>
        </div>
      </div>

      <div className="weapon-main-stats">
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">Base ATK</span>
          <span className="weapon-stat-value">{selectedWeapon.baseAtk}</span>
        </div>
        <div className="weapon-stat-row">
          <span className="weapon-stat-label">{selectedWeapon.subStatName}</span>
          <span className="weapon-stat-value">{selectedWeapon.subStatValue}</span>
        </div>
      </div>

      <div className="weapon-rarity">
        {Array.from({ length: selectedWeapon.rarity }).map((_, i) => (
          <span key={i} className="star-icon">★</span>
        ))}
      </div>

      <div className="weapon-level-box">
        <span className="level-text">Lv. <span className="level-highlight">{selectedWeapon.level}</span>/{selectedWeapon.maxLevel}</span>
        <div className="ascension-stars">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <span key={i} className="ascension-star">✦</span>
          ))}
        </div>
      </div>

      <div className="weapon-passive">
        <div className="weapon-refine">Refinement Rank {selectedWeapon.refinement}</div>
        <div className="weapon-passive-name">{selectedWeapon.passiveName}</div>
        <p className="weapon-passive-desc">
          · {selectedWeapon.passiveDesc}
        </p>
      </div>

      <div className="description-container">
        <p className="description-text">
          {selectedWeapon.description}
        </p>
      </div>

      <div className="weapon-actions">
        {isSelectionOpen && selectedWeapon.isEquipped && (
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
        <div className="weapon-buttons-row">
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
    </div>
    {isSelectionOpen && (
      <WeaponSelection
        onClose={() => setIsSelectionOpen(false)}
        selectedWeapon={selectedWeapon}
        onSelectWeapon={onSelectWeapon}
      />
    )}
    </>
  );
};

export default WeaponsSection;
