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

  const requestRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);
  const lastMouseRef = useRef<{ x: number, time: number } | null>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    // Check initial position on mount or avatars list change
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [avatars]);

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

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    velocityRef.current = 0;
    lastMouseRef.current = { x: e.clientX, time: performance.now() };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    // Walk distance for smooth scroll mapping
    el.scrollLeft = scrollLeftState - dx * 1.25;

    const now = performance.now();
    if (lastMouseRef.current) {
      const dt = now - lastMouseRef.current.time;
      if (dt > 0) {
        const dxEvent = e.clientX - lastMouseRef.current.x;
        velocityRef.current = dxEvent / dt;
      }
    }
    lastMouseRef.current = { x: e.clientX, time: now };
  };

  const startMomentum = () => {
    let vel = velocityRef.current * 1.25 * 16;
    vel = -vel; 

    const momentumLoop = () => {
      const el = containerRef.current;
      if (!el || Math.abs(vel) < 0.5) return;
      
      el.scrollLeft += vel;
      vel *= 0.92; 
      requestRef.current = requestAnimationFrame(momentumLoop);
    };
    requestRef.current = requestAnimationFrame(momentumLoop);
  };

  const handleMouseUp = (idx: number, e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    // If the movement was less than 5px, it is treated as a click selection
    if (dx < 5 && dy < 5) {
      onSelect(idx);
    }
  };

  const handleContainerMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startMomentum();
    }
  };

  const getWrapperClass = () => {
    let base = 'header-middle-wrapper';
    if (isAtStart && isAtEnd) return `${base} no-fade-both`;
    if (isAtStart) return `${base} no-fade-left`;
    if (isAtEnd) return `${base} no-fade-right`;
    return base;
  };

  return (
    <div className={getWrapperClass()}>
      <div
        ref={containerRef}
        className="carousel-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleContainerMouseUpOrLeave}
        onMouseLeave={handleContainerMouseUpOrLeave}
        onScroll={checkScrollPosition}
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
