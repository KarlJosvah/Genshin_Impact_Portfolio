import React, { useMemo, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as THREE from 'three';

interface TechModel3DProps {
  url?: string;
  position?: [number, number, number];
  scale?: number;
  visible?: boolean;
}

const TechModel3D: React.FC<TechModel3DProps> = ({
  url = '/assets/images/svg-tech/react-original.svg',
  position = [-0.75, 0.45, 0.3],
  scale = 0.005,
  visible = true,
}) => {
  const svgData = useLoader(SVGLoader, url);
  const groupRef = useRef<THREE.Group>(null);

  // Generate 3D extruded shapes from the parsed SVG paths with area-based Z-layering
  const { meshes, centerOffset } = useMemo(() => {
    const items: Array<{
      shape: THREE.Shape;
      color: string;
      area: number;
    }> = [];

    svgData.paths.forEach((path) => {
      const colorHex = path.color ? `#${path.color.getHexString()}` : '#61DAFB';
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        // Calculate shape bounding box area
        const points = shape.getPoints();
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        points.forEach((p) => {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        });
        const w = isFinite(maxX - minX) ? maxX - minX : 0;
        const h = isFinite(maxY - minY) ? maxY - minY : 0;
        const area = w * h;

        items.push({ shape, color: colorHex, area });
      });
    });

    let maxArea = 0;
    items.forEach((item) => {
      if (item.area > maxArea) maxArea = item.area;
    });

    // Group items into Z-offset layers based on area ratio relative to largest shape
    const meshesList = items.map((item, originalIdx) => {
      const ratio = maxArea > 0 ? item.area / maxArea : 1;
      let layerZOffset = 0;
      let depth = 3;

      if (ratio >= 0.25) {
        // Large background shape (e.g. background shield / main body)
        layerZOffset = 0;
        depth = 3;
      } else if (ratio >= 0.02) {
        // Medium foreground detail (e.g. letters, main logos)
        layerZOffset = 3.05;
        depth = 1.5;
      } else {
        // Fine foreground accents (e.g. dots, small pupils)
        layerZOffset = 4.6;
        depth = 1.0;
      }

      return {
        ...item,
        originalIdx,
        zOffset: layerZOffset,
        depth,
      };
    });

    // Compute overall bounding box center for pivot alignment
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
    if (groupRef.current && visible) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={position} visible={visible}>
      <group
        ref={groupRef}
        scale={[scale, -scale, scale]} // Flip Y-axis to convert SVG coordinates to 3D space
      >
        <group position={[-centerOffset[0], -centerOffset[1], 0]}>
          {meshes.map(({ shape, color, zOffset, depth, originalIdx }) => {
            const extrudeSettings: THREE.ExtrudeGeometryOptions = {
              depth,
              bevelEnabled: true,
              bevelSegments: 2,
              steps: 1,
              bevelSize: 0.15,
              bevelThickness: 0.2,
            };

            return (
              <mesh key={originalIdx} position={[0, 0, zOffset]}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.25}
                  metalness={0.3}
                  emissive={color}
                  emissiveIntensity={0.15}
                  polygonOffset={true}
                  polygonOffsetFactor={-originalIdx}
                  polygonOffsetUnits={-originalIdx}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
};

export default TechModel3D;
