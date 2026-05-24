import React, { useState } from 'react';
import CharacterCarousel from '../components/ui/CharacterCarousel.tsx';
import '../styles/CharacterHeader.css';

interface CharacterHeaderProps {
  onClose?: () => void;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ onClose }) => {
  // Setup state to track active index (default to first one)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Generate 20 avatars as requested
  const avatars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: `Albedo ${i + 1}`,
    src: '/assets/images/side_icons/Albedo_Side_Icon.webp',
  }));

  const handleClose = () => {
    console.log('Close button clicked (placeholder)');
    if (onClose) onClose();
  };

  return (
    <div className="character-header-bar">
      {/* Left Area: Element Vision & Character Name */}
      <div className="header-left">
        <div className="vision-container" title="Geo Vision">
          <img
            src="/assets/images/svg/geo.svg"
            alt="Geo"
            className="vision-icon"
          />
        </div>
        <div className="vision-text">
          <span className="vision-element">Geo</span>
          <span className="vision-divider">/</span>
          <span className="character-name-header">Albedo</span>
        </div>
      </div>

      {/* Middle Area: Scrollable Character Carousel Component */}
      <CharacterCarousel
        avatars={avatars}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      {/* Right Area: Close Button */}
      <div className="header-right">
        <button
          className="close-button"
          onClick={handleClose}
          aria-label="Close character details"
        >
          <svg viewBox="0 0 24 24" className="close-icon-svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CharacterHeader;
