import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneTime } from "@/utils";

const Y_AXIS = new THREE.Vector3(0, 1, 0);

interface UseOrbitConfig {
  ref: React.RefObject<THREE.Object3D>;
  center?: THREE.Vector3; // IMPORTANT: orbit target
  radius?: number;
  speed?: number;
  enabled: boolean;
}

export const useOrbit = ({
  ref,
  center = new THREE.Vector3(0, 0, 0),
  radius = 5,
  speed = 3,
  enabled,
}: UseOrbitConfig) => {
  const angle = useRef(0);

  useFrame((_, delta) => {
    if (!enabled || !ref.current) return;

    const time = sceneTime.get();

    angle.current = time * speed;

    const x = Math.sin(angle.current) * radius;
    const z = Math.cos(angle.current) * radius;

    ref.current.position.set(center.x + x, center.y, center.z + z);
  });
};
