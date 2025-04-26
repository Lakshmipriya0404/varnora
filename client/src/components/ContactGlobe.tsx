
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const locations = [
  { lat: 37.7749, lng: -122.4194, name: 'San Francisco' }, // SF
  { lat: 40.7128, lng: -74.0060, name: 'New York' },       // NYC
  { lat: 51.5074, lng: -0.1278, name: 'London' },          // London
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },          // Tokyo
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function ContactGlobe({ isDark }: { isDark: boolean }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const markersRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (markersRef.current) {
      markersRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const radius = 1;
  const markerPositions = locations.map(loc => 
    latLngToVector3(loc.lat, loc.lng, radius)
  );

  return (
    <group>
      <Sphere ref={globeRef} args={[radius, 64, 64]}>
        <meshPhongMaterial
          color={isDark ? '#1a1b2e' : '#e5e7eb'}
          opacity={0.9}
          transparent
          wireframe
        />
      </Sphere>

      <group ref={markersRef}>
        {markerPositions.map((pos, idx) => (
          <group key={idx}>
            <Sphere 
              args={[0.02, 16, 16]} 
              position={pos}
            >
              <meshPhongMaterial 
                color={idx % 2 ? '#00ffff' : '#9d00ff'} 
                emissive={idx % 2 ? '#00ffff' : '#9d00ff'}
                emissiveIntensity={0.5}
              />
            </Sphere>

            <Line
              points={[pos.clone(), pos.clone().multiplyScalar(1.2)]}
              color={idx % 2 ? '#00ffff' : '#9d00ff'}
              lineWidth={1}
              transparent
              opacity={0.6}
            />
          </group>
        ))}

        {/* Connection lines between markers */}
        {markerPositions.map((pos, idx) => 
          markerPositions.slice(idx + 1).map((nextPos, nextIdx) => (
            <Line
              key={`${idx}-${nextIdx}`}
              points={[pos, nextPos]}
              color={isDark ? '#ffffff' : '#1a1b2e'}
              lineWidth={0.5}
              transparent
              opacity={0.2}
            />
          ))
        )}
      </group>
    </group>
  );
}
