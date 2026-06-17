"use client";

import { useEffect, useRef, useState } from "react";

export default function CodeRain({ opacity = 0.15 }: { opacity?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Basic setup
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = windowSize.width;
        canvas.height = windowSize.height;

        // Custom characters mixing Japanese Katakana, numbers, and latin
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン".split("");

        const colors = ["#00f3ff", "#bc13fe", "#0ff0fc", "#22c55e"]; // Matrix neon green mixed with our theme

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        // Initialize drops
        for (let x = 0; x < columns; x++) {
            // Start randomly offscreen
            drops[x] = Math.random() * -100;
        }

        const draw = () => {
            // Black BG with opacity for trail effect
            ctx.fillStyle = "rgba(3, 0, 20, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];
                // Random color from our neon palette
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

                // Draw character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33); // ~30fps

        return () => clearInterval(interval);
    }, [windowSize]);

    if (windowSize.width === 0) return null; // Avoid hydration mismatch

    return (
        <canvas
            ref={canvasRef}
            style={{ opacity }}
            className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
        />
    );
}
