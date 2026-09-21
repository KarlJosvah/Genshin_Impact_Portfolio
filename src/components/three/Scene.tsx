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

const SmoothCameraController: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Character is placed at y = 0.0 in world space
  // World Y = 1.0 is chest/torso height, World Y = 1.45 is head level
  const normalTargetY = 1.0;
  const headTargetY = 1.45;
  const currentTargetY = useRef(normalTargetY);

  // Zoom distance thresholds for transition
  const minDist = 1.8;
  const maxDist = 3.5;

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // Calculate distance from camera position to current OrbitControls target
    const dist = camera.position.distanceTo(controlsRef.current.target);

    // Calculate zoom ratio: 1.0 when fully zoomed in (dist <= 2.0), 0.0 when zoomed out (dist >= 3.2)
    const t = THREE.MathUtils.clamp((3.2 - dist) / (3.2 - 2.0), 0, 1);

    // Desired Y target height
    const desiredTargetY = THREE.MathUtils.lerp(normalTargetY, headTargetY, t);

    // Damp current target.y for silky smooth movement
    currentTargetY.current = THREE.MathUtils.damp(
      currentTargetY.current,
      desiredTargetY,
      6,
      delta
    );

    controlsRef.current.target.setY(currentTargetY.current);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={minDist}
      maxDistance={maxDist}
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

      <SmoothCameraController />

      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene;
