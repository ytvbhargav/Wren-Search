"use client";

import { motion } from "framer-motion";
import { WREN_PATH } from "./WrenMark";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  className?: string;
  color?: string;
  delay?: number;
};

export default function AnimatedWren({
  className,
  color = "#e35438",
  delay = 0,
}: Props) {
  return (
    <motion.svg
      viewBox="0 0 378 342"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wren Search"
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.2 + delay, ease }}
      style={{ transformOrigin: "50% 70%" }}
    >
      <path d={WREN_PATH} fill={color} />
    </motion.svg>
  );
}
