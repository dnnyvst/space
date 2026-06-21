import { useFrame, useThree } from "@react-three/fiber";

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

export const HandheldCamera = () => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Breathing cycle
    const breath = Math.sin(t * 0.18);

    // Gate motion so it only peaks during part of the breath
    const breathGate = smoothstep(0.2, 0.8, Math.abs(breath));

    // Shape inhale/exhale
    const ease = breath * Math.abs(breath);

    // Main handheld drift (stronger, but gated)
    const driftX = ease * 0.025 * breathGate;
    const driftY = ease * 0.075 * breathGate;
    const driftZ = ease * 0.03 * breathGate;

    // Always-on micro motion (very subtle)
    const micro = Math.sin(t * 2.2) * 0.0018 + Math.sin(t * 3.7) * 0.0012;

    // Apply camera motion
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x = driftX + micro;
    camera.position.y = 0.06 + driftY + micro * 0.5;
    camera.position.z = 5 + driftZ;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
