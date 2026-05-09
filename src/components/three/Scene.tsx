import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Character from './Character.tsx';
import Pedestal from './Pedestal.tsx';

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }} className="three-canvas">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Character />
      <Pedestal />

      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 2} 
      />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene;
