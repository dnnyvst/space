"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const ParallaxTiltCamera = ({ enabled }: { enabled: boolean }) => {
  const { camera } = useThree();

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;

      // gamma = left/right tilt (-90 to 90)
      // beta = front/back tilt (-180 to 180)

      const x = THREE.MathUtils.clamp(event.gamma / 45, -1, 1);
      const y = THREE.MathUtils.clamp(event.beta / 45, -1, 1);

      target.current.x = x;
      target.current.y = y;
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;

    // smooth it (VERY important for “cinematic” feel)
    current.current.x = THREE.MathUtils.lerp(
      current.current.x,
      target.current.x,
      0.05
    );

    current.current.y = THREE.MathUtils.lerp(
      current.current.y,
      target.current.y,
      0.05
    );

    // subtle camera offset (NOT full rotation)
    camera.position.x += current.current.x * 0.4;
    camera.position.y += current.current.y * 0.3;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
