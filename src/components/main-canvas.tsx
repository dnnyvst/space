"use client";

import { useState, type FC } from "react";
import { Canvas } from "@react-three/fiber";

import {
  EffectComposer,
  Noise,
  HueSaturation,
  DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import {
  Skybox,
  Planet,
  SunLight,
  FlyByCamera,
  HandheldCamera,
  OrbitCamera,
  ParallaxTiltCamera,
  UIOverlay,
} from "@/components";
import { PLANET_CONFIG } from "@/config";
import { useIsMobile } from "@/hooks";

// export const requestGyroPermission = async () => {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   if (typeof DeviceOrientationEvent?.requestPermission === "function") {
//     // iOS 13+
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     const response = await DeviceOrientationEvent.requestPermission();

//     return response === "granted";
//   }

//   return true; // Android / desktop
// };

interface ListItemProps {
  selected: boolean;
  onClick: () => void;
  text: string;
}

const ListItem: FC<ListItemProps> = ({ selected, onClick, text }) => (
  <li
    className={`flex gap-3 opacity-30 hover:opacity-70 cursor-pointer transition-all duration-300 ease-out ${
      selected && "opacity-100 hover:opacity-100"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3 cursor-pointer">
      <div
        className={`w-4 h-4 border flex items-center justify-center rounded-sm ${
          selected && "bg-text"
        }`}
      />
      <span>{text}</span>
    </div>
  </li>
);

export const MainCanvas: FC = () => {
  const isMobile = useIsMobile(640);
  // const [gyroEnabled, setGyroEnabled] = useState(false);
  const [ready, setReady] = useState<boolean>(false);

  const [orbitMode, setOrbitMode] = useState<boolean>(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    new Set(["clouds", "atmosphere"]),
  );

  const selectedPlanet = PLANET_CONFIG[selectedPlanetId];

  return (
    <div className="fixed inset-0 overflow-hidden font-mono text-text">
      <UIOverlay
        isMobile={isMobile}
        orbitMode={orbitMode}
        setOrbitMode={setOrbitMode}
        selectedPlanetId={selectedPlanetId}
        setSelectedPlanetId={setSelectedPlanetId}
        selectedProperties={selectedProperties}
        setSelectedProperties={setSelectedProperties}
      />
      {/* loading */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          loading...
        </div>
      )}
      {/* canvas (full screen) */}
      <Canvas
        className="w-full h-full"
        gl={{ alpha: true }}
        dpr={[1, 2]}
        onCreated={() => setReady(true)}
      >
        <Skybox />
        {/* <FlyByCamera /> */}
        <HandheldCamera />
        {orbitMode && <OrbitCamera />}
        {/* <ParallaxTiltCamera enabled={isMobile && gyroEnabled} /> */}

        <ambientLight intensity={selectedPlanetId === "earth" ? 0.2 : 0.1} />
        {selectedPlanetId !== "sun" && <SunLight />}
        <Planet
          axialTilt={selectedPlanet.tilt}
          retrograde={selectedPlanet.retrograde}
          textures={selectedPlanet.textures}
          textureOverrides={selectedProperties}
          scale={isMobile ? 0.75 : 1}
          speedMultiplier={selectedPlanetId === "sun" ? 0.2 : 1}
          emissive={selectedPlanetId === "sun"}
          noRotation={orbitMode}
        />
        {/* postprocessing */}
        <EffectComposer>
          {/* <Noise opacity={0.08} /> */}
          {/* <HueSaturation saturation={-0.1} /> */}
          {/* <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={2}
            height={480}
          /> */}
          <Bloom
            intensity={1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.6}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
        </EffectComposer>
      </Canvas>

      {/* saturn construction overlay */}
      {selectedPlanetId === "saturn" && (
        <div className="absolute inset-0 flex justify-center items-center text-black">
          under construction.
          <br />
          <br />
          rings are too hard.
        </div>
      )}
    </div>
  );
};
