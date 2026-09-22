import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import Character from './Character.tsx';
import Pedestal from './Pedestal.tsx';
import TechModel3D from './TechModel3D.tsx';

// ============================================================================
// CAMERA CONFIGURATION & BEHAVIOR SETTINGS
// Adjust these parameters to easily tweak camera zoom, focus height, and damping speed.
// ============================================================================
export const CAMERA_CONFIG = {
  // FOV and Initial Position
  FOV: 45,
  INITIAL_POSITION: [0, 1.0, 3.5] as [number, number, number],

  // Target Y Heights (World Y = 0 is character feet)
  NORMAL_TARGET_Y: 1.0,   // Chest/torso height in normal view
  HEAD_TARGET_Y: 1.45,    // Head level height when focused/zoomed

  // Camera Zoom Distances
  NORMAL_ZOOM_DIST: 3.5,  // Default zoom distance outside WeaponsSection
  ACTIVE_ZOOM_DIST: 2.15, // Focused zoom distance inside WeaponsSection
  MIN_DISTANCE: 1.8,      // Minimum allowed OrbitControls zoom distance
  MAX_DISTANCE: 3.5,      // Maximum allowed OrbitControls zoom distance

  // Transition Damping Speed (higher = faster transition)
  DAMP_SPEED: 6,
};

interface SceneProps {
  isWeaponSectionActive?: boolean;
  selectedWeaponUrl?: string;
}

interface SmoothCameraControllerProps {
  isWeaponSectionActive?: boolean;
}

const SmoothCameraController: React.FC<SmoothCameraControllerProps> = ({
  isWeaponSectionActive = false,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const currentTargetY = useRef(CAMERA_CONFIG.NORMAL_TARGET_Y);
  const currentCamDist = useRef(CAMERA_CONFIG.NORMAL_ZOOM_DIST);

  // Track state transitions
  const wasActiveRef = useRef(isWeaponSectionActive);
  const prevIsWeaponSectionActive = useRef(isWeaponSectionActive);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isWeaponSectionActive) {
      // If we just entered WeaponSection, sync current values to current camera position & target
      if (!prevIsWeaponSectionActive.current) {
        currentCamDist.current = camera.position.distanceTo(controlsRef.current.target);
        currentTargetY.current = controlsRef.current.target.y;
        prevIsWeaponSectionActive.current = true;
      }

      // Smoothly transition target Y to head level
      currentTargetY.current = THREE.MathUtils.damp(
        currentTargetY.current,
        CAMERA_CONFIG.HEAD_TARGET_Y,
        CAMERA_CONFIG.DAMP_SPEED,
        delta
      );

      // Smoothly transition distance to focused head zoom distance
      currentCamDist.current = THREE.MathUtils.damp(
        currentCamDist.current,
        CAMERA_CONFIG.ACTIVE_ZOOM_DIST,
        CAMERA_CONFIG.DAMP_SPEED,
        delta
      );

      controlsRef.current.target.setY(currentTargetY.current);

      const dir = new THREE.Vector3()
        .subVectors(camera.position, controlsRef.current.target)
        .normalize();

      camera.position.copy(controlsRef.current.target).add(dir.multiplyScalar(currentCamDist.current));
      controlsRef.current.update();
    } else {
      // If we just exited WeaponsSection, smoothly animate back to normal camera distance and height
      if (wasActiveRef.current) {
        currentTargetY.current = THREE.MathUtils.damp(
          currentTargetY.current,
          CAMERA_CONFIG.NORMAL_TARGET_Y,
          CAMERA_CONFIG.DAMP_SPEED,
          delta
        );

        currentCamDist.current = THREE.MathUtils.damp(
          currentCamDist.current,
          CAMERA_CONFIG.NORMAL_ZOOM_DIST,
          CAMERA_CONFIG.DAMP_SPEED,
          delta
        );

        controlsRef.current.target.setY(currentTargetY.current);

        const dir = new THREE.Vector3()
          .subVectors(camera.position, controlsRef.current.target)
          .normalize();

        camera.position.copy(controlsRef.current.target).add(dir.multiplyScalar(currentCamDist.current));
        controlsRef.current.update();

        // Check if transition back is essentially complete
        if (
          Math.abs(currentTargetY.current - CAMERA_CONFIG.NORMAL_TARGET_Y) < 0.01 &&
          Math.abs(currentCamDist.current - CAMERA_CONFIG.NORMAL_ZOOM_DIST) < 0.01
        ) {
          wasActiveRef.current = false;
        }
      } else {
        // Track state for next active transition
        prevIsWeaponSectionActive.current = false;

        // Normal interactive orbit controls mode when outside WeaponsSection
        // Smoothly adjust target.y based on manual user zoom
        const currentDist = camera.position.distanceTo(controlsRef.current.target);
        const t = THREE.MathUtils.clamp(
          (CAMERA_CONFIG.MAX_DISTANCE - currentDist) / (CAMERA_CONFIG.MAX_DISTANCE - CAMERA_CONFIG.MIN_DISTANCE),
          0,
          1
        );
        const desiredY = THREE.MathUtils.lerp(
          CAMERA_CONFIG.NORMAL_TARGET_Y,
          CAMERA_CONFIG.HEAD_TARGET_Y,
          t
        );

        currentTargetY.current = THREE.MathUtils.damp(
          currentTargetY.current,
          desiredY,
          CAMERA_CONFIG.DAMP_SPEED,
          delta
        );

        controlsRef.current.target.setY(currentTargetY.current);
        controlsRef.current.update();
      }
    }
  });

  useEffect(() => {
    if (isWeaponSectionActive) {
      wasActiveRef.current = true;
    }
  }, [isWeaponSectionActive]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={!isWeaponSectionActive}
      minDistance={CAMERA_CONFIG.MIN_DISTANCE}
      maxDistance={CAMERA_CONFIG.MAX_DISTANCE}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      target={[0, CAMERA_CONFIG.NORMAL_TARGET_Y, 0]}
    />
  );
};

const Scene: React.FC<SceneProps> = ({
  isWeaponSectionActive = false,
  selectedWeaponUrl = '/assets/images/svg-tech/react-original.svg',
}) => {
  const [isPresentComplete, setIsPresentComplete] = useState(false);

  useEffect(() => {
    if (!isWeaponSectionActive) {
      setIsPresentComplete(false);
    }
  }, [isWeaponSectionActive]);

  return (
    <Canvas
      camera={{ position: CAMERA_CONFIG.INITIAL_POSITION, fov: CAMERA_CONFIG.FOV }}
      className="three-canvas"
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Character
        isWeaponSectionActive={isWeaponSectionActive}
        onPresentComplete={setIsPresentComplete}
      />
      <Pedestal />

      {isWeaponSectionActive && (
        <Suspense fallback={null}>
          <TechModel3D
            url={selectedWeaponUrl}
            position={[0.4, 1.35, 0.3]}
            scale={0.003}
            visible={isPresentComplete}
          />
        </Suspense>
      )}

      <SmoothCameraController isWeaponSectionActive={isWeaponSectionActive} />

      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene;
