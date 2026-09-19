import React from 'react';

export interface WeaponItem {
  id: number;
  rarity: number;
  refinement: number;
  level: number;
  isLocked: boolean;
  equippedAvatarSrc?: string;
}

interface WeaponCardProps {
  weapon: WeaponItem;
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
      {weapon.equippedAvatarSrc && (
        <div className="ws-card-equipped-badge">
          <img
            src={weapon.equippedAvatarSrc}
            alt="Equipped avatar"
            className="ws-card-equipped-avatar"
          />
        </div>
      )}

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
  );
};

export default WeaponCard;
