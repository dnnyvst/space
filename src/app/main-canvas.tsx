"use client";

import { type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "@/components";

export const MainCanvas: FC = () => (
  <div className="w-1/2 h-3/4">
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        color="#fff1d6"
      />
      <Earth />
    </Canvas>
  </div>
);
