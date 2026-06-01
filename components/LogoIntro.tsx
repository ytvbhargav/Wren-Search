"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedWren from "./AnimatedWren";

const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "gate" | "playing" | "exiting" | "done";

export default function LogoIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("gate");

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("wren-intro-seen");

    if (seen) {
      setPhase("exiting");
      const t = setTimeout(() => {
        setPhase("done");
        onDone();
      }, 500);
      return () => clearTimeout(t);
    }

    sessionStorage.setItem("wren-intro-seen", "1");
    setPhase("playing");
    const t1 = setTimeout(() => setPhase("exiting"), 2800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ backgroundColor: "#383026" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      transition={{ duration: 0.7, ease }}
    >
      {phase === "playing" && (
        <div className="flex flex-col items-center gap-7 px-6">
          <AnimatedWren className="h-32 w-auto md:h-40" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.7, ease }}
            className="h-px w-32 origin-center"
            style={{ backgroundColor: "#d4cfbf" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.0, ease }}
            className="max-w-[18rem] md:max-w-none text-center text-eggshell font-semibold text-sm md:text-lg tracking-[0.28em] md:tracking-[0.42em] pl-[0.28em] md:pl-[0.42em] leading-relaxed"
          >
            BUILT ON BETTER CONNECTIONS
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
