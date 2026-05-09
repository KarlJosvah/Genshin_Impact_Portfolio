const Pedestal = () => {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2, 64]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
};

export default Pedestal;
