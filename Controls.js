import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Controls() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return null;
}
