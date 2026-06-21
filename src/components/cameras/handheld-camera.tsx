import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const HandheldCamera = () => {
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    angleRef.current += delta * 0.2; // orbit speed

    const radius = 4; // distance from planet center

    const x = Math.sin(angleRef.current) * radius;
    const z = Math.cos(angleRef.current) * radius;

    const y = 2; // fixed height (or add slight variation if you want)

    const camera = _.camera;

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
};
