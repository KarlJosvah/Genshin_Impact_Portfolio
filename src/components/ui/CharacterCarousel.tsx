import React, { useRef, useEffect, useState } from 'react';
import CharacterAvatar from './CharacterAvatar.tsx';

interface AvatarItem {
  id: number;
  name: string;
  src: string;
}

interface CharacterCarouselProps {
  avatars: AvatarItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const CharacterCarousel: React.FC<CharacterCarouselProps> = ({ avatars, activeIndex, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

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
      onSelect(idx);
    }
  };

  const handleContainerMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
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
          <CharacterAvatar
            key={avatar.id}
            name={avatar.name}
            src={avatar.src}
            isActive={activeIndex === idx}
            onMouseUp={(e) => handleMouseUp(idx, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterCarousel;
