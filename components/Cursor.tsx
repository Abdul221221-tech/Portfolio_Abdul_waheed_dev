"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            // Check if hovering over an interactive element
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null;

            setIsHovering(isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--color-neon-cyan)] pointer-events-none z-[100] mix-blend-screen shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? "var(--color-neon-purple)" : "var(--color-neon-cyan)",
                    backgroundColor: isHovering ? "rgba(188, 19, 254, 0.1)" : "transparent"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-neon-blue)] pointer-events-none z-[100] shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isHovering ? 0 : 1
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
            />
        </>
    );
}
