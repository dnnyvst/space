"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const ParallaxPointerCamera = ({ isMobile }: { isMobile: boolean }) => {
  const { camera } = useThree();

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // track pointer
  useFrame(({ pointer }) => {
    if (!isMobile) return;

    // normalize pointer (-1 to 1)
    target.current.x = pointer.x * 0.5;
    target.current.y = pointer.y * 0.3;
  });

  useFrame(() => {
    if (!isMobile) return;

    // smooth easing (critical for “cinematic feel”)
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

    // apply subtle camera offset
    camera.position.x += current.current.x;
    camera.position.y += current.current.y;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
