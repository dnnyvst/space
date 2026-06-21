"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const ParallaxTiltCamera = ({ enabled }: { enabled: boolean }) => {
  const { camera } = useThree();

  const target = useRef({ yaw: 0, pitch: 0 });
  const current = useRef({ yaw: 0, pitch: 0 });

  const radius = 5;

  useEffect(() => {
    if (!enabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;

      // 📱 normalize input
      const yaw = event.gamma / 45; // left/right
      const pitch = event.beta / 45; // up/down

      target.current.yaw = yaw;
      target.current.pitch = pitch;
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;

    // 🧠 smooth damping (critical for cinematic feel)
    current.current.yaw += (target.current.yaw - current.current.yaw) * 0.08;

    current.current.pitch +=
      (target.current.pitch - current.current.pitch) * 0.08;

    // 🔥 subtle amplification for readability
    const yaw = current.current.yaw * 1.3;
    const pitch = current.current.pitch * 1.1;

    // 🪐 horizontal orbit (around planet)
    const x = Math.sin(yaw) * radius;
    const z = Math.cos(yaw) * radius;

    // 🌍 upgraded vertical mapping (non-linear “planet wrap” feel)
    const y = Math.sin(pitch * Math.PI * 0.5) * 2.2;

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
};
