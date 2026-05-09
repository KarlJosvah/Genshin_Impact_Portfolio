const Character = () => {
  // Replace with actual model path when available
  // const { scene } = useGLTF('/assets/models/characterModel.glb');
  
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
};

export default Character;
