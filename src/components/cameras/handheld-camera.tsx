import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

interface HandheldCameraProps {
  enabled?: boolean;
}

export const HandheldCamera: FC<HandheldCameraProps> = ({
  enabled = false,
}) => {
  const { camera } = useThree();

  const _time = useRef(0);
  const _position = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!enabled) return;

    _time.current += delta;
    const time = _time.current;
    const position = _position.current;

    // Breathing cycle
    const breath = Math.sin(time * 0.18);

    // Gate motion so it only peaks during part of the breath
    const breathGate = smoothstep(0.2, 0.8, Math.abs(breath));

    // Shape inhale/exhale
    const ease = breath * Math.abs(breath);

    // Main handheld drift (stronger, but gated)
    const driftX = ease * 0.025 * breathGate;
    const driftY = ease * 0.075 * breathGate;
    const driftZ = ease * 0.03 * breathGate;

    // Always-on micro motion (very subtle)
    const micro = Math.sin(time * 2.2) * 0.0018 + Math.sin(time * 3.7) * 0.0012;

    // Build target position
    position.set(driftX + micro, 0.06 + driftY + micro * 0.5, 5 + driftZ);

    // Apply
    camera.position.copy(position);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// old trig
// camera.position.x = driftX + micro;
// camera.position.y = 0.06 + driftY + micro * 0.5;
// camera.position.z = 5 + driftZ;
