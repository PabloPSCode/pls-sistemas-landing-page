"use client";
import { loadLinksPreset } from "@tsparticles/preset-links";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1024;

function getParticlesCount(viewportWidth: number) {
  if (viewportWidth >= DESKTOP_MIN_WIDTH) {
    return 60;
  }

  if (viewportWidth >= TABLET_MIN_WIDTH) {
    return 40;
  }

  return 20;
}

interface TechParticlesHeroSectionProps {
  children?: React.ReactNode;
  className?: string;
  particlesColors?: string[];
  animationSpeed?: "slow" | "medium" | "fast";
}

export default function TechParticlesHeroSection({
  children,
  className,
  particlesColors,
  animationSpeed = "medium",
}: TechParticlesHeroSectionProps) {
  const [init, setInit] = useState(false);
  const [particlesCount, setParticlesCount] = useState(() =>
    typeof window === "undefined" ? 60 : getParticlesCount(window.innerWidth),
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => setInit(true));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setParticlesCount(getParticlesCount(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={clsx(
        "relative w-[100vw] h-[72vh] overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-900  to-black",
        className
      )}
    >
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0 pointer-events-none"
          options={{
            fullScreen: { enable: false },
            background: {
              color: { value: "transparent" },
            },
            backgroundMask: { enable: false },

            preset: "links",
            detectRetina: true,
            smooth: true,
            pauseOnOutsideViewport: true,
            fpsLimit:
              animationSpeed === "slow"
                ? 200
                : animationSpeed === "fast"
                ? 32
                : 120,

            particles: {
              color: {
                value: particlesColors ?? [
                  "#3456c5",
                  "#885ce9",
                  "#182fda",
                  "#2d6dd5",
                  "#4379ed",
                  "#140a80",
                ],
              },
              number: {
                value: particlesCount,
              },
              links: {
                enable: true,
                distance: 150,
                opacity: 0.5,
              },
              move: {
                enable: true,
              },
            },
          }}
        />
      )}
      {children}
      <style jsx global>{`
        #tsparticles canvas {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
