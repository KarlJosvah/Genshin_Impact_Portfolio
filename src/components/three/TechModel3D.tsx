import React, { useMemo, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as THREE from 'three';

interface TechModel3DProps {
  url?: string;
  position?: [number, number, number];
  scale?: number;
}

const TechModel3D: React.FC<TechModel3DProps> = ({
  url = '/assets/images/svg-tech/react-original.svg',
  position = [-0.75, 0.45, 0.3],
  scale = 0.005,
}) => {
  const svgData = useLoader(SVGLoader, url);
  const groupRef = useRef<THREE.Group>(null);

  // Generate 3D extruded shapes from the parsed SVG paths
  const { meshes, centerOffset } = useMemo(() => {
    const meshesList: Array<{ shape: THREE.Shape; color: string }> = [];

    svgData.paths.forEach((path) => {
      // Extract color from SVG path or fallback to React cyan
      const colorHex = path.color ? `#${path.color.getHexString()}` : '#61DAFB';
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        meshesList.push({ shape, color: colorHex });
      });
    });

    // Compute bounding box to center the pivot point
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    meshesList.forEach(({ shape }) => {
      const points = shape.getPoints();
      points.forEach((p) => {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      });
    });

    const centerX = isFinite(minX) && isFinite(maxX) ? (minX + maxX) / 2 : 0;
    const centerY = isFinite(minY) && isFinite(maxY) ? (minY + maxY) / 2 : 0;

    return {
      meshes: meshesList,
      centerOffset: [centerX, centerY],
    };
  }, [svgData]);

  // Rotate model continuously for 3D showcase
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 4,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.8,
    bevelThickness: 0.8,
  };

  return (
    <group position={position}>
      <group
        ref={groupRef}
        scale={[scale, -scale, scale]} // Flip Y-axis to convert SVG coordinates to 3D space
      >
        <group position={[-centerOffset[0], -centerOffset[1], 0]}>
          {meshes.map(({ shape, color }, idx) => (
            <mesh key={idx}>
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshStandardMaterial
                color={color}
                roughness={0.2}
                metalness={0.4}
                emissive={color}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};

export default TechModel3D;
