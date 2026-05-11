import { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Character = () => {
  const { scene, animations } = useGLTF('/assets/models/Leonard.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions["Idle"]) actions["Idle"].fadeOut(0.5);
    };
  }, [actions]);

  return (
    <primitive object={scene} position={[0, -1, 0]} scale={1} />
  );
};

export default Character;

