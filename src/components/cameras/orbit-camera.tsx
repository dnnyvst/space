import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

// Orbit settings
const RADIUS = 5;
const ORBIT_SPEED = 0.12;

// Very slow vertical drift
const VERTICAL_AMPLITUDE = 0.15; // keep this small
const VERTICAL_SPEED = 0.25; // VERY slow (≈30s per cycle) (EDITED, was 0.03)

const Y_AXIS = new THREE.Vector3(0, 1, 0);

interface OrbitCameraProps {
  enabled?: boolean;
}

export const OrbitCamera: FC<OrbitCameraProps> = ({ enabled = false }) => {
  const { camera } = useThree();

  const _time = useRef(0);
  const _orbitPosition = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!enabled) return;

    _time.current += delta;
    const time = _time.current;
    const orbitPosition = _orbitPosition.current;

    // Start at a point on the Z axis
    orbitPosition.set(0, 0, RADIUS);

    // Rotate that point around the Y axis
    orbitPosition.applyAxisAngle(Y_AXIS, time * ORBIT_SPEED);

    // Add slow vertical motion
    orbitPosition.y = Math.sin(time * VERTICAL_SPEED) * VERTICAL_AMPLITUDE;

    // Apply to camera
    camera.position.copy(orbitPosition);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// raw trig
// camera.position.x = Math.sin(t * ORBIT_SPEED) * RADIUS;
// camera.position.z = Math.cos(t * ORBIT_SPEED) * RADIUS;

// camera.position.y = Math.sin(t * VERTICAL_SPEED) * VERTICAL_AMPLITUDE;
