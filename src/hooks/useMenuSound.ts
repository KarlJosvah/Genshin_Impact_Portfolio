import { useCallback } from 'react';

export const useMenuSound = () => {
  const playClick = useCallback(() => {
    const audio = new Audio('/assets/audio/uiClick.mp3');
    audio.play().catch(() => {}); // Catch if sound file doesn't exist yet
  }, []);

  return { playClick };
};
