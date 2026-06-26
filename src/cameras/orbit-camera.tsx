import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { sceneTime } from "@/utils";
import { Y_START } from "@/constants";

// orbit settings
const RADIUS = 5;
const ORBIT_SPEED = 0.12;

// very slow vertical drift
const VERTICAL_AMPLITUDE = 0.025; // keep this small
const VERTICAL_SPEED = 0.25; // VERY slow (≈30s per cycle) (EDITED, was 0.03)

const Y_AXIS = new THREE.Vector3(0, 1, 0);

interface OrbitCameraProps {
  enabled?: boolean;
}

export const OrbitCamera: FC<OrbitCameraProps> = ({ enabled = false }) => {
  const { camera } = useThree();

  const _orbitPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!enabled) return;
    const time = sceneTime.get();

    const orbitPosition = _orbitPosition.current;

    // start at a point on the Z axis
    orbitPosition.set(0, Y_START, RADIUS);

    // rotate that point around the Y axis
    orbitPosition.applyAxisAngle(Y_AXIS, time * ORBIT_SPEED);

    // add slow vertical motion
    orbitPosition.y =
      Y_START - Math.sin(time * VERTICAL_SPEED) * VERTICAL_AMPLITUDE;

    // apply to camera
    camera.position.copy(orbitPosition);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// raw trig
// camera.position.x = Math.sin(t * ORBIT_SPEED) * RADIUS;
// camera.position.z = Math.cos(t * ORBIT_SPEED) * RADIUS;

// camera.position.y = Math.sin(t * VERTICAL_SPEED) * VERTICAL_AMPLITUDE;
