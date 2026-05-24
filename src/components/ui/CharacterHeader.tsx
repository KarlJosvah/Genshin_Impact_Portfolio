import React, { useState, useRef, useEffect } from 'react';
import '../../styles/CharacterHeader.css';

interface CharacterHeaderProps {
  onClose?: () => void;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ onClose }) => {
  // Setup state to track active index (default to first one)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Drag-to-scroll state and refs
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Generate 20 avatars as requested
  const avatars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: `Albedo ${i + 1}`,
    src: '/assets/images/side_icons/Albedo_Side_Icon.webp',
  }));

  // Bind mouse wheel listener for vertical-to-horizontal scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      // Smooth vertical to horizontal scroll translation
      el.scrollLeft += e.deltaY * 0.85;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    // Walk distance for smooth scroll mapping
    el.scrollLeft = scrollLeftState - dx * 1.25;
  };

  const handleMouseUp = (idx: number, e: React.MouseEvent) => {
    setIsDragging(false);
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    // If the movement was less than 5px, it is treated as a click selection
    if (dx < 5 && dy < 5) {
      setActiveIndex(idx);
    }
  };

  const handleContainerMouseUpOrLeave = () => {
    setIsDragging(false);
  };

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

      {/* Middle Area: Scrollable Character Carousel */}
      <div className="header-middle-wrapper">
        <div
          ref={containerRef}
          className="carousel-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleContainerMouseUpOrLeave}
          onMouseLeave={handleContainerMouseUpOrLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {avatars.map((avatar, idx) => (
            <div
              key={avatar.id}
              className={`carousel-item ${activeIndex === idx ? 'active' : ''}`}
              onMouseUp={(e) => handleMouseUp(idx, e)}
              title={avatar.name}
            >
              <div className="carousel-avatar">
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className="avatar-img"
                  draggable="false"
                />
              </div>
              <div className="active-line" />
            </div>
          ))}
        </div>
      </div>

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
