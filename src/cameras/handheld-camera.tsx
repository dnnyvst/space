import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { sceneTime } from "@/utils";
import { useCameraContext } from "@/hooks";
import { Y_START } from "@/constants";

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

interface HandheldCameraProps {
  enabled?: boolean;
}

const handheldShake = false;
// const target = new THREE.Vector3(0, 0, 0);
// const lookAtMatrix = new THREE.Matrix4();
// const targetQuat = new THREE.Quaternion();

export const HandheldCamera: FC<HandheldCameraProps> = ({
  enabled = false,
}) => {
  const { camera } = useThree();
  const { handheldZoom } = useCameraContext();

  const _position = useRef(new THREE.Vector3());
  const wasEnabled = useRef(false);

  useFrame((_, delta) => {
    if (!enabled) {
      wasEnabled.current = false;
      return;
    }

    // if (!wasEnabled.current) {
    //   _position.current.copy(camera.position);
    //   wasEnabled.current = true;
    // }

    const position = _position.current;

    if (handheldShake) {
      const time = sceneTime.get();

      // breathing cycle
      const breath = Math.sin(time * 0.18);

      // gate motion so it only peaks during part of the breath
      const breathGate = smoothstep(0.2, 0.8, Math.abs(breath));

      // shape inhale/exhale
      const ease = breath * Math.abs(breath);

      // main handheld drift (stronger, but gated)
      const driftX = ease * 0.025 * breathGate;
      const driftY = ease * 0.075 * breathGate;
      const driftZ = ease * 0.03 * breathGate;

      // always-on micro motion (very subtle)
      const micro =
        Math.sin(time * 2.2) * 0.0018 + Math.sin(time * 3.7) * 0.0012;

      const targetX = driftX + micro + handheldZoom * 0.1;
      const targetY = 0.06 + driftY + micro * 0.5 - handheldZoom * 0.1;
      const targetZ = 5 + driftZ - handheldZoom * 0.25;

      // build target position
      position.set(
        THREE.MathUtils.damp(position.x, targetX, 5, delta),
        THREE.MathUtils.damp(position.y, targetY, 5, delta),
        THREE.MathUtils.damp(position.z, targetZ, 5, delta),
      );
    } else {
      const xyMod = handheldZoom * 0.1;
      const zMod = handheldZoom * 0.25;

      const targetX = xyMod;
      const targetY = Y_START - xyMod;
      const targetZ = 5 - zMod;

      // build target position
      position.set(
        THREE.MathUtils.damp(position.x, targetX, 5, delta),
        THREE.MathUtils.damp(position.y, targetY, 5, delta),
        THREE.MathUtils.damp(position.z, targetZ, 5, delta),
      );
    }
    // apply
    camera.position.copy(position);
    camera.lookAt(0, 0, 0);
    // lookAtMatrix.lookAt(camera.position, target, camera.up);
    // targetQuat.setFromRotationMatrix(lookAtMatrix);

    // camera.quaternion.slerp(targetQuat, 1 - Math.exp(-6 * delta));
  });

  return null;
};
