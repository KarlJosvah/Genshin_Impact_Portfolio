import React from 'react';

interface CharacterAvatarProps {
  name: string;
  src: string;
  isActive: boolean;
  onMouseUp: (e: React.MouseEvent) => void;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ name, src, isActive, onMouseUp }) => {
  return (
    <div
      className={`carousel-item ${isActive ? 'active' : ''}`}
      onMouseUp={onMouseUp}
      title={name}
    >
      <div className="carousel-avatar">
        <img
          src={src}
          alt={name}
          className="avatar-img"
          draggable="false"
        />
      </div>
      <div className="active-line" />
    </div>
  );
};

export default CharacterAvatar;
