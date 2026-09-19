import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Character from './Character.tsx';
import Pedestal from './Pedestal.tsx';

interface SceneProps {
  isWeaponSelectionOpen?: boolean;
}

const Scene: React.FC<SceneProps> = ({ isWeaponSelectionOpen = false }) => {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }} className="three-canvas">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Character isWeaponSelectionOpen={isWeaponSelectionOpen} />
      <Pedestal />

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
