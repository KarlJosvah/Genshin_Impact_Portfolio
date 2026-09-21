import React from 'react';
import type { WeaponItemData } from '../../constants/weapons.ts';

interface WeaponCardProps {
  weapon: WeaponItemData;
  isSelected?: boolean;
  onClick?: () => void;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon, isSelected, onClick }) => {
  return (
    <div
      className={`ws-card rarity-${weapon.rarity} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="ws-card-refine">{weapon.refinement}</div>
      {weapon.isLocked && <div className="ws-card-lock">🔒</div>}
      {weapon.isEquipped && (
        <div className="ws-card-equipped-badge">
          <img
            src="/assets/images/side_icons/Albedo_Side_Icon.webp"
            alt="Equipped avatar"
            className="ws-card-equipped-avatar"
          />
        </div>
      )}

      {/* Tech SVG Logo */}
      <div className="ws-card-image">
        <img
          src={weapon.svgPath}
          alt={weapon.name}
          className="ws-card-tech-svg"
        />
      </div>

      <div className="ws-card-bottom">
        <div className="ws-card-stars">
          {Array.from({ length: weapon.rarity }).map((_, idx) => (
            <span key={idx}>★</span>
          ))}
        </div>
        <div className="ws-card-level">Lv. {weapon.level}</div>
      </div>
    </div>
  );
};

export default WeaponCard;
