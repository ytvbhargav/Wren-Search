"use client";

import { useEffect, useState } from "react";
import LogoIntro from "./LogoIntro";
import Nav from "./Nav";
import SmoothScroll from "./SmoothScroll";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  // Lock body scroll while intro overlay is up
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <>
      <SmoothScroll />
      <LogoIntro onDone={() => setReady(true)} />
      <Nav visible={ready} />
      {children}
    </>
  );
}
