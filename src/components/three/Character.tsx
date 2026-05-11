import { useEffect, useCallback } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const Character = () => {
  const { scene, animations } = useGLTF('/assets/models/Leonard.glb');
  const { actions, names, mixer } = useAnimations(animations, scene);

  const playIdle = useCallback(() => {
    if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.5).play();
    }
  }, [actions]);

  useEffect(() => {
    playIdle();
    
    let timeoutId: number;

    const playRandom = () => {
      // Filter out Idle and T_Pose
      const available = names.filter(n => n !== "Idle" && n !== "T_Pose" && n !== "T-Pose");
      if (available.length === 0) return;

      const randomName = available[Math.floor(Math.random() * available.length)];
      const currentAction = actions["Idle"];
      const nextAction = actions[randomName];

      if (currentAction && nextAction) {
        nextAction.reset().setLoop(THREE.LoopOnce, 1);
        nextAction.clampWhenFinished = true;
        
        // Crossfade from Idle to Random
        nextAction.fadeIn(0.5).play();
        currentAction.fadeOut(0.5);

        // Wait for animation to finish
        const onFinished = (e: any) => {
          if (e.action === nextAction) {
            mixer.removeEventListener('finished', onFinished);
            
            // Crossfade back to Idle
            currentAction.reset().fadeIn(0.5).play();
            nextAction.fadeOut(0.5);

            // Set next random timer
            scheduleNext();
          }
        };

        mixer.addEventListener('finished', onFinished);
      }
    };

    const scheduleNext = () => {
      const delay = Math.random() * (15000 - 5000) + 5000;
      timeoutId = window.setTimeout(playRandom, delay);
    };

    scheduleNext();

    return () => {
      window.clearTimeout(timeoutId);
      mixer.stopAllAction();
    };
  }, [actions, names, mixer, playIdle]);

  return (
    <primitive object={scene} position={[0, -1, 0]} scale={1} />
  );
};

export default Character;


