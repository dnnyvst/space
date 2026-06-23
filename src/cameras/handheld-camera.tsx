import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { sceneTime } from "@/utils";
import { useAppContext } from "@/hooks";

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

  const { cameraZoom } = useAppContext();

  const _position = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!enabled) return;

    const time = sceneTime.get();
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

    const xInterpolatedZoom = THREE.MathUtils.lerp(
      position.x,
      driftX + micro + cameraZoom * 0.1,
      0.1,
    );

    const yInterpolatedZoom = THREE.MathUtils.lerp(
      position.y,
      0.06 + driftY + micro * 0.5 - cameraZoom * 0.1,
      0.1,
    );

    const zInterpolatedZoom = THREE.MathUtils.lerp(
      position.z,
      5 + driftZ - cameraZoom * 0.25,
      0.1,
    );

    // Build target position
    position.set(
      cameraZoom > 1 ? xInterpolatedZoom : driftX + micro,
      cameraZoom > 1 ? yInterpolatedZoom : 0.06 + driftY + micro * 0.5,
      cameraZoom > 1 ? zInterpolatedZoom : 5 + driftZ,
    );

    // Apply
    camera.position.copy(position);
    camera.lookAt(0, 0, 0);

    // camera.fov = fov;
    // camera.updateProjectionMatrix();
  });

  return null;
};

// old trig
// camera.position.x = driftX + micro;
// camera.position.y = 0.06 + driftY + micro * 0.5;
// camera.position.z = 5 + driftZ;
