import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  isWeaponSectionActive?: boolean;
}

const Character: React.FC<CharacterProps> = ({ isWeaponSectionActive = false }) => {
  const { scene, animations } = useGLTF('/assets/models/Leonard.glb');
  const { actions, names, mixer } = useAnimations(animations, scene);

  // Reference to hold a custom, blended idle animation action that doesn't affect left shoulder to hand bones
  const modifiedIdleActionRef = useRef<THREE.AnimationAction | null>(null);

  // Debug log to trace available animations in the GLB
  console.log("Character animations available:", names);

  // Initialize the modified idle clip once animations/mixer are available
  useEffect(() => {
    const presentClip = animations.find(c => c.name.toLowerCase() === 'present');
    const idleClip = animations.find(c => c.name.toLowerCase() === 'idle');

    if (presentClip && idleClip && !modifiedIdleActionRef.current) {
      // Find all bone/node names animated by Present
      const presentBones = new Set(
        presentClip.tracks.map(track => track.name.split('.')[0])
      );

      // Filter out track names from Idle that are animated by Present
      const filteredTracks = idleClip.tracks.filter(track => {
        const boneName = track.name.split('.')[0];
        return !presentBones.has(boneName);
      });

      // Create a modified AnimationClip
      const modifiedIdleClip = new THREE.AnimationClip(
        'Idle_Without_LeftArm',
        idleClip.duration,
        filteredTracks
      );

      modifiedIdleActionRef.current = mixer.clipAction(modifiedIdleClip);
    }
  }, [animations, mixer]);

  const isWeaponSectionActiveRef = useRef(isWeaponSectionActive);
  const activeOnFinishedRef = useRef<((e: any) => void) | null>(null);

  useEffect(() => {
    isWeaponSectionActiveRef.current = isWeaponSectionActive;
  }, [isWeaponSectionActive]);

  useEffect(() => {
    const presentName = names.find(n => n.toLowerCase() === 'present') || 'Present';
    const idleName = names.find(n => n.toLowerCase() === 'idle') || 'Idle';

    const presentAction = actions[presentName];
    const idleAction = actions[idleName];

    if (isWeaponSectionActive) {
      // Clear any leftover event listener from random play loop
      if (activeOnFinishedRef.current) {
        mixer.removeEventListener('finished', activeOnFinishedRef.current);
        activeOnFinishedRef.current = null;
      }

      const modIdleAction = modifiedIdleActionRef.current || idleAction;

      if (presentAction) {
        // Fade out currently running actions smoothly to avoid T-pose snapping
        Object.values(actions).forEach(act => {
          if (act && act !== modIdleAction && act !== presentAction) {
            act.fadeOut(0.3);
          }
        });

        // Play the modified idle breathing animation (covers all other bones)
        if (modIdleAction) {
          modIdleAction.reset().fadeIn(0.3).play();
        }

        // Play the Present animation (only covers shoulder to hand, loop once, clamp final state)
        presentAction.reset();
        presentAction.setLoop(THREE.LoopOnce, 1);
        presentAction.clampWhenFinished = true;
        presentAction.fadeIn(0.3).play();
      } else {
        // Fallback to regular idle if Present is not found
        if (idleAction) {
          idleAction.reset().fadeIn(0.3).play();
        }
      }

      return () => {
        if (presentAction) presentAction.fadeOut(0.3);
        if (modIdleAction) modIdleAction.fadeOut(0.3);
      };
    } else {
      // Normal idle + random plays behavior
      if (idleAction) {
        idleAction.reset().fadeIn(0.3).play();
      }

      let timeoutId: number;

      const playRandom = () => {
        if (isWeaponSectionActiveRef.current) return;

        // Filter out Idle, Present, and T-poses
        const available = names.filter(
          n => n.toLowerCase() !== "idle" && n.toLowerCase() !== "present" && n.toLowerCase() !== "t_pose" && n.toLowerCase() !== "t-pose"
        );
        if (available.length === 0) return;

        const randomName = available[Math.floor(Math.random() * available.length)];
        const nextAction = actions[randomName];

        if (idleAction && nextAction) {
          nextAction.reset().setLoop(THREE.LoopOnce, 1);
          nextAction.clampWhenFinished = true;

          nextAction.fadeIn(0.5).play();
          idleAction.fadeOut(0.5);

          const onFinished = (e: any) => {
            if (e.action === nextAction) {
              if (activeOnFinishedRef.current === onFinished) {
                mixer.removeEventListener('finished', onFinished);
                activeOnFinishedRef.current = null;
              }

              if (!isWeaponSectionActiveRef.current) {
                idleAction.reset().fadeIn(0.5).play();
                nextAction.fadeOut(0.5);
                scheduleNext();
              }
            }
          };

          activeOnFinishedRef.current = onFinished;
          mixer.addEventListener('finished', onFinished);
        }
      };

      const scheduleNext = () => {
        if (isWeaponSectionActiveRef.current) return;
        const delay = Math.random() * (15000 - 5000) + 5000;
        timeoutId = window.setTimeout(playRandom, delay);
      };

      scheduleNext();

      return () => {
        window.clearTimeout(timeoutId);
        if (activeOnFinishedRef.current) {
          mixer.removeEventListener('finished', activeOnFinishedRef.current);
          activeOnFinishedRef.current = null;
        }
        if (idleAction) {
          idleAction.fadeOut(0.3);
        }
      };
    }
  }, [isWeaponSectionActive, actions, names, mixer]);

  return (
    <primitive object={scene} position={[0, -1, 0]} scale={1} />
  );
};

export default Character;


