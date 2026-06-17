"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { type Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // using tsParticles slim for better performance

export default function Background() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#030014]">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#00f3ff", "#bc13fe", "#0ff0fc"],
            },
            links: {
              color: "#00f3ff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60, // Neural network nodes
            },
            opacity: {
              value: 0.5,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              }
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      {/* Background radial gradients for added futuristic feel */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[var(--color-neon-purple)]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-[var(--color-neon-blue)]/10 rounded-full blur-[120px]" />
    </div>
  );
}
