import { useFrame, useThree } from "@react-three/fiber";

export const OrbitCamera = () => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Orbit settings
    const radius = 5;
    const orbitSpeed = 0.12;

    // Very slow vertical drift
    const verticalAmplitude = 0.15; // keep this small
    const verticalSpeed = 0.25; // VERY slow (≈30s per cycle) (EDITED, was 0.03)

    // eslint-disable-next-line react-hooks/immutability
    camera.position.x = Math.sin(t * orbitSpeed) * radius;
    camera.position.z = Math.cos(t * orbitSpeed) * radius;

    camera.position.y = Math.sin(t * verticalSpeed) * verticalAmplitude;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
