import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import Character from './Character.tsx';
import Pedestal from './Pedestal.tsx';
import TechModel3D from './TechModel3D.tsx';

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

  // Character is placed at y = 0.0 in world space
  // World Y = 1.0 is chest/torso height, World Y = 1.45 is head level
  const normalTargetY = 1.0;
  const headTargetY = 1.45;

  const activeZoomDist = 2.15;
  const normalZoomDist = 3.5;

  const currentTargetY = useRef(normalTargetY);
  const currentCamDist = useRef(normalZoomDist);

  // Track state transitions
  const wasActiveRef = useRef(isWeaponSectionActive);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isWeaponSectionActive) {
      // Smoothly transition target Y to head level (1.45)
      currentTargetY.current = THREE.MathUtils.damp(
        currentTargetY.current,
        headTargetY,
        6,
        delta
      );

      // Smoothly transition distance to focused head zoom distance (2.15)
      currentCamDist.current = THREE.MathUtils.damp(
        currentCamDist.current,
        activeZoomDist,
        6,
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
          normalTargetY,
          6,
          delta
        );

        currentCamDist.current = THREE.MathUtils.damp(
          currentCamDist.current,
          normalZoomDist,
          6,
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
          Math.abs(currentTargetY.current - normalTargetY) < 0.01 &&
          Math.abs(currentCamDist.current - normalZoomDist) < 0.01
        ) {
          wasActiveRef.current = false;
        }
      } else {
        // Normal interactive orbit controls mode when outside WeaponsSection
        // Smoothly adjust target.y based on manual user zoom
        const currentDist = camera.position.distanceTo(controlsRef.current.target);
        const t = THREE.MathUtils.clamp((3.5 - currentDist) / (3.5 - 1.8), 0, 1);
        const desiredY = THREE.MathUtils.lerp(normalTargetY, headTargetY, t);

        currentTargetY.current = THREE.MathUtils.damp(
          currentTargetY.current,
          desiredY,
          6,
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
      minDistance={1.8}
      maxDistance={3.5}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      target={[0, normalTargetY, 0]}
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
    <Canvas camera={{ position: [0, 1.0, 3.5], fov: 45 }} className="three-canvas">
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
