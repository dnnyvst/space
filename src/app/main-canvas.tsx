"use client";

import { type FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SpinningSphere } from "./spinning-sphere";

export const MainCanvas: FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg w-1/2 h-3/4">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[4, 0, 5]} />
        <SpinningSphere />
      </Canvas>
    </div>
  );
};
