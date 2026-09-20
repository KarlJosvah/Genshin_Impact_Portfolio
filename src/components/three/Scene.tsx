import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Character from './Character.tsx';
import Pedestal from './Pedestal.tsx';
import TechModel3D from './TechModel3D.tsx';

interface SceneProps {
  isWeaponSectionActive?: boolean;
}

const Scene: React.FC<SceneProps> = ({ isWeaponSectionActive = false }) => {
  const [isPresentComplete, setIsPresentComplete] = useState(false);

  useEffect(() => {
    if (!isWeaponSectionActive) {
      setIsPresentComplete(false);
    }
  }, [isWeaponSectionActive]);

  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }} className="three-canvas">
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
            url="/assets/images/svg-tech/react-original.svg"
            position={[0.4, 0.35, 0.3]}
            scale={0.003}
            visible={isPresentComplete}
          />
        </Suspense>
      )}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.8}
        maxDistance={3}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />

      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene;
