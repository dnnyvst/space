import { useFrame, useThree } from "@react-three/fiber";

export const HandheldCamera = () => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 🫁 slow breathing cycle (unchanged pace)
    const breath = Math.sin(t * 0.15);

    // smooth inhale/exhale shaping
    const ease = breath * Math.abs(breath);

    // 🌊 stronger vertical breathing emphasis
    const driftX = ease * 0.015; // reduced side sway
    const driftY = ease * 0.055; // increased up/down breathing
    const driftZ = ease * 0.02;

    // ✋ minimal micro motion (kept subtle)
    const micro = Math.sin(t * 2.2) * 0.0015 + Math.sin(t * 3.7) * 0.001;

    // eslint-disable-next-line react-hooks/immutability
    camera.position.x = driftX + micro;
    camera.position.y = 0.05 + driftY + micro * 0.5;
    camera.position.z = 5 + driftZ;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
